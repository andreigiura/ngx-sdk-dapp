import { Inject } from '@angular/core';
import { IPlainTransactionObject, Transaction } from '@multiversx/sdk-core/out';
import { NativeAuthClient } from '@multiversx/sdk-native-auth-client';
import { Store } from '@ngxs/store';
import { DappConfig, DAPP_CONFIG } from '../../config';
import { ResetAccount } from '../../ngxs/account/account.actions';
import { AccountStateModel } from '../../ngxs/account/account.slice';
import {
  ChangeTxStatus,
  MoveToSignedTransactions,
  ResetTransactions,
} from '../../ngxs/account/transactions.actions';
import { TxStatusEnum } from '../../types';
import { AccountService } from '../account/account.service';
import { AuthenticationService } from '../authentication/authentication.service';
import { TransactionsService } from '../transactions/transactions.service';

export enum ProvidersType {
  Extension = 'Extension',
  WebWallet = 'WebWallet',
  XPortal = 'XPortal',
  EMPTY = '',
}
/**
 * @ignore
 */
export class GenericProvider {
  constructor(
    private store: Store,
    private accountService: AccountService,
    private authenticationService: AuthenticationService,
    @Inject(DAPP_CONFIG) public config: DappConfig
  ) {
    if (
      this.accountService.account.currentProvider !== ProvidersType.EMPTY &&
      this.authenticationService.isAuthenticated()
    ) {
      this.reInitialize(accountService.account);
    }
  }

  async connect(
    navAfterConnectRoute: string
  ): Promise<{ client: NativeAuthClient; init: string }> {
    if (
      this.accountService.account.currentProvider !== ProvidersType.EMPTY &&
      this.authenticationService.isAuthenticated()
    ) {
      throw new Error('Provider is already connected, please logout first.');
    }
    const client = new NativeAuthClient();
    const init = await client.initialize();

    return { client, init };
  }

  async logout(): Promise<boolean> {
    this.store.dispatch(new ResetAccount());
    this.store.dispatch(new ResetTransactions());
    return true;
  }

  sendTransactions(transactions: IPlainTransactionObject[], txId: number) {}

  addSignedTransactionsToState(
    transactions: IPlainTransactionObject[],
    txId: number
  ) {
    this.store.dispatch(
      new MoveToSignedTransactions({
        signedTransactions: transactions,
        id: txId,
      })
    );
  }

  addFailedTransactionsToState(txId: number) {
    this.store.dispatch(
      new ChangeTxStatus({
        id: txId,
        newStatus: TxStatusEnum.SIGNATURE_FAILED,
      })
    );
  }

  addToCancelledTransaction(txId: number) {
    this.store.dispatch(
      new ChangeTxStatus({
        id: txId,
        newStatus: TxStatusEnum.CANCELLED,
      })
    );
  }

  cancelAction() {}

  reInitialize(account: AccountStateModel): void {}
}
