import { Injectable } from '@angular/core';
import { IPlainTransactionObject } from '@multiversx/sdk-core/out';
import { first, Subscription, take, takeWhile } from 'rxjs';
import { AccountService } from '../account/account.service';
import { AuthenticationService } from '../authentication/authentication.service';
import { ExtensionProviderService } from './extension/extensionProvider.service';
import { GenericProvider, ProvidersType } from './genericProvider';
import { WebWalletProviderService } from './webWallet/web-walletProvider.service';
import { XPortalProviderService } from './xPortal/x-portal.service';

type AllProvidersType =
  | ExtensionProviderService
  | XPortalProviderService
  | WebWalletProviderService
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
    accountService: AccountService,
    authService: AuthenticationService
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

  public connect(navAfterConnectRoute?: string): Promise<GenericProvider> {
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

  public sendTransactions(
    transactions: IPlainTransactionObject[],
    txId: number
  ) {
    if (this._provider) {
      return this._provider.sendTransactions(transactions, txId);
    }
    throw new Error('Provider is not set');
  }
}
