import { Inject, Injectable } from '@angular/core';
import { GenericProvider, ProvidersType } from '../genericProvider';
import { Router } from '@angular/router';
import { IPlainTransactionObject, Transaction } from '@multiversx/sdk-core/out';
import { ExtensionProvider } from '@multiversx/sdk-extension-provider/out';
import { NativeAuthClient } from '@multiversx/sdk-native-auth-client';
import { Store } from '@ngxs/store';
import { LoginAccount } from '../../../ngxs/account/account.actions';
import { AccountStateModel } from '../../../ngxs/account/account.slice';
import { AccountService } from '../../account/account.service';
import { AuthenticationService } from '../../authentication/authentication.service';
import { DappConfig, DAPP_CONFIG } from '../../../config';

@Injectable({
  providedIn: 'root',
})
export class ExtensionProviderService extends GenericProvider {
  private localStore: Store;
  private localAccount: AccountService;
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
  }> {
    const { client, init } = await super.connect(navAfterConnectRoute);

    const extensionInstance = ExtensionProvider.getInstance();

    const extensionInitialized = await extensionInstance.init();
    if (!extensionInitialized) {
      throw new Error('Extension could not be initialized');
    }

    await extensionInstance.login({ token: init });
    const { signature, address } = extensionInstance.account;
    if (signature) {
      const accessToken = client.getToken(address, init, signature);
      this.localStore.dispatch(
        new LoginAccount({
          address,
          accessToken,
          currentProvider: ProvidersType.Extension,
        })
      );
    }
    if (navAfterConnectRoute) this.router.navigate([navAfterConnectRoute]);

    return { client, init };
  }

  override async logout(): Promise<boolean> {
    const extensionInstance = ExtensionProvider.getInstance();
    await extensionInstance.logout();
    this.router.navigate(['/']);
    return super.logout();
  }

  override reInitialize(account: AccountStateModel): void {
    if (
      this.localAccount &&
      this.localAccount.account.currentProvider !== ProvidersType.Extension
    )
      return;
    ExtensionProvider.getInstance().init();
    ExtensionProvider.getInstance().setAddress(account.address);
  }

  override async sendTransactions(
    transactions: IPlainTransactionObject[],
    txId: number
  ): Promise<void> {
    const txArray = transactions.map((tx) => {
      const tx1 = Transaction.fromPlainObject(tx);
      return tx1;
    });
    try {
      const result = await ExtensionProvider.getInstance().signTransactions(
        txArray
      );
      this.addSignedTransactionsToState(
        result.map((tx) => tx.toPlainObject()),
        txId
      );
    } catch (error) {
      this.addToCancelledTransaction(txId);
    }
  }
}
