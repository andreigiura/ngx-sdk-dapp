import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'ngx-sdk-dapp';
import { dashboardModuleRoutes } from 'src/app/modules/dashboard/dashboard-routing.module';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    if (authenticationService.isAuthenticated()) {
      router.navigate([dashboardModuleRoutes.dashboardHome.path]);
    }
  }
}
