import { Component } from '@angular/core';
import { faAngular } from '@fortawesome/free-brands-svg-icons';
import {
  faArrowRightToBracket,
  faChartSimple,
} from '@fortawesome/free-solid-svg-icons';
import {
  AuthenticationService,
  PermissionsProviderService,
} from 'ngx-sdk-dapp';
import { dashboardModuleRoutes } from './modules/dashboard/dashboard-routing.module';

@Component({
  selector: 'app-root',
  template: `
    <header
      class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom"
    >
      <a
        href="/"
        class="d-flex ps-2 align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none"
      >
        <fa-icon [icon]="faAngular" size="2x" class="text-danger"></fa-icon>
        DApp Template
      </a>

      <div class="col-md-3 text-end">
        <a
          *ngIf="authService.isAuthenticated()"
          [routerLink]="[dashBoardStatsRoute]"
          ><fa-icon [icon]="faChart"></fa-icon></a
        >&nbsp;
        <button
          type="button"
          *ngIf="authService.isAuthenticated()"
          class="btn btn-outline-primary me-2"
          (click)="permissionsProvider.logout()"
        >
          <fa-icon [icon]="faLogout"></fa-icon> Logout
        </button>
      </div>
    </header>
    <div class="container">
      <app-awaiting-signature></app-awaiting-signature>
      <router-outlet> </router-outlet>
    </div>
    <app-app-toasts></app-app-toasts>
  `,
})
export class AppComponent {
  faAngular = faAngular;
  faLogout = faArrowRightToBracket;
  faChart = faChartSimple;
  dashBoardHomeRoute = dashboardModuleRoutes.dashboardHome.path;
  dashBoardStatsRoute = dashboardModuleRoutes.statistics.path;
  constructor(
    public authService: AuthenticationService,
    public permissionsProvider: PermissionsProviderService
  ) {}
}
