import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { DappConfig } from '../../../config';
import { AccountService } from '../../account/account.service';
import { AuthenticationService } from '../../authentication/authentication.service';
import { GenericProvider } from '../genericProvider';
import * as i0 from "@angular/core";
export declare class XPortalProviderService extends GenericProvider {
    config: DappConfig;
    private router;
    constructor(store: Store, accountService: AccountService, authenticationService: AuthenticationService, config: DappConfig, router: Router);
    connect(navAfterConnectRoute?: string): Promise<any>;
    logout(): Promise<boolean>;
    reinitialize(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<XPortalProviderService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<XPortalProviderService>;
}
