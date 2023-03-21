import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { DappConfig, DAPP_CONFIG } from '../../../config';
import { AccountService } from '../../account/account.service';
import { AuthenticationService } from '../../authentication/authentication.service';
import { GenericProvider } from '../genericProvider';

@Injectable({
  providedIn: 'root',
})
export class XPortalProviderService extends GenericProvider {
  constructor(
    store: Store,
    accountService: AccountService,
    authenticationService: AuthenticationService,
    @Inject(DAPP_CONFIG) override config: DappConfig,
    private router: Router
  ) {
    super(store, accountService, authenticationService, config);
  }

  override connect(navAfterConnectRoute?: string): Promise<any> {
    throw new Error('Method not implemented.');
  }

  override logout(): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  reinitialize(): void {
    throw new Error('Method not implemented.');
  }
}
