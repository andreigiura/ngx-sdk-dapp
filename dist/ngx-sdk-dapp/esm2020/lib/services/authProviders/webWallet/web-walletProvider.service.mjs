import { Inject, Injectable } from '@angular/core';
import { Transaction } from '@multiversx/sdk-core/out';
import { NativeAuthClient } from '@multiversx/sdk-native-auth-client';
import { WalletProvider } from '@multiversx/sdk-web-wallet-provider/out';
import { DAPP_CONFIG } from '../../../config';
import { LoginAccount } from '../../../ngxs/account/account.actions';
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
        this.transactionsFailedCallback = (signSession) => {
            const url = new URL(window.location.href);
            this.router.navigate([url.pathname]);
            this.addFailedTransactionsToState(signSession);
        };
        this.transactionsCancelledCallback = (signSession) => {
            const url = new URL(window.location.href);
            this.router.navigate([url.pathname]);
            this.addToCancelledTransaction(signSession);
        };
        this.transactionsSuccessCallback = (signSession) => {
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
        };
        this.connectCallback = (address, signature) => {
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
                this.router.navigate([navAfterConnectRoute]);
        };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViLXdhbGxldFByb3ZpZGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtc2RrLWRhcHAvc3JjL2xpYi9zZXJ2aWNlcy9hdXRoUHJvdmlkZXJzL3dlYldhbGxldC93ZWItd2FsbGV0UHJvdmlkZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVuRCxPQUFPLEVBQTJCLFdBQVcsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2hGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUV6RSxPQUFPLEVBQWMsV0FBVyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBR3JFLE9BQU8sRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7Ozs7OztBQUVwRSxNQUFNLENBQUMsTUFBTSxlQUFlLEdBQUcsWUFBWSxDQUFDO0FBSzVDLE1BQU0sT0FBTyx3QkFBeUIsU0FBUSxlQUFlO0lBSzNELFlBQ0UsS0FBWSxFQUNaLGNBQThCLEVBQzlCLHFCQUE0QyxFQUNwQyxNQUFjLEVBQ2QsS0FBcUIsRUFDQyxNQUFrQjtRQUVoRCxLQUFLLENBQUMsS0FBSyxFQUFFLGNBQWMsRUFBRSxxQkFBcUIsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUpwRCxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFDQyxXQUFNLEdBQU4sTUFBTSxDQUFZO1FBd0IxQywrQkFBMEIsR0FBRyxDQUFDLFdBQW1CLEVBQUUsRUFBRTtZQUMzRCxNQUFNLEdBQUcsR0FBRyxJQUFJLEdB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QUV4RCxJQUFJLENBQUMsY0FBYyxFQUFFLGdCQUFnQixDQUFDLE9BQU8sRUFBRTtnQkFDN0MsV0FBVyxFQUFFLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7YUFDMUMsQ0FBQyxDQUFDO1NBQ0o7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLE1BQU0sS0FBSyxDQUFDO1NBQ2I7SUFDSCxDQUFDOztxSEEvSVUsd0JBQXdCLDhKQVd6QixXQUFXO3lIQVhWLHdCQUF3QixjQUZ2QixNQUFNOzJGQUVQLHdCQUF3QjtrQkFIcEMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7OzBCQVlJLE1BQU07MkJBQUMsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBJUGxhaW5UcmFuc2FjdGlvbk9iamVjdCwgVHJhbnNhY3Rpb24gfSBmcm9tICdAbXVsdGl2ZXJzeC9zZGstY29yZS9vdXQnO1xuaW1wb3J0IHsgTmF0aXZlQXV0aENsaWVudCB9IGZyb20gJ0BtdWx0aXZlcnN4L3Nkay1uYXRpdmUtYXV0aC1jbGllbnQnO1xuaW1wb3J0IHsgV2FsbGV0UHJvdmlkZXIgfSBmcm9tICdAbXVsdGl2ZXJzeC9zZGstd2ViLXdhbGxldC1wcm92aWRlci9vdXQnO1xuaW1wb3J0IHsgU3RvcmUgfSBmcm9tICdAbmd4cy9zdG9yZSc7XG5pbXBvcnQgeyBEYXBwQ29uZmlnLCBEQVBQX0NPTkZJRyB9IGZyb20gJy4uLy4uLy4uL2NvbmZpZyc7XG5pbXBvcnQgeyBMb2dpbkFjY291bnQgfSBmcm9tICcuLi8uLi8uLi9uZ3hzL2FjY291bnQvYWNjb3VudC5hY3Rpb25zJztcbmltcG9ydCB7IEFjY291bnRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vYWNjb3VudC9hY2NvdW50LnNlcnZpY2UnO1xuaW1wb3J0IHsgQXV0aGVudGljYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vYXV0aGVudGljYXRpb24vYXV0aGVudGljYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBHZW5lcmljUHJvdmlkZXIsIFByb3ZpZGVyc1R5cGUgfSBmcm9tICcuLi9nZW5lcmljUHJvdmlkZXInO1xuXG5leHBvcnQgY29uc3QgREFQUF9JTklUX1JPVVRFID0gJy9kYXBwL2luaXQnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgV2ViV2FsbGV0UHJvdmlkZXJTZXJ2aWNlIGV4dGVuZHMgR2VuZXJpY1Byb3ZpZGVyIHtcbiAgcHJpdmF0ZSBsb2NhbFN0b3JlOiBTdG9yZTtcbiAgcHJpdmF0ZSBsb2NhbEFjY291bnQ6IEFjY291bnRTZXJ2aWNlO1xuICBwcml2YXRlIHdhbGxldFByb3ZpZGVyOiBXYWxsZXRQcm92aWRlciB8IHVuZGVmaW5lZDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBzdG9yZTogU3RvcmUsXG4gICAgYWNjb3VudFNlcnZpY2U6IEFjY291bnRTZXJ2aWNlLFxuICAgIGF1dGhlbnRpY2F0aW9uU2VydmljZTogQXV0aGVudGljYXRpb25TZXJ2aWNlLFxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXG4gICAgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgQEluamVjdChEQVBQX0NPTkZJRykgb3ZlcnJpZGUgY29uZmlnOiBEYXBwQ29uZmlnXG4gICkge1xuICAgIHN1cGVyKHN0b3JlLCBhY2NvdW50U2VydmljZSwgYXV0aGVudGljYXRpb25TZXJ2aWNlLCBjb25maWcpO1xuICAgIHRoaXMubG9jYWxTdG9yZSA9IHN0b3JlO1xuICAgIHRoaXMubG9jYWxBY2NvdW50ID0gYWNjb3VudFNlcnZpY2U7XG5cbiAgICB0aGlzLnJvdXRlLnF1ZXJ5UGFyYW1zLnN1YnNjcmliZSgocGFyYW1zKSA9PiB7XG4gICAgICBpZiAoXG4gICAgICAgIHBhcmFtc1snd2FsbGV0UHJvdmlkZXJTdGF0dXMnXSA9PT0gJ3RyYW5zYWN0aW9uc1NpZ25lZCcgJiZcbiAgICAgICAgcGFyYW1zWydzaWduU2Vzc2lvbiddXG4gICAgICApIHtcbiAgICAgICAgdGhpcy50cmFuc2FjdGlvbnNTdWNjZXNzQ2FsbGJhY2socGFyc2VJbnQocGFyYW1zWydzaWduU2Vzc2lvbiddKSk7XG4gICAgICB9XG4gICAgICBpZiAocGFyYW1zWydzaWduU2Vzc2lvbiddICYmIHBhcmFtc1snc3RhdHVzJ10gPT09ICdmYWlsZWQnKSB7XG4gICAgICAgIHRoaXMudHJhbnNhY3Rpb25zRmFpbGVkQ2FsbGJhY2socGFyc2VJbnQocGFyYW1zWydzaWduU2Vzc2lvbiddKSk7XG4gICAgICB9XG4gICAgICBpZiAocGFyYW1zWydzaWduU2Vzc2lvbiddICYmIHBhcmFtc1snc3RhdHVzJ10gPT09ICdjYW5jZWxsZWQnKSB7XG4gICAgICAgIHRoaXMudHJhbnNhY3Rpb25zQ2FuY2VsbGVkQ2FsbGJhY2socGFyc2VJbnQocGFyYW1zWydzaWduU2Vzc2lvbiddKSk7XG4gICAgICB9XG4gICAgICBpZiAocGFyYW1zWydhZGRyZXNzJ10gJiYgcGFyYW1zWydzaWduYXR1cmUnXSlcbiAgICAgICAgdGhpcy5jb25uZWN0Q2FsbGJhY2socGFyYW1zWydhZGRyZXNzJ10sIHBhcmFtc1snc2lnbmF0dXJlJ10pO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSB0cmFuc2FjdGlvbnNGYWlsZWRDYWxsYmFjayA9IChzaWduU2Vzc2lvbjogbnVtYmVyKSA9PiB7XG4gICAgY29uc3QgdXJsID0gbmV3IFVSTCh3aW5kb3cubG9jYXRpb24uaHJlZik7XG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW3VybC5wYXRobmFtZV0pO1xuICAgIHRoaXMuYWRkRmFpbGVkVHJhbnNhY3Rpb25zVG9TdGF0ZShzaWduU2Vzc2lvbik7XG4gIH07XG5cbiAgcHJpdmF0ZSB0cmFuc2FjdGlvbnNDYW5jZWxsZWRDYWxsYmFjayA9IChzaWduU2Vzc2lvbjogbnVtYmVyKSA9PiB7XG4gICAgY29uc3QgdXJsID0gbmV3IFVSTCh3aW5kb3cubG9jYXRpb24uaHJlZik7XG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW3VybC5wYXRobmFtZV0pO1xuICAgIHRoaXMuYWRkVG9DYW5jZWxsZWRUcmFuc2FjdGlvbihzaWduU2Vzc2lvbik7XG4gIH07XG5cbiAgcHJpdmF0ZSB0cmFuc2FjdGlvbnNTdWNjZXNzQ2FsbGJhY2sgPSAoc2lnblNlc3Npb246IG51bWJlcikgPT4ge1xuICAgIGNvbnN0IHRyYW5zYWN0aW9ucyA9IHRoaXMud2FsbGV0UHJvdmlkZXI/LmdldFRyYW5zYWN0aW9uc0Zyb21XYWxsZXRVcmwoKTtcbiAgICBpZiAoIXRyYW5zYWN0aW9ucykgcmV0dXJuO1xuXG4gICAgdHJhbnNhY3Rpb25zLm1hcCgodHgpID0+IHtcbiAgICAgIGlmICh0eC5kYXRhKSB7XG4gICAgICAgIHR4LmRhdGEgPSBCdWZmZXIuZnJvbSh0eC5kYXRhID8/ICcnLCAndXRmOCcpLnRvU3RyaW5nKCdiYXNlNjQnKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IHVybCA9IG5ldyBVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpO1xuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFt1cmwucGF0aG5hbWVdKTtcbiAgICB0aGlzLmFkZFNpZ25lZFRyYW5zYWN0aW9uc1RvU3RhdGUodHJhbnNhY3Rpb25zLCBzaWduU2Vzc2lvbik7XG4gIH07XG4gIHByaXZhdGUgY29ubmVjdENhbGxiYWNrID0gKGFkZHJlc3M6IHN0cmluZywgc2lnbmF0dXJlOiBzdHJpbmcpID0+IHtcbiAgICBjb25zdCBhY2Nlc3NUb2tlbiA9IG5ldyBOYXRpdmVBdXRoQ2xpZW50KCkuZ2V0VG9rZW4oXG4gICAgICBhZGRyZXNzLFxuICAgICAgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2luaXRUb2tlbicpISxcbiAgICAgIHNpZ25hdHVyZVxuICAgICk7XG5cbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnaW5pdFRva2VuJyk7XG5cbiAgICB0aGlzLmxvY2FsU3RvcmUuZGlzcGF0Y2goXG4gICAgICBuZXcgTG9naW5BY2NvdW50KHtcbiAgICAgICAgYWRkcmVzcyxcbiAgICAgICAgYWNjZXNzVG9rZW4sXG4gICAgICAgIGN1cnJlbnRQcm92aWRlcjogUHJvdmlkZXJzVHlwZS5XZWJXYWxsZXQsXG4gICAgICB9KVxuICAgICk7XG5cbiAgICB0aGlzLndhbGxldFByb3ZpZGVyID0gbmV3IFdhbGxldFByb3ZpZGVyKFxuICAgICAgYGh0dHBzOi8vd2FsbGV0Lm11bHRpdmVyc3guY29tJHtEQVBQX0lOSVRfUk9VVEV9YFxuICAgICk7XG5cbiAgICBjb25zdCBuYXZBZnRlckNvbm5lY3RSb3V0ZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCduYXZBZnRlckNvbm5lY3RSb3V0ZScpO1xuICAgIGlmIChuYXZBZnRlckNvbm5lY3RSb3V0ZSkgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW25hdkFmdGVyQ29ubmVjdFJvdXRlXSk7XG4gIH07XG5cbiAgb3ZlcnJpZGUgYXN5bmMgY29ubmVjdChuYXZBZnRlckNvbm5lY3RSb3V0ZTogc3RyaW5nKTogUHJvbWlzZTx7XG4gICAgY2xpZW50OiBOYXRpdmVBdXRoQ2xpZW50O1xuICAgIGluaXQ6IHN0cmluZztcbiAgfT4ge1xuICAgIGNvbnN0IHsgY2xpZW50LCBpbml0IH0gPSBhd2FpdCBzdXBlci5jb25uZWN0KG5hdkFmdGVyQ29ubmVjdFJvdXRlKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnaW5pdFRva2VuJywgaW5pdCk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ25hdkFmdGVyQ29ubmVjdFJvdXRlJywgbmF2QWZ0ZXJDb25uZWN0Um91dGUgfHwgJycpO1xuXG4gICAgdGhpcy53YWxsZXRQcm92aWRlciA9IG5ldyBXYWxsZXRQcm92aWRlcihcbiAgICAgIGAke3RoaXMuY29uZmlnLndhbGxldFVSTH0ke0RBUFBfSU5JVF9ST1VURX1gXG4gICAgKTtcbiAgICB0aGlzLndhbGxldFByb3ZpZGVyLmxvZ2luKHtcbiAgICAgIGNhbGxiYWNrVXJsOiB3aW5kb3cubG9jYXRpb24uaHJlZixcbiAgICAgIHRva2VuOiBpbml0LFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHsgY2xpZW50LCBpbml0IH07XG4gIH1cblxuICBvdmVycmlkZSBhc3luYyBsb2dvdXQoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgaWYgKCF0aGlzLndhbGxldFByb3ZpZGVyKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdQcm92aWRlciB3YXMgbm90IHJlaW5pdGlhbGl6ZWQhJyk7XG4gICAgc3VwZXIubG9nb3V0KCk7XG4gICAgdGhpcy53YWxsZXRQcm92aWRlci5sb2dvdXQoeyBjYWxsYmFja1VybDogd2luZG93LmxvY2F0aW9uLmhyZWYgfSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBvdmVycmlkZSByZUluaXRpYWxpemUoKTogdm9pZCB7XG4gICAgaWYgKFxuICAgICAgdGhpcy5sb2NhbEFjY291bnQgJiZcbiAgICAgIHRoaXMubG9jYWxBY2NvdW50LmFjY291bnQuY3VycmVudFByb3ZpZGVyICE9PSBQcm92aWRlcnNUeXBlLldlYldhbGxldFxuICAgIClcbiAgICAgIHJldHVybjtcbiAgICB0aGlzLndhbGxldFByb3ZpZGVyID0gbmV3IFdhbGxldFByb3ZpZGVyKFxuICAgICAgYCR7dGhpcy5jb25maWcud2FsbGV0VVJMfSR7REFQUF9JTklUX1JPVVRFfWBcbiAgICApO1xuICB9XG5cbiAgb3ZlcnJpZGUgYXN5bmMgc2VuZFRyYW5zYWN0aW9ucyhcbiAgICB0cmFuc2FjdGlvbnM6IElQbGFpblRyYW5zYWN0aW9uT2JqZWN0W10sXG4gICAgdHhJZDogbnVtYmVyXG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHR4QXJyYXkgPSB0cmFuc2FjdGlvbnMubWFwKCh0eCkgPT4ge1xuICAgICAgY29uc3QgdHgxID0gVHJhbnNhY3Rpb24uZnJvbVBsYWluT2JqZWN0KHR4KTtcbiAgICAgIHJldHVybiB0eDE7XG4gICAgfSk7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgdXJsID0gbmV3IFVSTCh3aW5kb3cubG9jYXRpb24uaHJlZik7XG4gICAgICB1cmwuc2VhcmNoUGFyYW1zLmFwcGVuZCgnc2lnblNlc3Npb24nLCB0eElkLnRvU3RyaW5nKCkpO1xuXG4gICAgICB0aGlzLndhbGxldFByb3ZpZGVyPy5zaWduVHJhbnNhY3Rpb25zKHR4QXJyYXksIHtcbiAgICAgICAgY2FsbGJhY2tVcmw6IGVuY29kZVVSSUNvbXBvbmVudCh1cmwuaHJlZiksXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICB9XG59XG4iXX0=