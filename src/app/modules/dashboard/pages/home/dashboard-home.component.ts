import { Component } from '@angular/core';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import {
  AccountService,
  GAS_PRICE,
  TransactionsService,
  TxStatusEnum,
} from 'ngx-sdk-dapp';
import { interval, skipWhile, take, takeWhile } from 'rxjs';
import { MY_APP_CONFIG } from 'src/app/config';
import { PingPongContractService } from 'src/app/services/ping-pong-contract.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.sass'],
})
export class DashboardHomeComponent {
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;

  public secondsRemaining: number | undefined | null;
  public hasPing: boolean = false;
  public transactionInProgress: boolean = false;
  contractAddress: string = MY_APP_CONFIG.pingPongContractAddress;
  egldLabel: string = MY_APP_CONFIG.egldLabel;

  constructor(
    public accountService: AccountService,
    private transactionsService: TransactionsService,
    private pingPongContractService: PingPongContractService
  ) {
    this.getTimeToPong();

    transactionsService
      .watchTransactionByTitle('Ping Transaction', TxStatusEnum.SENT_SUCCESS)
      .subscribe(() => {
        this.accountService.refetchAccountData();
        this.getTimeToPong();
      });

    transactionsService
      .watchTransactionByTitle('Pong Transaction', TxStatusEnum.SENT_SUCCESS)
      .subscribe(() => {
        this.accountService.refetchAccountData();
        this.hasPing = true;
      });

    transactionsService
      .hasTransactionsInProgress()
      .subscribe((hasTransactionsInProgress) => {
        this.transactionInProgress = hasTransactionsInProgress;
      });
  }

  private async getTimeToPong() {
    const secondsRemaining = await this.pingPongContractService.getTimeToPong();
    switch (secondsRemaining) {
      case undefined:
      case null:
        this.hasPing = true;
        break;
      case 0:
        this.hasPing = false;
        break;
      default: {
        this.secondsRemaining = secondsRemaining;
        interval(1000)
          .pipe(takeWhile((n) => n <= secondsRemaining))
          .subscribe((n) => {
            if (this.secondsRemaining) this.secondsRemaining -= 1;
          });

        this.hasPing = false;
        break;
      }
    }
  }

  async sendPingTx() {
    this.transactionsService.sendTransactions(
      [
        {
          value: '1',
          receiver: MY_APP_CONFIG.pingPongContractAddress,
          gasPrice: GAS_PRICE,
          gasLimit: 60000000,
          data: 'ping',
        },
      ],
      { transactionTitle: 'Ping Transaction' }
    );
  }

  async sendPongTx() {
    this.transactionsService.sendTransactions(
      [
        {
          value: '0',
          receiver: MY_APP_CONFIG.pingPongContractAddress,
          gasPrice: GAS_PRICE,
          gasLimit: 60000000,
          data: 'pong',
        },
      ],
      { transactionTitle: 'Pong Transaction' }
    );
  }
}
