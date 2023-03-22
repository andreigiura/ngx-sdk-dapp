import { Inject, Injectable } from '@angular/core';
import { DAPP_CONFIG } from '../../config';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "../../services/account/account.service";
export class AccountApiService {
    constructor(http, accountService, config) {
        this.http = http;
        this.accountService = accountService;
        this.config = config;
    }
    getAccount(address) {
        return this.http.get(`${this.config.apiURL}/accounts/${address}`);
    }
    sendTransactions(transactions) {
        return this.http.post(`${this.config.gatewayURL}/transaction/send-multiple`, transactions);
    }
    trackTransactions(transactionHashes) {
        return this.http.get(`${this.config.apiURL}/accounts/${this.accountService.account.address}/transactions?hashes=${transactionHashes.join(',')}&fields=status`);
    }
    getTransactions(listSize, sender, receiver) {
        return this.http.get(`${this.config.apiURL}/transactions?size=${listSize}&sender=${sender}&receiver=${receiver}&condition=must&fields=txHash%2Ctimestamp%2Csender%2CsenderShard%2Creceiver%2CreceiverShard%2Cstatus%2Cvalue%2Cfunction`);
    }
}
AccountApiService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: AccountApiService, deps: [{ token: i1.HttpClient }, { token: i2.AccountService }, { token: DAPP_CONFIG }], target: i0.ɵɵFactoryTarget.Injectable });
AccountApiService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: AccountApiService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: AccountApiService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.AccountService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DAPP_CONFIG]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudC1hcGkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1zZGstZGFwcC9zcmMvbGliL25neHMvYWNjb3VudC9hY2NvdW50LWFwaS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBR25ELE9BQU8sRUFBYyxXQUFXLEVBQUUsTUFBTSxjQUFjLENBQUM7Ozs7QUFNdkQsTUFBTSxPQUFPLGlCQUFpQjtJQUM1QixZQUNVLElBQWdCLEVBQ2hCLGNBQThCLEVBQ1YsTUFBa0I7UUFGdEMsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNoQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDVixXQUFNLEdBQU4sTUFBTSxDQUFZO0lBQzdDLENBQUM7SUFFSixVQUFVLENBQUMsT0FBZTtRQUN4QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLGFBQWEsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBRUQsZ0JBQWdCLENBQUMsWUFBdUM7UUFDdEQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FDbkIsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsNEJBQTRCLEVBQ3JELFlBQVksQ0FDYixDQUFDO0lBQ0osQ0FBQztJQUVELGlCQUFpQixDQUFDLGlCQUEyQjtRQUMzQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUNsQixHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxhQUNuQixJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxPQUM5Qix3QkFBd0IsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FDcEUsQ0FBQztJQUNKLENBQUM7SUFFRCxlQUFlLENBQUMsUUFBZ0IsRUFBRSxNQUFjLEVBQUUsUUFBZ0I7UUFDaEUsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FDbEIsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sc0JBQXNCLFFBQVEsV0FBVyxNQUFNLGFBQWEsUUFBUSx5SEFBeUgsQ0FDbk4sQ0FBQztJQUNKLENBQUM7OzhHQTlCVSxpQkFBaUIsMEVBSWxCLFdBQVc7a0hBSlYsaUJBQWlCLGNBRmhCLE1BQU07MkZBRVAsaUJBQWlCO2tCQUg3QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7MEJBS0ksTUFBTTsyQkFBQyxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSVBsYWluVHJhbnNhY3Rpb25PYmplY3QgfSBmcm9tICdAbXVsdGl2ZXJzeC9zZGstY29yZS9vdXQnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgRGFwcENvbmZpZywgREFQUF9DT05GSUcgfSBmcm9tICcuLi8uLi9jb25maWcnO1xuaW1wb3J0IHsgQWNjb3VudFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hY2NvdW50L2FjY291bnQuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBBY2NvdW50QXBpU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcbiAgICBwcml2YXRlIGFjY291bnRTZXJ2aWNlOiBBY2NvdW50U2VydmljZSxcbiAgICBASW5qZWN0KERBUFBfQ09ORklHKSBwdWJsaWMgY29uZmlnOiBEYXBwQ29uZmlnXG4gICkge31cblxuICBnZXRBY2NvdW50KGFkZHJlc3M6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoYCR7dGhpcy5jb25maWcuYXBpVVJMfS9hY2NvdW50cy8ke2FkZHJlc3N9YCk7XG4gIH1cblxuICBzZW5kVHJhbnNhY3Rpb25zKHRyYW5zYWN0aW9uczogSVBsYWluVHJhbnNhY3Rpb25PYmplY3RbXSkge1xuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChcbiAgICAgIGAke3RoaXMuY29uZmlnLmdhdGV3YXlVUkx9L3RyYW5zYWN0aW9uL3NlbmQtbXVsdGlwbGVgLFxuICAgICAgdHJhbnNhY3Rpb25zXG4gICAgKTtcbiAgfVxuXG4gIHRyYWNrVHJhbnNhY3Rpb25zKHRyYW5zYWN0aW9uSGFzaGVzOiBzdHJpbmdbXSkge1xuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KFxuICAgICAgYCR7dGhpcy5jb25maWcuYXBpVVJMfS9hY2NvdW50cy8ke1xuICAgICAgICB0aGlzLmFjY291bnRTZXJ2aWNlLmFjY291bnQuYWRkcmVzc1xuICAgICAgfS90cmFuc2FjdGlvbnM/aGFzaGVzPSR7dHJhbnNhY3Rpb25IYXNoZXMuam9pbignLCcpfSZmaWVsZHM9c3RhdHVzYFxuICAgICk7XG4gIH1cblxuICBnZXRUcmFuc2FjdGlvbnMobGlzdFNpemU6IG51bWJlciwgc2VuZGVyOiBzdHJpbmcsIHJlY2VpdmVyOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldChcbiAgICAgIGAke3RoaXMuY29uZmlnLmFwaVVSTH0vdHJhbnNhY3Rpb25zP3NpemU9JHtsaXN0U2l6ZX0mc2VuZGVyPSR7c2VuZGVyfSZyZWNlaXZlcj0ke3JlY2VpdmVyfSZjb25kaXRpb249bXVzdCZmaWVsZHM9dHhIYXNoJTJDdGltZXN0YW1wJTJDc2VuZGVyJTJDc2VuZGVyU2hhcmQlMkNyZWNlaXZlciUyQ3JlY2VpdmVyU2hhcmQlMkNzdGF0dXMlMkN2YWx1ZSUyQ2Z1bmN0aW9uYFxuICAgICk7XG4gIH1cbn1cbiJdfQ==