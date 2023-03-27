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
                    this.transactionsSuccessCallback(parseInt(params['signSession']), pathname);
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
    transactionsSuccessCallback(signSession, pathname) {
        const transactions = this.walletProvider?.getTransactionsFromWalletUrl();
        if (!transactions)
            return;
        transactions.map((tx) => {
            if (tx.data) {
                tx.data = Buffer.from(tx.data ?? '', 'utf8').toString('base64');
            }
        });
        this.router.navigate([pathname]);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViLXdhbGxldFByb3ZpZGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtc2RrLWRhcHAvc3JjL2xpYi9zZXJ2aWNlcy9hdXRoUHJvdmlkZXJzL3dlYldhbGxldC93ZWItd2FsbGV0UHJvdmlkZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQWtCLGFBQWEsRUFBVSxNQUFNLGlCQUFpQixDQUFDO0FBQ3hFLE9BQU8sRUFBMkIsV0FBVyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDaEYsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDdEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBRXpFLE9BQU8sRUFBRSxNQUFNLEVBQWlCLElBQUksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNuRCxPQUFPLEVBQWMsV0FBVyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBR3BGLE9BQU8sRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7Ozs7OztBQUVwRSxNQUFNLENBQUMsTUFBTSxlQUFlLEdBQUcsWUFBWSxDQUFDO0FBSzVDLE1BQU0sT0FBTyx3QkFBeUIsU0FBUSxlQUFlO0lBSzNELFlBQ0UsS0FBWSxFQUNaLGNBQThCLEVBQzlCLHFCQUE0QyxFQUNwQyxNQUFjLEVBQ2QsS0FBcUIsRUFDQyxNQUFrQixFQUN4QyxjQUE4QjtRQUV0QyxLQUFLLENBQUMsS0FBSyxFQUFFLGNBQWMsRUFBRSxxQkFBcUIsRUFBRSxNQUFNLENB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TUFBTTtpQkFDbkI7OzBCQVlJLE1BQU07MkJBQUMsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIE5hdmlnYXRpb25FbmQsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBJUGxhaW5UcmFuc2FjdGlvbk9iamVjdCwgVHJhbnNhY3Rpb24gfSBmcm9tICdAbXVsdGl2ZXJzeC9zZGstY29yZS9vdXQnO1xuaW1wb3J0IHsgTmF0aXZlQXV0aENsaWVudCB9IGZyb20gJ0BtdWx0aXZlcnN4L3Nkay1uYXRpdmUtYXV0aC1jbGllbnQnO1xuaW1wb3J0IHsgV2FsbGV0UHJvdmlkZXIgfSBmcm9tICdAbXVsdGl2ZXJzeC9zZGstd2ViLXdhbGxldC1wcm92aWRlci9vdXQnO1xuaW1wb3J0IHsgU3RvcmUgfSBmcm9tICdAbmd4cy9zdG9yZSc7XG5pbXBvcnQgeyBmaWx0ZXIsIGxhc3RWYWx1ZUZyb20sIHRha2UgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IERhcHBDb25maWcsIERBUFBfQ09ORklHIH0gZnJvbSAnLi4vLi4vLi4vY29uZmlnJztcbmltcG9ydCB7IExvZ2luQWNjb3VudCB9IGZyb20gJy4uLy4uLy4uL25neHMvYWNjb3VudC9hY2NvdW50LmFjdGlvbnMnO1xuaW1wb3J0IHsgQ2FuY2VsUGVuZGluZ1NpZ25hdHVyZSB9IGZyb20gJy4uLy4uLy4uL25neHMvYWNjb3VudC90cmFuc2FjdGlvbnMuYWN0aW9ucyc7XG5pbXBvcnQgeyBBY2NvdW50U2VydmljZSB9IGZyb20gJy4uLy4uL2FjY291bnQvYWNjb3VudC5zZXJ2aWNlJztcbmltcG9ydCB7IEF1dGhlbnRpY2F0aW9uU2VydmljZSB9IGZyb20gJy4uLy4uL2F1dGhlbnRpY2F0aW9uL2F1dGhlbnRpY2F0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgR2VuZXJpY1Byb3ZpZGVyLCBQcm92aWRlcnNUeXBlIH0gZnJvbSAnLi4vZ2VuZXJpY1Byb3ZpZGVyJztcblxuZXhwb3J0IGNvbnN0IERBUFBfSU5JVF9ST1VURSA9ICcvZGFwcC9pbml0JztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFdlYldhbGxldFByb3ZpZGVyU2VydmljZSBleHRlbmRzIEdlbmVyaWNQcm92aWRlciB7XG4gIHByaXZhdGUgbG9jYWxTdG9yZTogU3RvcmU7XG4gIHByaXZhdGUgbG9jYWxBY2NvdW50OiBBY2NvdW50U2VydmljZTtcbiAgcHJpdmF0ZSB3YWxsZXRQcm92aWRlcjogV2FsbGV0UHJvdmlkZXIgfCB1bmRlZmluZWQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgc3RvcmU6IFN0b3JlLFxuICAgIGFjY291bnRTZXJ2aWNlOiBBY2NvdW50U2VydmljZSxcbiAgICBhdXRoZW50aWNhdGlvblNlcnZpY2U6IEF1dGhlbnRpY2F0aW9uU2VydmljZSxcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxuICAgIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgIEBJbmplY3QoREFQUF9DT05GSUcpIG92ZXJyaWRlIGNvbmZpZzogRGFwcENvbmZpZyxcbiAgICBwcml2YXRlIGFjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZVxuICApIHtcbiAgICBzdXBlcihzdG9yZSwgYWNjb3VudFNlcnZpY2UsIGF1dGhlbnRpY2F0aW9uU2VydmljZSwgY29uZmlnKTtcbiAgICB0aGlzLmxvY2FsU3RvcmUgPSBzdG9yZTtcbiAgICB0aGlzLmxvY2FsQWNjb3VudCA9IGFjY291bnRTZXJ2aWNlO1xuXG4gICAgcm91dGVyLmV2ZW50c1xuICAgICAgLnBpcGUoZmlsdGVyKChldmVudCkgPT4gZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kKSlcbiAgICAgIC5waXBlKHRha2UoMSkpXG4gICAgICAuc3Vic2NyaWJlKChldmVudDogYW55KSA9PiB7XG4gICAgICAgIGNvbnN0IHBhdGhuYW1lID0gZXZlbnQudXJsLnNwbGl0KCc/JylbMF07XG5cbiAgICAgICAgY29uc29sZS5sb2coJ3BhdGhuYW1lJywgcGF0aG5hbWUpO1xuICAgICAgICB0aGlzLnJvdXRlLnF1ZXJ5UGFyYW1zLnBpcGUodGFrZSgxKSkuc3Vic2NyaWJlKChwYXJhbXMpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnaGVyZXJlJywgcGFyYW1zKTtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBwYXJhbXNbJ3dhbGxldFByb3ZpZGVyU3RhdHVzJ10gPT09ICd0cmFuc2FjdGlvbnNTaWduZWQnICYmXG4gICAgICAgICAgICBwYXJhbXNbJ3NpZ25TZXNzaW9uJ11cbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMudHJhbnNhY3Rpb25zU3VjY2Vzc0NhbGxiYWNrKFxuICAgICAgICAgICAgICBwYXJzZUludChwYXJhbXNbJ3NpZ25TZXNzaW9uJ10pLFxuICAgICAgICAgICAgICBwYXRobmFtZVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHBhcmFtc1snc2lnblNlc3Npb24nXSAmJiBwYXJhbXNbJ3N0YXR1cyddID09PSAnZmFpbGVkJykge1xuICAgICAgICAgICAgdGhpcy50cmFuc2FjdGlvbnNGYWlsZWRDYWxsYmFjayhcbiAgICAgICAgICAgICAgcGFyc2VJbnQocGFyYW1zWydzaWduU2Vzc2lvbiddKSxcbiAgICAgICAgICAgICAgcGF0aG5hbWVcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChwYXJhbXNbJ3NpZ25TZXNzaW9uJ10gJiYgcGFyYW1zWydzdGF0dXMnXSA9PT0gJ2NhbmNlbGxlZCcpIHtcbiAgICAgICAgICAgIHRoaXMudHJhbnNhY3Rpb25zQ2FuY2VsbGVkQ2FsbGJhY2soXG4gICAgICAgICAgICAgIHBhcnNlSW50KHBhcmFtc1snc2lnblNlc3Npb24nXSksXG4gICAgICAgICAgICAgIHBhdGhuYW1lXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAocGFyYW1zWydhZGRyZXNzJ10gJiYgcGFyYW1zWydzaWduYXR1cmUnXSlcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdENhbGxiYWNrKHBhcmFtc1snYWRkcmVzcyddLCBwYXJhbXNbJ3NpZ25hdHVyZSddKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgdHJhbnNhY3Rpb25zRmFpbGVkQ2FsbGJhY2soc2lnblNlc3Npb246IG51bWJlciwgcGF0aG5hbWU6IHN0cmluZykge1xuICAgIGNvbnNvbGUubG9nKCd1c2VQMScsIHBhdGhuYW1lKTtcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbcGF0aG5hbWVdKTtcbiAgICB0aGlzLmFkZEZhaWxlZFRyYW5zYWN0aW9uc1RvU3RhdGUoc2lnblNlc3Npb24pO1xuICB9XG5cbiAgcHJpdmF0ZSB0cmFuc2FjdGlvbnNDYW5jZWxsZWRDYWxsYmFjayhzaWduU2Vzc2lvbjogbnVtYmVyLCBwYXRobmFtZTogc3RyaW5nKSB7XG4gICAgY29uc29sZS5sb2coJ3VzZVAyJywgcGF0aG5hbWUpO1xuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtwYXRobmFtZV0pO1xuICAgIHRoaXMuYWRkVG9DYW5jZWxsZWRUcmFuc2FjdGlvbihzaWduU2Vzc2lvbik7XG4gIH1cblxuICBwcml2YXRlIHRyYW5zYWN0aW9uc1N1Y2Nlc3NDYWxsYmFjayhzaWduU2Vzc2lvbjogbnVtYmVyLCBwYXRobmFtZTogc3RyaW5nKSB7XG4gICAgY29uc3QgdHJhbnNhY3Rpb25zID0gdGhpcy53YWxsZXRQcm92aWRlcj8uZ2V0VHJhbnNhY3Rpb25zRnJvbVdhbGxldFVybCgpO1xuICAgIGlmICghdHJhbnNhY3Rpb25zKSByZXR1cm47XG5cbiAgICB0cmFuc2FjdGlvbnMubWFwKCh0eCkgPT4ge1xuICAgICAgaWYgKHR4LmRhdGEpIHtcbiAgICAgICAgdHguZGF0YSA9IEJ1ZmZlci5mcm9tKHR4LmRhdGEgPz8gJycsICd1dGY4JykudG9TdHJpbmcoJ2Jhc2U2NCcpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW3BhdGhuYW1lXSk7XG4gICAgdGhpcy5hZGRTaWduZWRUcmFuc2FjdGlvbnNUb1N0YXRlKHRyYW5zYWN0aW9ucywgc2lnblNlc3Npb24pO1xuICB9XG4gIHByaXZhdGUgYXN5bmMgY29ubmVjdENhbGxiYWNrKGFkZHJlc3M6IHN0cmluZywgc2lnbmF0dXJlOiBzdHJpbmcpIHtcbiAgICBjb25zdCBhY2Nlc3NUb2tlbiA9IG5ldyBOYXRpdmVBdXRoQ2xpZW50KCkuZ2V0VG9rZW4oXG4gICAgICBhZGRyZXNzLFxuICAgICAgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2luaXRUb2tlbicpISxcbiAgICAgIHNpZ25hdHVyZVxuICAgICk7XG5cbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnaW5pdFRva2VuJyk7XG5cbiAgICB0aGlzLmxvY2FsU3RvcmUuZGlzcGF0Y2goXG4gICAgICBuZXcgTG9naW5BY2NvdW50KHtcbiAgICAgICAgYWRkcmVzcyxcbiAgICAgICAgYWNjZXNzVG9rZW4sXG4gICAgICAgIGN1cnJlbnRQcm92aWRlcjogUHJvdmlkZXJzVHlwZS5XZWJXYWxsZXQsXG4gICAgICB9KVxuICAgICk7XG5cbiAgICB0aGlzLndhbGxldFByb3ZpZGVyID0gbmV3IFdhbGxldFByb3ZpZGVyKFxuICAgICAgYGh0dHBzOi8vd2FsbGV0Lm11bHRpdmVyc3guY29tJHtEQVBQX0lOSVRfUk9VVEV9YFxuICAgICk7XG5cbiAgICBjb25zdCBuYXZBZnRlckNvbm5lY3RSb3V0ZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCduYXZBZnRlckNvbm5lY3RSb3V0ZScpO1xuICAgIGlmIChuYXZBZnRlckNvbm5lY3RSb3V0ZSlcbiAgICAgIGF3YWl0IHRoaXMucm91dGVyLm5hdmlnYXRlKFtuYXZBZnRlckNvbm5lY3RSb3V0ZV0pO1xuXG4gICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICB9XG5cbiAgb3ZlcnJpZGUgYXN5bmMgY29ubmVjdChuYXZBZnRlckNvbm5lY3RSb3V0ZTogc3RyaW5nKTogUHJvbWlzZTx7XG4gICAgY2xpZW50OiBOYXRpdmVBdXRoQ2xpZW50O1xuICAgIGluaXQ6IHN0cmluZztcbiAgfT4ge1xuICAgIGNvbnN0IHsgY2xpZW50LCBpbml0IH0gPSBhd2FpdCBzdXBlci5jb25uZWN0KG5hdkFmdGVyQ29ubmVjdFJvdXRlKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnaW5pdFRva2VuJywgaW5pdCk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ25hdkFmdGVyQ29ubmVjdFJvdXRlJywgbmF2QWZ0ZXJDb25uZWN0Um91dGUgfHwgJycpO1xuXG4gICAgdGhpcy53YWxsZXRQcm92aWRlciA9IG5ldyBXYWxsZXRQcm92aWRlcihcbiAgICAgIGAke3RoaXMuY29uZmlnLndhbGxldFVSTH0ke0RBUFBfSU5JVF9ST1VURX1gXG4gICAgKTtcbiAgICB0aGlzLndhbGxldFByb3ZpZGVyLmxvZ2luKHtcbiAgICAgIGNhbGxiYWNrVXJsOiB3aW5kb3cubG9jYXRpb24uaHJlZixcbiAgICAgIHRva2VuOiBpbml0LFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHsgY2xpZW50LCBpbml0IH07XG4gIH1cblxuICBvdmVycmlkZSBhc3luYyBsb2dvdXQoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgaWYgKCF0aGlzLndhbGxldFByb3ZpZGVyKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdQcm92aWRlciB3YXMgbm90IHJlaW5pdGlhbGl6ZWQhJyk7XG4gICAgc3VwZXIubG9nb3V0KCk7XG4gICAgdGhpcy53YWxsZXRQcm92aWRlci5sb2dvdXQoeyBjYWxsYmFja1VybDogd2luZG93LmxvY2F0aW9uLmhyZWYgfSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBvdmVycmlkZSByZUluaXRpYWxpemUoKTogdm9pZCB7XG4gICAgaWYgKFxuICAgICAgdGhpcy5sb2NhbEFjY291bnQgJiZcbiAgICAgIHRoaXMubG9jYWxBY2NvdW50LmFjY291bnQuY3VycmVudFByb3ZpZGVyICE9PSBQcm92aWRlcnNUeXBlLldlYldhbGxldFxuICAgIClcbiAgICAgIHJldHVybjtcblxuICAgIHRoaXMud2FsbGV0UHJvdmlkZXIgPSBuZXcgV2FsbGV0UHJvdmlkZXIoXG4gICAgICBgJHt0aGlzLmNvbmZpZy53YWxsZXRVUkx9JHtEQVBQX0lOSVRfUk9VVEV9YFxuICAgICk7XG4gIH1cblxuICBvdmVycmlkZSBjYW5jZWxBY3Rpb24oKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLndhbGxldFByb3ZpZGVyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5sb2NhbFN0b3JlLmRpc3BhdGNoKG5ldyBDYW5jZWxQZW5kaW5nU2lnbmF0dXJlKCkpO1xuICB9XG5cbiAgb3ZlcnJpZGUgYXN5bmMgc2VuZFRyYW5zYWN0aW9ucyhcbiAgICB0cmFuc2FjdGlvbnM6IElQbGFpblRyYW5zYWN0aW9uT2JqZWN0W10sXG4gICAgdHhJZDogbnVtYmVyXG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHR4QXJyYXkgPSB0cmFuc2FjdGlvbnMubWFwKCh0eCkgPT4ge1xuICAgICAgY29uc3QgdHgxID0gVHJhbnNhY3Rpb24uZnJvbVBsYWluT2JqZWN0KHR4KTtcbiAgICAgIHJldHVybiB0eDE7XG4gICAgfSk7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgdXJsID0gbmV3IFVSTCh3aW5kb3cubG9jYXRpb24uaHJlZik7XG4gICAgICB1cmwuc2VhcmNoUGFyYW1zLmFwcGVuZCgnc2lnblNlc3Npb24nLCB0eElkLnRvU3RyaW5nKCkpO1xuXG4gICAgICB0aGlzLndhbGxldFByb3ZpZGVyPy5zaWduVHJhbnNhY3Rpb25zKHR4QXJyYXksIHtcbiAgICAgICAgY2FsbGJhY2tVcmw6IGVuY29kZVVSSUNvbXBvbmVudCh1cmwuaHJlZiksXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICB9XG59XG4iXX0=