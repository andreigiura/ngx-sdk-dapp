import { AccountService } from '../account/account.service';
import * as i0 from "@angular/core";
export declare class AuthenticationService {
    private accountService;
    constructor(accountService: AccountService);
    isAuthenticated(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<AuthenticationService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AuthenticationService>;
}
