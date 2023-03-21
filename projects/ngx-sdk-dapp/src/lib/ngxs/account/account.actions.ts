import { AccountStateModel } from './account.slice';

export class PatchAccount {
  static readonly type = '[Account] Set Account partial data';
  constructor(public payload: Partial<AccountStateModel>) {}
}

export class LoginAccount {
  static readonly type = '[Account] Set Account partial data';
  constructor(public payload: Partial<AccountStateModel>) {}
}

export class ResetAccount {
  static readonly type = '[Account] Reset Account';
}

export class RefetchAccountData {
  static readonly type = '[Account] refetch Account data';
}
