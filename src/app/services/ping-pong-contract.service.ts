import { Injectable } from '@angular/core';
import {
  Address,
  AddressValue,
  ContractFunction,
  ResultsParser,
} from '@multiversx/sdk-core/out';
import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers/out';
import { AccountService } from 'ngx-sdk-dapp';
import { SDK_DAPP_CONFIG } from '../config';
import { smartContract } from '../smartContracts/pingPong';

const resultsParser = new ResultsParser();

@Injectable({
  providedIn: 'root',
})
export class PingPongContractService {
  constructor(private accountService: AccountService) {}

  async getTimeToPong() {
    try {
      const query = smartContract.createQuery({
        func: new ContractFunction('getTimeToPong'),
        args: [
          new AddressValue(new Address(this.accountService.account.address)),
        ],
      });
      const provider = new ProxyNetworkProvider(SDK_DAPP_CONFIG.apiURL);

      const queryResponse = await provider.queryContract(query);

      const endpointDefinition = smartContract.getEndpoint('getTimeToPong');

      const { firstValue } = resultsParser.parseQueryResponse(
        queryResponse,
        endpointDefinition
      );

      const secondsRemaining: number = firstValue?.valueOf()?.toNumber();

      return secondsRemaining;
    } catch (err) {
      return undefined;
    }
  }
}
