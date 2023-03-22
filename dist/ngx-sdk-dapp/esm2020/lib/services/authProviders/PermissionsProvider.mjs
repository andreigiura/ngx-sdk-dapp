import { Injectable } from '@angular/core';
import { takeWhile } from 'rxjs';
import { ProvidersType } from './genericProvider';
import * as i0 from "@angular/core";
import * as i1 from "./extension/extensionProvider.service";
import * as i2 from "./webWallet/web-walletProvider.service";
import * as i3 from "./xPortal/x-portal.service";
import * as i4 from "../account/account.service";
import * as i5 from "../authentication/authentication.service";
export class PermissionsProviderService {
    constructor(extensionProvider, webWalletProvider, xportalProvider, accountService, authService) {
        this.extensionProvider = extensionProvider;
        this.webWalletProvider = webWalletProvider;
        this.xportalProvider = xportalProvider;
        this.accountSubscription = null;
        this._provider = null;
        this.localAccountService = accountService;
        let providerSet = false;
        if (accountService.account$) {
            this.accountSubscription = accountService.account$
                .pipe(takeWhile((account) => !providerSet))
                .subscribe((account) => {
                if (account.currentProvider !== ProvidersType.EMPTY &&
                    authService.isAuthenticated()) {
                    providerSet = true;
                    this.setProvider(account.currentProvider);
                    this.refreshRemoteData();
                }
            });
        }
    }
    refreshRemoteData() {
        this.localAccountService.refetchAccountData();
    }
    setProvider(providerType) {
        switch (providerType) {
            case ProvidersType.Extension:
                this.provider = this.extensionProvider;
                break;
            case ProvidersType.WebWallet:
                this.provider = this.webWalletProvider;
                break;
            case ProvidersType.XPortal:
                this.provider = this.xportalProvider;
                break;
            default:
                this.provider = null;
                break;
        }
    }
    get provider() {
        return this._provider;
    }
    set provider(provider) {
        this._provider = provider;
    }
    connect(navAfterConnectRoute) {
        if (this._provider) {
            return this._provider.connect(navAfterConnectRoute);
        }
        throw new Error('Provider is not set');
    }
    logout(navAfterConnectRoute) {
        if (this._provider) {
            return this._provider.logout();
        }
        throw new Error('Provider is not set');
    }
    async cancelAction() {
        if (this._provider && this._provider.cancelAction) {
            this._provider.cancelAction();
            return;
        }
        throw new Error('Provider is not set123');
    }
    sendTransactions(transactions, txId) {
        if (this._provider) {
            return this._provider.sendTransactions(transactions, txId);
        }
        throw new Error('Provider is not set');
    }
}
PermissionsProviderService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: PermissionsProviderService, deps: [{ token: i1.ExtensionProviderService }, { token: i2.WebWalletProviderService }, { token: i3.XPortalProviderService }, { token: i4.AccountService }, { token: i5.AuthenticationService }], target: i0.ɵɵFactoryTarget.Injectable });
PermissionsProviderService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: PermissionsProviderService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: PermissionsProviderService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.ExtensionProviderService }, { type: i2.WebWalletProviderService }, { type: i3.XPortalProviderService }, { type: i4.AccountService }, { type: i5.AuthenticationService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGVybWlzc2lvbnNQcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1zZGstZGFwcC9zcmMvbGliL3NlcnZpY2VzL2F1dGhQcm92aWRlcnMvUGVybWlzc2lvbnNQcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBNkIsU0FBUyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBSTVELE9BQU8sRUFBbUIsYUFBYSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7Ozs7Ozs7QUFhbkUsTUFBTSxPQUFPLDBCQUEwQjtJQUlyQyxZQUNVLGlCQUEyQyxFQUMzQyxpQkFBMkMsRUFDM0MsZUFBdUMsRUFDL0MsY0FBOEIsRUFDOUIsV0FBa0M7UUFKMUIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUEwQjtRQUMzQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQTBCO1FBQzNDLG9CQUFlLEdBQWYsZUFBZSxDQUF3QjtRQUp6Qyx3QkFBbUIsR0FBd0IsSUFBSSxDQUFDO1FBUXRELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxjQUFjLENBQUM7UUFDMUMsSUFBSSxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLElBQUksY0FBYyxDQUFDLFFBQVEsRUFBRTtZQUMzQixJQUFJLENBQUMsbUJBQW1CLEdBQUcsY0FBYyxDQUFDLFFBQVE7aUJBQy9DLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUM7aUJBQzFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO2dCQUNyQixJQUNFLE9BQU8sQ0FBQyxlQUFlLEtBQUssYUFBYSxDQUFDLEtBQUs7b0JBQy9DLFdBQVcsQ0FBQyxlQUFlLEVBQUUsRUFDN0I7b0JBQ0EsV0FBVyxHQUFHLElBQUksQ0FBQztvQkFDbkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsZUFBZ0MsQ0FBQyxDQUFDO29CQUMzRCxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztpQkFDMUI7WUFDSCxDQUFDLENBQUMsQ0FBQztTQUNOO0lBQ0gsQ0FBQztJQUVPLGlCQUFpQjtRQUN2QixJQUFJLENBQUMsbUJBQW1CLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUNoRCxDQUFDO0lBRUQsV0FBVyxDQUFDLFlBQTJCO1FBQ3JDLFFBQVEsWUFBWSxFQUFFO1lBQ3BCLEtBQUssYUFBYSxDQUFDLFNBQVM7Z0JBQzFCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDO2dCQUN2QyxNQUFNO1lBRVIsS0FBSyxhQUFhLENBQUMsU0FBUztnQkFDMUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUM7Z0JBQ3ZDLE1BQU07WUFFUixLQUFLLGFBQWEsQ0FBQyxPQUFPO2dCQUN4QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUM7Z0JBQ3JDLE1BQU07WUFDUjtnQkFDRSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztnQkFDckIsTUFBTTtTQUNUO0lBQ0gsQ0FBQztJQUVELElBQVcsUUFBUTtRQUNqQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQztJQUVELElBQVksUUFBUSxDQUFDLFFBQTBCO1FBQzdDLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO0lBQzVCLENBQUM7SUFFTSxPQUFPLENBQUMsb0JBQTRCO1FBQ3pDLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNsQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7U0FDckQ7UUFDRCxNQUFNLElBQUksS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVNLE1BQU0sQ0FBQyxvQkFBNkI7UUFDekMsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2xCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUNoQztRQUNELE1BQU0sSUFBSSxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRU0sS0FBSyxDQUFDLFlBQVk7UUFDdkIsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFO1lBQ2pELElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDOUIsT0FBTztTQUNSO1FBQ0QsTUFBTSxJQUFJLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFTSxnQkFBZ0IsQ0FDckIsWUFBdUMsRUFDdkMsSUFBWTtRQUVaLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNsQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQzVEO1FBQ0QsTUFBTSxJQUFJLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7O3VIQTNGVSwwQkFBMEI7MkhBQTFCLDBCQUEwQixjQUZ6QixNQUFNOzJGQUVQLDBCQUEwQjtrQkFIdEMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJUGxhaW5UcmFuc2FjdGlvbk9iamVjdCB9IGZyb20gJ0BtdWx0aXZlcnN4L3Nkay1jb3JlL291dCc7XG5pbXBvcnQgeyBmaXJzdCwgU3Vic2NyaXB0aW9uLCB0YWtlLCB0YWtlV2hpbGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEFjY291bnRTZXJ2aWNlIH0gZnJvbSAnLi4vYWNjb3VudC9hY2NvdW50LnNlcnZpY2UnO1xuaW1wb3J0IHsgQXV0aGVudGljYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vYXV0aGVudGljYXRpb24vYXV0aGVudGljYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBFeHRlbnNpb25Qcm92aWRlclNlcnZpY2UgfSBmcm9tICcuL2V4dGVuc2lvbi9leHRlbnNpb25Qcm92aWRlci5zZXJ2aWNlJztcbmltcG9ydCB7IEdlbmVyaWNQcm92aWRlciwgUHJvdmlkZXJzVHlwZSB9IGZyb20gJy4vZ2VuZXJpY1Byb3ZpZGVyJztcbmltcG9ydCB7IFdlYldhbGxldFByb3ZpZGVyU2VydmljZSB9IGZyb20gJy4vd2ViV2FsbGV0L3dlYi13YWxsZXRQcm92aWRlci5zZXJ2aWNlJztcbmltcG9ydCB7IFhQb3J0YWxQcm92aWRlclNlcnZpY2UgfSBmcm9tICcuL3hQb3J0YWwveC1wb3J0YWwuc2VydmljZSc7XG5cbnR5cGUgQWxsUHJvdmlkZXJzVHlwZSA9XG4gIHwgRXh0ZW5zaW9uUHJvdmlkZXJTZXJ2aWNlXG4gIHwgWFBvcnRhbFByb3ZpZGVyU2VydmljZVxuICB8IFdlYldhbGxldFByb3ZpZGVyU2VydmljZVxuICB8IG51bGw7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBQZXJtaXNzaW9uc1Byb3ZpZGVyU2VydmljZSB7XG4gIHByaXZhdGUgX3Byb3ZpZGVyOiBBbGxQcm92aWRlcnNUeXBlO1xuICBwcml2YXRlIGxvY2FsQWNjb3VudFNlcnZpY2U6IEFjY291bnRTZXJ2aWNlO1xuICBwcml2YXRlIGFjY291bnRTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiB8IG51bGwgPSBudWxsO1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGV4dGVuc2lvblByb3ZpZGVyOiBFeHRlbnNpb25Qcm92aWRlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSB3ZWJXYWxsZXRQcm92aWRlcjogV2ViV2FsbGV0UHJvdmlkZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgeHBvcnRhbFByb3ZpZGVyOiBYUG9ydGFsUHJvdmlkZXJTZXJ2aWNlLFxuICAgIGFjY291bnRTZXJ2aWNlOiBBY2NvdW50U2VydmljZSxcbiAgICBhdXRoU2VydmljZTogQXV0aGVudGljYXRpb25TZXJ2aWNlXG4gICkge1xuICAgIHRoaXMuX3Byb3ZpZGVyID0gbnVsbDtcbiAgICB0aGlzLmxvY2FsQWNjb3VudFNlcnZpY2UgPSBhY2NvdW50U2VydmljZTtcbiAgICBsZXQgcHJvdmlkZXJTZXQgPSBmYWxzZTtcbiAgICBpZiAoYWNjb3VudFNlcnZpY2UuYWNjb3VudCQpIHtcbiAgICAgIHRoaXMuYWNjb3VudFN1YnNjcmlwdGlvbiA9IGFjY291bnRTZXJ2aWNlLmFjY291bnQkXG4gICAgICAgIC5waXBlKHRha2VXaGlsZSgoYWNjb3VudCkgPT4gIXByb3ZpZGVyU2V0KSlcbiAgICAgICAgLnN1YnNjcmliZSgoYWNjb3VudCkgPT4ge1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIGFjY291bnQuY3VycmVudFByb3ZpZGVyICE9PSBQcm92aWRlcnNUeXBlLkVNUFRZICYmXG4gICAgICAgICAgICBhdXRoU2VydmljZS5pc0F1dGhlbnRpY2F0ZWQoKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgcHJvdmlkZXJTZXQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5zZXRQcm92aWRlcihhY2NvdW50LmN1cnJlbnRQcm92aWRlciBhcyBQcm92aWRlcnNUeXBlKTtcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaFJlbW90ZURhdGEoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcmVmcmVzaFJlbW90ZURhdGEoKSB7XG4gICAgdGhpcy5sb2NhbEFjY291bnRTZXJ2aWNlLnJlZmV0Y2hBY2NvdW50RGF0YSgpO1xuICB9XG5cbiAgc2V0UHJvdmlkZXIocHJvdmlkZXJUeXBlOiBQcm92aWRlcnNUeXBlKSB7XG4gICAgc3dpdGNoIChwcm92aWRlclR5cGUpIHtcbiAgICAgIGNhc2UgUHJvdmlkZXJzVHlwZS5FeHRlbnNpb246XG4gICAgICAgIHRoaXMucHJvdmlkZXIgPSB0aGlzLmV4dGVuc2lvblByb3ZpZGVyO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBQcm92aWRlcnNUeXBlLldlYldhbGxldDpcbiAgICAgICAgdGhpcy5wcm92aWRlciA9IHRoaXMud2ViV2FsbGV0UHJvdmlkZXI7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIFByb3ZpZGVyc1R5cGUuWFBvcnRhbDpcbiAgICAgICAgdGhpcy5wcm92aWRlciA9IHRoaXMueHBvcnRhbFByb3ZpZGVyO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRoaXMucHJvdmlkZXIgPSBudWxsO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2V0IHByb3ZpZGVyKCk6IEFsbFByb3ZpZGVyc1R5cGUge1xuICAgIHJldHVybiB0aGlzLl9wcm92aWRlcjtcbiAgfVxuXG4gIHByaXZhdGUgc2V0IHByb3ZpZGVyKHByb3ZpZGVyOiBBbGxQcm92aWRlcnNUeXBlKSB7XG4gICAgdGhpcy5fcHJvdmlkZXIgPSBwcm92aWRlcjtcbiAgfVxuXG4gIHB1YmxpYyBjb25uZWN0KG5hdkFmdGVyQ29ubmVjdFJvdXRlOiBzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xuICAgIGlmICh0aGlzLl9wcm92aWRlcikge1xuICAgICAgcmV0dXJuIHRoaXMuX3Byb3ZpZGVyLmNvbm5lY3QobmF2QWZ0ZXJDb25uZWN0Um91dGUpO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1Byb3ZpZGVyIGlzIG5vdCBzZXQnKTtcbiAgfVxuXG4gIHB1YmxpYyBsb2dvdXQobmF2QWZ0ZXJDb25uZWN0Um91dGU/OiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBpZiAodGhpcy5fcHJvdmlkZXIpIHtcbiAgICAgIHJldHVybiB0aGlzLl9wcm92aWRlci5sb2dvdXQoKTtcbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKCdQcm92aWRlciBpcyBub3Qgc2V0Jyk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgY2FuY2VsQWN0aW9uKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmICh0aGlzLl9wcm92aWRlciAmJiB0aGlzLl9wcm92aWRlci5jYW5jZWxBY3Rpb24pIHtcbiAgICAgIHRoaXMuX3Byb3ZpZGVyLmNhbmNlbEFjdGlvbigpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1Byb3ZpZGVyIGlzIG5vdCBzZXQxMjMnKTtcbiAgfVxuXG4gIHB1YmxpYyBzZW5kVHJhbnNhY3Rpb25zKFxuICAgIHRyYW5zYWN0aW9uczogSVBsYWluVHJhbnNhY3Rpb25PYmplY3RbXSxcbiAgICB0eElkOiBudW1iZXJcbiAgKSB7XG4gICAgaWYgKHRoaXMuX3Byb3ZpZGVyKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcHJvdmlkZXIuc2VuZFRyYW5zYWN0aW9ucyh0cmFuc2FjdGlvbnMsIHR4SWQpO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1Byb3ZpZGVyIGlzIG5vdCBzZXQnKTtcbiAgfVxufVxuIl19