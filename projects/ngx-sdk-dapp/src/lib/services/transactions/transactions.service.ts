import { Inject, Injectable, TemplateRef } from '@angular/core';
import { IPlainTransactionObject, Transaction } from '@multiversx/sdk-core/out';
import { Select, Store } from '@ngxs/store';
import { lastValueFrom, map, Observable, skipWhile, take } from 'rxjs';
import { DappConfig, DAPP_CONFIG } from '../../config';
import { AccountApiService } from '../../ngxs/account/account-api.service';
import {
  AddTransactionsBatch,
  CancelPendingSignature,
  ChangeTxStatus,
  RemoveTransaction,
  ResetTransactions,
  SetTransactionHashes,
} from '../../ngxs/account/transactions.actions';
import {
  SingleTransactionModel,
  TransactionsStateModel,
} from '../../ngxs/account/transactions.slice';
import { ParseAmountPipe } from '../../pipes/parseAmount/parse-amount.pipe';
import { TxStatusEnum } from '../../types';
import { AccountService } from '../account/account.service';
import { PermissionsProviderService } from '../authProviders/PermissionsProvider';

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

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  public toasts: ToastInfo[] = [];
  @Select() transactions$: Observable<TransactionsStateModel> | undefined;

  toastTemplate: TemplateRef<any> | null = null;

  private trackedTransactions: number[] = [];

  constructor(
    private permissionsProvider: PermissionsProviderService,
    private store: Store,
    private accountApi: AccountApiService,
    private accountService: AccountService,
    private parseAmount: ParseAmountPipe,
    @Inject(DAPP_CONFIG) public config: DappConfig
  ) {
    setTimeout(() => {
      this.transactions$?.subscribe((state: TransactionsStateModel) => {
        for (const transaction of state.transactions) {
          if (
            transaction.status === TxStatusEnum.SIGNED &&
            !transaction.options.signOnly
          ) {
            this.sendTxToAPI(transaction.transactions, transaction.id);
          }

          if (
            transaction.status === TxStatusEnum.SIGNATURE_FAILED ||
            transaction.status === TxStatusEnum.CANCELLED ||
            transaction.status === TxStatusEnum.SEND_IN_PROGRESS ||
            transaction.status === TxStatusEnum.SENT_SUCCESS ||
            transaction.status === TxStatusEnum.SENT_ERROR
          ) {
            const transactionsInfo: TxInfoType[] | undefined =
              transaction.transactionsHashes?.map(
                (txHash): TxInfoType => ({
                  txHash: txHash,
                  status: TxStatusEnum.SEND_IN_PROGRESS,
                })
              );
            this.show(
              transaction.options.transactionTitle,
              transactionsInfo || [],
              transaction.id,
              transaction.status
            );

            if (
              transaction.transactionsHashes?.length &&
              !this.trackedTransactions.includes(transaction.id)
            ) {
              this.trackedTransactions.push(transaction.id);
              this.trackTransactionStatus(transaction);
            }
          }
        }
      });
    }, 1000);

    this.watchUnload();
  }

  private async watchUnload() {
    window.onbeforeunload = (e) => {
      if (this.permissionsProvider.provider?.cancelAction) {
        this.permissionsProvider.provider.cancelAction();
        this.store.dispatch(new CancelPendingSignature());
      }
    };
  }

  private async trackTransactionStatus(transaction: SingleTransactionModel) {
    if (!transaction.transactionsHashes) return;
    try {
      const txStatuses = await lastValueFrom<any>(
        this.accountApi.trackTransactions(transaction.transactionsHashes)
      );
      const shouldContinueTracking = this.updateToastStatus(
        txStatuses,
        transaction.id
      );
      if (shouldContinueTracking) {
        setTimeout(() => {
          this.trackTransactionStatus(transaction);
        }, 6000);
      }
    } catch (error) {}
  }

  public watchTransactionByTitle(
    txTitle: string,
    watchForStatus: TxStatusEnum
  ): Observable<SingleTransactionModel | undefined> {
    if (this.transactions$ === undefined)
      throw new Error('transactions$ is undefined');

    return this.transactions$
      .pipe(
        map((state) => {
          const tx = state.transactions.filter((tx) => {
            return tx.options.transactionTitle === txTitle;
          });
          return tx[0];
        })
      )
      .pipe(skipWhile((tx) => !tx || tx.status !== watchForStatus))
      .pipe(take(1));
  }

  public hasTransactionsInStatus(status: TxStatusEnum): Observable<boolean> {
    if (this.transactions$ === undefined)
      throw new Error('transactions$ is undefined');

    return this.transactions$.pipe(
      map((transaction) =>
        transaction.transactions.some((tx) => {
          return tx.status === status;
        })
      )
    );
  }

  private updateToastStatus(
    txHashesStatus: Array<{ status: string }>,
    transactionId: number
  ): boolean {
    let shouldContinueTracking = false;

    this.toasts.map((toast) => {
      if (toast.id === transactionId) {
        for (let i in txHashesStatus) {
          switch (txHashesStatus[i].status) {
            case 'fail':
              this.store.dispatch(
                new ChangeTxStatus({
                  id: transactionId,
                  newStatus: TxStatusEnum.SENT_ERROR,
                })
              );
              toast.transactionsInfo[i].status = TxStatusEnum.SENT_ERROR;
              break;

            case 'success':
              this.store.dispatch(
                new ChangeTxStatus({
                  id: transactionId,
                  newStatus: TxStatusEnum.SENT_SUCCESS,
                })
              );
              toast.transactionsInfo[i].status = TxStatusEnum.SENT_SUCCESS;
              break;

            default:
              break;
          }
        }

        const shouldContinue = toast.transactionsInfo.some(
          (tx) => tx.status === TxStatusEnum.SEND_IN_PROGRESS
        );

        const shouldSetSuccess = toast.transactionsInfo.every(
          (tx) => tx.status === TxStatusEnum.SENT_SUCCESS
        );

        const shouldSetError = toast.transactionsInfo.some(
          (tx) => tx.status === TxStatusEnum.SENT_ERROR
        );

        if (shouldSetError) {
          toast.status = TxStatusEnum.SENT_ERROR;
        }

        if (shouldSetSuccess) {
          toast.status = TxStatusEnum.SENT_SUCCESS;
        }
        shouldContinueTracking = shouldContinue;
      }

      return false;
    });

    if (!shouldContinueTracking) {
      this.accountService.refetchAccountData();
    }

    return shouldContinueTracking;
  }

  private async sendTxToAPI(
    transactions: IPlainTransactionObject[],
    transactionsId: number
  ) {
    this.store.dispatch(
      new ChangeTxStatus({
        newStatus: TxStatusEnum.READY_TO_SEND,
        id: transactionsId,
      })
    );

    try {
      const {
        data: { txsHashes, numOfSentTxs },
        error,
      } = await lastValueFrom<any>(
        this.accountApi.sendTransactions(transactions)
      );

      const hashesArray: string[] = Object.values(txsHashes);
      if (
        error ||
        !txsHashes ||
        numOfSentTxs === 0 ||
        hashesArray.length === 0
      ) {
        this.store.dispatch(
          new ChangeTxStatus({
            newStatus: TxStatusEnum.SENT_ERROR,
            id: transactionsId,
          })
        );
        return;
      }

      this.store.dispatch(
        new SetTransactionHashes({
          id: transactionsId,
          hashes: hashesArray,
        })
      );

      this.store.dispatch(
        new ChangeTxStatus({
          newStatus: TxStatusEnum.SEND_IN_PROGRESS,
          id: transactionsId,
        })
      );
    } catch (error) {
      this.store.dispatch(
        new ChangeTxStatus({
          newStatus: TxStatusEnum.SENT_ERROR,
          id: transactionsId,
        })
      );
    }
  }

  public sendTransactions(
    transactions: Omit<
      IPlainTransactionObject,
      'nonce' | 'sender' | 'chainID' | 'version'
    >[],
    txOptions: TransactionsOptions
  ): number {
    const txId = Date.now();

    const transactionsToSend = transactions.map((tx, index) => ({
      ...tx,
      nonce: this.accountService.account.nonce + index,
      sender: this.accountService.account.address,
      data: Buffer.from(tx.data ?? '', 'utf8').toString('base64'),
      value: this.parseAmount.transform(tx.value),
      chainID: this.config.chainID,
      //TODO: change version if needed (ledger, guardians, etc)
      version: 1,
    }));

    this.store.dispatch(
      new AddTransactionsBatch({
        id: txId,
        transactions: transactionsToSend,
        status: TxStatusEnum.PENDING_SIGNATURE,
        options: txOptions,
      })
    );

    this.permissionsProvider.sendTransactions(transactionsToSend, txId);

    return txId;
  }

  show(
    header: string,
    transactionsInfo: TxInfoType[],
    txId: number,
    status: TxStatusEnum
  ) {
    if (!this.toastTemplate)
      throw new Error('TransactionsService: toastTemplate is not set');

    if (this.toasts.find((t) => t.id === txId)) return;

    this.toasts.push({
      id: txId,
      header,
      status,
      transactionsInfo,
      templateRef: this.toastTemplate,
    });
  }

  remove(toastId: number) {
    this.store.dispatch(new RemoveTransaction({ id: toastId }));
    this.toasts = this.toasts.filter((t) => t.id != toastId);
  }

  setTxTemplate(template: any) {
    this.toastTemplate = template;
  }

  resetToInitialState() {
    this.store.dispatch(new ResetTransactions());
  }
}
