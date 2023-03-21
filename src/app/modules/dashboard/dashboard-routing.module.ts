import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivateRoute } from 'ngx-sdk-dapp';
import { DashboardHomeComponent } from './pages/home/dashboard-home.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';

export const dashboardModuleRoutes = {
  dashboardHome: {
    path: 'dashboard/home',
    component: DashboardHomeComponent,
    canActivate: [canActivateRoute],
  },

  statistics: {
    path: 'dashboard/stats',
    component: StatisticsComponent,
    canActivate: [canActivateRoute],
  },
};

@NgModule({
  imports: [
    RouterModule.forChild(Object.values(dashboardModuleRoutes) as Routes),
  ],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
