import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DappConfig, DAPP_CONFIG } from '../../../config';
import { AccountService } from '../../account/account.service';
import { AuthenticationService } from '../../authentication/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class NativeAuthTokenInterceptorService implements HttpInterceptor {
  constructor(
    private accountService: AccountService,
    private authenticationService: AuthenticationService,
    @Inject(DAPP_CONFIG) private config: DappConfig
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add auth header with jwt if account is logged in and request is to the api url
    const account = this.accountService.account;
    const isLoggedIn = this.authenticationService.isAuthenticated();
    const isApiUrl = Object.values(this.config.nativeAuthAPIs).some(
      (apiURL) => {
        return request.url.startsWith(apiURL);
      }
    );
    if (isLoggedIn && isApiUrl) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${account.accessToken}` },
      });
    }

    return next.handle(request);
  }
}
