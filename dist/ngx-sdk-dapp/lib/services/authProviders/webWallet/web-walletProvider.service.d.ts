import { ActivatedRoute, Router } from '@angular/router';
import { IPlainTransactionObject } from '@multiversx/sdk-core/out';
import { NativeAuthClient } from '@multiversx/sdk-native-auth-client';
import { Store } from '@ngxs/store';
import { DappConfig } from '../../../config';
import { AccountService } from '../../account/account.service';
import { AuthenticationService } from '../../authentication/authentication.service';
import { GenericProvider } from '../genericProvider';
import * as i0 from "@angular/core";
export declare const DAPP_INIT_ROUTE = "/dapp/init";
export declare class WebWalletProviderService extends GenericProvider {
    private router;
    private route;
    config: DappConfig;
    private localStore;
    private localAccount;
    private walletProvider;
    constructor(store: Store, accountService: AccountService, authenticationService: AuthenticationService, router: Router, route: ActivatedRoute, config: DappConfig);
    private transactionsFailedCallback;
    private transactionsCancelledCallback;
    private transactionsSuccessCallback;
    private connectCallback;
    connect(navAfterConnectRoute: string): Promise<{
        client: NativeAuthClient;
        init: string;
    }>;
    logout(): Promise<boolean>;
    reInitialize(): void;
    sendTransactions(transactions: IPlainTransactionObject[], txId: number): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<WebWalletProviderService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<WebWalletProviderService>;
}
