import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { IPlainTransactionObject } from '@multiversx/sdk-core/out';
import { Observable } from 'rxjs';
import { DappConfig, DAPP_CONFIG } from '../../config';
import { AccountService } from '../../services/account/account.service';

@Injectable({
  providedIn: 'root',
})
export class AccountApiService {
  constructor(
    private http: HttpClient,
    private accountService: AccountService,
    @Inject(DAPP_CONFIG) public config: DappConfig
  ) {}

  getAccount(address: string): Observable<any> {
    return this.http.get(`${this.config.apiURL}/accounts/${address}`);
  }

  sendTransactions(transactions: IPlainTransactionObject[]) {
    return this.http.post(
      `${this.config.gatewayURL}/transaction/send-multiple`,
      transactions
    );
  }

  trackTransactions(transactionHashes: string[]) {
    return this.http.get(
      `${this.config.apiURL}/accounts/${
        this.accountService.account.address
      }/transactions?hashes=${transactionHashes.join(
        ','
      )}&fields=status&withScResults=true`
    );
  }

  getTransactions(listSize: number, sender: string, receiver: string) {
    return this.http.get(
      `${this.config.apiURL}/transactions?size=${listSize}&sender=${sender}&receiver=${receiver}&condition=must&fields=txHash%2Ctimestamp%2Csender%2CsenderShard%2Creceiver%2CreceiverShard%2Cstatus%2Cvalue%2Cfunction`
    );
  }
}
