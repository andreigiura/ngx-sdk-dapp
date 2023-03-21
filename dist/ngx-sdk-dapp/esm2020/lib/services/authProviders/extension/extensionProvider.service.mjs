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
        const { client, init } = await super.connect();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0ZW5zaW9uUHJvdmlkZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1zZGstZGFwcC9zcmMvbGliL3NlcnZpY2VzL2F1dGhQcm92aWRlcnMvZXh0ZW5zaW9uL2V4dGVuc2lvblByb3ZpZGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUVwRSxPQUFPLEVBQTJCLFdBQVcsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2hGLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBRzNFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUlyRSxPQUFPLEVBQWMsV0FBVyxFQUFFLE1BQU0saUJBQWlCLENBQUM7Ozs7OztBQUsxRCxNQUFNLE9BQU8sd0JBQXlCLFNBQVEsZUFBZTtJQUczRCxZQUNFLEtBQVksRUFDWixjQUE4QixFQUM5QixxQkFBNEMsRUFDZCxNQUFrQixFQUN4QyxNQUFjO1FBRXRCLEtBQUssQ0FBQyxLQUFLLEVBQUUsY0FBYyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBSDlCLFdBQU0sR0FBTixNQUFNLENBQVk7UUFDeEMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUd0QixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUN4QixJQUFJLENBQUMsWUFBWSxHQUFHLGNBQWMsQ0FBQztJQUNyQyxDQUFDO0lBRVEsS0FBSyxDQUFDLE9BQU8sQ0FBQyxvQkFBNkI7UUFJbEQsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxNQUFNLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUUv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ZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgR2VuZXJpY1Byb3ZpZGVyLCBQcm92aWRlcnNUeXBlIH0gZnJvbSAnLi4vZ2VuZXJpY1Byb3ZpZGVyJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBJUGxhaW5UcmFuc2FjdGlvbk9iamVjdCwgVHJhbnNhY3Rpb24gfSBmcm9tICdAbXVsdGl2ZXJzeC9zZGstY29yZS9vdXQnO1xuaW1wb3J0IHsgRXh0ZW5zaW9uUHJvdmlkZXIgfSBmcm9tICdAbXVsdGl2ZXJzeC9zZGstZXh0ZW5zaW9uLXByb3ZpZGVyL291dCc7XG5pbXBvcnQgeyBOYXRpdmVBdXRoQ2xpZW50IH0gZnJvbSAnQG11bHRpdmVyc3gvc2RrLW5hdGl2ZS1hdXRoLWNsaWVudCc7XG5pbXBvcnQgeyBTdG9yZSB9IGZyb20gJ0BuZ3hzL3N0b3JlJztcbmltcG9ydCB7IExvZ2luQWNjb3VudCB9IGZyb20gJy4uLy4uLy4uL25neHMvYWNjb3VudC9hY2NvdW50LmFjdGlvbnMnO1xuaW1wb3J0IHsgQWNjb3VudFN0YXRlTW9kZWwgfSBmcm9tICcuLi8uLi8uLi9uZ3hzL2FjY291bnQvYWNjb3VudC5zbGljZSc7XG5pbXBvcnQgeyBBY2NvdW50U2VydmljZSB9IGZyb20gJy4uLy4uL2FjY291bnQvYWNjb3VudC5zZXJ2aWNlJztcbmltcG9ydCB7IEF1dGhlbnRpY2F0aW9uU2VydmljZSB9IGZyb20gJy4uLy4uL2F1dGhlbnRpY2F0aW9uL2F1dGhlbnRpY2F0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGFwcENvbmZpZywgREFQUF9DT05GSUcgfSBmcm9tICcuLi8uLi8uLi9jb25maWcnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgRXh0ZW5zaW9uUHJvdmlkZXJTZXJ2aWNlIGV4dGVuZHMgR2VuZXJpY1Byb3ZpZGVyIHtcbiAgcHJpdmF0ZSBsb2NhbFN0b3JlOiBTdG9yZTtcbiAgcHJpdmF0ZSBsb2NhbEFjY291bnQ6IEFjY291bnRTZXJ2aWNlO1xuICBjb25zdHJ1Y3RvcihcbiAgICBzdG9yZTogU3RvcmUsXG4gICAgYWNjb3VudFNlcnZpY2U6IEFjY291bnRTZXJ2aWNlLFxuICAgIGF1dGhlbnRpY2F0aW9uU2VydmljZTogQXV0aGVudGljYXRpb25TZXJ2aWNlLFxuICAgIEBJbmplY3QoREFQUF9DT05GSUcpIG92ZXJyaWRlIGNvbmZpZzogRGFwcENvbmZpZyxcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyXG4gICkge1xuICAgIHN1cGVyKHN0b3JlLCBhY2NvdW50U2VydmljZSwgYXV0aGVudGljYXRpb25TZXJ2aWNlLCBjb25maWcpO1xuICAgIHRoaXMubG9jYWxTdG9yZSA9IHN0b3JlO1xuICAgIHRoaXMubG9jYWxBY2NvdW50ID0gYWNjb3VudFNlcnZpY2U7XG4gIH1cblxuICBvdmVycmlkZSBhc3luYyBjb25uZWN0KG5hdkFmdGVyQ29ubmVjdFJvdXRlPzogc3RyaW5nKTogUHJvbWlzZTx7XG4gICAgY2xpZW50OiBOYXRpdmVBdXRoQ2xpZW50O1xuICAgIGluaXQ6IHN0cmluZztcbiAgfT4ge1xuICAgIGNvbnN0IHsgY2xpZW50LCBpbml0IH0gPSBhd2FpdCBzdXBlci5jb25uZWN0KCk7XG5cbiAgICBjb25zdCBleHRlbnNpb25JbnN0YW5jZSA9IEV4dGVuc2lvblByb3ZpZGVyLmdldEluc3RhbmNlKCk7XG5cbiAgICBjb25zdCBleHRlbnNpb25Jbml0aWFsaXplZCA9IGF3YWl0IGV4dGVuc2lvbkluc3RhbmNlLmluaXQoKTtcbiAgICBpZiAoIWV4dGVuc2lvbkluaXRpYWxpemVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4dGVuc2lvbiBjb3VsZCBub3QgYmUgaW5pdGlhbGl6ZWQnKTtcbiAgICB9XG5cbiAgICBhd2FpdCBleHRlbnNpb25JbnN0YW5jZS5sb2dpbih7IHRva2VuOiBpbml0IH0pO1xuICAgIGNvbnN0IHsgc2lnbmF0dXJlLCBhZGRyZXNzIH0gPSBleHRlbnNpb25JbnN0YW5jZS5hY2NvdW50O1xuICAgIGlmIChzaWduYXR1cmUpIHtcbiAgICAgIGNvbnN0IGFjY2Vzc1Rva2VuID0gY2xpZW50LmdldFRva2VuKGFkZHJlc3MsIGluaXQsIHNpZ25hdHVyZSk7XG4gICAgICB0aGlzLmxvY2FsU3RvcmUuZGlzcGF0Y2goXG4gICAgICAgIG5ldyBMb2dpbkFjY291bnQoe1xuICAgICAgICAgIGFkZHJlc3MsXG4gICAgICAgICAgYWNjZXNzVG9rZW4sXG4gICAgICAgICAgY3VycmVudFByb3ZpZGVyOiBQcm92aWRlcnNUeXBlLkV4dGVuc2lvbixcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfVxuICAgIGlmIChuYXZBZnRlckNvbm5lY3RSb3V0ZSkgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW25hdkFmdGVyQ29ubmVjdFJvdXRlXSk7XG5cbiAgICByZXR1cm4geyBjbGllbnQsIGluaXQgfTtcbiAgfVxuXG4gIG92ZXJyaWRlIGFzeW5jIGxvZ291dCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBjb25zdCBleHRlbnNpb25JbnN0YW5jZSA9IEV4dGVuc2lvblByb3ZpZGVyLmdldEluc3RhbmNlKCk7XG4gICAgYXdhaXQgZXh0ZW5zaW9uSW5zdGFuY2UubG9nb3V0KCk7XG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvJ10pO1xuICAgIHJldHVybiBzdXBlci5sb2dvdXQoKTtcbiAgfVxuXG4gIG92ZXJyaWRlIHJlSW5pdGlhbGl6ZShhY2NvdW50OiBBY2NvdW50U3RhdGVNb2RlbCk6IHZvaWQge1xuICAgIGlmIChcbiAgICAgIHRoaXMubG9jYWxBY2NvdW50ICYmXG4gICAgICB0aGlzLmxvY2FsQWNjb3VudC5hY2NvdW50LmN1cnJlbnRQcm92aWRlciAhPT0gUHJvdmlkZXJzVHlwZS5FeHRlbnNpb25cbiAgICApXG4gICAgICByZXR1cm47XG4gICAgRXh0ZW5zaW9uUHJvdmlkZXIuZ2V0SW5zdGFuY2UoKS5pbml0KCk7XG4gICAgRXh0ZW5zaW9uUHJvdmlkZXIuZ2V0SW5zdGFuY2UoKS5zZXRBZGRyZXNzKGFjY291bnQuYWRkcmVzcyk7XG4gIH1cblxuICBvdmVycmlkZSBhc3luYyBzZW5kVHJhbnNhY3Rpb25zKFxuICAgIHRyYW5zYWN0aW9uczogSVBsYWluVHJhbnNhY3Rpb25PYmplY3RbXSxcbiAgICB0eElkOiBudW1iZXJcbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgdHhBcnJheSA9IHRyYW5zYWN0aW9ucy5tYXAoKHR4KSA9PiB7XG4gICAgICBjb25zdCB0eDEgPSBUcmFuc2FjdGlvbi5mcm9tUGxhaW5PYmplY3QodHgpO1xuICAgICAgcmV0dXJuIHR4MTtcbiAgICB9KTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgRXh0ZW5zaW9uUHJvdmlkZXIuZ2V0SW5zdGFuY2UoKS5zaWduVHJhbnNhY3Rpb25zKFxuICAgICAgICB0eEFycmF5XG4gICAgICApO1xuICAgICAgdGhpcy5hZGRTaWduZWRUcmFuc2FjdGlvbnNUb1N0YXRlKFxuICAgICAgICByZXN1bHQubWFwKCh0eCkgPT4gdHgudG9QbGFpbk9iamVjdCgpKSxcbiAgICAgICAgdHhJZFxuICAgICAgKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhpcy5hZGRUb0NhbmNlbGxlZFRyYW5zYWN0aW9uKHR4SWQpO1xuICAgIH1cbiAgfVxufVxuIl19