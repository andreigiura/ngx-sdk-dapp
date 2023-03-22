import { Component } from '@angular/core';
import {
  AccountService,
  PermissionsProviderService,
  TransactionsService,
  TxStatusEnum,
} from 'ngx-sdk-dapp';

@Component({
  selector: 'app-awaiting-signature',
  templateUrl: './awaiting-signature.component.html',
  styleUrls: ['./awaiting-signature.component.sass'],
})
export class AwaitingSignatureComponent {
  TxStatusEnum = TxStatusEnum;

  constructor(
    public transactionsService: TransactionsService,
    public accountService: AccountService,
    public permissionsProvider: PermissionsProviderService
  ) {}
}
