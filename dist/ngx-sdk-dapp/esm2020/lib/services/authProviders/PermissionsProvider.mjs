import { Injectable } from '@angular/core';
import { takeWhile } from 'rxjs';
import { ProvidersType } from './genericProvider';
import * as i0 from "@angular/core";
import * as i1 from "./extension/extensionProvider.service";
import * as i2 from "./webWallet/web-walletProvider.service";
import * as i3 from "../account/account.service";
import * as i4 from "../authentication/authentication.service";
export class PermissionsProviderService {
    constructor(extensionProvider, webWalletProvider, accountService, authService) {
        this.extensionProvider = extensionProvider;
        this.webWalletProvider = webWalletProvider;
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
    sendTransactions(transactions, txId) {
        if (this._provider) {
            return this._provider.sendTransactions(transactions, txId);
        }
        throw new Error('Provider is not set');
    }
}
PermissionsProviderService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: PermissionsProviderService, deps: [{ token: i1.ExtensionProviderService }, { token: i2.WebWalletProviderService }, { token: i3.AccountService }, { token: i4.AuthenticationService }], target: i0.ɵɵFactoryTarget.Injectable });
PermissionsProviderService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: PermissionsProviderService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: PermissionsProviderService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.ExtensionProviderService }, { type: i2.WebWalletProviderService }, { type: i3.AccountService }, { type: i4.AuthenticationService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGVybWlzc2lvbnNQcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1zZGstZGFwcC9zcmMvbGliL3NlcnZpY2VzL2F1dGhQcm92aWRlcnMvUGVybWlzc2lvbnNQcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBNkIsU0FBUyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBSTVELE9BQU8sRUFBbUIsYUFBYSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7Ozs7OztBQWFuRSxNQUFNLE9BQU8sMEJBQTBCO0lBSXJDLFlBQ1UsaUJBQTJDLEVBQzNDLGlCQUEyQyxFQUNuRCxjQUE4QixFQUM5QixXQUFrQztRQUgxQixzQkFBaUIsR0FBakIsaUJBQWlCLENBQTBCO1FBQzNDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBMEI7UUFIN0Msd0JBQW1CLEdBQXdCLElBQUksQ0FBQztRQU90RCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsbUJBQW1CLEdBQUcsY0FBYyxDQUFDO1FBQzFDLElBQUksV0FBVyxHQUFHLEtBQUssQ0FBQztRQUN4QixJQUFJLGNBQWMsQ0FBQyxRQUFRLEVBQUU7WUFDM0IsSUFBSSxDQUFDLG1CQUFtQixHQUFHLGNBQWMsQ0FBQyxRQUFRO2lCQUMvQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2lCQUMxQyxTQUFTLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtnQkFDckIsSUFDRSxPQUFPLENBQUMsZUFBZSxLQUFLLGFBQWEsQ0FBQyxLQUFLO29CQUMvQyxXQUFXLENBQUMsZUFBZSxFQUFFLEVBQzdCO29CQUNBLFdBQVcsR0FBRyxJQUFJLENBQUM7b0JBQ25CLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLGVBQWdDLENBQUMsQ0FBQztvQkFDM0QsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7aUJBQzFCO1lBQ0gsQ0FBQyxDQUFDLENBQUM7U0FDTjtJQUNILENBQUM7SUFFTyxpQkFBaUI7UUFDdkIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDaEQsQ0FBQztJQUVELFdBQVcsQ0FBQyxZQUEyQjtRQUNyQyxRQUFRLFlBQVksRUFBRTtZQUNwQixLQUFLLGFBQWEsQ0FBQyxTQUFTO2dCQUMxQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztnQkFDdkMsTUFBTTtZQUVSLEtBQUssYUFBYSxDQUFDLFNBQVM7Z0JBQzFCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDO2dCQUN2QyxNQUFNO1lBQ1I7Z0JBQ0UsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7Z0JBQ3JCLE1BQU07U0FDVDtJQUNILENBQUM7SUFFRCxJQUFXLFFBQVE7UUFDakIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hCLENBQUM7SUFFRCxJQUFZLFFBQVEsQ0FBQyxRQUEwQjtRQUM3QyxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztJQUM1QixDQUFDO0lBRU0sT0FBTyxDQUFDLG9CQUE2QjtRQUMxQyxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbEIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1NBQ3JEO1FBQ0QsTUFBTSxJQUFJLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFTSxNQUFNLENBQUMsb0JBQTZCO1FBQ3pDLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNsQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDaEM7UUFDRCxNQUFNLElBQUksS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVNLGdCQUFnQixDQUNyQixZQUF1QyxFQUN2QyxJQUFZO1FBRVosSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2xCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDNUQ7UUFDRCxNQUFNLElBQUksS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFDekMsQ0FBQzs7dUhBOUVVLDBCQUEwQjsySEFBMUIsMEJBQTBCLGNBRnpCLE1BQU07MkZBRVAsMEJBQTBCO2tCQUh0QyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IElQbGFpblRyYW5zYWN0aW9uT2JqZWN0IH0gZnJvbSAnQG11bHRpdmVyc3gvc2RrLWNvcmUvb3V0JztcbmltcG9ydCB7IGZpcnN0LCBTdWJzY3JpcHRpb24sIHRha2UsIHRha2VXaGlsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQWNjb3VudFNlcnZpY2UgfSBmcm9tICcuLi9hY2NvdW50L2FjY291bnQuc2VydmljZSc7XG5pbXBvcnQgeyBBdXRoZW50aWNhdGlvblNlcnZpY2UgfSBmcm9tICcuLi9hdXRoZW50aWNhdGlvbi9hdXRoZW50aWNhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IEV4dGVuc2lvblByb3ZpZGVyU2VydmljZSB9IGZyb20gJy4vZXh0ZW5zaW9uL2V4dGVuc2lvblByb3ZpZGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgR2VuZXJpY1Byb3ZpZGVyLCBQcm92aWRlcnNUeXBlIH0gZnJvbSAnLi9nZW5lcmljUHJvdmlkZXInO1xuaW1wb3J0IHsgV2ViV2FsbGV0UHJvdmlkZXJTZXJ2aWNlIH0gZnJvbSAnLi93ZWJXYWxsZXQvd2ViLXdhbGxldFByb3ZpZGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgWFBvcnRhbFByb3ZpZGVyU2VydmljZSB9IGZyb20gJy4veFBvcnRhbC94LXBvcnRhbC5zZXJ2aWNlJztcblxudHlwZSBBbGxQcm92aWRlcnNUeXBlID1cbiAgfCBFeHRlbnNpb25Qcm92aWRlclNlcnZpY2VcbiAgfCBYUG9ydGFsUHJvdmlkZXJTZXJ2aWNlXG4gIHwgV2ViV2FsbGV0UHJvdmlkZXJTZXJ2aWNlXG4gIHwgbnVsbDtcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFBlcm1pc3Npb25zUHJvdmlkZXJTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBfcHJvdmlkZXI6IEFsbFByb3ZpZGVyc1R5cGU7XG4gIHByaXZhdGUgbG9jYWxBY2NvdW50U2VydmljZTogQWNjb3VudFNlcnZpY2U7XG4gIHByaXZhdGUgYWNjb3VudFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uIHwgbnVsbCA9IG51bGw7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZXh0ZW5zaW9uUHJvdmlkZXI6IEV4dGVuc2lvblByb3ZpZGVyU2VydmljZSxcbiAgICBwcml2YXRlIHdlYldhbGxldFByb3ZpZGVyOiBXZWJXYWxsZXRQcm92aWRlclNlcnZpY2UsXG4gICAgYWNjb3VudFNlcnZpY2U6IEFjY291bnRTZXJ2aWNlLFxuICAgIGF1dGhTZXJ2aWNlOiBBdXRoZW50aWNhdGlvblNlcnZpY2VcbiAgKSB7XG4gICAgdGhpcy5fcHJvdmlkZXIgPSBudWxsO1xuICAgIHRoaXMubG9jYWxBY2NvdW50U2VydmljZSA9IGFjY291bnRTZXJ2aWNlO1xuICAgIGxldCBwcm92aWRlclNldCA9IGZhbHNlO1xuICAgIGlmIChhY2NvdW50U2VydmljZS5hY2NvdW50JCkge1xuICAgICAgdGhpcy5hY2NvdW50U3Vic2NyaXB0aW9uID0gYWNjb3VudFNlcnZpY2UuYWNjb3VudCRcbiAgICAgICAgLnBpcGUodGFrZVdoaWxlKChhY2NvdW50KSA9PiAhcHJvdmlkZXJTZXQpKVxuICAgICAgICAuc3Vic2NyaWJlKChhY2NvdW50KSA9PiB7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgYWNjb3VudC5jdXJyZW50UHJvdmlkZXIgIT09IFByb3ZpZGVyc1R5cGUuRU1QVFkgJiZcbiAgICAgICAgICAgIGF1dGhTZXJ2aWNlLmlzQXV0aGVudGljYXRlZCgpXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBwcm92aWRlclNldCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnNldFByb3ZpZGVyKGFjY291bnQuY3VycmVudFByb3ZpZGVyIGFzIFByb3ZpZGVyc1R5cGUpO1xuICAgICAgICAgICAgdGhpcy5yZWZyZXNoUmVtb3RlRGF0YSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSByZWZyZXNoUmVtb3RlRGF0YSgpIHtcbiAgICB0aGlzLmxvY2FsQWNjb3VudFNlcnZpY2UucmVmZXRjaEFjY291bnREYXRhKCk7XG4gIH1cblxuICBzZXRQcm92aWRlcihwcm92aWRlclR5cGU6IFByb3ZpZGVyc1R5cGUpIHtcbiAgICBzd2l0Y2ggKHByb3ZpZGVyVHlwZSkge1xuICAgICAgY2FzZSBQcm92aWRlcnNUeXBlLkV4dGVuc2lvbjpcbiAgICAgICAgdGhpcy5wcm92aWRlciA9IHRoaXMuZXh0ZW5zaW9uUHJvdmlkZXI7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIFByb3ZpZGVyc1R5cGUuV2ViV2FsbGV0OlxuICAgICAgICB0aGlzLnByb3ZpZGVyID0gdGhpcy53ZWJXYWxsZXRQcm92aWRlcjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aGlzLnByb3ZpZGVyID0gbnVsbDtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGdldCBwcm92aWRlcigpOiBBbGxQcm92aWRlcnNUeXBlIHtcbiAgICByZXR1cm4gdGhpcy5fcHJvdmlkZXI7XG4gIH1cblxuICBwcml2YXRlIHNldCBwcm92aWRlcihwcm92aWRlcjogQWxsUHJvdmlkZXJzVHlwZSkge1xuICAgIHRoaXMuX3Byb3ZpZGVyID0gcHJvdmlkZXI7XG4gIH1cblxuICBwdWJsaWMgY29ubmVjdChuYXZBZnRlckNvbm5lY3RSb3V0ZT86IHN0cmluZyk6IFByb21pc2U8R2VuZXJpY1Byb3ZpZGVyPiB7XG4gICAgaWYgKHRoaXMuX3Byb3ZpZGVyKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcHJvdmlkZXIuY29ubmVjdChuYXZBZnRlckNvbm5lY3RSb3V0ZSk7XG4gICAgfVxuICAgIHRocm93IG5ldyBFcnJvcignUHJvdmlkZXIgaXMgbm90IHNldCcpO1xuICB9XG5cbiAgcHVibGljIGxvZ291dChuYXZBZnRlckNvbm5lY3RSb3V0ZT86IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGlmICh0aGlzLl9wcm92aWRlcikge1xuICAgICAgcmV0dXJuIHRoaXMuX3Byb3ZpZGVyLmxvZ291dCgpO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1Byb3ZpZGVyIGlzIG5vdCBzZXQnKTtcbiAgfVxuXG4gIHB1YmxpYyBzZW5kVHJhbnNhY3Rpb25zKFxuICAgIHRyYW5zYWN0aW9uczogSVBsYWluVHJhbnNhY3Rpb25PYmplY3RbXSxcbiAgICB0eElkOiBudW1iZXJcbiAgKSB7XG4gICAgaWYgKHRoaXMuX3Byb3ZpZGVyKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcHJvdmlkZXIuc2VuZFRyYW5zYWN0aW9ucyh0cmFuc2FjdGlvbnMsIHR4SWQpO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1Byb3ZpZGVyIGlzIG5vdCBzZXQnKTtcbiAgfVxufVxuIl19