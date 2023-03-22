import { Injectable } from '@angular/core';
import { IPlainTransactionObject } from '@multiversx/sdk-core/out';
import { Action, State, StateContext } from '@ngxs/store';
import { TransactionsOptions } from '../../services/transactions/transactions.service';
import { TxStatusEnum } from '../../types';

import {
  AddTransactionsBatch,
  CancelPendingSignature,
  ChangeTxStatus,
  MoveToSignedTransactions,
  RemoveTransaction,
  ResetTransactions,
  SetTransactionHashes,
} from './transactions.actions';

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
export const TransactionsInitialState = {
  transactions: [],
};

@State<TransactionsStateModel>({
  name: 'transactions',
  defaults: TransactionsInitialState,
})
@Injectable()
export class TransactionsState {
  constructor() {}

  @Action(AddTransactionsBatch)
  async addTransactionBatch(
    { setState, getState }: StateContext<TransactionsStateModel>,
    { payload }: AddTransactionsBatch
  ) {
    const transactions = getState().transactions;
    transactions.push(payload);
    setState({ transactions });
  }

  @Action(MoveToSignedTransactions)
  async moveToSigned(
    { setState, getState }: StateContext<TransactionsStateModel>,
    { payload }: MoveToSignedTransactions
  ) {
    const transactions = getState().transactions;
    transactions.map((tx) => {
      if (tx.id === payload.id) {
        tx.status = TxStatusEnum.SIGNED;
        tx.transactions = payload.signedTransactions;
      }
    });
    setState({ transactions });
  }

  @Action(ResetTransactions)
  async resetTransactions({ setState }: StateContext<TransactionsStateModel>) {
    setState(TransactionsInitialState);
  }

  @Action(ChangeTxStatus)
  async moveToFailed(
    { setState, getState }: StateContext<TransactionsStateModel>,
    { payload }: ChangeTxStatus
  ) {
    const transactions = getState().transactions;
    transactions.map((tx) => {
      if (tx.id === payload.id) {
        tx.status = payload.newStatus as TxStatusEnum;
      }
    });
    setState({ transactions });
  }

  @Action(RemoveTransaction)
  async removeTransaction(
    { setState, getState }: StateContext<TransactionsStateModel>,
    { payload }: RemoveTransaction
  ) {
    let transactions = getState().transactions;
    transactions = transactions.filter((tx) => {
      return tx.id !== payload.id;
    });
    setState({ transactions });
  }

  @Action(SetTransactionHashes)
  async setTxHashes(
    { setState, getState }: StateContext<TransactionsStateModel>,
    { payload }: SetTransactionHashes
  ) {
    const transactions = getState().transactions;
    transactions.map((tx) => {
      if (tx.id === payload.id) {
        tx.transactionsHashes = payload.hashes;
      }
    });
    setState({ transactions });
  }

  @Action(CancelPendingSignature)
  async cancelPendingSignature({
    setState,
    getState,
  }: StateContext<TransactionsStateModel>) {
    const transactions = getState().transactions;
    transactions.map((tx) => {
      if (tx.status === TxStatusEnum.PENDING_SIGNATURE) {
        tx.status = TxStatusEnum.CANCELLED;
      }
    });
    setState({ transactions });
  }
}
