import { Component } from '@angular/core';
import { faAngular } from '@fortawesome/free-brands-svg-icons';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import {
  AuthenticationService,
  PermissionsProviderService,
  ProvidersType,
  XPortalProviderService,
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
  faError = faExclamationCircle;

  qrCodeStr: string | undefined;
  xPortalError: string | undefined;

  ledgerIsLoading = false;
  ledgerError = '';
  ledgerAccounts: string[] | undefined;

  constructor(
    public authService: AuthenticationService,
    public permissionsProvider: PermissionsProviderService,
    public xPortalService: XPortalProviderService
  ) {}

  resetLedgerLogin() {
    this.ledgerAccounts = [];
    this.ledgerError = '';
    this.ledgerIsLoading = false;
  }

  async connectBtnHandler(provider: ProvidersType) {
    this.permissionsProvider.setProvider(provider);

    if (provider === ProvidersType.Ledger) {
      this.ledgerIsLoading = true;
      const { qrCodeStr, approval, accounts, error } =
        await this.permissionsProvider.connect(
          dashboardModuleRoutes.dashboardHome.path
        );

      if (error) {
        this.ledgerError = error;
        return;
      }

      if (accounts) {
        this.ledgerAccounts = accounts;
      }

      return;
    }

    if (provider === ProvidersType.XPortal) {
      const { qrCodeStr, approval, token } =
        await this.permissionsProvider.connect(
          dashboardModuleRoutes.dashboardHome.path
        );
      if (qrCodeStr) {
        this.qrCodeStr = qrCodeStr;
      }

      (
        await this.xPortalService.awaitUserConnectionResponse({
          approval,
          token,
        })
      ).subscribe((res) => {
        if (res === 'rejected') {
          this.xPortalError = 'User rejected connection';
        }
      });

      return;
    }

    this.permissionsProvider.connect(dashboardModuleRoutes.dashboardHome.path);
  }
}
