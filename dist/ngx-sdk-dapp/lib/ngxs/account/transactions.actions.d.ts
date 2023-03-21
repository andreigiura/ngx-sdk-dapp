import { IPlainTransactionObject } from '@multiversx/sdk-core/out';
import { SingleTransactionModel } from './transactions.slice';
export declare class AddTransactionsBatch {
    payload: SingleTransactionModel;
    static readonly type = "[Transactions] Add Transactions Batch";
    constructor(payload: SingleTransactionModel);
}
export declare class MoveToSignedTransactions {
    payload: {
        id: number;
        signedTransactions: IPlainTransactionObject[];
    };
    static readonly type = "[Transactions] Move to signed Transactions";
    constructor(payload: {
        id: number;
        signedTransactions: IPlainTransactionObject[];
    });
}
export declare class ResetTransactions {
    static readonly type = "[Transactions] Reset Transactions";
}
export declare class ChangeTxStatus {
    payload: {
        id: number;
        newStatus: string;
    };
    static readonly type = "[Transactions] Move to failed Transactions";
    constructor(payload: {
        id: number;
        newStatus: string;
    });
}
export declare class RemoveTransaction {
    payload: {
        id: number;
    };
    static readonly type = "[Transactions] Remove Transaction";
    constructor(payload: {
        id: number;
    });
}
export declare class SetTransactionHashes {
    payload: {
        id: number;
        hashes: string[];
    };
    static readonly type = "[Transactions] Set Transaction Hashes";
    constructor(payload: {
        id: number;
        hashes: string[];
    });
}
