import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AccountStateModel } from '../../ngxs/account/account.slice';
import { ActionsExecuting } from '@ngxs-labs/actions-executing';
import * as i0 from "@angular/core";
export declare class AccountService {
    private store;
    account$: Observable<AccountStateModel> | undefined;
    accountDataLoading$: Observable<ActionsExecuting[]> | undefined;
    account: AccountStateModel;
    constructor(store: Store);
    refetchAccountData(): void;
    resetToInitialState(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AccountService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AccountService>;
}
