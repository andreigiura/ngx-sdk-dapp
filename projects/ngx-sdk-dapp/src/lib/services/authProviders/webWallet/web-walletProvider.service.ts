import { Inject, Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { IPlainTransactionObject, Transaction } from '@multiversx/sdk-core/out';
import { NativeAuthClient } from '@multiversx/sdk-native-auth-client';
import { WalletProvider } from '@multiversx/sdk-web-wallet-provider/out';
import { Store } from '@ngxs/store';
import { filter, lastValueFrom, take } from 'rxjs';
import { DappConfig, DAPP_CONFIG } from '../../../config';
import { LoginAccount } from '../../../ngxs/account/account.actions';
import { CancelPendingSignature } from '../../../ngxs/account/transactions.actions';
import { AccountService } from '../../account/account.service';
import { AuthenticationService } from '../../authentication/authentication.service';
import { GenericProvider, ProvidersType } from '../genericProvider';

export const DAPP_INIT_ROUTE = '/dapp/init';

@Injectable({
  providedIn: 'root',
})
export class WebWalletProviderService extends GenericProvider {
  private localStore: Store;
  private localAccount: AccountService;
  private walletProvider: WalletProvider | undefined;

  constructor(
    store: Store,
    accountService: AccountService,
    authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(DAPP_CONFIG) override config: DappConfig,
    private activatedRoute: ActivatedRoute
  ) {
    super(store, accountService, authenticationService, config);
    this.localStore = store;
    this.localAccount = accountService;

    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .pipe(take(1))
      .subscribe((event: any) => {
        const pathname = event.url.split('?')[0];

        this.route.queryParams.pipe(take(1)).subscribe((params) => {
          if (
            params['walletProviderStatus'] === 'transactionsSigned' &&
            params['signSession']
          ) {
            this.transactionsSuccessCallback(
              parseInt(params['signSession']),
              pathname
            );
          }
          if (params['signSession'] && params['status'] === 'failed') {
            this.transactionsFailedCallback(
              parseInt(params['signSession']),
              pathname
            );
          }
          if (params['signSession'] && params['status'] === 'cancelled') {
            this.transactionsCancelledCallback(
              parseInt(params['signSession']),
              pathname
            );
          }
          if (params['address'] && params['signature'])
            this.connectCallback(params['address'], params['signature']);
        });
      });
  }

  private transactionsFailedCallback(signSession: number, pathname: string) {
    this.router.navigate([pathname]);
    this.addFailedTransactionsToState(signSession);
  }

  private transactionsCancelledCallback(signSession: number, pathname: string) {
    this.router.navigate([pathname]);
    this.addToCancelledTransaction(signSession);
  }

  private transactionsSuccessCallback(signSession: number, pathname: string) {
    const transactions = this.walletProvider?.getTransactionsFromWalletUrl();
    if (!transactions) return;

    transactions.map((tx) => {
      if (tx.data) {
        tx.data = Buffer.from(tx.data ?? '', 'utf8').toString('base64');
      }
    });

    this.router.navigate([pathname]);
    this.addSignedTransactionsToState(transactions, signSession);
  }
  private async connectCallback(address: string, signature: string) {
    const accessToken = new NativeAuthClient().getToken(
      address,
      localStorage.getItem('initToken')!,
      signature
    );

    localStorage.removeItem('initToken');

    this.localStore.dispatch(
      new LoginAccount({
        address,
        accessToken,
        currentProvider: ProvidersType.WebWallet,
      })
    );

    this.walletProvider = new WalletProvider(
      `https://wallet.multiversx.com${DAPP_INIT_ROUTE}`
    );

    const navAfterConnectRoute = localStorage.getItem('navAfterConnectRoute');
    if (navAfterConnectRoute)
      await this.router.navigate([navAfterConnectRoute]);

    window.location.reload();
  }

  override async connect(navAfterConnectRoute: string): Promise<{
    client: NativeAuthClient;
    init: string;
  }> {
    const { client, init } = await super.connect(navAfterConnectRoute);
    localStorage.setItem('initToken', init);
    localStorage.setItem('navAfterConnectRoute', navAfterConnectRoute || '');

    this.walletProvider = new WalletProvider(
      `${this.config.walletURL}${DAPP_INIT_ROUTE}`
    );
    this.walletProvider.login({
      callbackUrl: window.location.href,
      token: init,
    });

    return { client, init };
  }

  override async logout(): Promise<boolean> {
    if (!this.walletProvider)
      throw new Error('Provider was not reinitialized!');
    super.logout();
    this.walletProvider.logout({ callbackUrl: window.location.href });
    return true;
  }

  override reInitialize(): void {
    if (
      this.localAccount &&
      this.localAccount.account.currentProvider !== ProvidersType.WebWallet
    )
      return;

    this.walletProvider = new WalletProvider(
      `${this.config.walletURL}${DAPP_INIT_ROUTE}`
    );
  }

  override cancelAction(): void {
    if (!this.walletProvider) {
      return;
    }

    super.cancelAction();
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
      const url = new URL(window.location.href);
      url.searchParams.append('signSession', txId.toString());

      this.walletProvider?.signTransactions(txArray, {
        callbackUrl: encodeURIComponent(url.href),
      });
    } catch (error) {
      throw error;
    }
  }
}
