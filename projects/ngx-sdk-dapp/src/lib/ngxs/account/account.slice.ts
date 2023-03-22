import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { lastValueFrom } from 'rxjs';
import { ProvidersType } from '../../services/authProviders/genericProvider';
import { AccountApiService } from './account-api.service';
import {
  LoginAccount,
  PatchAccount,
  RefetchAccountData,
  ResetAccount,
} from './account.actions';

export interface AccountStateModel {
  address: string;
  accessToken: string;
  currentProvider: ProvidersType | '';
  shard: number | null;
  balance: string;
  loginTimestamp: number;
  nonce: number;
  ledgerIndex?: number;
}
export const AccountInitialState = {
  address: '',
  accessToken: '',
  currentProvider: ProvidersType.EMPTY,
  shard: null,
  balance: '',
  loginTimestamp: 0,
  nonce: 0,
};

@State<AccountStateModel>({
  name: 'account',
  defaults: AccountInitialState,
})
@Injectable()
export class AccountState {
  constructor(public accountApi: AccountApiService) {}

  @Action(PatchAccount)
  async patchAccount(
    { patchState }: StateContext<AccountStateModel>,
    { payload }: PatchAccount
  ) {
    patchState(payload);
  }

  @Action(LoginAccount)
  async loginAccount(
    { patchState }: StateContext<AccountStateModel>,
    { payload }: LoginAccount
  ) {
    if (!payload.address) return;
    patchState({ loginTimestamp: Date.now() });
    const { shard, balance } = await lastValueFrom<any>(
      this.accountApi.getAccount(payload.address)
    );
    patchState({ ...payload, shard, balance });
  }

  @Action(RefetchAccountData)
  async refetchAccountData({
    patchState,
    getState,
  }: StateContext<AccountStateModel>) {
    const state = getState();
    if (state.address) {
      const { shard, balance, nonce } = await lastValueFrom<any>(
        this.accountApi.getAccount(state.address)
      );
      patchState({ shard, balance, nonce });
    }
  }

  @Action(ResetAccount)
  async resetAccount({ setState }: StateContext<AccountStateModel>) {
    setState(AccountInitialState);
  }
}
