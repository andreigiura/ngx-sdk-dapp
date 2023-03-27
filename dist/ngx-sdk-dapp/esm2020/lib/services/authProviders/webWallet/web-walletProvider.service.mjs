import { Inject, Injectable } from '@angular/core';
import { Transaction } from '@multiversx/sdk-core/out';
import { NativeAuthClient } from '@multiversx/sdk-native-auth-client';
import { WalletProvider } from '@multiversx/sdk-web-wallet-provider/out';
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
    constructor(store, accountService, authenticationService, router, route, config) {
        super(store, accountService, authenticationService, config);
        this.router = router;
        this.route = route;
        this.config = config;
        this.localStore = store;
        this.localAccount = accountService;
        this.route.queryParams.subscribe((params) => {
            if (params['walletProviderStatus'] === 'transactionsSigned' &&
                params['signSession']) {
                this.transactionsSuccessCallback(parseInt(params['signSession']));
            }
            if (params['signSession'] && params['status'] === 'failed') {
                this.transactionsFailedCallback(parseInt(params['signSession']));
            }
            if (params['signSession'] && params['status'] === 'cancelled') {
                this.transactionsCancelledCallback(parseInt(params['signSession']));
            }
            if (params['address'] && params['signature'])
                this.connectCallback(params['address'], params['signature']);
        });
    }
    transactionsFailedCallback(signSession) {
        const url = new URL(window.location.href);
        this.router.navigate([url.pathname]);
        this.addFailedTransactionsToState(signSession);
    }
    transactionsCancelledCallback(signSession) {
        const url = new URL(window.location.href);
        this.router.navigate([url.pathname]);
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
WebWalletProviderService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: WebWalletProviderService, deps: [{ token: i1.Store }, { token: i2.AccountService }, { token: i3.AuthenticationService }, { token: i4.Router }, { token: i4.ActivatedRoute }, { token: DAPP_CONFIG }], target: i0.ɵɵFactoryTarget.Injectable });
WebWalletProviderService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: WebWalletProviderService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: WebWalletProviderService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.Store }, { type: i2.AccountService }, { type: i3.AuthenticationService }, { type: i4.Router }, { type: i4.ActivatedRoute }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DAPP_CONFIG]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViLXdhbGxldFByb3ZpZGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtc2RrLWRhcHAvc3JjL2xpYi9zZXJ2aWNlcy9hdXRoUHJvdmlkZXJzL3dlYldhbGxldC93ZWItd2FsbGV0UHJvdmlkZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVuRCxPQUFPLEVBQTJCLFdBQVcsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2hGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUV6RSxPQUFPLEVBQWMsV0FBVyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBR3BGLE9BQU8sRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7Ozs7OztBQUVwRSxNQUFNLENBQUMsTUFBTSxlQUFlLEdBQUcsWUFBWSxDQUFDO0FBSzVDLE1BQU0sT0FBTyx3QkFBeUIsU0FBUSxlQUFlO0lBSzNELFlBQ0UsS0FBWSxFQUNaLGNBQThCLEVBQzlCLHFCQUE0QyxFQUNwQyxNQUFjLEVBQ2QsS0FBcUIsRUFDQyxNQUFrQjtRQUVoRCxLQUFLLENBQUMsS0FBSyxFQUFFLGNBQWMsRUFBRSxxQkFBcUIsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUpwRCxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFDQyxXQUFNLEdBQU4sTUFBTSxDQUFZO1FBR2hELElBQUksQ0FBQyxVQUFVLEdB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QUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBRWhDLElBQUk7WUFDRixNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztZQUV4RCxJQUFJLENBQUMsY0FBYyxFQUFFLGdCQUFnQixDQUFDLE9BQU8sRUFBRTtnQkFDN0MsV0FBVyxFQUFFLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7YUFDMUMsQ0FBQyxDQUFDO1NBQ0o7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLE1BQU0sS0FBSyxDQUFDO1NBQ2I7SUFDSCxDQUFDOztxSEE3SlUsd0JBQXdCLDhKQVd6QixXQUFXO3lIQVhWLHdCQUF3QixjQUZ2QixNQUFNOzJGQUVQLHdCQUF3QjtrQkFIcEMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7OzBCQVlJLE1BQU07MkJBQUMsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBJUGxhaW5UcmFuc2FjdGlvbk9iamVjdCwgVHJhbnNhY3Rpb24gfSBmcm9tICdAbXVsdGl2ZXJzeC9zZGstY29yZS9vdXQnO1xuaW1wb3J0IHsgTmF0aXZlQXV0aENsaWVudCB9IGZyb20gJ0BtdWx0aXZlcnN4L3Nkay1uYXRpdmUtYXV0aC1jbGllbnQnO1xuaW1wb3J0IHsgV2FsbGV0UHJvdmlkZXIgfSBmcm9tICdAbXVsdGl2ZXJzeC9zZGstd2ViLXdhbGxldC1wcm92aWRlci9vdXQnO1xuaW1wb3J0IHsgU3RvcmUgfSBmcm9tICdAbmd4cy9zdG9yZSc7XG5pbXBvcnQgeyBEYXBwQ29uZmlnLCBEQVBQX0NPTkZJRyB9IGZyb20gJy4uLy4uLy4uL2NvbmZpZyc7XG5pbXBvcnQgeyBMb2dpbkFjY291bnQgfSBmcm9tICcuLi8uLi8uLi9uZ3hzL2FjY291bnQvYWNjb3VudC5hY3Rpb25zJztcbmltcG9ydCB7IENhbmNlbFBlbmRpbmdTaWduYXR1cmUgfSBmcm9tICcuLi8uLi8uLi9uZ3hzL2FjY291bnQvdHJhbnNhY3Rpb25zLmFjdGlvbnMnO1xuaW1wb3J0IHsgQWNjb3VudFNlcnZpY2UgfSBmcm9tICcuLi8uLi9hY2NvdW50L2FjY291bnQuc2VydmljZSc7XG5pbXBvcnQgeyBBdXRoZW50aWNhdGlvblNlcnZpY2UgfSBmcm9tICcuLi8uLi9hdXRoZW50aWNhdGlvbi9hdXRoZW50aWNhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IEdlbmVyaWNQcm92aWRlciwgUHJvdmlkZXJzVHlwZSB9IGZyb20gJy4uL2dlbmVyaWNQcm92aWRlcic7XG5cbmV4cG9ydCBjb25zdCBEQVBQX0lOSVRfUk9VVEUgPSAnL2RhcHAvaW5pdCc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBXZWJXYWxsZXRQcm92aWRlclNlcnZpY2UgZXh0ZW5kcyBHZW5lcmljUHJvdmlkZXIge1xuICBwcml2YXRlIGxvY2FsU3RvcmU6IFN0b3JlO1xuICBwcml2YXRlIGxvY2FsQWNjb3VudDogQWNjb3VudFNlcnZpY2U7XG4gIHByaXZhdGUgd2FsbGV0UHJvdmlkZXI6IFdhbGxldFByb3ZpZGVyIHwgdW5kZWZpbmVkO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHN0b3JlOiBTdG9yZSxcbiAgICBhY2NvdW50U2VydmljZTogQWNjb3VudFNlcnZpY2UsXG4gICAgYXV0aGVudGljYXRpb25TZXJ2aWNlOiBBdXRoZW50aWNhdGlvblNlcnZpY2UsXG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcbiAgICBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICBASW5qZWN0KERBUFBfQ09ORklHKSBvdmVycmlkZSBjb25maWc6IERhcHBDb25maWdcbiAgKSB7XG4gICAgc3VwZXIoc3RvcmUsIGFjY291bnRTZXJ2aWNlLCBhdXRoZW50aWNhdGlvblNlcnZpY2UsIGNvbmZpZyk7XG4gICAgdGhpcy5sb2NhbFN0b3JlID0gc3RvcmU7XG4gICAgdGhpcy5sb2NhbEFjY291bnQgPSBhY2NvdW50U2VydmljZTtcblxuICAgIHRoaXMucm91dGUucXVlcnlQYXJhbXMuc3Vic2NyaWJlKChwYXJhbXMpID0+IHtcbiAgICAgIGlmIChcbiAgICAgICAgcGFyYW1zWyd3YWxsZXRQcm92aWRlclN0YXR1cyddID09PSAndHJhbnNhY3Rpb25zU2lnbmVkJyAmJlxuICAgICAgICBwYXJhbXNbJ3NpZ25TZXNzaW9uJ11cbiAgICAgICkge1xuICAgICAgICB0aGlzLnRyYW5zYWN0aW9uc1N1Y2Nlc3NDYWxsYmFjayhwYXJzZUludChwYXJhbXNbJ3NpZ25TZXNzaW9uJ10pKTtcbiAgICAgIH1cbiAgICAgIGlmIChwYXJhbXNbJ3NpZ25TZXNzaW9uJ10gJiYgcGFyYW1zWydzdGF0dXMnXSA9PT0gJ2ZhaWxlZCcpIHtcbiAgICAgICAgdGhpcy50cmFuc2FjdGlvbnNGYWlsZWRDYWxsYmFjayhwYXJzZUludChwYXJhbXNbJ3NpZ25TZXNzaW9uJ10pKTtcbiAgICAgIH1cbiAgICAgIGlmIChwYXJhbXNbJ3NpZ25TZXNzaW9uJ10gJiYgcGFyYW1zWydzdGF0dXMnXSA9PT0gJ2NhbmNlbGxlZCcpIHtcbiAgICAgICAgdGhpcy50cmFuc2FjdGlvbnNDYW5jZWxsZWRDYWxsYmFjayhwYXJzZUludChwYXJhbXNbJ3NpZ25TZXNzaW9uJ10pKTtcbiAgICAgIH1cbiAgICAgIGlmIChwYXJhbXNbJ2FkZHJlc3MnXSAmJiBwYXJhbXNbJ3NpZ25hdHVyZSddKVxuICAgICAgICB0aGlzLmNvbm5lY3RDYWxsYmFjayhwYXJhbXNbJ2FkZHJlc3MnXSwgcGFyYW1zWydzaWduYXR1cmUnXSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHRyYW5zYWN0aW9uc0ZhaWxlZENhbGxiYWNrKHNpZ25TZXNzaW9uOiBudW1iZXIpIHtcbiAgICBjb25zdCB1cmwgPSBuZXcgVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbdXJsLnBhdGhuYW1lXSk7XG4gICAgdGhpcy5hZGRGYWlsZWRUcmFuc2FjdGlvbnNUb1N0YXRlKHNpZ25TZXNzaW9uKTtcbiAgfVxuXG4gIHByaXZhdGUgdHJhbnNhY3Rpb25zQ2FuY2VsbGVkQ2FsbGJhY2soc2lnblNlc3Npb246IG51bWJlcikge1xuICAgIGNvbnN0IHVybCA9IG5ldyBVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpO1xuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFt1cmwucGF0aG5hbWVdKTtcbiAgICB0aGlzLmFkZFRvQ2FuY2VsbGVkVHJhbnNhY3Rpb24oc2lnblNlc3Npb24pO1xuICB9XG5cbiAgcHJpdmF0ZSB0cmFuc2FjdGlvbnNTdWNjZXNzQ2FsbGJhY2soc2lnblNlc3Npb246IG51bWJlcikge1xuICAgIGNvbnN0IHRyYW5zYWN0aW9ucyA9IHRoaXMud2FsbGV0UHJvdmlkZXI/LmdldFRyYW5zYWN0aW9uc0Zyb21XYWxsZXRVcmwoKTtcbiAgICBpZiAoIXRyYW5zYWN0aW9ucykgcmV0dXJuO1xuXG4gICAgdHJhbnNhY3Rpb25zLm1hcCgodHgpID0+IHtcbiAgICAgIGlmICh0eC5kYXRhKSB7XG4gICAgICAgIHR4LmRhdGEgPSBCdWZmZXIuZnJvbSh0eC5kYXRhID8/ICcnLCAndXRmOCcpLnRvU3RyaW5nKCdiYXNlNjQnKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IHVybCA9IG5ldyBVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpO1xuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFt1cmwucGF0aG5hbWVdKTtcbiAgICB0aGlzLmFkZFNpZ25lZFRyYW5zYWN0aW9uc1RvU3RhdGUodHJhbnNhY3Rpb25zLCBzaWduU2Vzc2lvbik7XG4gIH1cbiAgcHJpdmF0ZSBhc3luYyBjb25uZWN0Q2FsbGJhY2soYWRkcmVzczogc3RyaW5nLCBzaWduYXR1cmU6IHN0cmluZykge1xuICAgIGNvbnN0IGFjY2Vzc1Rva2VuID0gbmV3IE5hdGl2ZUF1dGhDbGllbnQoKS5nZXRUb2tlbihcbiAgICAgIGFkZHJlc3MsXG4gICAgICBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnaW5pdFRva2VuJykhLFxuICAgICAgc2lnbmF0dXJlXG4gICAgKTtcblxuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdpbml0VG9rZW4nKTtcblxuICAgIHRoaXMubG9jYWxTdG9yZS5kaXNwYXRjaChcbiAgICAgIG5ldyBMb2dpbkFjY291bnQoe1xuICAgICAgICBhZGRyZXNzLFxuICAgICAgICBhY2Nlc3NUb2tlbixcbiAgICAgICAgY3VycmVudFByb3ZpZGVyOiBQcm92aWRlcnNUeXBlLldlYldhbGxldCxcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIHRoaXMud2FsbGV0UHJvdmlkZXIgPSBuZXcgV2FsbGV0UHJvdmlkZXIoXG4gICAgICBgaHR0cHM6Ly93YWxsZXQubXVsdGl2ZXJzeC5jb20ke0RBUFBfSU5JVF9ST1VURX1gXG4gICAgKTtcblxuICAgIGNvbnN0IG5hdkFmdGVyQ29ubmVjdFJvdXRlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ25hdkFmdGVyQ29ubmVjdFJvdXRlJyk7XG4gICAgaWYgKG5hdkFmdGVyQ29ubmVjdFJvdXRlKVxuICAgICAgYXdhaXQgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW25hdkFmdGVyQ29ubmVjdFJvdXRlXSk7XG5cbiAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gIH1cblxuICBvdmVycmlkZSBhc3luYyBjb25uZWN0KG5hdkFmdGVyQ29ubmVjdFJvdXRlOiBzdHJpbmcpOiBQcm9taXNlPHtcbiAgICBjbGllbnQ6IE5hdGl2ZUF1dGhDbGllbnQ7XG4gICAgaW5pdDogc3RyaW5nO1xuICB9PiB7XG4gICAgY29uc3QgeyBjbGllbnQsIGluaXQgfSA9IGF3YWl0IHN1cGVyLmNvbm5lY3QobmF2QWZ0ZXJDb25uZWN0Um91dGUpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdpbml0VG9rZW4nLCBpbml0KTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbmF2QWZ0ZXJDb25uZWN0Um91dGUnLCBuYXZBZnRlckNvbm5lY3RSb3V0ZSB8fCAnJyk7XG5cbiAgICB0aGlzLndhbGxldFByb3ZpZGVyID0gbmV3IFdhbGxldFByb3ZpZGVyKFxuICAgICAgYCR7dGhpcy5jb25maWcud2FsbGV0VVJMfSR7REFQUF9JTklUX1JPVVRFfWBcbiAgICApO1xuICAgIHRoaXMud2FsbGV0UHJvdmlkZXIubG9naW4oe1xuICAgICAgY2FsbGJhY2tVcmw6IHdpbmRvdy5sb2NhdGlvbi5ocmVmLFxuICAgICAgdG9rZW46IGluaXQsXG4gICAgfSk7XG5cbiAgICByZXR1cm4geyBjbGllbnQsIGluaXQgfTtcbiAgfVxuXG4gIG92ZXJyaWRlIGFzeW5jIGxvZ291dCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBpZiAoIXRoaXMud2FsbGV0UHJvdmlkZXIpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Byb3ZpZGVyIHdhcyBub3QgcmVpbml0aWFsaXplZCEnKTtcbiAgICBzdXBlci5sb2dvdXQoKTtcbiAgICB0aGlzLndhbGxldFByb3ZpZGVyLmxvZ291dCh7IGNhbGxiYWNrVXJsOiB3aW5kb3cubG9jYXRpb24uaHJlZiB9KTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIG92ZXJyaWRlIHJlSW5pdGlhbGl6ZSgpOiB2b2lkIHtcbiAgICBpZiAoXG4gICAgICB0aGlzLmxvY2FsQWNjb3VudCAmJlxuICAgICAgdGhpcy5sb2NhbEFjY291bnQuYWNjb3VudC5jdXJyZW50UHJvdmlkZXIgIT09IFByb3ZpZGVyc1R5cGUuV2ViV2FsbGV0XG4gICAgKVxuICAgICAgcmV0dXJuO1xuXG4gICAgdGhpcy53YWxsZXRQcm92aWRlciA9IG5ldyBXYWxsZXRQcm92aWRlcihcbiAgICAgIGAke3RoaXMuY29uZmlnLndhbGxldFVSTH0ke0RBUFBfSU5JVF9ST1VURX1gXG4gICAgKTtcbiAgfVxuXG4gIG92ZXJyaWRlIGNhbmNlbEFjdGlvbigpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMud2FsbGV0UHJvdmlkZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmxvY2FsU3RvcmUuZGlzcGF0Y2gobmV3IENhbmNlbFBlbmRpbmdTaWduYXR1cmUoKSk7XG4gIH1cblxuICBvdmVycmlkZSBhc3luYyBzZW5kVHJhbnNhY3Rpb25zKFxuICAgIHRyYW5zYWN0aW9uczogSVBsYWluVHJhbnNhY3Rpb25PYmplY3RbXSxcbiAgICB0eElkOiBudW1iZXJcbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgdHhBcnJheSA9IHRyYW5zYWN0aW9ucy5tYXAoKHR4KSA9PiB7XG4gICAgICBjb25zdCB0eDEgPSBUcmFuc2FjdGlvbi5mcm9tUGxhaW5PYmplY3QodHgpO1xuICAgICAgcmV0dXJuIHR4MTtcbiAgICB9KTtcblxuICAgIGNvbnNvbGUubG9nKCdoZXJlcmVyZXJlcmVyZXJlJyk7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgdXJsID0gbmV3IFVSTCh3aW5kb3cubG9jYXRpb24uaHJlZik7XG4gICAgICB1cmwuc2VhcmNoUGFyYW1zLmFwcGVuZCgnc2lnblNlc3Npb24nLCB0eElkLnRvU3RyaW5nKCkpO1xuXG4gICAgICB0aGlzLndhbGxldFByb3ZpZGVyPy5zaWduVHJhbnNhY3Rpb25zKHR4QXJyYXksIHtcbiAgICAgICAgY2FsbGJhY2tVcmw6IGVuY29kZVVSSUNvbXBvbmVudCh1cmwuaHJlZiksXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICB9XG59XG4iXX0=