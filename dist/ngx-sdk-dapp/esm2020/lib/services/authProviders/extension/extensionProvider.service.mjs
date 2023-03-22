import { Inject, Injectable } from '@angular/core';
import { GenericProvider, ProvidersType } from '../genericProvider';
import { Transaction } from '@multiversx/sdk-core/out';
import { ExtensionProvider } from '@multiversx/sdk-extension-provider/out';
import { LoginAccount } from '../../../ngxs/account/account.actions';
import { DAPP_CONFIG } from '../../../config';
import * as i0 from "@angular/core";
import * as i1 from "@ngxs/store";
import * as i2 from "../../account/account.service";
import * as i3 from "../../authentication/authentication.service";
import * as i4 from "@angular/router";
export class ExtensionProviderService extends GenericProvider {
    constructor(store, accountService, authenticationService, config, router) {
        super(store, accountService, authenticationService, config);
        this.config = config;
        this.router = router;
        this.localStore = store;
        this.localAccount = accountService;
    }
    async connect(navAfterConnectRoute) {
        const { client, init } = await super.connect(navAfterConnectRoute);
        const extensionInstance = ExtensionProvider.getInstance();
        const extensionInitialized = await extensionInstance.init();
        if (!extensionInitialized) {
            throw new Error('Extension could not be initialized');
        }
        await extensionInstance.login({ token: init });
        const { signature, address } = extensionInstance.account;
        if (signature) {
            const accessToken = client.getToken(address, init, signature);
            this.localStore.dispatch(new LoginAccount({
                address,
                accessToken,
                currentProvider: ProvidersType.Extension,
            }));
        }
        if (navAfterConnectRoute)
            this.router.navigate([navAfterConnectRoute]);
        return { client, init };
    }
    async logout() {
        const extensionInstance = ExtensionProvider.getInstance();
        await extensionInstance.logout();
        this.router.navigate(['/']);
        return super.logout();
    }
    reInitialize(account) {
        if (this.localAccount &&
            this.localAccount.account.currentProvider !== ProvidersType.Extension)
            return;
        ExtensionProvider.getInstance().init();
        ExtensionProvider.getInstance().setAddress(account.address);
    }
    async sendTransactions(transactions, txId) {
        const txArray = transactions.map((tx) => {
            const tx1 = Transaction.fromPlainObject(tx);
            return tx1;
        });
        try {
            const result = await ExtensionProvider.getInstance().signTransactions(txArray);
            this.addSignedTransactionsToState(result.map((tx) => tx.toPlainObject()), txId);
        }
        catch (error) {
            this.addToCancelledTransaction(txId);
        }
    }
    cancelAction() {
        ExtensionProvider.getInstance().cancelAction();
    }
}
ExtensionProviderService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: ExtensionProviderService, deps: [{ token: i1.Store }, { token: i2.AccountService }, { token: i3.AuthenticationService }, { token: DAPP_CONFIG }, { token: i4.Router }], target: i0.ɵɵFactoryTarget.Injectable });
ExtensionProviderService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: ExtensionProviderService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: ExtensionProviderService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.Store }, { type: i2.AccountService }, { type: i3.AuthenticationService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DAPP_CONFIG]
                }] }, { type: i4.Router }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0ZW5zaW9uUHJvdmlkZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1zZGstZGFwcC9zcmMvbGliL3NlcnZpY2VzL2F1dGhQcm92aWRlcnMvZXh0ZW5zaW9uL2V4dGVuc2lvblByb3ZpZGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUVwRSxPQUFPLEVBQTJCLFdBQVcsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2hGLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBRzNFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUlyRSxPQUFPLEVBQWMsV0FBVyxFQUFFLE1BQU0saUJBQWlCLENBQUM7Ozs7OztBQUsxRCxNQUFNLE9BQU8sd0JBQXlCLFNBQVEsZUFBZTtJQUczRCxZQUNFLEtBQVksRUFDWixjQUE4QixFQUM5QixxQkFBNEMsRUFDZCxNQUFrQixFQUN4QyxNQUFjO1FBRXRCLEtBQUssQ0FBQyxLQUFLLEVBQUUsY0FBYyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBSDlCLFdBQU0sR0FBTixNQUFNLENBQVk7UUFDeEMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUd0QixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUN4QixJQUFJLENBQUMsWUFBWSxHQUFHLGNBQWMsQ0FBQztJQUNyQyxDQUFDO0lBRVEsS0FBSyxDQUFDLE9BQU8sQ0FBQyxvQkFBNEI7UUFJakQsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxNQUFNLEtBQUssQ0FBQyxPQUFPLENBQUMsb0JBQW9CLENB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TUFBTTtpQkFDbkI7OzBCQVFJLE1BQU07MkJBQUMsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgR2VuZXJpY1Byb3ZpZGVyLCBQcm92aWRlcnNUeXBlIH0gZnJvbSAnLi4vZ2VuZXJpY1Byb3ZpZGVyJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBJUGxhaW5UcmFuc2FjdGlvbk9iamVjdCwgVHJhbnNhY3Rpb24gfSBmcm9tICdAbXVsdGl2ZXJzeC9zZGstY29yZS9vdXQnO1xuaW1wb3J0IHsgRXh0ZW5zaW9uUHJvdmlkZXIgfSBmcm9tICdAbXVsdGl2ZXJzeC9zZGstZXh0ZW5zaW9uLXByb3ZpZGVyL291dCc7XG5pbXBvcnQgeyBOYXRpdmVBdXRoQ2xpZW50IH0gZnJvbSAnQG11bHRpdmVyc3gvc2RrLW5hdGl2ZS1hdXRoLWNsaWVudCc7XG5pbXBvcnQgeyBTdG9yZSB9IGZyb20gJ0BuZ3hzL3N0b3JlJztcbmltcG9ydCB7IExvZ2luQWNjb3VudCB9IGZyb20gJy4uLy4uLy4uL25neHMvYWNjb3VudC9hY2NvdW50LmFjdGlvbnMnO1xuaW1wb3J0IHsgQWNjb3VudFN0YXRlTW9kZWwgfSBmcm9tICcuLi8uLi8uLi9uZ3hzL2FjY291bnQvYWNjb3VudC5zbGljZSc7XG5pbXBvcnQgeyBBY2NvdW50U2VydmljZSB9IGZyb20gJy4uLy4uL2FjY291bnQvYWNjb3VudC5zZXJ2aWNlJztcbmltcG9ydCB7IEF1dGhlbnRpY2F0aW9uU2VydmljZSB9IGZyb20gJy4uLy4uL2F1dGhlbnRpY2F0aW9uL2F1dGhlbnRpY2F0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGFwcENvbmZpZywgREFQUF9DT05GSUcgfSBmcm9tICcuLi8uLi8uLi9jb25maWcnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgRXh0ZW5zaW9uUHJvdmlkZXJTZXJ2aWNlIGV4dGVuZHMgR2VuZXJpY1Byb3ZpZGVyIHtcbiAgcHJpdmF0ZSBsb2NhbFN0b3JlOiBTdG9yZTtcbiAgcHJpdmF0ZSBsb2NhbEFjY291bnQ6IEFjY291bnRTZXJ2aWNlO1xuICBjb25zdHJ1Y3RvcihcbiAgICBzdG9yZTogU3RvcmUsXG4gICAgYWNjb3VudFNlcnZpY2U6IEFjY291bnRTZXJ2aWNlLFxuICAgIGF1dGhlbnRpY2F0aW9uU2VydmljZTogQXV0aGVudGljYXRpb25TZXJ2aWNlLFxuICAgIEBJbmplY3QoREFQUF9DT05GSUcpIG92ZXJyaWRlIGNvbmZpZzogRGFwcENvbmZpZyxcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyXG4gICkge1xuICAgIHN1cGVyKHN0b3JlLCBhY2NvdW50U2VydmljZSwgYXV0aGVudGljYXRpb25TZXJ2aWNlLCBjb25maWcpO1xuICAgIHRoaXMubG9jYWxTdG9yZSA9IHN0b3JlO1xuICAgIHRoaXMubG9jYWxBY2NvdW50ID0gYWNjb3VudFNlcnZpY2U7XG4gIH1cblxuICBvdmVycmlkZSBhc3luYyBjb25uZWN0KG5hdkFmdGVyQ29ubmVjdFJvdXRlOiBzdHJpbmcpOiBQcm9taXNlPHtcbiAgICBjbGllbnQ6IE5hdGl2ZUF1dGhDbGllbnQ7XG4gICAgaW5pdDogc3RyaW5nO1xuICB9PiB7XG4gICAgY29uc3QgeyBjbGllbnQsIGluaXQgfSA9IGF3YWl0IHN1cGVyLmNvbm5lY3QobmF2QWZ0ZXJDb25uZWN0Um91dGUpO1xuXG4gICAgY29uc3QgZXh0ZW5zaW9uSW5zdGFuY2UgPSBFeHRlbnNpb25Qcm92aWRlci5nZXRJbnN0YW5jZSgpO1xuXG4gICAgY29uc3QgZXh0ZW5zaW9uSW5pdGlhbGl6ZWQgPSBhd2FpdCBleHRlbnNpb25JbnN0YW5jZS5pbml0KCk7XG4gICAgaWYgKCFleHRlbnNpb25Jbml0aWFsaXplZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdFeHRlbnNpb24gY291bGQgbm90IGJlIGluaXRpYWxpemVkJyk7XG4gICAgfVxuXG4gICAgYXdhaXQgZXh0ZW5zaW9uSW5zdGFuY2UubG9naW4oeyB0b2tlbjogaW5pdCB9KTtcbiAgICBjb25zdCB7IHNpZ25hdHVyZSwgYWRkcmVzcyB9ID0gZXh0ZW5zaW9uSW5zdGFuY2UuYWNjb3VudDtcbiAgICBpZiAoc2lnbmF0dXJlKSB7XG4gICAgICBjb25zdCBhY2Nlc3NUb2tlbiA9IGNsaWVudC5nZXRUb2tlbihhZGRyZXNzLCBpbml0LCBzaWduYXR1cmUpO1xuICAgICAgdGhpcy5sb2NhbFN0b3JlLmRpc3BhdGNoKFxuICAgICAgICBuZXcgTG9naW5BY2NvdW50KHtcbiAgICAgICAgICBhZGRyZXNzLFxuICAgICAgICAgIGFjY2Vzc1Rva2VuLFxuICAgICAgICAgIGN1cnJlbnRQcm92aWRlcjogUHJvdmlkZXJzVHlwZS5FeHRlbnNpb24sXG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAobmF2QWZ0ZXJDb25uZWN0Um91dGUpIHRoaXMucm91dGVyLm5hdmlnYXRlKFtuYXZBZnRlckNvbm5lY3RSb3V0ZV0pO1xuXG4gICAgcmV0dXJuIHsgY2xpZW50LCBpbml0IH07XG4gIH1cblxuICBvdmVycmlkZSBhc3luYyBsb2dvdXQoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgY29uc3QgZXh0ZW5zaW9uSW5zdGFuY2UgPSBFeHRlbnNpb25Qcm92aWRlci5nZXRJbnN0YW5jZSgpO1xuICAgIGF3YWl0IGV4dGVuc2lvbkluc3RhbmNlLmxvZ291dCgpO1xuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnLyddKTtcbiAgICByZXR1cm4gc3VwZXIubG9nb3V0KCk7XG4gIH1cblxuICBvdmVycmlkZSByZUluaXRpYWxpemUoYWNjb3VudDogQWNjb3VudFN0YXRlTW9kZWwpOiB2b2lkIHtcbiAgICBpZiAoXG4gICAgICB0aGlzLmxvY2FsQWNjb3VudCAmJlxuICAgICAgdGhpcy5sb2NhbEFjY291bnQuYWNjb3VudC5jdXJyZW50UHJvdmlkZXIgIT09IFByb3ZpZGVyc1R5cGUuRXh0ZW5zaW9uXG4gICAgKVxuICAgICAgcmV0dXJuO1xuICAgIEV4dGVuc2lvblByb3ZpZGVyLmdldEluc3RhbmNlKCkuaW5pdCgpO1xuICAgIEV4dGVuc2lvblByb3ZpZGVyLmdldEluc3RhbmNlKCkuc2V0QWRkcmVzcyhhY2NvdW50LmFkZHJlc3MpO1xuICB9XG5cbiAgb3ZlcnJpZGUgYXN5bmMgc2VuZFRyYW5zYWN0aW9ucyhcbiAgICB0cmFuc2FjdGlvbnM6IElQbGFpblRyYW5zYWN0aW9uT2JqZWN0W10sXG4gICAgdHhJZDogbnVtYmVyXG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHR4QXJyYXkgPSB0cmFuc2FjdGlvbnMubWFwKCh0eCkgPT4ge1xuICAgICAgY29uc3QgdHgxID0gVHJhbnNhY3Rpb24uZnJvbVBsYWluT2JqZWN0KHR4KTtcbiAgICAgIHJldHVybiB0eDE7XG4gICAgfSk7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IEV4dGVuc2lvblByb3ZpZGVyLmdldEluc3RhbmNlKCkuc2lnblRyYW5zYWN0aW9ucyhcbiAgICAgICAgdHhBcnJheVxuICAgICAgKTtcbiAgICAgIHRoaXMuYWRkU2lnbmVkVHJhbnNhY3Rpb25zVG9TdGF0ZShcbiAgICAgICAgcmVzdWx0Lm1hcCgodHgpID0+IHR4LnRvUGxhaW5PYmplY3QoKSksXG4gICAgICAgIHR4SWRcbiAgICAgICk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHRoaXMuYWRkVG9DYW5jZWxsZWRUcmFuc2FjdGlvbih0eElkKTtcbiAgICB9XG4gIH1cblxuICBvdmVycmlkZSBjYW5jZWxBY3Rpb24oKTogdm9pZCB7XG4gICAgRXh0ZW5zaW9uUHJvdmlkZXIuZ2V0SW5zdGFuY2UoKS5jYW5jZWxBY3Rpb24oKTtcbiAgfVxufVxuIl19