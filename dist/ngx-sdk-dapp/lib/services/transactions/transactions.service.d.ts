import { TemplateRef } from '@angular/core';
import { IPlainTransactionObject } from '@multiversx/sdk-core/out';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DappConfig } from '../../config';
import { AccountApiService } from '../../ngxs/account/account-api.service';
import { SingleTransactionModel, TransactionsStateModel } from '../../ngxs/account/transactions.slice';
import { ParseAmountPipe } from '../../pipes/parseAmount/parse-amount.pipe';
import { TxStatusEnum } from '../../types';
import { AccountService } from '../account/account.service';
import { PermissionsProviderService } from '../authProviders/PermissionsProvider';
import * as i0 from "@angular/core";
export interface TransactionsOptions {
    signOnly?: boolean;
    transactionTitle: string;
}
export interface TransactionsToSend {
    id: number;
    transactions: IPlainTransactionObject[];
    txOptions: TransactionsOptions;
}
interface TxInfoType {
    txHash: string;
    status: string;
}
export interface ToastInfo {
    id: number;
    header: string;
    transactionsInfo: TxInfoType[];
    status: string;
    templateRef: TemplateRef<any>;
}
export declare class TransactionsService {
    private permissionsProvider;
    private store;
    private accountApi;
    private accountService;
    private parseAmount;
    config: DappConfig;
    toasts: ToastInfo[];
    transactions$: Observable<TransactionsStateModel> | undefined;
    toastTemplate: TemplateRef<any> | null;
    private trackedTransactions;
    constructor(permissionsProvider: PermissionsProviderService, store: Store, accountApi: AccountApiService, accountService: AccountService, parseAmount: ParseAmountPipe, config: DappConfig);
    private watchUnload;
    private trackTransactionStatus;
    watchTransactionByTitle(txTitle: string, watchForStatus: TxStatusEnum): Observable<SingleTransactionModel | undefined>;
    hasTransactionsInStatus(status: TxStatusEnum): Observable<boolean>;
    private updateToastStatus;
    private sendTxToAPI;
    sendTransactions(transactions: Omit<IPlainTransactionObject, 'nonce' | 'sender' | 'chainID' | 'version'>[], txOptions: TransactionsOptions): number;
    show(header: string, transactionsInfo: TxInfoType[], txId: number, status: TxStatusEnum): void;
    remove(toastId: number): void;
    setTxTemplate(template: any): void;
    resetToInitialState(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TransactionsService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<TransactionsService>;
}
export {};
