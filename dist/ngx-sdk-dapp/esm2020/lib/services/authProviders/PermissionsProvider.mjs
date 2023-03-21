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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGVybWlzc2lvbnNQcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1zZGstZGFwcC9zcmMvbGliL3NlcnZpY2VzL2F1dGhQcm92aWRlcnMvUGVybWlzc2lvbnNQcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBNkIsU0FBUyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBSTVELE9BQU8sRUFBbUIsYUFBYSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7Ozs7Ozs7QUFhbkUsTUFBTSxPQUFPLDBCQUEwQjtJQUlyQyxZQUNVLGlCQUEyQyxFQUMzQyxpQkFBMkMsRUFDM0MsZUFBdUMsRUFDL0MsY0FBOEIsRUFDOUIsV0FBa0M7UUFKMUIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUEwQjtRQUMzQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQTBCO1FBQzNDLG9CQUFlLEdBQWYsZUFBZSxDQUF3QjtRQUp6Qyx3QkFBbUIsR0FBd0IsSUFBSSxDQUFDO1FBUXRELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxjQUFjLENBQUM7UUFDMUMsSUFBSSxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLElBQUksY0FBYyxDQUFDLFFBQVEsRUFBRTtZQUMzQixJQUFJLENBQUMsbUJBQW1CLEdBQUcsY0FBYyxDQUFDLFFBQVE7aUJBQy9DLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUM7aUJBQzFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO2dCQUNyQixJQUNFLE9BQU8sQ0FBQyxlQUFlLEtBQUssYUFBYSxDQUFDLEtBQUs7b0JBQy9DLFdBQVcsQ0FBQyxlQUFlLEVBQUUsRUFDN0I7b0JBQ0EsV0FBVyxHQUFHLElBQUksQ0FBQztvQkFDbkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsZUFBZ0MsQ0FBQyxDQUFDO29CQUMzRCxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztpQkFDMUI7WUFDSCxDQUFDLENBQUMsQ0FBQztTQUNOO0lBQ0gsQ0FBQztJQUVPLGlCQUFpQjtRQUN2QixJQUFJLENBQUMsbUJBQW1CLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUNoRCxDQUFDO0lBRUQsV0FBVyxDQUFDLFlBQTJCO1FBQ3JDLFFBQVEsWUFBWSxFQUFFO1lBQ3BCLEtBQUssYUFBYSxDQUFDLFNBQVM7Z0JBQzFCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDO2dCQUN2QyxNQUFNO1lBRVIsS0FBSyxhQUFhLENBQUMsU0FBUztnQkFDMUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUM7Z0JBQ3ZDLE1BQU07WUFFUixLQUFLLGFBQWEsQ0FBQyxPQUFPO2dCQUN4QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUM7Z0JBQ3JDLE1BQU07WUFDUjtnQkFDRSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztnQkFDckIsTUFBTTtTQUNUO0lBQ0gsQ0FBQztJQUVELElBQVcsUUFBUTtRQUNqQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQztJQUVELElBQVksUUFBUSxDQUFDLFFBQTBCO1FBQzdDLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO0lBQzVCLENBQUM7SUFFTSxPQUFPLENBQUMsb0JBQTRCO1FBQ3pDLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNsQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7U0FDckQ7UUFDRCxNQUFNLElBQUksS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVNLE1BQU0sQ0FBQyxvQkFBNkI7UUFDekMsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2xCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUNoQztRQUNELE1BQU0sSUFBSSxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRU0sZ0JBQWdCLENBQ3JCLFlBQXVDLEVBQ3ZDLElBQVk7UUFFWixJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbEIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztTQUM1RDtRQUNELE1BQU0sSUFBSSxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQztJQUN6QyxDQUFDOzt1SEFuRlUsMEJBQTBCOzJIQUExQiwwQkFBMEIsY0FGekIsTUFBTTsyRkFFUCwwQkFBMEI7a0JBSHRDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSVBsYWluVHJhbnNhY3Rpb25PYmplY3QgfSBmcm9tICdAbXVsdGl2ZXJzeC9zZGstY29yZS9vdXQnO1xuaW1wb3J0IHsgZmlyc3QsIFN1YnNjcmlwdGlvbiwgdGFrZSwgdGFrZVdoaWxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBBY2NvdW50U2VydmljZSB9IGZyb20gJy4uL2FjY291bnQvYWNjb3VudC5zZXJ2aWNlJztcbmltcG9ydCB7IEF1dGhlbnRpY2F0aW9uU2VydmljZSB9IGZyb20gJy4uL2F1dGhlbnRpY2F0aW9uL2F1dGhlbnRpY2F0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgRXh0ZW5zaW9uUHJvdmlkZXJTZXJ2aWNlIH0gZnJvbSAnLi9leHRlbnNpb24vZXh0ZW5zaW9uUHJvdmlkZXIuc2VydmljZSc7XG5pbXBvcnQgeyBHZW5lcmljUHJvdmlkZXIsIFByb3ZpZGVyc1R5cGUgfSBmcm9tICcuL2dlbmVyaWNQcm92aWRlcic7XG5pbXBvcnQgeyBXZWJXYWxsZXRQcm92aWRlclNlcnZpY2UgfSBmcm9tICcuL3dlYldhbGxldC93ZWItd2FsbGV0UHJvdmlkZXIuc2VydmljZSc7XG5pbXBvcnQgeyBYUG9ydGFsUHJvdmlkZXJTZXJ2aWNlIH0gZnJvbSAnLi94UG9ydGFsL3gtcG9ydGFsLnNlcnZpY2UnO1xuXG50eXBlIEFsbFByb3ZpZGVyc1R5cGUgPVxuICB8IEV4dGVuc2lvblByb3ZpZGVyU2VydmljZVxuICB8IFhQb3J0YWxQcm92aWRlclNlcnZpY2VcbiAgfCBXZWJXYWxsZXRQcm92aWRlclNlcnZpY2VcbiAgfCBudWxsO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgUGVybWlzc2lvbnNQcm92aWRlclNlcnZpY2Uge1xuICBwcml2YXRlIF9wcm92aWRlcjogQWxsUHJvdmlkZXJzVHlwZTtcbiAgcHJpdmF0ZSBsb2NhbEFjY291bnRTZXJ2aWNlOiBBY2NvdW50U2VydmljZTtcbiAgcHJpdmF0ZSBhY2NvdW50U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gfCBudWxsID0gbnVsbDtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBleHRlbnNpb25Qcm92aWRlcjogRXh0ZW5zaW9uUHJvdmlkZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgd2ViV2FsbGV0UHJvdmlkZXI6IFdlYldhbGxldFByb3ZpZGVyU2VydmljZSxcbiAgICBwcml2YXRlIHhwb3J0YWxQcm92aWRlcjogWFBvcnRhbFByb3ZpZGVyU2VydmljZSxcbiAgICBhY2NvdW50U2VydmljZTogQWNjb3VudFNlcnZpY2UsXG4gICAgYXV0aFNlcnZpY2U6IEF1dGhlbnRpY2F0aW9uU2VydmljZVxuICApIHtcbiAgICB0aGlzLl9wcm92aWRlciA9IG51bGw7XG4gICAgdGhpcy5sb2NhbEFjY291bnRTZXJ2aWNlID0gYWNjb3VudFNlcnZpY2U7XG4gICAgbGV0IHByb3ZpZGVyU2V0ID0gZmFsc2U7XG4gICAgaWYgKGFjY291bnRTZXJ2aWNlLmFjY291bnQkKSB7XG4gICAgICB0aGlzLmFjY291bnRTdWJzY3JpcHRpb24gPSBhY2NvdW50U2VydmljZS5hY2NvdW50JFxuICAgICAgICAucGlwZSh0YWtlV2hpbGUoKGFjY291bnQpID0+ICFwcm92aWRlclNldCkpXG4gICAgICAgIC5zdWJzY3JpYmUoKGFjY291bnQpID0+IHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBhY2NvdW50LmN1cnJlbnRQcm92aWRlciAhPT0gUHJvdmlkZXJzVHlwZS5FTVBUWSAmJlxuICAgICAgICAgICAgYXV0aFNlcnZpY2UuaXNBdXRoZW50aWNhdGVkKClcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHByb3ZpZGVyU2V0ID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuc2V0UHJvdmlkZXIoYWNjb3VudC5jdXJyZW50UHJvdmlkZXIgYXMgUHJvdmlkZXJzVHlwZSk7XG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hSZW1vdGVEYXRhKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHJlZnJlc2hSZW1vdGVEYXRhKCkge1xuICAgIHRoaXMubG9jYWxBY2NvdW50U2VydmljZS5yZWZldGNoQWNjb3VudERhdGEoKTtcbiAgfVxuXG4gIHNldFByb3ZpZGVyKHByb3ZpZGVyVHlwZTogUHJvdmlkZXJzVHlwZSkge1xuICAgIHN3aXRjaCAocHJvdmlkZXJUeXBlKSB7XG4gICAgICBjYXNlIFByb3ZpZGVyc1R5cGUuRXh0ZW5zaW9uOlxuICAgICAgICB0aGlzLnByb3ZpZGVyID0gdGhpcy5leHRlbnNpb25Qcm92aWRlcjtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgUHJvdmlkZXJzVHlwZS5XZWJXYWxsZXQ6XG4gICAgICAgIHRoaXMucHJvdmlkZXIgPSB0aGlzLndlYldhbGxldFByb3ZpZGVyO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBQcm92aWRlcnNUeXBlLlhQb3J0YWw6XG4gICAgICAgIHRoaXMucHJvdmlkZXIgPSB0aGlzLnhwb3J0YWxQcm92aWRlcjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aGlzLnByb3ZpZGVyID0gbnVsbDtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGdldCBwcm92aWRlcigpOiBBbGxQcm92aWRlcnNUeXBlIHtcbiAgICByZXR1cm4gdGhpcy5fcHJvdmlkZXI7XG4gIH1cblxuICBwcml2YXRlIHNldCBwcm92aWRlcihwcm92aWRlcjogQWxsUHJvdmlkZXJzVHlwZSkge1xuICAgIHRoaXMuX3Byb3ZpZGVyID0gcHJvdmlkZXI7XG4gIH1cblxuICBwdWJsaWMgY29ubmVjdChuYXZBZnRlckNvbm5lY3RSb3V0ZTogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcbiAgICBpZiAodGhpcy5fcHJvdmlkZXIpIHtcbiAgICAgIHJldHVybiB0aGlzLl9wcm92aWRlci5jb25uZWN0KG5hdkFmdGVyQ29ubmVjdFJvdXRlKTtcbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKCdQcm92aWRlciBpcyBub3Qgc2V0Jyk7XG4gIH1cblxuICBwdWJsaWMgbG9nb3V0KG5hdkFmdGVyQ29ubmVjdFJvdXRlPzogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgaWYgKHRoaXMuX3Byb3ZpZGVyKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcHJvdmlkZXIubG9nb3V0KCk7XG4gICAgfVxuICAgIHRocm93IG5ldyBFcnJvcignUHJvdmlkZXIgaXMgbm90IHNldCcpO1xuICB9XG5cbiAgcHVibGljIHNlbmRUcmFuc2FjdGlvbnMoXG4gICAgdHJhbnNhY3Rpb25zOiBJUGxhaW5UcmFuc2FjdGlvbk9iamVjdFtdLFxuICAgIHR4SWQ6IG51bWJlclxuICApIHtcbiAgICBpZiAodGhpcy5fcHJvdmlkZXIpIHtcbiAgICAgIHJldHVybiB0aGlzLl9wcm92aWRlci5zZW5kVHJhbnNhY3Rpb25zKHRyYW5zYWN0aW9ucywgdHhJZCk7XG4gICAgfVxuICAgIHRocm93IG5ldyBFcnJvcignUHJvdmlkZXIgaXMgbm90IHNldCcpO1xuICB9XG59XG4iXX0=