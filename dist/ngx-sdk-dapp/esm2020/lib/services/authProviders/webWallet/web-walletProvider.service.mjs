import { Inject, Injectable } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { Transaction } from '@multiversx/sdk-core/out';
import { NativeAuthClient } from '@multiversx/sdk-native-auth-client';
import { WalletProvider } from '@multiversx/sdk-web-wallet-provider/out';
import { filter, take } from 'rxjs';
import { DAPP_CONFIG } from '../../../config';
import { LoginAccount } from '../../../ngxs/account/account.actions';
import { CancelPendingSignature } from '../../../ngxs/account/transactions.actions';
import { GenericProvider, ProvidersType } from '../genericProvider';
import * as i0 from "@angular/core";
import * as i1 from "@ngxs/store";
import * as i2 from "../../account/account.service";
import * as i3 from "../../authentication/authentication.service";
import * as i4 from "@angular/router";
export const DAPP_INIT_ROUTE = '/dapp/init';
export class WebWalletProviderService extends GenericProvider {
    constructor(store, accountService, authenticationService, router, route, config, activatedRoute) {
        super(store, accountService, authenticationService, config);
        this.router = router;
        this.route = route;
        this.config = config;
        this.activatedRoute = activatedRoute;
        this.localStore = store;
        this.localAccount = accountService;
        router.events
            .pipe(filter((event) => event instanceof NavigationEnd))
            .pipe(take(1))
            .subscribe((event) => {
            const pathname = event.url.split('?')[0];
            console.log('pathname', pathname);
            this.route.queryParams.pipe(take(1)).subscribe((params) => {
                console.log('herere', params);
                if (params['walletProviderStatus'] === 'transactionsSigned' &&
                    params['signSession']) {
                    this.transactionsSuccessCallback(parseInt(params['signSession']));
                }
                if (params['signSession'] && params['status'] === 'failed') {
                    this.transactionsFailedCallback(parseInt(params['signSession']), pathname);
                }
                if (params['signSession'] && params['status'] === 'cancelled') {
                    this.transactionsCancelledCallback(parseInt(params['signSession']), pathname);
                }
                if (params['address'] && params['signature'])
                    this.connectCallback(params['address'], params['signature']);
            });
        });
    }
    transactionsFailedCallback(signSession, pathname) {
        console.log('useP1', pathname);
        this.router.navigate([pathname]);
        this.addFailedTransactionsToState(signSession);
    }
    transactionsCancelledCallback(signSession, pathname) {
        console.log('useP2', pathname);
        this.router.navigate([pathname]);
        this.addToCancelledTransaction(signSession);
    }
    transactionsSuccessCallback(signSession) {
        const transactions = this.walletProvider?.getTransactionsFromWalletUrl();
        if (!transactions)
            return;
        transactions.map((tx) => {
            if (tx.data) {
                tx.data = Buffer.from(tx.data ?? '', 'utf8').toString('base64');
            }
        });
        const url = new URL(window.location.href);
        this.router.navigate([url.pathname]);
        this.addSignedTransactionsToState(transactions, signSession);
    }
    async connectCallback(address, signature) {
        const accessToken = new NativeAuthClient().getToken(address, localStorage.getItem('initToken'), signature);
        localStorage.removeItem('initToken');
        this.localStore.dispatch(new LoginAccount({
            address,
            accessToken,
            currentProvider: ProvidersType.WebWallet,
        }));
        this.walletProvider = new WalletProvider(`https://wallet.multiversx.com${DAPP_INIT_ROUTE}`);
        const navAfterConnectRoute = localStorage.getItem('navAfterConnectRoute');
        if (navAfterConnectRoute)
            await this.router.navigate([navAfterConnectRoute]);
        window.location.reload();
    }
    async connect(navAfterConnectRoute) {
        const { client, init } = await super.connect(navAfterConnectRoute);
        localStorage.setItem('initToken', init);
        localStorage.setItem('navAfterConnectRoute', navAfterConnectRoute || '');
        this.walletProvider = new WalletProvider(`${this.config.walletURL}${DAPP_INIT_ROUTE}`);
        this.walletProvider.login({
            callbackUrl: window.location.href,
            token: init,
        });
        return { client, init };
    }
    async logout() {
        if (!this.walletProvider)
            throw new Error('Provider was not reinitialized!');
        super.logout();
        this.walletProvider.logout({ callbackUrl: window.location.href });
        return true;
    }
    reInitialize() {
        if (this.localAccount &&
            this.localAccount.account.currentProvider !== ProvidersType.WebWallet)
            return;
        this.walletProvider = new WalletProvider(`${this.config.walletURL}${DAPP_INIT_ROUTE}`);
    }
    cancelAction() {
        if (!this.walletProvider) {
            return;
        }
        this.localStore.dispatch(new CancelPendingSignature());
    }
    async sendTransactions(transactions, txId) {
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
        }
        catch (error) {
            throw error;
        }
    }
}
WebWalletProviderService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: WebWalletProviderService, deps: [{ token: i1.Store }, { token: i2.AccountService }, { token: i3.AuthenticationService }, { token: i4.Router }, { token: i4.ActivatedRoute }, { token: DAPP_CONFIG }, { token: i4.ActivatedRoute }], target: i0.ɵɵFactoryTarget.Injectable });
WebWalletProviderService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: WebWalletProviderService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: WebWalletProviderService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.Store }, { type: i2.AccountService }, { type: i3.AuthenticationService }, { type: i4.Router }, { type: i4.ActivatedRoute }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DAPP_CONFIG]
                }] }, { type: i4.ActivatedRoute }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViLXdhbGxldFByb3ZpZGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtc2RrLWRhcHAvc3JjL2xpYi9zZXJ2aWNlcy9hdXRoUHJvdmlkZXJzL3dlYldhbGxldC93ZWItd2FsbGV0UHJvdmlkZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQWtCLGFBQWEsRUFBVSxNQUFNLGlCQUFpQixDQUFDO0FBQ3hFLE9BQU8sRUFBMkIsV0FBVyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDaEYsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDdEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBRXpFLE9BQU8sRUFBRSxNQUFNLEVBQWlCLElBQUksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNuRCxPQUFPLEVBQWMsV0FBVyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBR3BGLE9BQU8sRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7Ozs7OztBQUVwRSxNQUFNLENBQUMsTUFBTSxlQUFlLEdBQUcsWUFBWSxDQUFDO0FBSzVDLE1BQU0sT0FBTyx3QkFBeUIsU0FBUSxlQUFlO0lBSzNELFlBQ0UsS0FBWSxFQUNaLGNBQThCLEVBQzlCLHFCQUE0QyxFQUNwQyxNQUFjLEVBQ2QsS0FBcUIsRUFDQyxNQUFrQixFQUN4QyxjQUE4QjtRQUV0QyxLQUFLLENBQUMsS0FBSyxFQUFFLGNBQWMsRUFBRSxxQkFBcUIsRUFBRSxNQUFNLENB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LGNBRnZCLE1BQU07MkZBRVAsd0JBQXdCO2tCQUhwQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7MEJBWUksTUFBTTsyQkFBQyxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgTmF2aWdhdGlvbkVuZCwgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IElQbGFpblRyYW5zYWN0aW9uT2JqZWN0LCBUcmFuc2FjdGlvbiB9IGZyb20gJ0BtdWx0aXZlcnN4L3Nkay1jb3JlL291dCc7XG5pbXBvcnQgeyBOYXRpdmVBdXRoQ2xpZW50IH0gZnJvbSAnQG11bHRpdmVyc3gvc2RrLW5hdGl2ZS1hdXRoLWNsaWVudCc7XG5pbXBvcnQgeyBXYWxsZXRQcm92aWRlciB9IGZyb20gJ0BtdWx0aXZlcnN4L3Nkay13ZWItd2FsbGV0LXByb3ZpZGVyL291dCc7XG5pbXBvcnQgeyBTdG9yZSB9IGZyb20gJ0BuZ3hzL3N0b3JlJztcbmltcG9ydCB7IGZpbHRlciwgbGFzdFZhbHVlRnJvbSwgdGFrZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgRGFwcENvbmZpZywgREFQUF9DT05GSUcgfSBmcm9tICcuLi8uLi8uLi9jb25maWcnO1xuaW1wb3J0IHsgTG9naW5BY2NvdW50IH0gZnJvbSAnLi4vLi4vLi4vbmd4cy9hY2NvdW50L2FjY291bnQuYWN0aW9ucyc7XG5pbXBvcnQgeyBDYW5jZWxQZW5kaW5nU2lnbmF0dXJlIH0gZnJvbSAnLi4vLi4vLi4vbmd4cy9hY2NvdW50L3RyYW5zYWN0aW9ucy5hY3Rpb25zJztcbmltcG9ydCB7IEFjY291bnRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vYWNjb3VudC9hY2NvdW50LnNlcnZpY2UnO1xuaW1wb3J0IHsgQXV0aGVudGljYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vYXV0aGVudGljYXRpb24vYXV0aGVudGljYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBHZW5lcmljUHJvdmlkZXIsIFByb3ZpZGVyc1R5cGUgfSBmcm9tICcuLi9nZW5lcmljUHJvdmlkZXInO1xuXG5leHBvcnQgY29uc3QgREFQUF9JTklUX1JPVVRFID0gJy9kYXBwL2luaXQnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgV2ViV2FsbGV0UHJvdmlkZXJTZXJ2aWNlIGV4dGVuZHMgR2VuZXJpY1Byb3ZpZGVyIHtcbiAgcHJpdmF0ZSBsb2NhbFN0b3JlOiBTdG9yZTtcbiAgcHJpdmF0ZSBsb2NhbEFjY291bnQ6IEFjY291bnRTZXJ2aWNlO1xuICBwcml2YXRlIHdhbGxldFByb3ZpZGVyOiBXYWxsZXRQcm92aWRlciB8IHVuZGVmaW5lZDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBzdG9yZTogU3RvcmUsXG4gICAgYWNjb3VudFNlcnZpY2U6IEFjY291bnRTZXJ2aWNlLFxuICAgIGF1dGhlbnRpY2F0aW9uU2VydmljZTogQXV0aGVudGljYXRpb25TZXJ2aWNlLFxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXG4gICAgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgQEluamVjdChEQVBQX0NPTkZJRykgb3ZlcnJpZGUgY29uZmlnOiBEYXBwQ29uZmlnLFxuICAgIHByaXZhdGUgYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlXG4gICkge1xuICAgIHN1cGVyKHN0b3JlLCBhY2NvdW50U2VydmljZSwgYXV0aGVudGljYXRpb25TZXJ2aWNlLCBjb25maWcpO1xuICAgIHRoaXMubG9jYWxTdG9yZSA9IHN0b3JlO1xuICAgIHRoaXMubG9jYWxBY2NvdW50ID0gYWNjb3VudFNlcnZpY2U7XG5cbiAgICByb3V0ZXIuZXZlbnRzXG4gICAgICAucGlwZShmaWx0ZXIoKGV2ZW50KSA9PiBldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQpKVxuICAgICAgLnBpcGUodGFrZSgxKSlcbiAgICAgIC5zdWJzY3JpYmUoKGV2ZW50OiBhbnkpID0+IHtcbiAgICAgICAgY29uc3QgcGF0aG5hbWUgPSBldmVudC51cmwuc3BsaXQoJz8nKVswXTtcblxuICAgICAgICBjb25zb2xlLmxvZygncGF0aG5hbWUnLCBwYXRobmFtZSk7XG4gICAgICAgIHRoaXMucm91dGUucXVlcnlQYXJhbXMucGlwZSh0YWtlKDEpKS5zdWJzY3JpYmUoKHBhcmFtcykgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdoZXJlcmUnLCBwYXJhbXMpO1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIHBhcmFtc1snd2FsbGV0UHJvdmlkZXJTdGF0dXMnXSA9PT0gJ3RyYW5zYWN0aW9uc1NpZ25lZCcgJiZcbiAgICAgICAgICAgIHBhcmFtc1snc2lnblNlc3Npb24nXVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgdGhpcy50cmFuc2FjdGlvbnNTdWNjZXNzQ2FsbGJhY2socGFyc2VJbnQocGFyYW1zWydzaWduU2Vzc2lvbiddKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChwYXJhbXNbJ3NpZ25TZXNzaW9uJ10gJiYgcGFyYW1zWydzdGF0dXMnXSA9PT0gJ2ZhaWxlZCcpIHtcbiAgICAgICAgICAgIHRoaXMudHJhbnNhY3Rpb25zRmFpbGVkQ2FsbGJhY2soXG4gICAgICAgICAgICAgIHBhcnNlSW50KHBhcmFtc1snc2lnblNlc3Npb24nXSksXG4gICAgICAgICAgICAgIHBhdGhuYW1lXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAocGFyYW1zWydzaWduU2Vzc2lvbiddICYmIHBhcmFtc1snc3RhdHVzJ10gPT09ICdjYW5jZWxsZWQnKSB7XG4gICAgICAgICAgICB0aGlzLnRyYW5zYWN0aW9uc0NhbmNlbGxlZENhbGxiYWNrKFxuICAgICAgICAgICAgICBwYXJzZUludChwYXJhbXNbJ3NpZ25TZXNzaW9uJ10pLFxuICAgICAgICAgICAgICBwYXRobmFtZVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHBhcmFtc1snYWRkcmVzcyddICYmIHBhcmFtc1snc2lnbmF0dXJlJ10pXG4gICAgICAgICAgICB0aGlzLmNvbm5lY3RDYWxsYmFjayhwYXJhbXNbJ2FkZHJlc3MnXSwgcGFyYW1zWydzaWduYXR1cmUnXSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHRyYW5zYWN0aW9uc0ZhaWxlZENhbGxiYWNrKHNpZ25TZXNzaW9uOiBudW1iZXIsIHBhdGhuYW1lOiBzdHJpbmcpIHtcbiAgICBjb25zb2xlLmxvZygndXNlUDEnLCBwYXRobmFtZSk7XG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW3BhdGhuYW1lXSk7XG4gICAgdGhpcy5hZGRGYWlsZWRUcmFuc2FjdGlvbnNUb1N0YXRlKHNpZ25TZXNzaW9uKTtcbiAgfVxuXG4gIHByaXZhdGUgdHJhbnNhY3Rpb25zQ2FuY2VsbGVkQ2FsbGJhY2soc2lnblNlc3Npb246IG51bWJlciwgcGF0aG5hbWU6IHN0cmluZykge1xuICAgIGNvbnNvbGUubG9nKCd1c2VQMicsIHBhdGhuYW1lKTtcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbcGF0aG5hbWVdKTtcbiAgICB0aGlzLmFkZFRvQ2FuY2VsbGVkVHJhbnNhY3Rpb24oc2lnblNlc3Npb24pO1xuICB9XG5cbiAgcHJpdmF0ZSB0cmFuc2FjdGlvbnNTdWNjZXNzQ2FsbGJhY2soc2lnblNlc3Npb246IG51bWJlcikge1xuICAgIGNvbnN0IHRyYW5zYWN0aW9ucyA9IHRoaXMud2FsbGV0UHJvdmlkZXI/LmdldFRyYW5zYWN0aW9uc0Zyb21XYWxsZXRVcmwoKTtcbiAgICBpZiAoIXRyYW5zYWN0aW9ucykgcmV0dXJuO1xuXG4gICAgdHJhbnNhY3Rpb25zLm1hcCgodHgpID0+IHtcbiAgICAgIGlmICh0eC5kYXRhKSB7XG4gICAgICAgIHR4LmRhdGEgPSBCdWZmZXIuZnJvbSh0eC5kYXRhID8/ICcnLCAndXRmOCcpLnRvU3RyaW5nKCdiYXNlNjQnKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IHVybCA9IG5ldyBVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpO1xuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFt1cmwucGF0aG5hbWVdKTtcbiAgICB0aGlzLmFkZFNpZ25lZFRyYW5zYWN0aW9uc1RvU3RhdGUodHJhbnNhY3Rpb25zLCBzaWduU2Vzc2lvbik7XG4gIH1cbiAgcHJpdmF0ZSBhc3luYyBjb25uZWN0Q2FsbGJhY2soYWRkcmVzczogc3RyaW5nLCBzaWduYXR1cmU6IHN0cmluZykge1xuICAgIGNvbnN0IGFjY2Vzc1Rva2VuID0gbmV3IE5hdGl2ZUF1dGhDbGllbnQoKS5nZXRUb2tlbihcbiAgICAgIGFkZHJlc3MsXG4gICAgICBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnaW5pdFRva2VuJykhLFxuICAgICAgc2lnbmF0dXJlXG4gICAgKTtcblxuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdpbml0VG9rZW4nKTtcblxuICAgIHRoaXMubG9jYWxTdG9yZS5kaXNwYXRjaChcbiAgICAgIG5ldyBMb2dpbkFjY291bnQoe1xuICAgICAgICBhZGRyZXNzLFxuICAgICAgICBhY2Nlc3NUb2tlbixcbiAgICAgICAgY3VycmVudFByb3ZpZGVyOiBQcm92aWRlcnNUeXBlLldlYldhbGxldCxcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIHRoaXMud2FsbGV0UHJvdmlkZXIgPSBuZXcgV2FsbGV0UHJvdmlkZXIoXG4gICAgICBgaHR0cHM6Ly93YWxsZXQubXVsdGl2ZXJzeC5jb20ke0RBUFBfSU5JVF9ST1VURX1gXG4gICAgKTtcblxuICAgIGNvbnN0IG5hdkFmdGVyQ29ubmVjdFJvdXRlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ25hdkFmdGVyQ29ubmVjdFJvdXRlJyk7XG4gICAgaWYgKG5hdkFmdGVyQ29ubmVjdFJvdXRlKVxuICAgICAgYXdhaXQgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW25hdkFmdGVyQ29ubmVjdFJvdXRlXSk7XG5cbiAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gIH1cblxuICBvdmVycmlkZSBhc3luYyBjb25uZWN0KG5hdkFmdGVyQ29ubmVjdFJvdXRlOiBzdHJpbmcpOiBQcm9taXNlPHtcbiAgICBjbGllbnQ6IE5hdGl2ZUF1dGhDbGllbnQ7XG4gICAgaW5pdDogc3RyaW5nO1xuICB9PiB7XG4gICAgY29uc3QgeyBjbGllbnQsIGluaXQgfSA9IGF3YWl0IHN1cGVyLmNvbm5lY3QobmF2QWZ0ZXJDb25uZWN0Um91dGUpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdpbml0VG9rZW4nLCBpbml0KTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbmF2QWZ0ZXJDb25uZWN0Um91dGUnLCBuYXZBZnRlckNvbm5lY3RSb3V0ZSB8fCAnJyk7XG5cbiAgICB0aGlzLndhbGxldFByb3ZpZGVyID0gbmV3IFdhbGxldFByb3ZpZGVyKFxuICAgICAgYCR7dGhpcy5jb25maWcud2FsbGV0VVJMfSR7REFQUF9JTklUX1JPVVRFfWBcbiAgICApO1xuICAgIHRoaXMud2FsbGV0UHJvdmlkZXIubG9naW4oe1xuICAgICAgY2FsbGJhY2tVcmw6IHdpbmRvdy5sb2NhdGlvbi5ocmVmLFxuICAgICAgdG9rZW46IGluaXQsXG4gICAgfSk7XG5cbiAgICByZXR1cm4geyBjbGllbnQsIGluaXQgfTtcbiAgfVxuXG4gIG92ZXJyaWRlIGFzeW5jIGxvZ291dCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBpZiAoIXRoaXMud2FsbGV0UHJvdmlkZXIpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Byb3ZpZGVyIHdhcyBub3QgcmVpbml0aWFsaXplZCEnKTtcbiAgICBzdXBlci5sb2dvdXQoKTtcbiAgICB0aGlzLndhbGxldFByb3ZpZGVyLmxvZ291dCh7IGNhbGxiYWNrVXJsOiB3aW5kb3cubG9jYXRpb24uaHJlZiB9KTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIG92ZXJyaWRlIHJlSW5pdGlhbGl6ZSgpOiB2b2lkIHtcbiAgICBpZiAoXG4gICAgICB0aGlzLmxvY2FsQWNjb3VudCAmJlxuICAgICAgdGhpcy5sb2NhbEFjY291bnQuYWNjb3VudC5jdXJyZW50UHJvdmlkZXIgIT09IFByb3ZpZGVyc1R5cGUuV2ViV2FsbGV0XG4gICAgKVxuICAgICAgcmV0dXJuO1xuXG4gICAgdGhpcy53YWxsZXRQcm92aWRlciA9IG5ldyBXYWxsZXRQcm92aWRlcihcbiAgICAgIGAke3RoaXMuY29uZmlnLndhbGxldFVSTH0ke0RBUFBfSU5JVF9ST1VURX1gXG4gICAgKTtcbiAgfVxuXG4gIG92ZXJyaWRlIGNhbmNlbEFjdGlvbigpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMud2FsbGV0UHJvdmlkZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmxvY2FsU3RvcmUuZGlzcGF0Y2gobmV3IENhbmNlbFBlbmRpbmdTaWduYXR1cmUoKSk7XG4gIH1cblxuICBvdmVycmlkZSBhc3luYyBzZW5kVHJhbnNhY3Rpb25zKFxuICAgIHRyYW5zYWN0aW9uczogSVBsYWluVHJhbnNhY3Rpb25PYmplY3RbXSxcbiAgICB0eElkOiBudW1iZXJcbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgdHhBcnJheSA9IHRyYW5zYWN0aW9ucy5tYXAoKHR4KSA9PiB7XG4gICAgICBjb25zdCB0eDEgPSBUcmFuc2FjdGlvbi5mcm9tUGxhaW5PYmplY3QodHgpO1xuICAgICAgcmV0dXJuIHR4MTtcbiAgICB9KTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCB1cmwgPSBuZXcgVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcbiAgICAgIHVybC5zZWFyY2hQYXJhbXMuYXBwZW5kKCdzaWduU2Vzc2lvbicsIHR4SWQudG9TdHJpbmcoKSk7XG5cbiAgICAgIHRoaXMud2FsbGV0UHJvdmlkZXI/LnNpZ25UcmFuc2FjdGlvbnModHhBcnJheSwge1xuICAgICAgICBjYWxsYmFja1VybDogZW5jb2RlVVJJQ29tcG9uZW50KHVybC5ocmVmKSxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG4gIH1cbn1cbiJdfQ==