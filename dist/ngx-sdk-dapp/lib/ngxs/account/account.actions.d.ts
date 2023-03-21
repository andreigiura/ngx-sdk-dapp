import { AccountStateModel } from './account.slice';
export declare class PatchAccount {
    payload: Partial<AccountStateModel>;
    static readonly type = "[Account] Set Account partial data";
    constructor(payload: Partial<AccountStateModel>);
}
export declare class LoginAccount {
    payload: Partial<AccountStateModel>;
    static readonly type = "[Account] Set Account partial data";
    constructor(payload: Partial<AccountStateModel>);
}
export declare class ResetAccount {
    static readonly type = "[Account] Reset Account";
}
export declare class RefetchAccountData {
    static readonly type = "[Account] refetch Account data";
}
