import { Injectable } from '@angular/core';
import { decodeNativeAuthToken } from '../../helpers';
import { AccountService } from '../account/account.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private accountService: AccountService) {}

  isAuthenticated(): boolean {
    const decoded = decodeNativeAuthToken(
      this.accountService.account.accessToken
    );
    if (!decoded) return false;
    const millisecondsTTL = decoded.ttl * 1000;
    const isTokenValid =
      this.accountService.account.loginTimestamp +
        millisecondsTTL -
        Date.now() >
      0;

    return isTokenValid;
  }
}
