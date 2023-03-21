import { IPlainTransactionObject } from '@multiversx/sdk-core/out';
import { AccountService } from '../account/account.service';
import { AuthenticationService } from '../authentication/authentication.service';
import { ExtensionProviderService } from './extension/extensionProvider.service';
import { GenericProvider, ProvidersType } from './genericProvider';
import { WebWalletProviderService } from './webWallet/web-walletProvider.service';
import { XPortalProviderService } from './xPortal/x-portal.service';
import * as i0 from "@angular/core";
type AllProvidersType = ExtensionProviderService | XPortalProviderService | WebWalletProviderService | null;
export declare class PermissionsProviderService {
    private extensionProvider;
    private webWalletProvider;
    private _provider;
    private localAccountService;
    private accountSubscription;
    constructor(extensionProvider: ExtensionProviderService, webWalletProvider: WebWalletProviderService, accountService: AccountService, authService: AuthenticationService);
    private refreshRemoteData;
    setProvider(providerType: ProvidersType): void;
    get provider(): AllProvidersType;
    private set provider(value);
    connect(navAfterConnectRoute?: string): Promise<GenericProvider>;
    logout(navAfterConnectRoute?: string): Promise<boolean>;
    sendTransactions(transactions: IPlainTransactionObject[], txId: number): void | Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<PermissionsProviderService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<PermissionsProviderService>;
}
export {};
