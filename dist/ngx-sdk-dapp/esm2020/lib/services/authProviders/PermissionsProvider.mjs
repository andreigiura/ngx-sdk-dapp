import { Injectable } from '@angular/core';
import { takeWhile } from 'rxjs';
import { ProvidersType } from './genericProvider';
import * as i0 from "@angular/core";
import * as i1 from "./extension/extensionProvider.service";
import * as i2 from "./webWallet/web-walletProvider.service";
import * as i3 from "./xPortal/x-portal.service";
import * as i4 from "./ledger/ledger-provider.service";
import * as i5 from "../account/account.service";
import * as i6 from "../authentication/authentication.service";
export class PermissionsProviderService {
    constructor(extensionProvider, webWalletProvider, xportalProvider, ledgerProvider, accountService, authService) {
        this.extensionProvider = extensionProvider;
        this.webWalletProvider = webWalletProvider;
        this.xportalProvider = xportalProvider;
        this.ledgerProvider = ledgerProvider;
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
            case ProvidersType.Ledger:
                this.provider = this.ledgerProvider;
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
PermissionsProviderService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: PermissionsProviderService, deps: [{ token: i1.ExtensionProviderService }, { token: i2.WebWalletProviderService }, { token: i3.XPortalProviderService }, { token: i4.LedgerProviderService }, { token: i5.AccountService }, { token: i6.AuthenticationService }], target: i0.ɵɵFactoryTarget.Injectable });
PermissionsProviderService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: PermissionsProviderService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: PermissionsProviderService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.ExtensionProviderService }, { type: i2.WebWalletProviderService }, { type: i3.XPortalProviderService }, { type: i4.LedgerProviderService }, { type: i5.AccountService }, { type: i6.AuthenticationService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGVybWlzc2lvbnNQcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1zZGstZGFwcC9zcmMvbGliL3NlcnZpY2VzL2F1dGhQcm92aWRlcnMvUGVybWlzc2lvbnNQcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBZ0IsU0FBUyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBSS9DLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7Ozs7Ozs7QUFlbEQsTUFBTSxPQUFPLDBCQUEwQjtJQUlyQyxZQUNVLGlCQUEyQyxFQUMzQyxpQkFBMkMsRUFDM0MsZUFBdUMsRUFDdkMsY0FBcUMsRUFDN0MsY0FBOEIsRUFDOUIsV0FBa0M7UUFMMUIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUEwQjtRQUMzQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQTBCO1FBQzNDLG9CQUFlLEdBQWYsZUFBZSxDQUF3QjtRQUN2QyxtQkFBYyxHQUFkLGNBQWMsQ0FBdUI7UUFMdkMsd0JBQW1CLEdBQXdCLElBQUksQ0FBQztRQVN0RCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsbUJBQW1CLEdBQUcsY0FBYyxDQUFDO1FBQzFDLElBQUksV0FBVyxHQUFHLEtBQUssQ0FBQztRQUN4QixJQUFJLGNBQWMsQ0FBQyxRQUFRLEVBQUU7WUFDM0IsSUFBSSxDQUFDLG1CQUFtQixHQUFHLGNBQWMsQ0FBQyxRQUFRO2lCQUMvQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2lCQUMxQyxTQUFTLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtnQkFDckIsSUFDRSxPQUFPLENBQUMsZUFBZSxLQUFLLGFBQWEsQ0FBQyxLQUFLO29CQUMvQyxXQUFXLENBQUMsZUFBZSxFQUFFLEVBQzdCO29CQUNBLFdBQVcsR0FBRyxJQUFJLENBQUM7b0JBQ25CLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLGVBQWdDLENBQUMsQ0FBQztvQkFDM0QsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7aUJBQzFCO1lBQ0gsQ0FBQyxDQUFDLENBQUM7U0FDTjtJQUNILENBQUM7SUFFTyxpQkFBaUI7UUFDdkIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDaEQsQ0FBQztJQUVELFdBQVcsQ0FBQyxZQUEyQjtRQUNyQyxRQUFRLFlBQVksRUFBRTtZQUNwQixLQUFLLGFBQWEsQ0FBQyxTQUFTO2dCQUMxQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztnQkFDdkMsTUFBTTtZQUVSLEtBQUssYUFBYSxDQUFDLFNBQVM7Z0JBQzFCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDO2dCQUN2QyxNQUFNO1lBRVIsS0FBSyxhQUFhLENBQUMsT0FBTztnQkFDeEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDO2dCQUNyQyxNQUFNO1lBRVIsS0FBSyxhQUFhLENBQUMsTUFBTTtnQkFDdkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO2dCQUNwQyxNQUFNO1lBQ1I7Z0JBQ0UsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7Z0JBQ3JCLE1BQU07U0FDVDtJQUNILENBQUM7SUFFRCxJQUFXLFFBQVE7UUFDakIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hCLENBQUM7SUFFRCxJQUFZLFFBQVEsQ0FBQyxRQUEwQjtRQUM3QyxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztJQUM1QixDQUFDO0lBRU0sT0FBTyxDQUFDLG9CQUE0QjtRQUN6QyxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbEIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1NBQ3JEO1FBQ0QsTUFBTSxJQUFJLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFTSxNQUFNLENBQUMsb0JBQTZCO1FBQ3pDLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNsQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDaEM7UUFDRCxNQUFNLElBQUksS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVNLEtBQUssQ0FBQyxZQUFZO1FBQ3ZCLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRTtZQUNqRCxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQzlCLE9BQU87U0FDUjtRQUNELE1BQU0sSUFBSSxLQUFLLENBQUMsd0JBQXdCLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRU0sZ0JBQWdCLENBQ3JCLFlBQXVDLEVBQ3ZDLElBQVk7UUFFWixJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbEIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztTQUM1RDtRQUNELE1BQU0sSUFBSSxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQztJQUN6QyxDQUFDOzt1SEFoR1UsMEJBQTBCOzJIQUExQiwwQkFBMEIsY0FGekIsTUFBTTsyRkFFUCwwQkFBMEI7a0JBSHRDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSVBsYWluVHJhbnNhY3Rpb25PYmplY3QgfSBmcm9tICdAbXVsdGl2ZXJzeC9zZGstY29yZS9vdXQnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCB0YWtlV2hpbGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEFjY291bnRTZXJ2aWNlIH0gZnJvbSAnLi4vYWNjb3VudC9hY2NvdW50LnNlcnZpY2UnO1xuaW1wb3J0IHsgQXV0aGVudGljYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vYXV0aGVudGljYXRpb24vYXV0aGVudGljYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBFeHRlbnNpb25Qcm92aWRlclNlcnZpY2UgfSBmcm9tICcuL2V4dGVuc2lvbi9leHRlbnNpb25Qcm92aWRlci5zZXJ2aWNlJztcbmltcG9ydCB7IFByb3ZpZGVyc1R5cGUgfSBmcm9tICcuL2dlbmVyaWNQcm92aWRlcic7XG5pbXBvcnQgeyBMZWRnZXJQcm92aWRlclNlcnZpY2UgfSBmcm9tICcuL2xlZGdlci9sZWRnZXItcHJvdmlkZXIuc2VydmljZSc7XG5pbXBvcnQgeyBXZWJXYWxsZXRQcm92aWRlclNlcnZpY2UgfSBmcm9tICcuL3dlYldhbGxldC93ZWItd2FsbGV0UHJvdmlkZXIuc2VydmljZSc7XG5pbXBvcnQgeyBYUG9ydGFsUHJvdmlkZXJTZXJ2aWNlIH0gZnJvbSAnLi94UG9ydGFsL3gtcG9ydGFsLnNlcnZpY2UnO1xuXG50eXBlIEFsbFByb3ZpZGVyc1R5cGUgPVxuICB8IEV4dGVuc2lvblByb3ZpZGVyU2VydmljZVxuICB8IFhQb3J0YWxQcm92aWRlclNlcnZpY2VcbiAgfCBXZWJXYWxsZXRQcm92aWRlclNlcnZpY2VcbiAgfCBMZWRnZXJQcm92aWRlclNlcnZpY2VcbiAgfCBudWxsO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgUGVybWlzc2lvbnNQcm92aWRlclNlcnZpY2Uge1xuICBwcml2YXRlIF9wcm92aWRlcjogQWxsUHJvdmlkZXJzVHlwZTtcbiAgcHJpdmF0ZSBsb2NhbEFjY291bnRTZXJ2aWNlOiBBY2NvdW50U2VydmljZTtcbiAgcHJpdmF0ZSBhY2NvdW50U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gfCBudWxsID0gbnVsbDtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBleHRlbnNpb25Qcm92aWRlcjogRXh0ZW5zaW9uUHJvdmlkZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgd2ViV2FsbGV0UHJvdmlkZXI6IFdlYldhbGxldFByb3ZpZGVyU2VydmljZSxcbiAgICBwcml2YXRlIHhwb3J0YWxQcm92aWRlcjogWFBvcnRhbFByb3ZpZGVyU2VydmljZSxcbiAgICBwcml2YXRlIGxlZGdlclByb3ZpZGVyOiBMZWRnZXJQcm92aWRlclNlcnZpY2UsXG4gICAgYWNjb3VudFNlcnZpY2U6IEFjY291bnRTZXJ2aWNlLFxuICAgIGF1dGhTZXJ2aWNlOiBBdXRoZW50aWNhdGlvblNlcnZpY2VcbiAgKSB7XG4gICAgdGhpcy5fcHJvdmlkZXIgPSBudWxsO1xuICAgIHRoaXMubG9jYWxBY2NvdW50U2VydmljZSA9IGFjY291bnRTZXJ2aWNlO1xuICAgIGxldCBwcm92aWRlclNldCA9IGZhbHNlO1xuICAgIGlmIChhY2NvdW50U2VydmljZS5hY2NvdW50JCkge1xuICAgICAgdGhpcy5hY2NvdW50U3Vic2NyaXB0aW9uID0gYWNjb3VudFNlcnZpY2UuYWNjb3VudCRcbiAgICAgICAgLnBpcGUodGFrZVdoaWxlKChhY2NvdW50KSA9PiAhcHJvdmlkZXJTZXQpKVxuICAgICAgICAuc3Vic2NyaWJlKChhY2NvdW50KSA9PiB7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgYWNjb3VudC5jdXJyZW50UHJvdmlkZXIgIT09IFByb3ZpZGVyc1R5cGUuRU1QVFkgJiZcbiAgICAgICAgICAgIGF1dGhTZXJ2aWNlLmlzQXV0aGVudGljYXRlZCgpXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBwcm92aWRlclNldCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnNldFByb3ZpZGVyKGFjY291bnQuY3VycmVudFByb3ZpZGVyIGFzIFByb3ZpZGVyc1R5cGUpO1xuICAgICAgICAgICAgdGhpcy5yZWZyZXNoUmVtb3RlRGF0YSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSByZWZyZXNoUmVtb3RlRGF0YSgpIHtcbiAgICB0aGlzLmxvY2FsQWNjb3VudFNlcnZpY2UucmVmZXRjaEFjY291bnREYXRhKCk7XG4gIH1cblxuICBzZXRQcm92aWRlcihwcm92aWRlclR5cGU6IFByb3ZpZGVyc1R5cGUpIHtcbiAgICBzd2l0Y2ggKHByb3ZpZGVyVHlwZSkge1xuICAgICAgY2FzZSBQcm92aWRlcnNUeXBlLkV4dGVuc2lvbjpcbiAgICAgICAgdGhpcy5wcm92aWRlciA9IHRoaXMuZXh0ZW5zaW9uUHJvdmlkZXI7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIFByb3ZpZGVyc1R5cGUuV2ViV2FsbGV0OlxuICAgICAgICB0aGlzLnByb3ZpZGVyID0gdGhpcy53ZWJXYWxsZXRQcm92aWRlcjtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgUHJvdmlkZXJzVHlwZS5YUG9ydGFsOlxuICAgICAgICB0aGlzLnByb3ZpZGVyID0gdGhpcy54cG9ydGFsUHJvdmlkZXI7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIFByb3ZpZGVyc1R5cGUuTGVkZ2VyOlxuICAgICAgICB0aGlzLnByb3ZpZGVyID0gdGhpcy5sZWRnZXJQcm92aWRlcjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aGlzLnByb3ZpZGVyID0gbnVsbDtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGdldCBwcm92aWRlcigpOiBBbGxQcm92aWRlcnNUeXBlIHtcbiAgICByZXR1cm4gdGhpcy5fcHJvdmlkZXI7XG4gIH1cblxuICBwcml2YXRlIHNldCBwcm92aWRlcihwcm92aWRlcjogQWxsUHJvdmlkZXJzVHlwZSkge1xuICAgIHRoaXMuX3Byb3ZpZGVyID0gcHJvdmlkZXI7XG4gIH1cblxuICBwdWJsaWMgY29ubmVjdChuYXZBZnRlckNvbm5lY3RSb3V0ZTogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcbiAgICBpZiAodGhpcy5fcHJvdmlkZXIpIHtcbiAgICAgIHJldHVybiB0aGlzLl9wcm92aWRlci5jb25uZWN0KG5hdkFmdGVyQ29ubmVjdFJvdXRlKTtcbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKCdQcm92aWRlciBpcyBub3Qgc2V0Jyk7XG4gIH1cblxuICBwdWJsaWMgbG9nb3V0KG5hdkFmdGVyQ29ubmVjdFJvdXRlPzogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgaWYgKHRoaXMuX3Byb3ZpZGVyKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcHJvdmlkZXIubG9nb3V0KCk7XG4gICAgfVxuICAgIHRocm93IG5ldyBFcnJvcignUHJvdmlkZXIgaXMgbm90IHNldCcpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGNhbmNlbEFjdGlvbigpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAodGhpcy5fcHJvdmlkZXIgJiYgdGhpcy5fcHJvdmlkZXIuY2FuY2VsQWN0aW9uKSB7XG4gICAgICB0aGlzLl9wcm92aWRlci5jYW5jZWxBY3Rpb24oKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKCdQcm92aWRlciBpcyBub3Qgc2V0MTIzJyk7XG4gIH1cblxuICBwdWJsaWMgc2VuZFRyYW5zYWN0aW9ucyhcbiAgICB0cmFuc2FjdGlvbnM6IElQbGFpblRyYW5zYWN0aW9uT2JqZWN0W10sXG4gICAgdHhJZDogbnVtYmVyXG4gICkge1xuICAgIGlmICh0aGlzLl9wcm92aWRlcikge1xuICAgICAgcmV0dXJuIHRoaXMuX3Byb3ZpZGVyLnNlbmRUcmFuc2FjdGlvbnModHJhbnNhY3Rpb25zLCB0eElkKTtcbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKCdQcm92aWRlciBpcyBub3Qgc2V0Jyk7XG4gIH1cbn1cbiJdfQ==