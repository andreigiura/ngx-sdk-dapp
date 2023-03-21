import { StateContext } from '@ngxs/store';
import { ProvidersType } from '../../services/authProviders/genericProvider';
import { AccountApiService } from './account-api.service';
import { LoginAccount, PatchAccount } from './account.actions';
import * as i0 from "@angular/core";
export interface AccountStateModel {
    address: string;
    accessToken: string;
    currentProvider: ProvidersType | '';
    shard: number | null;
    balance: string;
    loginTimestamp: number;
    nonce: number;
}
export declare const AccountInitialState: {
    address: string;
    accessToken: string;
    currentProvider: ProvidersType;
    shard: null;
    balance: string;
    loginTimestamp: number;
    nonce: number;
};
export declare class AccountState {
    accountApi: AccountApiService;
    constructor(accountApi: AccountApiService);
    patchAccount({ patchState }: StateContext<AccountStateModel>, { payload }: PatchAccount): Promise<void>;
    loginAccount({ patchState }: StateContext<AccountStateModel>, { payload }: LoginAccount): Promise<void>;
    refetchAccountData({ patchState, getState, }: StateContext<AccountStateModel>): Promise<void>;
    resetAccount({ setState }: StateContext<AccountStateModel>): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AccountState, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AccountState>;
}
