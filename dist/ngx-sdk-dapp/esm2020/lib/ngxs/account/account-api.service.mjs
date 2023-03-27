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
        return this.http.get(`${this.config.apiURL}/accounts/${this.accountService.account.address}/transactions?hashes=${transactionHashes.join(',')}&fields=status&withScResults=true`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudC1hcGkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1zZGstZGFwcC9zcmMvbGliL25neHMvYWNjb3VudC9hY2NvdW50LWFwaS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBR25ELE9BQU8sRUFBYyxXQUFXLEVBQUUsTUFBTSxjQUFjLENBQUM7Ozs7QUFNdkQsTUFBTSxPQUFPLGlCQUFpQjtJQUM1QixZQUNVLElBQWdCLEVBQ2hCLGNBQThCLEVBQ1YsTUFBa0I7UUFGdEMsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNoQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDVixXQUFNLEdBQU4sTUFBTSxDQUFZO0lBQzdDLENBQUM7SUFFSixVQUFVLENBQUMsT0FBZTtRQUN4QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLGFBQWEsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBRUQsZ0JBQWdCLENBQUMsWUFBdUM7UUFDdEQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FDbkIsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsNEJBQTRCLEVBQ3JELFlBQVksQ0FDYixDQUFDO0lBQ0osQ0FBQztJQUVELGlCQUFpQixDQUFDLGlCQUEyQjtRQUMzQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUNsQixHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxhQUNuQixJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxPQUM5Qix3QkFBd0IsaUJBQWlCLENBQUMsSUFBSSxDQUM1QyxHQUFHLENBQ0osbUNBQW1DLENBQ3JDLENBQUM7SUFDSixDQUFDO0lBRUQsZUFBZSxDQUFDLFFBQWdCLEVBQUUsTUFBYyxFQUFFLFFBQWdCO1FBQ2hFLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQ2xCLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLHNCQUFzQixRQUFRLFdBQVcsTUFBTSxhQUFhLFFBQVEseUhBQXlILENBQ25OLENBQUM7SUFDSixDQUFDOzs4R0FoQ1UsaUJBQWlCLDBFQUlsQixXQUFXO2tIQUpWLGlCQUFpQixjQUZoQixNQUFNOzJGQUVQLGlCQUFpQjtrQkFIN0IsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7OzBCQUtJLE1BQU07MkJBQUMsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IElQbGFpblRyYW5zYWN0aW9uT2JqZWN0IH0gZnJvbSAnQG11bHRpdmVyc3gvc2RrLWNvcmUvb3V0JztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IERhcHBDb25maWcsIERBUFBfQ09ORklHIH0gZnJvbSAnLi4vLi4vY29uZmlnJztcbmltcG9ydCB7IEFjY291bnRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYWNjb3VudC9hY2NvdW50LnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQWNjb3VudEFwaVNlcnZpY2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsXG4gICAgcHJpdmF0ZSBhY2NvdW50U2VydmljZTogQWNjb3VudFNlcnZpY2UsXG4gICAgQEluamVjdChEQVBQX0NPTkZJRykgcHVibGljIGNvbmZpZzogRGFwcENvbmZpZ1xuICApIHt9XG5cbiAgZ2V0QWNjb3VudChhZGRyZXNzOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KGAke3RoaXMuY29uZmlnLmFwaVVSTH0vYWNjb3VudHMvJHthZGRyZXNzfWApO1xuICB9XG5cbiAgc2VuZFRyYW5zYWN0aW9ucyh0cmFuc2FjdGlvbnM6IElQbGFpblRyYW5zYWN0aW9uT2JqZWN0W10pIHtcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QoXG4gICAgICBgJHt0aGlzLmNvbmZpZy5nYXRld2F5VVJMfS90cmFuc2FjdGlvbi9zZW5kLW11bHRpcGxlYCxcbiAgICAgIHRyYW5zYWN0aW9uc1xuICAgICk7XG4gIH1cblxuICB0cmFja1RyYW5zYWN0aW9ucyh0cmFuc2FjdGlvbkhhc2hlczogc3RyaW5nW10pIHtcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldChcbiAgICAgIGAke3RoaXMuY29uZmlnLmFwaVVSTH0vYWNjb3VudHMvJHtcbiAgICAgICAgdGhpcy5hY2NvdW50U2VydmljZS5hY2NvdW50LmFkZHJlc3NcbiAgICAgIH0vdHJhbnNhY3Rpb25zP2hhc2hlcz0ke3RyYW5zYWN0aW9uSGFzaGVzLmpvaW4oXG4gICAgICAgICcsJ1xuICAgICAgKX0mZmllbGRzPXN0YXR1cyZ3aXRoU2NSZXN1bHRzPXRydWVgXG4gICAgKTtcbiAgfVxuXG4gIGdldFRyYW5zYWN0aW9ucyhsaXN0U2l6ZTogbnVtYmVyLCBzZW5kZXI6IHN0cmluZywgcmVjZWl2ZXI6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KFxuICAgICAgYCR7dGhpcy5jb25maWcuYXBpVVJMfS90cmFuc2FjdGlvbnM/c2l6ZT0ke2xpc3RTaXplfSZzZW5kZXI9JHtzZW5kZXJ9JnJlY2VpdmVyPSR7cmVjZWl2ZXJ9JmNvbmRpdGlvbj1tdXN0JmZpZWxkcz10eEhhc2glMkN0aW1lc3RhbXAlMkNzZW5kZXIlMkNzZW5kZXJTaGFyZCUyQ3JlY2VpdmVyJTJDcmVjZWl2ZXJTaGFyZCUyQ3N0YXR1cyUyQ3ZhbHVlJTJDZnVuY3Rpb25gXG4gICAgKTtcbiAgfVxufVxuIl19