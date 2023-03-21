import { HttpClient } from '@angular/common/http';
import { IPlainTransactionObject } from '@multiversx/sdk-core/out';
import { DappConfig } from '../../config';
import { AccountService } from '../../services/account/account.service';
import * as i0 from "@angular/core";
export declare class AccountApiService {
    private http;
    private accountService;
    config: DappConfig;
    constructor(http: HttpClient, accountService: AccountService, config: DappConfig);
    getAccount(address: string): import("rxjs").Observable<Object>;
    sendTransactions(transactions: IPlainTransactionObject[]): import("rxjs").Observable<Object>;
    trackTransactions(transactionHashes: string[]): import("rxjs").Observable<Object>;
    getTransactions(listSize: number, sender: string, receiver: string): import("rxjs").Observable<Object>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AccountApiService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AccountApiService>;
}
