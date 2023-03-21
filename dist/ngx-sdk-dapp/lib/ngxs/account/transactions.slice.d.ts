import { IPlainTransactionObject } from '@multiversx/sdk-core/out';
import { StateContext } from '@ngxs/store';
import { TransactionsOptions } from '../../services/transactions/transactions.service';
import { TxStatusEnum } from '../../types';
import { AddTransactionsBatch, ChangeTxStatus, MoveToSignedTransactions, RemoveTransaction, SetTransactionHashes } from './transactions.actions';
import * as i0 from "@angular/core";
export interface SingleTransactionModel {
    id: number;
    transactions: IPlainTransactionObject[];
    transactionsHashes?: string[];
    status: TxStatusEnum;
    options: TransactionsOptions;
}
export interface TransactionsStateModel {
    transactions: SingleTransactionModel[];
}
export declare const TransactionsInitialState: {
    transactions: never[];
};
export declare class TransactionsState {
    constructor();
    addTransactionBatch({ setState, getState }: StateContext<TransactionsStateModel>, { payload }: AddTransactionsBatch): Promise<void>;
    moveToSigned({ setState, getState }: StateContext<TransactionsStateModel>, { payload }: MoveToSignedTransactions): Promise<void>;
    resetTransactions({ setState }: StateContext<TransactionsStateModel>): Promise<void>;
    moveToFailed({ setState, getState }: StateContext<TransactionsStateModel>, { payload }: ChangeTxStatus): Promise<void>;
    removeTransaction({ setState, getState }: StateContext<TransactionsStateModel>, { payload }: RemoveTransaction): Promise<void>;
    setTxHashes({ setState, getState }: StateContext<TransactionsStateModel>, { payload }: SetTransactionHashes): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<TransactionsState, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<TransactionsState>;
}
