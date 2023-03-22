import { IPlainTransactionObject } from '@multiversx/sdk-core/out';
import { AccountService } from '../account/account.service';
import { AuthenticationService } from '../authentication/authentication.service';
import { ExtensionProviderService } from './extension/extensionProvider.service';
import { ProvidersType } from './genericProvider';
import { WebWalletProviderService } from './webWallet/web-walletProvider.service';
import { XPortalProviderService } from './xPortal/x-portal.service';
import * as i0 from "@angular/core";
type AllProvidersType = ExtensionProviderService | XPortalProviderService | WebWalletProviderService | null;
export declare class PermissionsProviderService {
    private extensionProvider;
    private webWalletProvider;
    private xportalProvider;
    private _provider;
    private localAccountService;
    private accountSubscription;
    constructor(extensionProvider: ExtensionProviderService, webWalletProvider: WebWalletProviderService, xportalProvider: XPortalProviderService, accountService: AccountService, authService: AuthenticationService);
    private refreshRemoteData;
    setProvider(providerType: ProvidersType): void;
    get provider(): AllProvidersType;
    private set provider(value);
    connect(navAfterConnectRoute: string): Promise<any>;
    logout(navAfterConnectRoute?: string): Promise<boolean>;
    cancelAction(): Promise<void>;
    sendTransactions(transactions: IPlainTransactionObject[], txId: number): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<PermissionsProviderService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<PermissionsProviderService>;
}
export {};
