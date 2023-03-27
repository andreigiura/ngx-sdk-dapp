import { Inject, Injectable } from '@angular/core';
import { DAPP_CONFIG } from '../../../config';
import { GenericProvider, ProvidersType } from '../genericProvider';
import { WalletConnectV2Provider } from '@multiversx/sdk-wallet-connect-provider';
import { NativeAuthClient } from '@multiversx/sdk-native-auth-client';
import { Observable } from 'rxjs';
import { LoginAccount } from '../../../ngxs/account/account.actions';
import { Transaction } from '@multiversx/sdk-core/out';
import { ERD_CANCEL_ACTION, MULTIVERSX_CANCEL_ACTION, } from '../../../constants';
import { CancelPendingSignature } from '../../../ngxs/account/transactions.actions';
import * as i0 from "@angular/core";
import * as i1 from "@ngxs/store";
import * as i2 from "../../account/account.service";
import * as i3 from "../../authentication/authentication.service";
import * as i4 from "@angular/router";
export class XPortalProviderService extends GenericProvider {
    constructor(store, accountService, authenticationService, config, router) {
        super(store, accountService, authenticationService, config);
        this.config = config;
        this.router = router;
        this.onClientLogin = () => {
            if (!this.initToken) {
                throw new Error('No init token found');
            }
            this.walletConnect?.getSignature().then((signature) => {
                this.walletConnect?.getAddress().then((address) => {
                    const accessToken = new NativeAuthClient().getToken(address, this.initToken, signature);
                    this.localStore.dispatch(new LoginAccount({
                        address,
                        accessToken,
                        currentProvider: ProvidersType.XPortal,
                    }));
                    if (this.navAfterConnectRoute)
                        this.router.navigate([this.navAfterConnectRoute]);
                });
            });
        };
        this.onClientLogout = () => {
            this.logout();
        };
        this.onClientEvent = (event) => { };
        this.localStore = store;
        this.localAccountService = accountService;
    }
    async connect(navAfterConnectRoute) {
        const { client, init } = await super.connect(navAfterConnectRoute);
        this.initToken = init;
        this.navAfterConnectRoute = navAfterConnectRoute;
        this.walletConnect = new WalletConnectV2Provider({
            onClientLogin: this.onClientLogin,
            onClientLogout: this.onClientLogout,
            onClientEvent: this.onClientEvent,
        }, this.config.chainID, this.config.walletConnectV2RelayAddresses[0], this.config.walletConnectV2ProjectId);
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
        }
        catch (error) {
            throw error;
        }
    }
    async awaitUserConnectionResponse({ approval, token, }) {
        try {
            await this.walletConnect?.login({ approval, token });
            this.userResponseObservable = new Observable((subscriber) => {
                subscriber.complete();
            });
        }
        catch (error) {
            this.userResponseObservable = new Observable((subscriber) => {
                subscriber.next('rejected');
                subscriber.complete();
                this.walletConnect?.logout();
            });
        }
        return this.userResponseObservable;
    }
    async logout() {
        if (!this.walletConnect)
            return super.logout();
        const connected = await this.walletConnect.isConnected();
        if (connected)
            this.walletConnect.logout();
        this.router.navigate(['/']);
        return super.logout();
    }
    async sendTransactions(transactions, txId) {
        const txArray = transactions.map((tx) => {
            const tx1 = Transaction.fromPlainObject(tx);
            return tx1;
        });
        try {
            const result = await this.walletConnect?.signTransactions(txArray);
            if (!result)
                return this.addToCancelledTransaction(txId);
            this.addSignedTransactionsToState(result.map((tx) => tx.toPlainObject()), txId);
        }
        catch (error) {
            this.addToCancelledTransaction(txId);
        }
    }
    async reInitialize() {
        if (this.localAccountService &&
            this.localAccountService.account.currentProvider !== ProvidersType.XPortal)
            return '';
        try {
            this.walletConnect = new WalletConnectV2Provider({
                onClientLogin: () => {
                    this.onClientLogin();
                },
                onClientLogout: () => {
                    this.onClientLogout();
                },
                onClientEvent: (e) => {
                    this.onClientEvent(e);
                },
            }, this.config.chainID, this.config.walletConnectV2RelayAddresses[0], this.config.walletConnectV2ProjectId);
            await this.walletConnect.init();
            const connected = await this.walletConnect.isConnected();
            if (!connected &&
                this.localAccountService.account.currentProvider ===
                    ProvidersType.XPortal)
                this.logout();
            else
                this.walletConnect.methods = [
                    MULTIVERSX_CANCEL_ACTION,
                    ERD_CANCEL_ACTION,
                ];
        }
        catch (error) {
            this.logout();
        }
        return '';
    }
    async cancelAction() {
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
        }
        catch (error) {
            console.warn('WalletConnectV2: Unable to send cancelAction event', error);
        }
    }
}
XPortalProviderService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: XPortalProviderService, deps: [{ token: i1.Store }, { token: i2.AccountService }, { token: i3.AuthenticationService }, { token: DAPP_CONFIG }, { token: i4.Router }], target: i0.ɵɵFactoryTarget.Injectable });
XPortalProviderService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: XPortalProviderService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: XPortalProviderService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.Store }, { type: i2.AccountService }, { type: i3.AuthenticationService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DAPP_CONFIG]
                }] }, { type: i4.Router }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieC1wb3J0YWwuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1zZGstZGFwcC9zcmMvbGliL3NlcnZpY2VzL2F1dGhQcm92aWRlcnMveFBvcnRhbC94LXBvcnRhbC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBR25ELE9BQU8sRUFBYyxXQUFXLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUcxRCxPQUFPLEVBQUUsZUFBZSxFQUFFLGFBQWEsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3BFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBS3RFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDbEMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQ3JFLE9BQU8sRUFBMkIsV0FBVyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDaEYsT0FBTyxFQUNMLGlCQUFpQixFQUNqQix3QkFBd0IsR0FDekIsTUFBTSxvQkFBb0IsQ0FBQztBQUM1QixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQzs7Ozs7O0FBS3BGLE1BQU0sT0FBTyxzQkFBdUIsU0FBUSxlQUFlO0lBT3pELFlBQ0UsS0FBWSxFQUNaLGNBQThCLEVBQzlCLHFCQUE0QyxFQUNkLE1BQWtCLEVBQ3hDLE1BQWM7UUFFdEIsS0FBSyxDQUFDLEtBQUssRUFBRSxjQUFjLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFIOUIsV0FBTSxHQUFOLE1BQU0sQ0FBWTtRQUN4QyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBZ0ZoQixrQkFBYSxHQUFHLEdB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UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLE9BQU8sQ0FBQyxJQUFJLENBQUMsb0RBQW9ELEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDM0U7SUFDSCxDQUFDOzttSEExTlUsc0JBQXNCLDBHQVd2QixXQUFXO3VIQVhWLHNCQUFzQixjQUZyQixNQUFNOzJGQUVQLHNCQUFzQjtrQkFIbEMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7OzBCQVlJLE1BQU07MkJBQUMsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFN0b3JlIH0gZnJvbSAnQG5neHMvc3RvcmUnO1xuaW1wb3J0IHsgRGFwcENvbmZpZywgREFQUF9DT05GSUcgfSBmcm9tICcuLi8uLi8uLi9jb25maWcnO1xuaW1wb3J0IHsgQWNjb3VudFNlcnZpY2UgfSBmcm9tICcuLi8uLi9hY2NvdW50L2FjY291bnQuc2VydmljZSc7XG5pbXBvcnQgeyBBdXRoZW50aWNhdGlvblNlcnZpY2UgfSBmcm9tICcuLi8uLi9hdXRoZW50aWNhdGlvbi9hdXRoZW50aWNhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IEdlbmVyaWNQcm92aWRlciwgUHJvdmlkZXJzVHlwZSB9IGZyb20gJy4uL2dlbmVyaWNQcm92aWRlcic7XG5pbXBvcnQgeyBXYWxsZXRDb25uZWN0VjJQcm92aWRlciB9IGZyb20gJ0BtdWx0aXZlcnN4L3Nkay13YWxsZXQtY29ubmVjdC1wcm92aWRlcic7XG5pbXBvcnQgeyBOYXRpdmVBdXRoQ2xpZW50IH0gZnJvbSAnQG11bHRpdmVyc3gvc2RrLW5hdGl2ZS1hdXRoLWNsaWVudCc7XG5pbXBvcnQgdHlwZSB7XG4gIFNlc3Npb25FdmVudFR5cGVzLFxuICBTZXNzaW9uVHlwZXMsXG59IGZyb20gJ0BtdWx0aXZlcnN4L3Nkay13YWxsZXQtY29ubmVjdC1wcm92aWRlci9vdXQvd2FsbGV0Q29ubmVjdFYyUHJvdmlkZXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTG9naW5BY2NvdW50IH0gZnJvbSAnLi4vLi4vLi4vbmd4cy9hY2NvdW50L2FjY291bnQuYWN0aW9ucyc7XG5pbXBvcnQgeyBJUGxhaW5UcmFuc2FjdGlvbk9iamVjdCwgVHJhbnNhY3Rpb24gfSBmcm9tICdAbXVsdGl2ZXJzeC9zZGstY29yZS9vdXQnO1xuaW1wb3J0IHtcbiAgRVJEX0NBTkNFTF9BQ1RJT04sXG4gIE1VTFRJVkVSU1hfQ0FOQ0VMX0FDVElPTixcbn0gZnJvbSAnLi4vLi4vLi4vY29uc3RhbnRzJztcbmltcG9ydCB7IENhbmNlbFBlbmRpbmdTaWduYXR1cmUgfSBmcm9tICcuLi8uLi8uLi9uZ3hzL2FjY291bnQvdHJhbnNhY3Rpb25zLmFjdGlvbnMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgWFBvcnRhbFByb3ZpZGVyU2VydmljZSBleHRlbmRzIEdlbmVyaWNQcm92aWRlciB7XG4gIHByaXZhdGUgd2FsbGV0Q29ubmVjdDogV2FsbGV0Q29ubmVjdFYyUHJvdmlkZXIgfCB1bmRlZmluZWQ7XG4gIHByaXZhdGUgdXNlclJlc3BvbnNlT2JzZXJ2YWJsZTogT2JzZXJ2YWJsZTxzdHJpbmc+IHwgdW5kZWZpbmVkO1xuICBwcml2YXRlIG5hdkFmdGVyQ29ubmVjdFJvdXRlOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIHByaXZhdGUgaW5pdFRva2VuOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIHByaXZhdGUgbG9jYWxTdG9yZTogU3RvcmU7XG4gIHByaXZhdGUgbG9jYWxBY2NvdW50U2VydmljZTogQWNjb3VudFNlcnZpY2U7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHN0b3JlOiBTdG9yZSxcbiAgICBhY2NvdW50U2VydmljZTogQWNjb3VudFNlcnZpY2UsXG4gICAgYXV0aGVudGljYXRpb25TZXJ2aWNlOiBBdXRoZW50aWNhdGlvblNlcnZpY2UsXG4gICAgQEluamVjdChEQVBQX0NPTkZJRykgb3ZlcnJpZGUgY29uZmlnOiBEYXBwQ29uZmlnLFxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXJcbiAgKSB7XG4gICAgc3VwZXIoc3RvcmUsIGFjY291bnRTZXJ2aWNlLCBhdXRoZW50aWNhdGlvblNlcnZpY2UsIGNvbmZpZyk7XG4gICAgdGhpcy5sb2NhbFN0b3JlID0gc3RvcmU7XG4gICAgdGhpcy5sb2NhbEFjY291bnRTZXJ2aWNlID0gYWNjb3VudFNlcnZpY2U7XG4gIH1cblxuICBvdmVycmlkZSBhc3luYyBjb25uZWN0KG5hdkFmdGVyQ29ubmVjdFJvdXRlOiBzdHJpbmcpOiBQcm9taXNlPHtcbiAgICBjbGllbnQ6IE5hdGl2ZUF1dGhDbGllbnQ7XG4gICAgaW5pdDogc3RyaW5nO1xuICAgIHFyQ29kZVN0cjogc3RyaW5nO1xuICAgIGFwcHJvdmFsOiBhbnk7XG4gICAgdG9rZW46IHN0cmluZztcbiAgfT4ge1xuICAgIGNvbnN0IHsgY2xpZW50LCBpbml0IH0gPSBhd2FpdCBzdXBlci5jb25uZWN0KG5hdkFmdGVyQ29ubmVjdFJvdXRlKTtcbiAgICB0aGlzLmluaXRUb2tlbiA9IGluaXQ7XG4gICAgdGhpcy5uYXZBZnRlckNvbm5lY3RSb3V0ZSA9IG5hdkFmdGVyQ29ubmVjdFJvdXRlO1xuXG4gICAgdGhpcy53YWxsZXRDb25uZWN0ID0gbmV3IFdhbGxldENvbm5lY3RWMlByb3ZpZGVyKFxuICAgICAge1xuICAgICAgICBvbkNsaWVudExvZ2luOiB0aGlzLm9uQ2xpZW50TG9naW4sXG4gICAgICAgIG9uQ2xpZW50TG9nb3V0OiB0aGlzLm9uQ2xpZW50TG9nb3V0LFxuICAgICAgICBvbkNsaWVudEV2ZW50OiB0aGlzLm9uQ2xpZW50RXZlbnQsXG4gICAgICB9LFxuICAgICAgdGhpcy5jb25maWcuY2hhaW5JRCxcbiAgICAgIHRoaXMuY29uZmlnLndhbGxldENvbm5lY3RWMlJlbGF5QWRkcmVzc2VzWzBdLFxuICAgICAgdGhpcy5jb25maWcud2FsbGV0Q29ubmVjdFYyUHJvamVjdElkXG4gICAgKTtcblxuICAgIHRyeSB7XG4gICAgICBhd2FpdCB0aGlzLndhbGxldENvbm5lY3QuaW5pdCgpO1xuICAgICAgY29uc3QgeyB1cmksIGFwcHJvdmFsIH0gPSBhd2FpdCB0aGlzLndhbGxldENvbm5lY3QuY29ubmVjdCh7XG4gICAgICAgIG1ldGhvZHM6IFtNVUxUSVZFUlNYX0NBTkNFTF9BQ1RJT04sIEVSRF9DQU5DRUxfQUNUSU9OXSxcbiAgICAgIH0pO1xuICAgICAgaWYgKCF1cmkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdXYWxsZXRDb25uZWN0IGNvdWxkIG5vdCBiZSBpbml0aWFsaXplZCcpO1xuICAgICAgfVxuICAgICAgbGV0IHdhbGxldENvbmVjdFVyaVdpdGhUb2tlbiA9IHVyaTtcbiAgICAgIHdhbGxldENvbmVjdFVyaVdpdGhUb2tlbiA9IGAke3dhbGxldENvbmVjdFVyaVdpdGhUb2tlbn0mdG9rZW49JHtpbml0fWA7XG5cbiAgICAgIHRoaXMuYXdhaXRVc2VyQ29ubmVjdGlvblJlc3BvbnNlKHtcbiAgICAgICAgYXBwcm92YWwsXG4gICAgICAgIHRva2VuOiBpbml0LFxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGNsaWVudCxcbiAgICAgICAgaW5pdCxcbiAgICAgICAgcXJDb2RlU3RyOiB3YWxsZXRDb25lY3RVcmlXaXRoVG9rZW4sXG4gICAgICAgIGFwcHJvdmFsLFxuICAgICAgICB0b2tlbjogaW5pdCxcbiAgICAgIH07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBhd2FpdFVzZXJDb25uZWN0aW9uUmVzcG9uc2Uoe1xuICAgIGFwcHJvdmFsLFxuICAgIHRva2VuLFxuICB9OiB7XG4gICAgYXBwcm92YWw6IGFueTtcbiAgICB0b2tlbjogc3RyaW5nO1xuICB9KSB7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IHRoaXMud2FsbGV0Q29ubmVjdD8ubG9naW4oeyBhcHByb3ZhbCwgdG9rZW4gfSk7XG4gICAgICB0aGlzLnVzZXJSZXNwb25zZU9ic2VydmFibGUgPSBuZXcgT2JzZXJ2YWJsZSgoc3Vic2NyaWJlcikgPT4ge1xuICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhpcy51c2VyUmVzcG9uc2VPYnNlcnZhYmxlID0gbmV3IE9ic2VydmFibGUoKHN1YnNjcmliZXIpID0+IHtcbiAgICAgICAgc3Vic2NyaWJlci5uZXh0KCdyZWplY3RlZCcpO1xuICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgIHRoaXMud2FsbGV0Q29ubmVjdD8ubG9nb3V0KCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy51c2VyUmVzcG9uc2VPYnNlcnZhYmxlO1xuICB9XG5cbiAgcHJpdmF0ZSBvbkNsaWVudExvZ2luID0gKCkgPT4ge1xuICAgIGlmICghdGhpcy5pbml0VG9rZW4pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm8gaW5pdCB0b2tlbiBmb3VuZCcpO1xuICAgIH1cblxuICAgIHRoaXMud2FsbGV0Q29ubmVjdD8uZ2V0U2lnbmF0dXJlKCkudGhlbigoc2lnbmF0dXJlKSA9PiB7XG4gICAgICB0aGlzLndhbGxldENvbm5lY3Q/LmdldEFkZHJlc3MoKS50aGVuKChhZGRyZXNzKSA9PiB7XG4gICAgICAgIGNvbnN0IGFjY2Vzc1Rva2VuID0gbmV3IE5hdGl2ZUF1dGhDbGllbnQoKS5nZXRUb2tlbihcbiAgICAgICAgICBhZGRyZXNzLFxuICAgICAgICAgIHRoaXMuaW5pdFRva2VuISxcbiAgICAgICAgICBzaWduYXR1cmVcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5sb2NhbFN0b3JlLmRpc3BhdGNoKFxuICAgICAgICAgIG5ldyBMb2dpbkFjY291bnQoe1xuICAgICAgICAgICAgYWRkcmVzcyxcbiAgICAgICAgICAgIGFjY2Vzc1Rva2VuLFxuICAgICAgICAgICAgY3VycmVudFByb3ZpZGVyOiBQcm92aWRlcnNUeXBlLlhQb3J0YWwsXG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKHRoaXMubmF2QWZ0ZXJDb25uZWN0Um91dGUpXG4gICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW3RoaXMubmF2QWZ0ZXJDb25uZWN0Um91dGVdKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIHByaXZhdGUgb25DbGllbnRMb2dvdXQgPSAoKSA9PiB7XG4gICAgdGhpcy5sb2dvdXQoKTtcbiAgfTtcblxuICBwcml2YXRlIG9uQ2xpZW50RXZlbnQgPSAoZXZlbnQ6IFNlc3Npb25FdmVudFR5cGVzWydldmVudCddKSA9PiB7fTtcblxuICBvdmVycmlkZSBhc3luYyBsb2dvdXQoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgaWYgKCF0aGlzLndhbGxldENvbm5lY3QpIHJldHVybiBzdXBlci5sb2dvdXQoKTtcblxuICAgIGNvbnN0IGNvbm5lY3RlZCA9IGF3YWl0IHRoaXMud2FsbGV0Q29ubmVjdC5pc0Nvbm5lY3RlZCgpO1xuICAgIGlmIChjb25uZWN0ZWQpIHRoaXMud2FsbGV0Q29ubmVjdC5sb2dvdXQoKTtcblxuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnLyddKTtcbiAgICByZXR1cm4gc3VwZXIubG9nb3V0KCk7XG4gIH1cblxuICBvdmVycmlkZSBhc3luYyBzZW5kVHJhbnNhY3Rpb25zKFxuICAgIHRyYW5zYWN0aW9uczogSVBsYWluVHJhbnNhY3Rpb25PYmplY3RbXSxcbiAgICB0eElkOiBudW1iZXJcbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgdHhBcnJheSA9IHRyYW5zYWN0aW9ucy5tYXAoKHR4KSA9PiB7XG4gICAgICBjb25zdCB0eDEgPSBUcmFuc2FjdGlvbi5mcm9tUGxhaW5PYmplY3QodHgpO1xuICAgICAgcmV0dXJuIHR4MTtcbiAgICB9KTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy53YWxsZXRDb25uZWN0Py5zaWduVHJhbnNhY3Rpb25zKHR4QXJyYXkpO1xuXG4gICAgICBpZiAoIXJlc3VsdCkgcmV0dXJuIHRoaXMuYWRkVG9DYW5jZWxsZWRUcmFuc2FjdGlvbih0eElkKTtcblxuICAgICAgdGhpcy5hZGRTaWduZWRUcmFuc2FjdGlvbnNUb1N0YXRlKFxuICAgICAgICByZXN1bHQubWFwKCh0eCkgPT4gdHgudG9QbGFpbk9iamVjdCgpKSxcbiAgICAgICAgdHhJZFxuICAgICAgKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhpcy5hZGRUb0NhbmNlbGxlZFRyYW5zYWN0aW9uKHR4SWQpO1xuICAgIH1cbiAgfVxuXG4gIG92ZXJyaWRlIGFzeW5jIHJlSW5pdGlhbGl6ZSgpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGlmIChcbiAgICAgIHRoaXMubG9jYWxBY2NvdW50U2VydmljZSAmJlxuICAgICAgdGhpcy5sb2NhbEFjY291bnRTZXJ2aWNlLmFjY291bnQuY3VycmVudFByb3ZpZGVyICE9PSBQcm92aWRlcnNUeXBlLlhQb3J0YWxcbiAgICApXG4gICAgICByZXR1cm4gJyc7XG5cbiAgICB0cnkge1xuICAgICAgdGhpcy53YWxsZXRDb25uZWN0ID0gbmV3IFdhbGxldENvbm5lY3RWMlByb3ZpZGVyKFxuICAgICAgICB7XG4gICAgICAgICAgb25DbGllbnRMb2dpbjogKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5vbkNsaWVudExvZ2luKCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBvbkNsaWVudExvZ291dDogKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5vbkNsaWVudExvZ291dCgpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgb25DbGllbnRFdmVudDogKGUpID0+IHtcbiAgICAgICAgICAgIHRoaXMub25DbGllbnRFdmVudChlKTtcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICB0aGlzLmNvbmZpZy5jaGFpbklELFxuICAgICAgICB0aGlzLmNvbmZpZy53YWxsZXRDb25uZWN0VjJSZWxheUFkZHJlc3Nlc1swXSxcbiAgICAgICAgdGhpcy5jb25maWcud2FsbGV0Q29ubmVjdFYyUHJvamVjdElkXG4gICAgICApO1xuXG4gICAgICBhd2FpdCB0aGlzLndhbGxldENvbm5lY3QuaW5pdCgpO1xuICAgICAgY29uc3QgY29ubmVjdGVkID0gYXdhaXQgdGhpcy53YWxsZXRDb25uZWN0LmlzQ29ubmVjdGVkKCk7XG5cbiAgICAgIGlmIChcbiAgICAgICAgIWNvbm5lY3RlZCAmJlxuICAgICAgICB0aGlzLmxvY2FsQWNjb3VudFNlcnZpY2UuYWNjb3VudC5jdXJyZW50UHJvdmlkZXIgPT09XG4gICAgICAgICAgUHJvdmlkZXJzVHlwZS5YUG9ydGFsXG4gICAgICApXG4gICAgICAgIHRoaXMubG9nb3V0KCk7XG4gICAgICBlbHNlXG4gICAgICAgIHRoaXMud2FsbGV0Q29ubmVjdC5tZXRob2RzID0gW1xuICAgICAgICAgIE1VTFRJVkVSU1hfQ0FOQ0VMX0FDVElPTixcbiAgICAgICAgICBFUkRfQ0FOQ0VMX0FDVElPTixcbiAgICAgICAgXTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhpcy5sb2dvdXQoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICBvdmVycmlkZSBhc3luYyBjYW5jZWxBY3Rpb24oKTogUHJvbWlzZTxhbnk+IHtcbiAgICB0cnkge1xuICAgICAgaWYgKCF0aGlzLndhbGxldENvbm5lY3QpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmxvY2FsU3RvcmUuZGlzcGF0Y2gobmV3IENhbmNlbFBlbmRpbmdTaWduYXR1cmUoKSk7XG5cbiAgICAgIGF3YWl0IHRoaXMud2FsbGV0Q29ubmVjdD8uc2VuZEN1c3RvbVJlcXVlc3Q/Lih7XG4gICAgICAgIHJlcXVlc3Q6IHtcbiAgICAgICAgICBtZXRob2Q6IE1VTFRJVkVSU1hfQ0FOQ0VMX0FDVElPTixcbiAgICAgICAgICBwYXJhbXM6IHsgYWN0aW9uOiAnY2FuY2VsU2lnblR4JyB9LFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUud2FybignV2FsbGV0Q29ubmVjdFYyOiBVbmFibGUgdG8gc2VuZCBjYW5jZWxBY3Rpb24gZXZlbnQnLCBlcnJvcik7XG4gICAgfVxuICB9XG59XG4iXX0=