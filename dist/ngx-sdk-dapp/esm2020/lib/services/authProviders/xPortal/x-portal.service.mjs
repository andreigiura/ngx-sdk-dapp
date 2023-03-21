import { Inject, Injectable } from '@angular/core';
import { DAPP_CONFIG } from '../../../config';
import { GenericProvider } from '../genericProvider';
import * as i0 from "@angular/core";
import * as i1 from "@ngxs/store";
import * as i2 from "../../account/account.service";
import * as i3 from "../../authentication/authentication.service";
import * as i4 from "@angular/router";
export class XPortalProviderService extends GenericProvider {
    constructor(store, accountService, authenticationService, config, router) {
        super(store, accountService, authenticationService, config);
        this.config = config;
        this.router = router;
    }
    connect(navAfterConnectRoute) {
        throw new Error('Method not implemented.');
    }
    logout() {
        throw new Error('Method not implemented.');
    }
    reinitialize() {
        throw new Error('Method not implemented.');
    }
}
XPortalProviderService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: XPortalProviderService, deps: [{ token: i1.Store }, { token: i2.AccountService }, { token: i3.AuthenticationService }, { token: DAPP_CONFIG }, { token: i4.Router }], target: i0.ɵɵFactoryTarget.Injectable });
XPortalProviderService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: XPortalProviderService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: XPortalProviderService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.Store }, { type: i2.AccountService }, { type: i3.AuthenticationService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DAPP_CONFIG]
                }] }, { type: i4.Router }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieC1wb3J0YWwuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1zZGstZGFwcC9zcmMvbGliL3NlcnZpY2VzL2F1dGhQcm92aWRlcnMveFBvcnRhbC94LXBvcnRhbC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBR25ELE9BQU8sRUFBYyxXQUFXLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUcxRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7Ozs7OztBQUtyRCxNQUFNLE9BQU8sc0JBQXVCLFNBQVEsZUFBZTtJQUN6RCxZQUNFLEtBQVksRUFDWixjQUE4QixFQUM5QixxQkFBNEMsRUFDZCxNQUFrQixFQUN4QyxNQUFjO1FBRXRCLEtBQUssQ0FBQyxLQUFLLEVBQUUsY0FBYyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBSDlCLFdBQU0sR0FBTixNQUFNLENBQVk7UUFDeEMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtJQUd4QixDQUFDO0lBRVEsT0FBTyxDQUFDLG9CQUE2QjtRQUM1QyxNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVRLE1BQU07UUFDYixNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVELFlBQVk7UUFDVixNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7SUFDN0MsQ0FBQzs7bUhBckJVLHNCQUFzQiwwR0FLdkIsV0FBVzt1SEFMVixzQkFBc0IsY0FGckIsTUFBTTsyRkFFUCxzQkFBc0I7a0JBSGxDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzswQkFNSSxNQUFNOzJCQUFDLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBTdG9yZSB9IGZyb20gJ0BuZ3hzL3N0b3JlJztcbmltcG9ydCB7IERhcHBDb25maWcsIERBUFBfQ09ORklHIH0gZnJvbSAnLi4vLi4vLi4vY29uZmlnJztcbmltcG9ydCB7IEFjY291bnRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vYWNjb3VudC9hY2NvdW50LnNlcnZpY2UnO1xuaW1wb3J0IHsgQXV0aGVudGljYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vYXV0aGVudGljYXRpb24vYXV0aGVudGljYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBHZW5lcmljUHJvdmlkZXIgfSBmcm9tICcuLi9nZW5lcmljUHJvdmlkZXInO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgWFBvcnRhbFByb3ZpZGVyU2VydmljZSBleHRlbmRzIEdlbmVyaWNQcm92aWRlciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHN0b3JlOiBTdG9yZSxcbiAgICBhY2NvdW50U2VydmljZTogQWNjb3VudFNlcnZpY2UsXG4gICAgYXV0aGVudGljYXRpb25TZXJ2aWNlOiBBdXRoZW50aWNhdGlvblNlcnZpY2UsXG4gICAgQEluamVjdChEQVBQX0NPTkZJRykgb3ZlcnJpZGUgY29uZmlnOiBEYXBwQ29uZmlnLFxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXJcbiAgKSB7XG4gICAgc3VwZXIoc3RvcmUsIGFjY291bnRTZXJ2aWNlLCBhdXRoZW50aWNhdGlvblNlcnZpY2UsIGNvbmZpZyk7XG4gIH1cblxuICBvdmVycmlkZSBjb25uZWN0KG5hdkFmdGVyQ29ubmVjdFJvdXRlPzogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ01ldGhvZCBub3QgaW1wbGVtZW50ZWQuJyk7XG4gIH1cblxuICBvdmVycmlkZSBsb2dvdXQoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdNZXRob2Qgbm90IGltcGxlbWVudGVkLicpO1xuICB9XG5cbiAgcmVpbml0aWFsaXplKCk6IHZvaWQge1xuICAgIHRocm93IG5ldyBFcnJvcignTWV0aG9kIG5vdCBpbXBsZW1lbnRlZC4nKTtcbiAgfVxufVxuIl19