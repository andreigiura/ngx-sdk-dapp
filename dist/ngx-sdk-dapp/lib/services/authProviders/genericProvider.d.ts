import { IPlainTransactionObject } from '@multiversx/sdk-core/out';
import { NativeAuthClient } from '@multiversx/sdk-native-auth-client';
import { Store } from '@ngxs/store';
import { DappConfig } from '../../config';
import { AccountStateModel } from '../../ngxs/account/account.slice';
import { AccountService } from '../account/account.service';
import { AuthenticationService } from '../authentication/authentication.service';
export declare enum ProvidersType {
    Extension = "Extension",
    WebWallet = "WebWallet",
    EMPTY = ""
}
/**
 * @ignore
 */
export declare class GenericProvider {
    private store;
    private accountService;
    private authenticationService;
    config: DappConfig;
    constructor(store: Store, accountService: AccountService, authenticationService: AuthenticationService, config: DappConfig);
    connect(navAfterConnectRoute?: string): Promise<{
        client: NativeAuthClient;
        init: string;
    }>;
    logout(): Promise<boolean>;
    sendTransactions(transactions: IPlainTransactionObject[], txId: number): void;
    addSignedTransactionsToState(transactions: IPlainTransactionObject[], txId: number): void;
    addFailedTransactionsToState(txId: number): void;
    addToCancelledTransaction(txId: number): void;
    reInitialize(account: AccountStateModel): void;
}
