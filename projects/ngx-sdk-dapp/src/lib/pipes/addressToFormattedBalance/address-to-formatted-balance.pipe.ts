import { HttpClient } from '@angular/common/http';
import { Inject, Pipe, PipeTransform } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { DappConfig, DAPP_CONFIG } from '../../config';
import { AccountApiService } from '../../ngxs/account/account-api.service';
import { FormatAmountPipe } from '../formatAmount/format-amount.pipe';

@Pipe({
  name: 'addressToFormattedBalance',
})
export class AddressToFormattedBalancePipe implements PipeTransform {
  constructor(
    @Inject(DAPP_CONFIG) public config: DappConfig,
    private http: HttpClient,
    private accountApi: AccountApiService,
    private formatPipe: FormatAmountPipe
  ) {}

  async transform(value: string, ...args: unknown[]): Promise<string> {
    const account = await lastValueFrom(this.accountApi.getAccount(value));

    return this.formatPipe.transform(account.balance, {
      digits: 2,
      addCommas: true,
    }) as string;
  }
}
