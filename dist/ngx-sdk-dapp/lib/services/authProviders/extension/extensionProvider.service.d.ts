import { GenericProvider } from '../genericProvider';
import { Router } from '@angular/router';
import { IPlainTransactionObject } from '@multiversx/sdk-core/out';
import { NativeAuthClient } from '@multiversx/sdk-native-auth-client';
import { Store } from '@ngxs/store';
import { AccountStateModel } from '../../../ngxs/account/account.slice';
import { AccountService } from '../../account/account.service';
import { AuthenticationService } from '../../authentication/authentication.service';
import { DappConfig } from '../../../config';
import * as i0 from "@angular/core";
export declare class ExtensionProviderService extends GenericProvider {
    config: DappConfig;
    private router;
    private localStore;
    private localAccount;
    constructor(store: Store, accountService: AccountService, authenticationService: AuthenticationService, config: DappConfig, router: Router);
    connect(navAfterConnectRoute: string): Promise<{
        client: NativeAuthClient;
        init: string;
    }>;
    logout(): Promise<boolean>;
    reInitialize(account: AccountStateModel): void;
    sendTransactions(transactions: IPlainTransactionObject[], txId: number): Promise<void>;
    cancelAction(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ExtensionProviderService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ExtensionProviderService>;
}
