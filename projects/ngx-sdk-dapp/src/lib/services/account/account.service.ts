import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
  AccountInitialState,
  AccountStateModel,
} from '../../ngxs/account/account.slice';
import {
  LoginAccount,
  PatchAccount,
  RefetchAccountData,
  ResetAccount,
} from '../../ngxs/account/account.actions';
import {
  ActionsExecuting,
  actionsExecuting,
} from '@ngxs-labs/actions-executing';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  @Select() account$: Observable<AccountStateModel> | undefined;
  @Select(actionsExecuting([LoginAccount, RefetchAccountData]))
  accountDataLoading$: Observable<ActionsExecuting[]> | undefined;

  public account: AccountStateModel = AccountInitialState;

  constructor(private store: Store) {
    this.account$?.subscribe((account) => {
      this.account = account;
    });
  }
  public refetchAccountData() {
    this.store.dispatch(new RefetchAccountData());
  }

  public resetToInitialState() {
    this.store.dispatch(new ResetAccount());
  }
}
