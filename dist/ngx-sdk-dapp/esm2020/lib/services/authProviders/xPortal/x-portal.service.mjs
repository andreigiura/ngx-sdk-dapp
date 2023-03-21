import { Inject, Injectable } from '@angular/core';
import { DAPP_CONFIG } from '../../../config';
import { GenericProvider, ProvidersType } from '../genericProvider';
import { WalletConnectV2Provider } from '@multiversx/sdk-wallet-connect-provider';
import { NativeAuthClient } from '@multiversx/sdk-native-auth-client';
import { Observable } from 'rxjs';
import { LoginAccount } from '../../../ngxs/account/account.actions';
import { Transaction } from '@multiversx/sdk-core/out';
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
        await this.walletConnect.init();
        const { uri, approval } = await this.walletConnect.connect();
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
        catch (error) { }
    }
    async reInitialize() {
        this.walletConnect = new WalletConnectV2Provider({
            onClientLogin: this.onClientLogin,
            onClientLogout: this.onClientLogout,
            onClientEvent: this.onClientEvent,
        }, this.config.chainID, this.config.walletConnectV2RelayAddresses[0], this.config.walletConnectV2ProjectId);
        try {
            await this.walletConnect.init();
            const connected = await this.walletConnect.isConnected();
            if (!connected)
                this.logout();
        }
        catch (error) {
            this.logout();
        }
        return '';
        // throw new Error('Method not implemented.');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieC1wb3J0YWwuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1zZGstZGFwcC9zcmMvbGliL3NlcnZpY2VzL2F1dGhQcm92aWRlcnMveFBvcnRhbC94LXBvcnRhbC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBR25ELE9BQU8sRUFBYyxXQUFXLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUcxRCxPQUFPLEVBQUUsZUFBZSxFQUFFLGFBQWEsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3BFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBS3RFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDbEMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQ3JFLE9BQU8sRUFBMkIsV0FBVyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7Ozs7OztBQUtoRixNQUFNLE9BQU8sc0JBQXVCLFNBQVEsZUFBZTtJQU96RCxZQUNFLEtBQVksRUFDWixjQUE4QixFQUM5QixxQkFBNEMsRUFDZCxNQUFrQixFQUN4QyxNQUFjO1FBRXRCLEtBQUssQ0FBQyxLQUFLLEVBQUUsY0FBYyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBSDlCLFdBQU0sR0FBTixNQUFNLENBQVk7UUFDeEMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQXlFaEIsa0JBQWEsR0FBRyxHQUFHLEVBQUU7WUFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQ25CLE1BQU0sSUFBSSxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQzthQUN4QztZQUVELElBQUks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LFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7MEJBWUksTUFBTTsyQkFBQyxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgU3RvcmUgfSBmcm9tICdAbmd4cy9zdG9yZSc7XG5pbXBvcnQgeyBEYXBwQ29uZmlnLCBEQVBQX0NPTkZJRyB9IGZyb20gJy4uLy4uLy4uL2NvbmZpZyc7XG5pbXBvcnQgeyBBY2NvdW50U2VydmljZSB9IGZyb20gJy4uLy4uL2FjY291bnQvYWNjb3VudC5zZXJ2aWNlJztcbmltcG9ydCB7IEF1dGhlbnRpY2F0aW9uU2VydmljZSB9IGZyb20gJy4uLy4uL2F1dGhlbnRpY2F0aW9uL2F1dGhlbnRpY2F0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgR2VuZXJpY1Byb3ZpZGVyLCBQcm92aWRlcnNUeXBlIH0gZnJvbSAnLi4vZ2VuZXJpY1Byb3ZpZGVyJztcbmltcG9ydCB7IFdhbGxldENvbm5lY3RWMlByb3ZpZGVyIH0gZnJvbSAnQG11bHRpdmVyc3gvc2RrLXdhbGxldC1jb25uZWN0LXByb3ZpZGVyJztcbmltcG9ydCB7IE5hdGl2ZUF1dGhDbGllbnQgfSBmcm9tICdAbXVsdGl2ZXJzeC9zZGstbmF0aXZlLWF1dGgtY2xpZW50JztcbmltcG9ydCB0eXBlIHtcbiAgU2Vzc2lvbkV2ZW50VHlwZXMsXG4gIFNlc3Npb25UeXBlcyxcbn0gZnJvbSAnQG11bHRpdmVyc3gvc2RrLXdhbGxldC1jb25uZWN0LXByb3ZpZGVyL291dC93YWxsZXRDb25uZWN0VjJQcm92aWRlcic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBMb2dpbkFjY291bnQgfSBmcm9tICcuLi8uLi8uLi9uZ3hzL2FjY291bnQvYWNjb3VudC5hY3Rpb25zJztcbmltcG9ydCB7IElQbGFpblRyYW5zYWN0aW9uT2JqZWN0LCBUcmFuc2FjdGlvbiB9IGZyb20gJ0BtdWx0aXZlcnN4L3Nkay1jb3JlL291dCc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBYUG9ydGFsUHJvdmlkZXJTZXJ2aWNlIGV4dGVuZHMgR2VuZXJpY1Byb3ZpZGVyIHtcbiAgcHJpdmF0ZSB3YWxsZXRDb25uZWN0OiBXYWxsZXRDb25uZWN0VjJQcm92aWRlciB8IHVuZGVmaW5lZDtcbiAgcHJpdmF0ZSB1c2VyUmVzcG9uc2VPYnNlcnZhYmxlOiBPYnNlcnZhYmxlPHN0cmluZz4gfCB1bmRlZmluZWQ7XG4gIHByaXZhdGUgbmF2QWZ0ZXJDb25uZWN0Um91dGU6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgcHJpdmF0ZSBpbml0VG9rZW46IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgcHJpdmF0ZSBsb2NhbFN0b3JlOiBTdG9yZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBzdG9yZTogU3RvcmUsXG4gICAgYWNjb3VudFNlcnZpY2U6IEFjY291bnRTZXJ2aWNlLFxuICAgIGF1dGhlbnRpY2F0aW9uU2VydmljZTogQXV0aGVudGljYXRpb25TZXJ2aWNlLFxuICAgIEBJbmplY3QoREFQUF9DT05GSUcpIG92ZXJyaWRlIGNvbmZpZzogRGFwcENvbmZpZyxcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyXG4gICkge1xuICAgIHN1cGVyKHN0b3JlLCBhY2NvdW50U2VydmljZSwgYXV0aGVudGljYXRpb25TZXJ2aWNlLCBjb25maWcpO1xuICAgIHRoaXMubG9jYWxTdG9yZSA9IHN0b3JlO1xuICB9XG5cbiAgb3ZlcnJpZGUgYXN5bmMgY29ubmVjdChuYXZBZnRlckNvbm5lY3RSb3V0ZTogc3RyaW5nKTogUHJvbWlzZTx7XG4gICAgY2xpZW50OiBOYXRpdmVBdXRoQ2xpZW50O1xuICAgIGluaXQ6IHN0cmluZztcbiAgICBxckNvZGVTdHI6IHN0cmluZztcbiAgICBhcHByb3ZhbDogYW55O1xuICAgIHRva2VuOiBzdHJpbmc7XG4gIH0+IHtcbiAgICBjb25zdCB7IGNsaWVudCwgaW5pdCB9ID0gYXdhaXQgc3VwZXIuY29ubmVjdChuYXZBZnRlckNvbm5lY3RSb3V0ZSk7XG4gICAgdGhpcy5pbml0VG9rZW4gPSBpbml0O1xuICAgIHRoaXMubmF2QWZ0ZXJDb25uZWN0Um91dGUgPSBuYXZBZnRlckNvbm5lY3RSb3V0ZTtcblxuICAgIHRoaXMud2FsbGV0Q29ubmVjdCA9IG5ldyBXYWxsZXRDb25uZWN0VjJQcm92aWRlcihcbiAgICAgIHtcbiAgICAgICAgb25DbGllbnRMb2dpbjogdGhpcy5vbkNsaWVudExvZ2luLFxuICAgICAgICBvbkNsaWVudExvZ291dDogdGhpcy5vbkNsaWVudExvZ291dCxcbiAgICAgICAgb25DbGllbnRFdmVudDogdGhpcy5vbkNsaWVudEV2ZW50LFxuICAgICAgfSxcbiAgICAgIHRoaXMuY29uZmlnLmNoYWluSUQsXG4gICAgICB0aGlzLmNvbmZpZy53YWxsZXRDb25uZWN0VjJSZWxheUFkZHJlc3Nlc1swXSxcbiAgICAgIHRoaXMuY29uZmlnLndhbGxldENvbm5lY3RWMlByb2plY3RJZFxuICAgICk7XG5cbiAgICBhd2FpdCB0aGlzLndhbGxldENvbm5lY3QuaW5pdCgpO1xuICAgIGNvbnN0IHsgdXJpLCBhcHByb3ZhbCB9ID0gYXdhaXQgdGhpcy53YWxsZXRDb25uZWN0LmNvbm5lY3QoKTtcbiAgICBpZiAoIXVyaSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdXYWxsZXRDb25uZWN0IGNvdWxkIG5vdCBiZSBpbml0aWFsaXplZCcpO1xuICAgIH1cbiAgICBsZXQgd2FsbGV0Q29uZWN0VXJpV2l0aFRva2VuID0gdXJpO1xuICAgIHdhbGxldENvbmVjdFVyaVdpdGhUb2tlbiA9IGAke3dhbGxldENvbmVjdFVyaVdpdGhUb2tlbn0mdG9rZW49JHtpbml0fWA7XG5cbiAgICB0aGlzLmF3YWl0VXNlckNvbm5lY3Rpb25SZXNwb25zZSh7XG4gICAgICBhcHByb3ZhbCxcbiAgICAgIHRva2VuOiBpbml0LFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGNsaWVudCxcbiAgICAgIGluaXQsXG4gICAgICBxckNvZGVTdHI6IHdhbGxldENvbmVjdFVyaVdpdGhUb2tlbixcbiAgICAgIGFwcHJvdmFsLFxuICAgICAgdG9rZW46IGluaXQsXG4gICAgfTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBhd2FpdFVzZXJDb25uZWN0aW9uUmVzcG9uc2Uoe1xuICAgIGFwcHJvdmFsLFxuICAgIHRva2VuLFxuICB9OiB7XG4gICAgYXBwcm92YWw6IGFueTtcbiAgICB0b2tlbjogc3RyaW5nO1xuICB9KSB7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IHRoaXMud2FsbGV0Q29ubmVjdD8ubG9naW4oeyBhcHByb3ZhbCwgdG9rZW4gfSk7XG4gICAgICB0aGlzLnVzZXJSZXNwb25zZU9ic2VydmFibGUgPSBuZXcgT2JzZXJ2YWJsZSgoc3Vic2NyaWJlcikgPT4ge1xuICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhpcy51c2VyUmVzcG9uc2VPYnNlcnZhYmxlID0gbmV3IE9ic2VydmFibGUoKHN1YnNjcmliZXIpID0+IHtcbiAgICAgICAgc3Vic2NyaWJlci5uZXh0KCdyZWplY3RlZCcpO1xuICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgIHRoaXMud2FsbGV0Q29ubmVjdD8ubG9nb3V0KCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy51c2VyUmVzcG9uc2VPYnNlcnZhYmxlO1xuICB9XG5cbiAgcHJpdmF0ZSBvbkNsaWVudExvZ2luID0gKCkgPT4ge1xuICAgIGlmICghdGhpcy5pbml0VG9rZW4pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm8gaW5pdCB0b2tlbiBmb3VuZCcpO1xuICAgIH1cblxuICAgIHRoaXMud2FsbGV0Q29ubmVjdD8uZ2V0U2lnbmF0dXJlKCkudGhlbigoc2lnbmF0dXJlKSA9PiB7XG4gICAgICB0aGlzLndhbGxldENvbm5lY3Q/LmdldEFkZHJlc3MoKS50aGVuKChhZGRyZXNzKSA9PiB7XG4gICAgICAgIGNvbnN0IGFjY2Vzc1Rva2VuID0gbmV3IE5hdGl2ZUF1dGhDbGllbnQoKS5nZXRUb2tlbihcbiAgICAgICAgICBhZGRyZXNzLFxuICAgICAgICAgIHRoaXMuaW5pdFRva2VuISxcbiAgICAgICAgICBzaWduYXR1cmVcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5sb2NhbFN0b3JlLmRpc3BhdGNoKFxuICAgICAgICAgIG5ldyBMb2dpbkFjY291bnQoe1xuICAgICAgICAgICAgYWRkcmVzcyxcbiAgICAgICAgICAgIGFjY2Vzc1Rva2VuLFxuICAgICAgICAgICAgY3VycmVudFByb3ZpZGVyOiBQcm92aWRlcnNUeXBlLlhQb3J0YWwsXG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKHRoaXMubmF2QWZ0ZXJDb25uZWN0Um91dGUpXG4gICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW3RoaXMubmF2QWZ0ZXJDb25uZWN0Um91dGVdKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIHByaXZhdGUgb25DbGllbnRMb2dvdXQgPSAoKSA9PiB7XG4gICAgdGhpcy5sb2dvdXQoKTtcbiAgfTtcblxuICBwcml2YXRlIG9uQ2xpZW50RXZlbnQgPSAoZXZlbnQ6IFNlc3Npb25FdmVudFR5cGVzWydldmVudCddKSA9PiB7fTtcblxuICBvdmVycmlkZSBhc3luYyBsb2dvdXQoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgaWYgKCF0aGlzLndhbGxldENvbm5lY3QpIHJldHVybiBzdXBlci5sb2dvdXQoKTtcblxuICAgIGNvbnN0IGNvbm5lY3RlZCA9IGF3YWl0IHRoaXMud2FsbGV0Q29ubmVjdC5pc0Nvbm5lY3RlZCgpO1xuICAgIGlmIChjb25uZWN0ZWQpIHRoaXMud2FsbGV0Q29ubmVjdC5sb2dvdXQoKTtcblxuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnLyddKTtcbiAgICByZXR1cm4gc3VwZXIubG9nb3V0KCk7XG4gIH1cblxuICBvdmVycmlkZSBhc3luYyBzZW5kVHJhbnNhY3Rpb25zKFxuICAgIHRyYW5zYWN0aW9uczogSVBsYWluVHJhbnNhY3Rpb25PYmplY3RbXSxcbiAgICB0eElkOiBudW1iZXJcbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgdHhBcnJheSA9IHRyYW5zYWN0aW9ucy5tYXAoKHR4KSA9PiB7XG4gICAgICBjb25zdCB0eDEgPSBUcmFuc2FjdGlvbi5mcm9tUGxhaW5PYmplY3QodHgpO1xuICAgICAgcmV0dXJuIHR4MTtcbiAgICB9KTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy53YWxsZXRDb25uZWN0Py5zaWduVHJhbnNhY3Rpb25zKHR4QXJyYXkpO1xuXG4gICAgICBpZiAoIXJlc3VsdCkgcmV0dXJuIHRoaXMuYWRkVG9DYW5jZWxsZWRUcmFuc2FjdGlvbih0eElkKTtcblxuICAgICAgdGhpcy5hZGRTaWduZWRUcmFuc2FjdGlvbnNUb1N0YXRlKFxuICAgICAgICByZXN1bHQubWFwKCh0eCkgPT4gdHgudG9QbGFpbk9iamVjdCgpKSxcbiAgICAgICAgdHhJZFxuICAgICAgKTtcbiAgICB9IGNhdGNoIChlcnJvcikge31cbiAgfVxuXG4gIG92ZXJyaWRlIGFzeW5jIHJlSW5pdGlhbGl6ZSgpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIHRoaXMud2FsbGV0Q29ubmVjdCA9IG5ldyBXYWxsZXRDb25uZWN0VjJQcm92aWRlcihcbiAgICAgIHtcbiAgICAgICAgb25DbGllbnRMb2dpbjogdGhpcy5vbkNsaWVudExvZ2luLFxuICAgICAgICBvbkNsaWVudExvZ291dDogdGhpcy5vbkNsaWVudExvZ291dCxcbiAgICAgICAgb25DbGllbnRFdmVudDogdGhpcy5vbkNsaWVudEV2ZW50LFxuICAgICAgfSxcbiAgICAgIHRoaXMuY29uZmlnLmNoYWluSUQsXG4gICAgICB0aGlzLmNvbmZpZy53YWxsZXRDb25uZWN0VjJSZWxheUFkZHJlc3Nlc1swXSxcbiAgICAgIHRoaXMuY29uZmlnLndhbGxldENvbm5lY3RWMlByb2plY3RJZFxuICAgICk7XG5cbiAgICB0cnkge1xuICAgICAgYXdhaXQgdGhpcy53YWxsZXRDb25uZWN0LmluaXQoKTtcbiAgICAgIGNvbnN0IGNvbm5lY3RlZCA9IGF3YWl0IHRoaXMud2FsbGV0Q29ubmVjdC5pc0Nvbm5lY3RlZCgpO1xuXG4gICAgICBpZiAoIWNvbm5lY3RlZCkgdGhpcy5sb2dvdXQoKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhpcy5sb2dvdXQoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gJyc7XG4gICAgLy8gdGhyb3cgbmV3IEVycm9yKCdNZXRob2Qgbm90IGltcGxlbWVudGVkLicpO1xuICB9XG59XG4iXX0=