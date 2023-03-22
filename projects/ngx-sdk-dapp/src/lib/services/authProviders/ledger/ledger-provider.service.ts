import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IPlainTransactionObject, Transaction } from '@multiversx/sdk-core/out';
import { HWProvider } from '@multiversx/sdk-hw-provider/out';
import { NativeAuthClient } from '@multiversx/sdk-native-auth-client';
import { Store } from '@ngxs/store';
import { lastValueFrom, throwError } from 'rxjs';
import { DappConfig, DAPP_CONFIG } from '../../../config';
import { LoginAccount } from '../../../ngxs/account/account.actions';
import { AccountStateModel } from '../../../ngxs/account/account.slice';
import { AccountService } from '../../account/account.service';
import { AuthenticationService } from '../../authentication/authentication.service';
import { GenericProvider, ProvidersType } from '../genericProvider';

@Injectable({
  providedIn: 'root',
})
export class LedgerProviderService extends GenericProvider {
  private localStore: Store;
  private localAccount: AccountService;
  private ledgerProvider: HWProvider | undefined;
  private navAfterConnectRoute: string | undefined;

  constructor(
    store: Store,
    accountService: AccountService,
    authenticationService: AuthenticationService,
    @Inject(DAPP_CONFIG) override config: DappConfig,
    private router: Router
  ) {
    super(store, accountService, authenticationService, config);
    this.localStore = store;
    this.localAccount = accountService;
  }

  override async connect(navAfterConnectRoute: string): Promise<{
    client: NativeAuthClient;
    init: string;
    accounts?: string[];
    error?: string;
  }> {
    const { client, init } = await super.connect(navAfterConnectRoute);
    this.navAfterConnectRoute = navAfterConnectRoute;

    this.ledgerProvider = new HWProvider();

    try {
      await this.ledgerProvider.init();

      if (await this.ledgerProvider.isInitialized()) {
        try {
          const accounts = await this.ledgerProvider.getAccounts(0, 10);
          return { client, init, accounts };
        } catch (error) {
          return {
            client,
            init,
            error: 'Could not get accounts, open multiversx app on ledger',
          };
        }
      } else {
        return {
          client,
          init,
          error: 'Could not initialize ledger provider',
        };
      }
    } catch (error) {
      return {
        client,
        init,
        error: 'Could not initialize ledger provider',
      };
    }
  }

  public async authenticateAccount(index: number) {
    const { client, init } = await super.connect(
      this.navAfterConnectRoute || '/'
    );

    try {
      const loginResult = await this.ledgerProvider?.tokenLogin({
        addressIndex: index,
        token: Buffer.from(init),
      });
      if (!loginResult?.signature || !loginResult?.address) {
        throw new Error('Could not login with ledger');
      }
      const { signature, address } = loginResult;

      const accessToken = client.getToken(address, init, signature.hex());
      this.localStore.dispatch(
        new LoginAccount({
          address,
          accessToken,
          currentProvider: ProvidersType.Ledger,
          ledgerIndex: index,
        })
      );

      if (this.navAfterConnectRoute)
        this.router.navigate([this.navAfterConnectRoute]);
    } catch (error) {}
  }

  override async logout(): Promise<boolean> {
    await this.ledgerProvider?.logout();
    this.router.navigate(['/']);
    return super.logout();
  }

  override async sendTransactions(
    transactions: IPlainTransactionObject[],
    txId: number
  ): Promise<any> {
    const txArray = transactions.map((tx) => {
      const tx1 = Transaction.fromPlainObject(tx);
      return tx1;
    });
    try {
      const result = await this.ledgerProvider?.signTransactions(txArray);

      this.addSignedTransactionsToState(
        result!.map((tx) => tx.toPlainObject()),
        txId
      );
    } catch (error) {
      this.addToCancelledTransaction(txId);
    }
  }

  public async loadAccounts(
    page: number,
    numAddresses: number
  ): Promise<string[]> {
    if (this.ledgerProvider) {
      return this.ledgerProvider.getAccounts(page, numAddresses);
    }
    throw new Error('Ledger provider not initialized');
  }

  override async reInitialize(account: AccountStateModel): Promise<void> {
    if (account.currentProvider !== ProvidersType.Ledger) return;

    try {
      this.ledgerProvider = new HWProvider();
      await this.ledgerProvider.init();

      await this.ledgerProvider.isInitialized();

      this.ledgerProvider.setAddressIndex(account.ledgerIndex!);
    } catch (error) {}
  }
}
