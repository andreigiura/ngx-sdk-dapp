import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { DappConfig, DAPP_CONFIG } from '../../../config';
import { AccountService } from '../../account/account.service';
import { AuthenticationService } from '../../authentication/authentication.service';
import { GenericProvider, ProvidersType } from '../genericProvider';
import { WalletConnectV2Provider } from '@multiversx/sdk-wallet-connect-provider';
import { NativeAuthClient } from '@multiversx/sdk-native-auth-client';
import type {
  SessionEventTypes,
  SessionTypes,
} from '@multiversx/sdk-wallet-connect-provider/out/walletConnectV2Provider';
import { Observable } from 'rxjs';
import { LoginAccount } from '../../../ngxs/account/account.actions';
import { IPlainTransactionObject, Transaction } from '@multiversx/sdk-core/out';
import {
  ERD_CANCEL_ACTION,
  MULTIVERSX_CANCEL_ACTION,
} from '../../../constants';
import { CancelPendingSignature } from '../../../ngxs/account/transactions.actions';

@Injectable({
  providedIn: 'root',
})
export class XPortalProviderService extends GenericProvider {
  private walletConnect: WalletConnectV2Provider | undefined;
  private userResponseObservable: Observable<string> | undefined;
  private navAfterConnectRoute: string | undefined;
  private initToken: string | undefined;
  private localStore: Store;
  private localAccountService: AccountService;
  constructor(
    store: Store,
    accountService: AccountService,
    authenticationService: AuthenticationService,
    @Inject(DAPP_CONFIG) override config: DappConfig,
    private router: Router
  ) {
    super(store, accountService, authenticationService, config);
    this.localStore = store;
    this.localAccountService = accountService;
  }

  override async connect(navAfterConnectRoute: string): Promise<{
    client: NativeAuthClient;
    init: string;
    qrCodeStr: string;
    approval: any;
    token: string;
  }> {
    const { client, init } = await super.connect(navAfterConnectRoute);
    this.initToken = init;
    this.navAfterConnectRoute = navAfterConnectRoute;

    this.walletConnect = new WalletConnectV2Provider(
      {
        onClientLogin: this.onClientLogin,
        onClientLogout: this.onClientLogout,
        onClientEvent: this.onClientEvent,
      },
      this.config.chainID,
      this.config.walletConnectV2RelayAddresses[0],
      this.config.walletConnectV2ProjectId
    );

    try {
      await this.walletConnect.init();
      const { uri, approval } = await this.walletConnect.connect({
        methods: [MULTIVERSX_CANCEL_ACTION, ERD_CANCEL_ACTION],
      });
      if (!uri) {
        throw new Error('WalletConnect could not be initialized');
      }
      let walletConectUriWithToken = uri;
      walletConectUriWithToken = `${walletConectUriWithToken}&token=${init}`;

      this.awaitUserConnectionResponse({
        approval,
        token: init,
      });

      return {
        client,
        init,
        qrCodeStr: walletConectUriWithToken,
        approval,
        token: init,
      };
    } catch (error) {
      throw error;
    }
  }

  public async awaitUserConnectionResponse({
    approval,
    token,
  }: {
    approval: any;
    token: string;
  }) {
    try {
      await this.walletConnect?.login({ approval, token });
      this.userResponseObservable = new Observable((subscriber) => {
        subscriber.complete();
      });
    } catch (error) {
      this.userResponseObservable = new Observable((subscriber) => {
        subscriber.next('rejected');
        subscriber.complete();
        this.walletConnect?.logout();
      });
    }

    return this.userResponseObservable;
  }

  private onClientLogin = () => {
    if (!this.initToken) {
      throw new Error('No init token found');
    }

    this.walletConnect?.getSignature().then((signature) => {
      this.walletConnect?.getAddress().then((address) => {
        const accessToken = new NativeAuthClient().getToken(
          address,
          this.initToken!,
          signature
        );
        this.localStore.dispatch(
          new LoginAccount({
            address,
            accessToken,
            currentProvider: ProvidersType.XPortal,
          })
        );
        if (this.navAfterConnectRoute)
          this.router.navigate([this.navAfterConnectRoute]);
      });
    });
  };

  private onClientLogout = () => {
    this.logout();
  };

  private onClientEvent = (event: SessionEventTypes['event']) => {};

  override async logout(): Promise<boolean> {
    if (!this.walletConnect) return super.logout();

    const connected = await this.walletConnect.isConnected();
    if (connected) this.walletConnect.logout();

    this.router.navigate(['/']);
    return super.logout();
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
      const result = await this.walletConnect?.signTransactions(txArray);

      if (!result) return this.addToCancelledTransaction(txId);

      this.addSignedTransactionsToState(
        result.map((tx) => tx.toPlainObject()),
        txId
      );
    } catch (error) {
      this.addToCancelledTransaction(txId);
    }
  }

  override async reInitialize(): Promise<string> {
    try {
      this.walletConnect = new WalletConnectV2Provider(
        {
          onClientLogin: () => {
            this.onClientLogin();
          },
          onClientLogout: () => {
            this.onClientLogout();
          },
          onClientEvent: (e) => {
            this.onClientEvent(e);
          },
        },
        this.config.chainID,
        this.config.walletConnectV2RelayAddresses[0],
        this.config.walletConnectV2ProjectId
      );

      await this.walletConnect.init();
      const connected = await this.walletConnect.isConnected();

      if (
        !connected &&
        this.localAccountService.account.currentProvider ===
          ProvidersType.XPortal
      )
        this.logout();
      else
        this.walletConnect.methods = [
          MULTIVERSX_CANCEL_ACTION,
          ERD_CANCEL_ACTION,
        ];
    } catch (error) {
      this.logout();
    }

    return '';
  }

  override async cancelAction(): Promise<any> {
    try {
      if (!this.walletConnect) {
        return;
      }

      this.localStore.dispatch(new CancelPendingSignature());

      await this.walletConnect?.sendCustomRequest?.({
        request: {
          method: MULTIVERSX_CANCEL_ACTION,
          params: { action: 'cancelSignTx' },
        },
      });
    } catch (error) {
      console.warn('WalletConnectV2: Unable to send cancelAction event', error);
    }
  }
}
