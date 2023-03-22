import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { DappConfig } from '../../../config';
import { AccountService } from '../../account/account.service';
import { AuthenticationService } from '../../authentication/authentication.service';
import { GenericProvider } from '../genericProvider';
import { NativeAuthClient } from '@multiversx/sdk-native-auth-client';
import { Observable } from 'rxjs';
import { IPlainTransactionObject } from '@multiversx/sdk-core/out';
import * as i0 from "@angular/core";
export declare class XPortalProviderService extends GenericProvider {
    config: DappConfig;
    private router;
    private walletConnect;
    private userResponseObservable;
    private navAfterConnectRoute;
    private initToken;
    private localStore;
    private localAccountService;
    constructor(store: Store, accountService: AccountService, authenticationService: AuthenticationService, config: DappConfig, router: Router);
    connect(navAfterConnectRoute: string): Promise<{
        client: NativeAuthClient;
        init: string;
        qrCodeStr: string;
        approval: any;
        token: string;
    }>;
    awaitUserConnectionResponse({ approval, token, }: {
        approval: any;
        token: string;
    }): Promise<Observable<string>>;
    private onClientLogin;
    private onClientLogout;
    private onClientEvent;
    logout(): Promise<boolean>;
    sendTransactions(transactions: IPlainTransactionObject[], txId: number): Promise<void>;
    reInitialize(): Promise<string>;
    cancelAction(): Promise<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<XPortalProviderService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<XPortalProviderService>;
}
