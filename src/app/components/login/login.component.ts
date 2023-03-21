import { Component } from '@angular/core';
import { faAngular } from '@fortawesome/free-brands-svg-icons';
import {
  AuthenticationService,
  PermissionsProviderService,
  ProvidersType,
} from 'ngx-sdk-dapp';
import { dashboardModuleRoutes } from 'src/app/modules/dashboard/dashboard-routing.module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent {
  faAngular = faAngular;
  allProviders = ProvidersType;
  constructor(
    public authService: AuthenticationService,
    public permissionsProvider: PermissionsProviderService
  ) {}

  connectBtnHandler(provider: ProvidersType) {
    this.permissionsProvider.setProvider(provider);
    this.permissionsProvider.connect(dashboardModuleRoutes.dashboardHome.path);
  }
}
