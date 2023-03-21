import { NgModule } from '@angular/core';
import { NgxsActionsExecutingModule } from '@ngxs-labs/actions-executing';
import {
  NgxsStoragePluginModule,
  StorageEngine,
  STORAGE_ENGINE,
} from '@ngxs/storage-plugin';
import { NgxsModule } from '@ngxs/store';
import { AccountState } from './ngxs/account/account.slice';
import { HttpClientModule } from '@angular/common/http';
import { FormatAmountPipe } from './pipes/formatAmount/format-amount.pipe';
import { CommonModule } from '@angular/common';
import { ParseAmountPipe } from './pipes/parseAmount/parse-amount.pipe';
import { TransactionsState } from './ngxs/account/transactions.slice';
import { TrimStrPipe } from './pipes/trimStr/trim-str.pipe';
import { TimeAgoPipe } from './pipes/timeAgo/time-ago.pipe';

export class MyStorageEngine implements StorageEngine {
  static STORAGE_PREFIX = 'ngx-sdk-dapp_';
  get length(): number {
    return Object.keys(localStorage).filter((x) =>
      x.startsWith(MyStorageEngine.STORAGE_PREFIX)
    ).length;
  }

  getItem(key: string): any {
    return localStorage.getItem(MyStorageEngine.STORAGE_PREFIX + key);
  }

  setItem(key: string, val: any): void {
    localStorage.setItem(MyStorageEngine.STORAGE_PREFIX + key, val);
  }

  removeItem(key: string): void {
    localStorage.removeItem(MyStorageEngine.STORAGE_PREFIX + key);
  }

  clear(): void {
    Object.keys(localStorage)
      .filter((x) => x.startsWith(MyStorageEngine.STORAGE_PREFIX))
      .forEach((x) => localStorage.removeItem(x));
  }
}

@NgModule({
  declarations: [FormatAmountPipe, ParseAmountPipe, TrimStrPipe, TimeAgoPipe],
  imports: [
    NgxsModule.forRoot([AccountState, TransactionsState]),
    NgxsStoragePluginModule.forRoot(),
    NgxsActionsExecutingModule.forRoot(),
    HttpClientModule,
    CommonModule,
  ],
  providers: [
    {
      provide: STORAGE_ENGINE,
      useClass: MyStorageEngine,
    },
  ],
  exports: [FormatAmountPipe, ParseAmountPipe, TrimStrPipe, TimeAgoPipe],
})
export class NgxSdkDappModule {}
