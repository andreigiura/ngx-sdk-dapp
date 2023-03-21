import { Component, TemplateRef, ViewChild } from '@angular/core';
import {
  faCircleCheck,
  faCircleDot,
  faCircleExclamation,
  faCircleXmark,
} from '@fortawesome/free-solid-svg-icons';
import { TransactionsService, TxStatusEnum } from 'ngx-sdk-dapp';
import { SDK_DAPP_CONFIG } from 'src/app/config';

@Component({
  selector: 'app-app-toasts',
  templateUrl: './app-toasts.component.html',
  styleUrls: ['./app-toasts.component.sass'],
})
export class AppToastsComponent {
  @ViewChild('TxToastTemplate', { read: TemplateRef })
  TxToastTemplate: TemplateRef<any> | null = null;
  TxStatusEnum = TxStatusEnum;
  faCircleX = faCircleXmark;
  faCircleExclamation = faCircleExclamation;
  faCircleCheck = faCircleCheck;
  faCircleDashed = faCircleDot;
  explorerURL = SDK_DAPP_CONFIG.explorerURL;
  constructor(public transactionsService: TransactionsService) {}

  ngAfterViewInit(): void {
    this.transactionsService.setTxTemplate(this.TxToastTemplate);
  }
}
