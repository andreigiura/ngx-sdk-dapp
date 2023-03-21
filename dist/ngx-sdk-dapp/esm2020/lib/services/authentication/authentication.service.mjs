import { Injectable } from '@angular/core';
import { decodeNativeAuthToken } from '../../helpers';
import * as i0 from "@angular/core";
import * as i1 from "../account/account.service";
export class AuthenticationService {
    constructor(accountService) {
        this.accountService = accountService;
    }
    isAuthenticated() {
        const decoded = decodeNativeAuthToken(this.accountService.account.accessToken);
        if (!decoded)
            return false;
        const millisecondsTTL = decoded.ttl * 1000;
        const isTokenValid = this.accountService.account.loginTimestamp +
            millisecondsTTL -
            Date.now() >
            0;
        return isTokenValid;
    }
}
AuthenticationService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: AuthenticationService, deps: [{ token: i1.AccountService }], target: i0.ɵɵFactoryTarget.Injectable });
AuthenticationService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: AuthenticationService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: AuthenticationService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.AccountService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aGVudGljYXRpb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1zZGstZGFwcC9zcmMvbGliL3NlcnZpY2VzL2F1dGhlbnRpY2F0aW9uL2F1dGhlbnRpY2F0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxlQUFlLENBQUM7OztBQU10RCxNQUFNLE9BQU8scUJBQXFCO0lBQ2hDLFlBQW9CLGNBQThCO1FBQTlCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtJQUFHLENBQUM7SUFFdEQsZUFBZTtRQUNiLE1BQU0sT0FBTyxHQUFHLHFCQUFxQixDQUNuQyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQ3hDLENBQUM7UUFDRixJQUFJLENBQUMsT0FBTztZQUFFLE9BQU8sS0FBSyxDQUFDO1FBQzNCLE1BQU0sZUFBZSxHQUFHLE9BQU8sQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDO1FBQzNDLE1BQU0sWUFBWSxHQUNoQixJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxjQUFjO1lBQ3hDLGVBQWU7WUFDZixJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ1osQ0FBQyxDQUFDO1FBRUosT0FBTyxZQUFZLENBQUM7SUFDdEIsQ0FBQzs7a0hBaEJVLHFCQUFxQjtzSEFBckIscUJBQXFCLGNBRnBCLE1BQU07MkZBRVAscUJBQXFCO2tCQUhqQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGRlY29kZU5hdGl2ZUF1dGhUb2tlbiB9IGZyb20gJy4uLy4uL2hlbHBlcnMnO1xuaW1wb3J0IHsgQWNjb3VudFNlcnZpY2UgfSBmcm9tICcuLi9hY2NvdW50L2FjY291bnQuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBBdXRoZW50aWNhdGlvblNlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFjY291bnRTZXJ2aWNlOiBBY2NvdW50U2VydmljZSkge31cblxuICBpc0F1dGhlbnRpY2F0ZWQoKTogYm9vbGVhbiB7XG4gICAgY29uc3QgZGVjb2RlZCA9IGRlY29kZU5hdGl2ZUF1dGhUb2tlbihcbiAgICAgIHRoaXMuYWNjb3VudFNlcnZpY2UuYWNjb3VudC5hY2Nlc3NUb2tlblxuICAgICk7XG4gICAgaWYgKCFkZWNvZGVkKSByZXR1cm4gZmFsc2U7XG4gICAgY29uc3QgbWlsbGlzZWNvbmRzVFRMID0gZGVjb2RlZC50dGwgKiAxMDAwO1xuICAgIGNvbnN0IGlzVG9rZW5WYWxpZCA9XG4gICAgICB0aGlzLmFjY291bnRTZXJ2aWNlLmFjY291bnQubG9naW5UaW1lc3RhbXAgK1xuICAgICAgICBtaWxsaXNlY29uZHNUVEwgLVxuICAgICAgICBEYXRlLm5vdygpID5cbiAgICAgIDA7XG5cbiAgICByZXR1cm4gaXNUb2tlblZhbGlkO1xuICB9XG59XG4iXX0=