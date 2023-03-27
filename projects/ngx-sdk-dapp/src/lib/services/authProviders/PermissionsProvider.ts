import { Inject, Injectable } from '@angular/core';
import { IPlainTransactionObject } from '@multiversx/sdk-core/out';
import { Store } from '@ngxs/store';
import { Subscription, takeWhile } from 'rxjs';
import { DappConfig, DAPP_CONFIG } from '../../config';
import { AddTransactionsBatch } from '../../ngxs/account/transactions.actions';
import { ParseAmountPipe } from '../../pipes/parseAmount/parse-amount.pipe';
import { TxStatusEnum } from '../../types';
import { AccountService } from '../account/account.service';
import { AuthenticationService } from '../authentication/authentication.service';
import { TransactionsOptions } from '../transactions/transactions.service';
import { ExtensionProviderService } from './extension/extensionProvider.service';
import { ProvidersType } from './genericProvider';
import { LedgerProviderService } from './ledger/ledger-provider.service';
import { WebWalletProviderService } from './webWallet/web-walletProvider.service';
import { XPortalProviderService } from './xPortal/x-portal.service';

type AllProvidersType =
  | ExtensionProviderService
  | XPortalProviderService
  | WebWalletProviderService
  | LedgerProviderService
  | null;

@Injectable({
  providedIn: 'root',
})
export class PermissionsProviderService {
  private _provider: AllProvidersType;
  private localAccountService: AccountService;
  private accountSubscription: Subscription | null = null;
  constructor(
    private extensionProvider: ExtensionProviderService,
    private webWalletProvider: WebWalletProviderService,
    private xportalProvider: XPortalProviderService,
    private ledgerProvider: LedgerProviderService,
    accountService: AccountService,
    authService: AuthenticationService,
    private parseAmount: ParseAmountPipe,
    private store: Store,
    @Inject(DAPP_CONFIG) public config: DappConfig
  ) {
    this._provider = null;
    this.localAccountService = accountService;
    let providerSet = false;
    if (accountService.account$) {
      this.accountSubscription = accountService.account$
        .pipe(takeWhile((account) => !providerSet))
        .subscribe((account) => {
          if (
            account.currentProvider !== ProvidersType.EMPTY &&
            authService.isAuthenticated()
          ) {
            providerSet = true;
            this.setProvider(account.currentProvider as ProvidersType);
            this.refreshRemoteData();
          }
        });
    }
  }

  private refreshRemoteData() {
    this.localAccountService.refetchAccountData();
  }

  setProvider(providerType: ProvidersType) {
    switch (providerType) {
      case ProvidersType.Extension:
        this.provider = this.extensionProvider;
        break;

      case ProvidersType.WebWallet:
        this.provider = this.webWalletProvider;
        break;

      case ProvidersType.XPortal:
        this.provider = this.xportalProvider;
        break;

      case ProvidersType.Ledger:
        this.provider = this.ledgerProvider;
        break;
      default:
        this.provider = null;
        break;
    }
  }

  public get provider(): AllProvidersType {
    return this._provider;
  }

  private set provider(provider: AllProvidersType) {
    this._provider = provider;
  }

  public connect(navAfterConnectRoute: string): Promise<any> {
    if (this._provider) {
      return this._provider.connect(navAfterConnectRoute);
    }
    throw new Error('Provider is not set');
  }

  public logout(navAfterConnectRoute?: string): Promise<boolean> {
    if (this._provider) {
      return this._provider.logout();
    }
    throw new Error('Provider is not set');
  }

  public async cancelAction(): Promise<void> {
    if (this._provider && this._provider.cancelAction) {
      this._provider.cancelAction();
      return;
    }
    throw new Error('Provider is not set123');
  }

  public sendTransactions(
    transactions: Omit<
      IPlainTransactionObject,
      'nonce' | 'sender' | 'chainID' | 'version'
    >[],
    txOptions: TransactionsOptions
  ): number {
    if (this._provider) {
      const txId = Date.now();

      const transactionsToSend = transactions.map((tx, index) => ({
        ...tx,
        nonce: this.localAccountService.account.nonce + index,
        sender: this.localAccountService.account.address,
        data: Buffer.from(tx.data ?? '', 'utf8').toString('base64'),
        value: this.parseAmount.transform(tx.value),
        chainID: this.config.chainID,
        //TODO: change version if needed (ledger, guardians, etc)
        version: 1,
      }));

      this.store.dispatch(
        new AddTransactionsBatch({
          id: txId,
          transactions: transactionsToSend,
          status: TxStatusEnum.PENDING_SIGNATURE,
          options: txOptions,
        })
      );

      this._provider.sendTransactions(transactionsToSend, txId);

      return txId;
    }
    throw new Error('Provider is not set');
  }
}
