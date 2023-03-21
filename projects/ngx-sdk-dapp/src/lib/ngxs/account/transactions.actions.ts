import { IPlainTransactionObject } from '@multiversx/sdk-core/out';
import { SingleTransactionModel } from './transactions.slice';

export class AddTransactionsBatch {
  static readonly type = '[Transactions] Add Transactions Batch';
  constructor(public payload: SingleTransactionModel) {}
}

export class MoveToSignedTransactions {
  static readonly type = '[Transactions] Move to signed Transactions';
  constructor(
    public payload: {
      id: number;
      signedTransactions: IPlainTransactionObject[];
    }
  ) {}
}

export class ResetTransactions {
  static readonly type = '[Transactions] Reset Transactions';
}

export class ChangeTxStatus {
  static readonly type = '[Transactions] Move to failed Transactions';
  constructor(public payload: { id: number; newStatus: string }) {}
}

export class RemoveTransaction {
  static readonly type = '[Transactions] Remove Transaction';
  constructor(public payload: { id: number }) {}
}

export class SetTransactionHashes {
  static readonly type = '[Transactions] Set Transaction Hashes';
  constructor(public payload: { id: number; hashes: string[] }) {}
}
