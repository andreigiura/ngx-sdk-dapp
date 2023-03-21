import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DappConfig } from '../../../config';
import { AccountService } from '../../account/account.service';
import { AuthenticationService } from '../../authentication/authentication.service';
import * as i0 from "@angular/core";
export declare class NativeAuthTokenInterceptorService implements HttpInterceptor {
    private accountService;
    private authenticationService;
    private config;
    constructor(accountService: AccountService, authenticationService: AuthenticationService, config: DappConfig);
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NativeAuthTokenInterceptorService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NativeAuthTokenInterceptorService>;
}
