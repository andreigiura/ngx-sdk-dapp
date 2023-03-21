import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardHomeComponent } from './pages/home/dashboard-home.component';
import {
  FormatAmountPipe,
  NgxSdkDappModule,
  ParseAmountPipe,
} from 'ngx-sdk-dapp';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TransactionsTableComponent } from './components/transactions-table/transactions-table.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';

@NgModule({
  declarations: [DashboardHomeComponent, TransactionsTableComponent, StatisticsComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgxSdkDappModule,
    NgbAlertModule,
    FontAwesomeModule,
  ],
  providers: [ParseAmountPipe, FormatAmountPipe],
})
export class DashboardModule {}
