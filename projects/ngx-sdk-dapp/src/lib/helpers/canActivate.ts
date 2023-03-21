import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import {
  AccountService,
  PermissionsProviderService,
  TransactionsService,
} from '../../public-api';
import { AuthenticationService } from '../services/authentication/authentication.service';

export const canActivateRoute: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const isAuthenticated = inject(AuthenticationService).isAuthenticated();
  if (!isAuthenticated) {
    const router = inject(Router);

    inject(AccountService).resetToInitialState();
    inject(TransactionsService).resetToInitialState();
    router.navigate(['/']);
  }
  return isAuthenticated;
};
