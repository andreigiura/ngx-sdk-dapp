import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { SDK_DAPP_CONFIG } from 'src/app/config';
import { dashboardModuleRoutes } from '../../dashboard-routing.module';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.sass'],
})
export class StatisticsComponent {
  dashboardHomeRoute = dashboardModuleRoutes.dashboardHome.path;
  stats: any;

  constructor(private http: HttpClient) {
    this.getToolsApiResponse();
  }

  private async getToolsApiResponse() {
    const response: any = await lastValueFrom(
      this.http.get(
        `${SDK_DAPP_CONFIG.nativeAuthAPIs['toolsApi']}/growth-api/charts?types=price`
      )
    );
    this.stats = response[0].statistics;
  }
}
