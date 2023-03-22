import { HttpClient } from '@angular/common/http';
import { IPlainTransactionObject } from '@multiversx/sdk-core/out';
import { Observable } from 'rxjs';
import { DappConfig } from '../../config';
import { AccountService } from '../../services/account/account.service';
import * as i0 from "@angular/core";
export declare class AccountApiService {
    private http;
    private accountService;
    config: DappConfig;
    constructor(http: HttpClient, accountService: AccountService, config: DappConfig);
    getAccount(address: string): Observable<any>;
    sendTransactions(transactions: IPlainTransactionObject[]): Observable<Object>;
    trackTransactions(transactionHashes: string[]): Observable<Object>;
    getTransactions(listSize: number, sender: string, receiver: string): Observable<Object>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AccountApiService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AccountApiService>;
}
