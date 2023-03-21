import { Component } from '@angular/core';
import { faFileCode } from '@fortawesome/free-regular-svg-icons';
import { faArrowRightArrowLeft } from '@fortawesome/free-solid-svg-icons';
import {
  AccountApiService,
  AccountService,
  isContract,
  TransactionsService,
  TxStatusEnum,
} from 'ngx-sdk-dapp';
import { MY_APP_CONFIG, SDK_DAPP_CONFIG } from 'src/app/config';

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.sass'],
})
export class TransactionsTableComponent {
  transactions: any[] = [];
  egldLabel: string = MY_APP_CONFIG.egldLabel;
  explorerURL: string = SDK_DAPP_CONFIG.explorerURL;
  isContract = isContract;
  faFileContract = faFileCode;
  faTxArrows = faArrowRightArrowLeft;
  constructor(
    private accountApi: AccountApiService,
    private accountService: AccountService,
    private transactionsService: TransactionsService
  ) {
    this.transactionsService
      .watchTransactionByTitle('Ping Transaction', TxStatusEnum.SENT_SUCCESS)
      .subscribe(() => {
        this.fetchTransactions();
      });

    this.transactionsService
      .watchTransactionByTitle('Pong Transaction', TxStatusEnum.SENT_SUCCESS)
      .subscribe(() => {
        this.fetchTransactions();
      });

    this.fetchTransactions();
  }

  fetchTransactions() {
    this.accountApi
      .getTransactions(
        15,
        this.accountService.account.address,
        MY_APP_CONFIG.pingPongContractAddress
      )
      .subscribe((transactions: any) => {
        this.transactions = transactions;
      });
  }
}
