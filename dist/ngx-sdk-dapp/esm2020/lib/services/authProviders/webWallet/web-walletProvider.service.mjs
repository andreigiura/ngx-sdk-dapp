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
        this.router.navigate([pathname]);
        this.addFailedTransactionsToState(signSession);
    }
    transactionsCancelledCallback(signSession, pathname) {
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
        console.log('hererererererere');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViLXdhbGxldFByb3ZpZGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtc2RrLWRhcHAvc3JjL2xpYi9zZXJ2aWNlcy9hdXRoUHJvdmlkZXJzL3dlYldhbGxldC93ZWItd2FsbGV0UHJvdmlkZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQWtCLGFBQWEsRUFBVSxNQUFNLGlCQUFpQixDQUFDO0FBQ3hFLE9BQU8sRUFBMkIsV0FBVyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDaEYsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDdEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBRXpFLE9BQU8sRUFBRSxNQUFNLEVBQWlCLElBQUksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNuRCxPQUFPLEVBQWMsV0FBVyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBR3BGLE9BQU8sRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7Ozs7OztBQUVwRSxNQUFNLENBQUMsTUFBTSxlQUFlLEdBQUcsWUFBWSxDQUFDO0FBSzVDLE1BQU0sT0FBTyx3QkFBeUIsU0FBUSxlQUFlO0lBSzNELFlBQ0UsS0FBWSxFQUNaLGNBQThCLEVBQzlCLHFCQUE0QyxFQUNwQyxNQUFjLEVBQ2QsS0FBcUIsRUFDQyxNQUFrQixFQUN4QyxjQUE4QjtRQUV0QyxLQUFLLENBQUMsS0FBSyxFQUFFLGNBQWMsRUFBRSxxQkFBcUIsRUFBRSxNQUFNLENB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IjpbImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIE5hdmlnYXRpb25FbmQsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBJUGxhaW5UcmFuc2FjdGlvbk9iamVjdCwgVHJhbnNhY3Rpb24gfSBmcm9tICdAbXVsdGl2ZXJzeC9zZGstY29yZS9vdXQnO1xuaW1wb3J0IHsgTmF0aXZlQXV0aENsaWVudCB9IGZyb20gJ0BtdWx0aXZlcnN4L3Nkay1uYXRpdmUtYXV0aC1jbGllbnQnO1xuaW1wb3J0IHsgV2FsbGV0UHJvdmlkZXIgfSBmcm9tICdAbXVsdGl2ZXJzeC9zZGstd2ViLXdhbGxldC1wcm92aWRlci9vdXQnO1xuaW1wb3J0IHsgU3RvcmUgfSBmcm9tICdAbmd4cy9zdG9yZSc7XG5pbXBvcnQgeyBmaWx0ZXIsIGxhc3RWYWx1ZUZyb20sIHRha2UgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IERhcHBDb25maWcsIERBUFBfQ09ORklHIH0gZnJvbSAnLi4vLi4vLi4vY29uZmlnJztcbmltcG9ydCB7IExvZ2luQWNjb3VudCB9IGZyb20gJy4uLy4uLy4uL25neHMvYWNjb3VudC9hY2NvdW50LmFjdGlvbnMnO1xuaW1wb3J0IHsgQ2FuY2VsUGVuZGluZ1NpZ25hdHVyZSB9IGZyb20gJy4uLy4uLy4uL25neHMvYWNjb3VudC90cmFuc2FjdGlvbnMuYWN0aW9ucyc7XG5pbXBvcnQgeyBBY2NvdW50U2VydmljZSB9IGZyb20gJy4uLy4uL2FjY291bnQvYWNjb3VudC5zZXJ2aWNlJztcbmltcG9ydCB7IEF1dGhlbnRpY2F0aW9uU2VydmljZSB9IGZyb20gJy4uLy4uL2F1dGhlbnRpY2F0aW9uL2F1dGhlbnRpY2F0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgR2VuZXJpY1Byb3ZpZGVyLCBQcm92aWRlcnNUeXBlIH0gZnJvbSAnLi4vZ2VuZXJpY1Byb3ZpZGVyJztcblxuZXhwb3J0IGNvbnN0IERBUFBfSU5JVF9ST1VURSA9ICcvZGFwcC9pbml0JztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFdlYldhbGxldFByb3ZpZGVyU2VydmljZSBleHRlbmRzIEdlbmVyaWNQcm92aWRlciB7XG4gIHByaXZhdGUgbG9jYWxTdG9yZTogU3RvcmU7XG4gIHByaXZhdGUgbG9jYWxBY2NvdW50OiBBY2NvdW50U2VydmljZTtcbiAgcHJpdmF0ZSB3YWxsZXRQcm92aWRlcjogV2FsbGV0UHJvdmlkZXIgfCB1bmRlZmluZWQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgc3RvcmU6IFN0b3JlLFxuICAgIGFjY291bnRTZXJ2aWNlOiBBY2NvdW50U2VydmljZSxcbiAgICBhdXRoZW50aWNhdGlvblNlcnZpY2U6IEF1dGhlbnRpY2F0aW9uU2VydmljZSxcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxuICAgIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgIEBJbmplY3QoREFQUF9DT05GSUcpIG92ZXJyaWRlIGNvbmZpZzogRGFwcENvbmZpZyxcbiAgICBwcml2YXRlIGFjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZVxuICApIHtcbiAgICBzdXBlcihzdG9yZSwgYWNjb3VudFNlcnZpY2UsIGF1dGhlbnRpY2F0aW9uU2VydmljZSwgY29uZmlnKTtcbiAgICB0aGlzLmxvY2FsU3RvcmUgPSBzdG9yZTtcbiAgICB0aGlzLmxvY2FsQWNjb3VudCA9IGFjY291bnRTZXJ2aWNlO1xuXG4gICAgcm91dGVyLmV2ZW50c1xuICAgICAgLnBpcGUoZmlsdGVyKChldmVudCkgPT4gZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kKSlcbiAgICAgIC5waXBlKHRha2UoMSkpXG4gICAgICAuc3Vic2NyaWJlKChldmVudDogYW55KSA9PiB7XG4gICAgICAgIGNvbnN0IHBhdGhuYW1lID0gZXZlbnQudXJsLnNwbGl0KCc/JylbMF07XG5cbiAgICAgICAgdGhpcy5yb3V0ZS5xdWVyeVBhcmFtcy5waXBlKHRha2UoMSkpLnN1YnNjcmliZSgocGFyYW1zKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ2hlcmVyZScsIHBhcmFtcyk7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgcGFyYW1zWyd3YWxsZXRQcm92aWRlclN0YXR1cyddID09PSAndHJhbnNhY3Rpb25zU2lnbmVkJyAmJlxuICAgICAgICAgICAgcGFyYW1zWydzaWduU2Vzc2lvbiddXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLnRyYW5zYWN0aW9uc1N1Y2Nlc3NDYWxsYmFjayhwYXJzZUludChwYXJhbXNbJ3NpZ25TZXNzaW9uJ10pKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHBhcmFtc1snc2lnblNlc3Npb24nXSAmJiBwYXJhbXNbJ3N0YXR1cyddID09PSAnZmFpbGVkJykge1xuICAgICAgICAgICAgdGhpcy50cmFuc2FjdGlvbnNGYWlsZWRDYWxsYmFjayhcbiAgICAgICAgICAgICAgcGFyc2VJbnQocGFyYW1zWydzaWduU2Vzc2lvbiddKSxcbiAgICAgICAgICAgICAgcGF0aG5hbWVcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChwYXJhbXNbJ3NpZ25TZXNzaW9uJ10gJiYgcGFyYW1zWydzdGF0dXMnXSA9PT0gJ2NhbmNlbGxlZCcpIHtcbiAgICAgICAgICAgIHRoaXMudHJhbnNhY3Rpb25zQ2FuY2VsbGVkQ2FsbGJhY2soXG4gICAgICAgICAgICAgIHBhcnNlSW50KHBhcmFtc1snc2lnblNlc3Npb24nXSksXG4gICAgICAgICAgICAgIHBhdGhuYW1lXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAocGFyYW1zWydhZGRyZXNzJ10gJiYgcGFyYW1zWydzaWduYXR1cmUnXSlcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdENhbGxiYWNrKHBhcmFtc1snYWRkcmVzcyddLCBwYXJhbXNbJ3NpZ25hdHVyZSddKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgdHJhbnNhY3Rpb25zRmFpbGVkQ2FsbGJhY2soc2lnblNlc3Npb246IG51bWJlciwgcGF0aG5hbWU6IHN0cmluZykge1xuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtwYXRobmFtZV0pO1xuICAgIHRoaXMuYWRkRmFpbGVkVHJhbnNhY3Rpb25zVG9TdGF0ZShzaWduU2Vzc2lvbik7XG4gIH1cblxuICBwcml2YXRlIHRyYW5zYWN0aW9uc0NhbmNlbGxlZENhbGxiYWNrKHNpZ25TZXNzaW9uOiBudW1iZXIsIHBhdGhuYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbcGF0aG5hbWVdKTtcbiAgICB0aGlzLmFkZFRvQ2FuY2VsbGVkVHJhbnNhY3Rpb24oc2lnblNlc3Npb24pO1xuICB9XG5cbiAgcHJpdmF0ZSB0cmFuc2FjdGlvbnNTdWNjZXNzQ2FsbGJhY2soc2lnblNlc3Npb246IG51bWJlcikge1xuICAgIGNvbnN0IHRyYW5zYWN0aW9ucyA9IHRoaXMud2FsbGV0UHJvdmlkZXI/LmdldFRyYW5zYWN0aW9uc0Zyb21XYWxsZXRVcmwoKTtcbiAgICBpZiAoIXRyYW5zYWN0aW9ucykgcmV0dXJuO1xuXG4gICAgdHJhbnNhY3Rpb25zLm1hcCgodHgpID0+IHtcbiAgICAgIGlmICh0eC5kYXRhKSB7XG4gICAgICAgIHR4LmRhdGEgPSBCdWZmZXIuZnJvbSh0eC5kYXRhID8/ICcnLCAndXRmOCcpLnRvU3RyaW5nKCdiYXNlNjQnKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IHVybCA9IG5ldyBVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpO1xuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFt1cmwucGF0aG5hbWVdKTtcbiAgICB0aGlzLmFkZFNpZ25lZFRyYW5zYWN0aW9uc1RvU3RhdGUodHJhbnNhY3Rpb25zLCBzaWduU2Vzc2lvbik7XG4gIH1cbiAgcHJpdmF0ZSBhc3luYyBjb25uZWN0Q2FsbGJhY2soYWRkcmVzczogc3RyaW5nLCBzaWduYXR1cmU6IHN0cmluZykge1xuICAgIGNvbnN0IGFjY2Vzc1Rva2VuID0gbmV3IE5hdGl2ZUF1dGhDbGllbnQoKS5nZXRUb2tlbihcbiAgICAgIGFkZHJlc3MsXG4gICAgICBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnaW5pdFRva2VuJykhLFxuICAgICAgc2lnbmF0dXJlXG4gICAgKTtcblxuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdpbml0VG9rZW4nKTtcblxuICAgIHRoaXMubG9jYWxTdG9yZS5kaXNwYXRjaChcbiAgICAgIG5ldyBMb2dpbkFjY291bnQoe1xuICAgICAgICBhZGRyZXNzLFxuICAgICAgICBhY2Nlc3NUb2tlbixcbiAgICAgICAgY3VycmVudFByb3ZpZGVyOiBQcm92aWRlcnNUeXBlLldlYldhbGxldCxcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIHRoaXMud2FsbGV0UHJvdmlkZXIgPSBuZXcgV2FsbGV0UHJvdmlkZXIoXG4gICAgICBgaHR0cHM6Ly93YWxsZXQubXVsdGl2ZXJzeC5jb20ke0RBUFBfSU5JVF9ST1VURX1gXG4gICAgKTtcblxuICAgIGNvbnN0IG5hdkFmdGVyQ29ubmVjdFJvdXRlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ25hdkFmdGVyQ29ubmVjdFJvdXRlJyk7XG4gICAgaWYgKG5hdkFmdGVyQ29ubmVjdFJvdXRlKVxuICAgICAgYXdhaXQgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW25hdkFmdGVyQ29ubmVjdFJvdXRlXSk7XG5cbiAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gIH1cblxuICBvdmVycmlkZSBhc3luYyBjb25uZWN0KG5hdkFmdGVyQ29ubmVjdFJvdXRlOiBzdHJpbmcpOiBQcm9taXNlPHtcbiAgICBjbGllbnQ6IE5hdGl2ZUF1dGhDbGllbnQ7XG4gICAgaW5pdDogc3RyaW5nO1xuICB9PiB7XG4gICAgY29uc3QgeyBjbGllbnQsIGluaXQgfSA9IGF3YWl0IHN1cGVyLmNvbm5lY3QobmF2QWZ0ZXJDb25uZWN0Um91dGUpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdpbml0VG9rZW4nLCBpbml0KTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbmF2QWZ0ZXJDb25uZWN0Um91dGUnLCBuYXZBZnRlckNvbm5lY3RSb3V0ZSB8fCAnJyk7XG5cbiAgICB0aGlzLndhbGxldFByb3ZpZGVyID0gbmV3IFdhbGxldFByb3ZpZGVyKFxuICAgICAgYCR7dGhpcy5jb25maWcud2FsbGV0VVJMfSR7REFQUF9JTklUX1JPVVRFfWBcbiAgICApO1xuICAgIHRoaXMud2FsbGV0UHJvdmlkZXIubG9naW4oe1xuICAgICAgY2FsbGJhY2tVcmw6IHdpbmRvdy5sb2NhdGlvbi5ocmVmLFxuICAgICAgdG9rZW46IGluaXQsXG4gICAgfSk7XG5cbiAgICByZXR1cm4geyBjbGllbnQsIGluaXQgfTtcbiAgfVxuXG4gIG92ZXJyaWRlIGFzeW5jIGxvZ291dCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBpZiAoIXRoaXMud2FsbGV0UHJvdmlkZXIpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Byb3ZpZGVyIHdhcyBub3QgcmVpbml0aWFsaXplZCEnKTtcbiAgICBzdXBlci5sb2dvdXQoKTtcbiAgICB0aGlzLndhbGxldFByb3ZpZGVyLmxvZ291dCh7IGNhbGxiYWNrVXJsOiB3aW5kb3cubG9jYXRpb24uaHJlZiB9KTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIG92ZXJyaWRlIHJlSW5pdGlhbGl6ZSgpOiB2b2lkIHtcbiAgICBpZiAoXG4gICAgICB0aGlzLmxvY2FsQWNjb3VudCAmJlxuICAgICAgdGhpcy5sb2NhbEFjY291bnQuYWNjb3VudC5jdXJyZW50UHJvdmlkZXIgIT09IFByb3ZpZGVyc1R5cGUuV2ViV2FsbGV0XG4gICAgKVxuICAgICAgcmV0dXJuO1xuXG4gICAgdGhpcy53YWxsZXRQcm92aWRlciA9IG5ldyBXYWxsZXRQcm92aWRlcihcbiAgICAgIGAke3RoaXMuY29uZmlnLndhbGxldFVSTH0ke0RBUFBfSU5JVF9ST1VURX1gXG4gICAgKTtcbiAgfVxuXG4gIG92ZXJyaWRlIGNhbmNlbEFjdGlvbigpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMud2FsbGV0UHJvdmlkZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmxvY2FsU3RvcmUuZGlzcGF0Y2gobmV3IENhbmNlbFBlbmRpbmdTaWduYXR1cmUoKSk7XG4gIH1cblxuICBvdmVycmlkZSBhc3luYyBzZW5kVHJhbnNhY3Rpb25zKFxuICAgIHRyYW5zYWN0aW9uczogSVBsYWluVHJhbnNhY3Rpb25PYmplY3RbXSxcbiAgICB0eElkOiBudW1iZXJcbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgdHhBcnJheSA9IHRyYW5zYWN0aW9ucy5tYXAoKHR4KSA9PiB7XG4gICAgICBjb25zdCB0eDEgPSBUcmFuc2FjdGlvbi5mcm9tUGxhaW5PYmplY3QodHgpO1xuICAgICAgcmV0dXJuIHR4MTtcbiAgICB9KTtcblxuICAgIGNvbnNvbGUubG9nKCdoZXJlcmVyZXJlcmVyZXJlJyk7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgdXJsID0gbmV3IFVSTCh3aW5kb3cubG9jYXRpb24uaHJlZik7XG4gICAgICB1cmwuc2VhcmNoUGFyYW1zLmFwcGVuZCgnc2lnblNlc3Npb24nLCB0eElkLnRvU3RyaW5nKCkpO1xuXG4gICAgICB0aGlzLndhbGxldFByb3ZpZGVyPy5zaWduVHJhbnNhY3Rpb25zKHR4QXJyYXksIHtcbiAgICAgICAgY2FsbGJhY2tVcmw6IGVuY29kZVVSSUNvbXBvbmVudCh1cmwuaHJlZiksXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICB9XG59XG4iXX0=