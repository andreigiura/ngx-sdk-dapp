import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { Action, State } from '@ngxs/store';
import { lastValueFrom } from 'rxjs';
import { ProvidersType } from '../../services/authProviders/genericProvider';
import { LoginAccount, PatchAccount, RefetchAccountData, ResetAccount, } from './account.actions';
import * as i0 from "@angular/core";
import * as i1 from "./account-api.service";
export const AccountInitialState = {
    address: '',
    accessToken: '',
    currentProvider: ProvidersType.EMPTY,
    shard: null,
    balance: '',
    loginTimestamp: 0,
    nonce: 0,
};
let AccountState = class AccountState {
    constructor(accountApi) {
        this.accountApi = accountApi;
    }
    async patchAccount({ patchState }, { payload }) {
        patchState(payload);
    }
    async loginAccount({ patchState }, { payload }) {
        if (!payload.address)
            return;
        patchState({ loginTimestamp: Date.now() });
        const { shard, balance } = await lastValueFrom(this.accountApi.getAccount(payload.address));
        patchState({ ...payload, shard, balance });
    }
    async refetchAccountData({ patchState, getState, }) {
        const state = getState();
        if (state.address) {
            const { shard, balance, nonce } = await lastValueFrom(this.accountApi.getAccount(state.address));
            patchState({ shard, balance, nonce });
        }
    }
    async resetAccount({ setState }) {
        setState(AccountInitialState);
    }
};
AccountState.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: AccountState, deps: [{ token: i1.AccountApiService }], target: i0.ɵɵFactoryTarget.Injectable });
AccountState.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: AccountState });
__decorate([
    Action(PatchAccount)
], AccountState.prototype, "patchAccount", null);
__decorate([
    Action(LoginAccount)
], AccountState.prototype, "loginAccount", null);
__decorate([
    Action(RefetchAccountData)
], AccountState.prototype, "refetchAccountData", null);
__decorate([
    Action(ResetAccount)
], AccountState.prototype, "resetAccount", null);
AccountState = __decorate([
    State({
        name: 'account',
        defaults: AccountInitialState,
    })
], AccountState);
export { AccountState };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: AccountState, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.AccountApiService }]; }, propDecorators: { patchAccount: [], loginAccount: [], refetchAccountData: [], resetAccount: [] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudC5zbGljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1zZGstZGFwcC9zcmMvbGliL25neHMvYWNjb3VudC9hY2NvdW50LnNsaWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFnQixNQUFNLGFBQWEsQ0FBQztBQUMxRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3JDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUU3RSxPQUFPLEVBQ0wsWUFBWSxFQUNaLFlBQVksRUFDWixrQkFBa0IsRUFDbEIsWUFBWSxHQUNiLE1BQU0sbUJBQW1CLENBQUM7OztBQVczQixNQUFNLENBQUMsTUFBTSxtQkFBbUIsR0FBRztJQUNqQyxPQUFPLEVBQUUsRUFBRTtJQUNYLFdBQVcsRUFBRSxFQUFFO0lBQ2YsZUFBZSxFQUFFLGFBQWEsQ0FBQyxLQUFLO0lBQ3BDLEtBQUssRUFBRSxJQUFJO0lBQ1gsT0FBTyxFQUFFLEVBQUU7SUFDWCxjQUFjLEVBQUUsQ0FBQztJQUNqQixLQUFLLEVBQUUsQ0FBQztDQUNULENBQUM7QUFPSyxJQUFNLFlBQVksR0FBbEIsTUFBTSxZQUFZO0lBQ3ZCLFlBQW1CLFVBQTZCO1FBQTdCLGVBQVUsR0FBVixVQUFVLENBQW1CO0lBQUcsQ0FBQztJQUc5QyxBQUFOLEtBQUssQ0FBQyxZQUFZLENBQ2hCLEVBQUUsVUFBVSxFQUFtQyxFQUMvQyxFQUFFLE9BQU8sRUFBZ0I7UUFFekIsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3RCLENBQUM7SUFHSyxBQUFOLEtBQUssQ0FBQyxZQUFZLENBQ2hCLEVBQUUsVUFBVSxFQUFtQyxFQUMvQyxFQUFFLE9BQU8sRUFBZ0I7UUFFekIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPO1lBQUUsT0FBTztRQUM3QixVQUFVLENBQUMsRUFBRSxjQUFjLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMzQyxNQUFNLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxHQUFHLE1BQU0sYUFBYSxDQUM1QyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQzVDLENBQUM7UUFDRixVQUFVLENBQUMsRUFBRSxHQUFHLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBR0ssQUFBTixLQUFLLENBQUMsa0JBQWtCLENBQUMsRUFDdkIsVUFBVSxFQUNWLFFBQVEsR0FDd0I7UUFDaEMsTUFBTSxLQUFLLEdBQUcsUUFBUSxFQUFFLENBQUM7UUFDekIsSUFBSSxLQUFLLENBQUMsT0FBTyxFQUFFO1lBQ2pCLE1BQU0sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxHQUFHLE1BQU0sYUFBYSxDQUNuRCxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQzFDLENBQUM7WUFDRixVQUFVLENBQUMsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7U0FDdkM7SUFDSCxDQUFDO0lBR0ssQUFBTixLQUFLLENBQUMsWUFBWSxDQUFDLEVBQUUsUUFBUSxFQUFtQztRQUM5RCxRQUFRLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUNoQyxDQUFDOzt5R0F6Q1UsWUFBWTs2R0FBWixZQUFZO0FBSWpCO0lBREwsTUFBTSxDQUFDLFlBQVksQ0FBQztnREFNcEI7QUFHSztJQURMLE1BQU0sQ0FBQyxZQUFZLENBQUM7Z0RBV3BCO0FBR0s7SUFETCxNQUFNLENBQUMsa0JBQWtCLENBQUM7c0RBWTFCO0FBR0s7SUFETCxNQUFNLENBQUMsWUFBWSxDQUFDO2dEQUdwQjtBQXpDVSxZQUFZO0lBTHhCLEtBQUssQ0FBb0I7UUFDeEIsSUFBSSxFQUFFLFNBQVM7UUFDZixRQUFRLEVBQUUsbUJBQW1CO0tBQzlCLENBQUM7R0FFVyxZQUFZLENBMEN4QjtTQTFDWSxZQUFZOzJGQUFaLFlBQVk7a0JBRHhCLFVBQVU7d0dBS0gsWUFBWSxNQVFaLFlBQVksTUFhWixrQkFBa0IsTUFjbEIsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGlvbiwgU3RhdGUsIFN0YXRlQ29udGV4dCB9IGZyb20gJ0BuZ3hzL3N0b3JlJztcbmltcG9ydCB7IGxhc3RWYWx1ZUZyb20gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFByb3ZpZGVyc1R5cGUgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hdXRoUHJvdmlkZXJzL2dlbmVyaWNQcm92aWRlcic7XG5pbXBvcnQgeyBBY2NvdW50QXBpU2VydmljZSB9IGZyb20gJy4vYWNjb3VudC1hcGkuc2VydmljZSc7XG5pbXBvcnQge1xuICBMb2dpbkFjY291bnQsXG4gIFBhdGNoQWNjb3VudCxcbiAgUmVmZXRjaEFjY291bnREYXRhLFxuICBSZXNldEFjY291bnQsXG59IGZyb20gJy4vYWNjb3VudC5hY3Rpb25zJztcblxuZXhwb3J0IGludGVyZmFjZSBBY2NvdW50U3RhdGVNb2RlbCB7XG4gIGFkZHJlc3M6IHN0cmluZztcbiAgYWNjZXNzVG9rZW46IHN0cmluZztcbiAgY3VycmVudFByb3ZpZGVyOiBQcm92aWRlcnNUeXBlIHwgJyc7XG4gIHNoYXJkOiBudW1iZXIgfCBudWxsO1xuICBiYWxhbmNlOiBzdHJpbmc7XG4gIGxvZ2luVGltZXN0YW1wOiBudW1iZXI7XG4gIG5vbmNlOiBudW1iZXI7XG59XG5leHBvcnQgY29uc3QgQWNjb3VudEluaXRpYWxTdGF0ZSA9IHtcbiAgYWRkcmVzczogJycsXG4gIGFjY2Vzc1Rva2VuOiAnJyxcbiAgY3VycmVudFByb3ZpZGVyOiBQcm92aWRlcnNUeXBlLkVNUFRZLFxuICBzaGFyZDogbnVsbCxcbiAgYmFsYW5jZTogJycsXG4gIGxvZ2luVGltZXN0YW1wOiAwLFxuICBub25jZTogMCxcbn07XG5cbkBTdGF0ZTxBY2NvdW50U3RhdGVNb2RlbD4oe1xuICBuYW1lOiAnYWNjb3VudCcsXG4gIGRlZmF1bHRzOiBBY2NvdW50SW5pdGlhbFN0YXRlLFxufSlcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBY2NvdW50U3RhdGUge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgYWNjb3VudEFwaTogQWNjb3VudEFwaVNlcnZpY2UpIHt9XG5cbiAgQEFjdGlvbihQYXRjaEFjY291bnQpXG4gIGFzeW5jIHBhdGNoQWNjb3VudChcbiAgICB7IHBhdGNoU3RhdGUgfTogU3RhdGVDb250ZXh0PEFjY291bnRTdGF0ZU1vZGVsPixcbiAgICB7IHBheWxvYWQgfTogUGF0Y2hBY2NvdW50XG4gICkge1xuICAgIHBhdGNoU3RhdGUocGF5bG9hZCk7XG4gIH1cblxuICBAQWN0aW9uKExvZ2luQWNjb3VudClcbiAgYXN5bmMgbG9naW5BY2NvdW50KFxuICAgIHsgcGF0Y2hTdGF0ZSB9OiBTdGF0ZUNvbnRleHQ8QWNjb3VudFN0YXRlTW9kZWw+LFxuICAgIHsgcGF5bG9hZCB9OiBMb2dpbkFjY291bnRcbiAgKSB7XG4gICAgaWYgKCFwYXlsb2FkLmFkZHJlc3MpIHJldHVybjtcbiAgICBwYXRjaFN0YXRlKHsgbG9naW5UaW1lc3RhbXA6IERhdGUubm93KCkgfSk7XG4gICAgY29uc3QgeyBzaGFyZCwgYmFsYW5jZSB9ID0gYXdhaXQgbGFzdFZhbHVlRnJvbTxhbnk+KFxuICAgICAgdGhpcy5hY2NvdW50QXBpLmdldEFjY291bnQocGF5bG9hZC5hZGRyZXNzKVxuICAgICk7XG4gICAgcGF0Y2hTdGF0ZSh7IC4uLnBheWxvYWQsIHNoYXJkLCBiYWxhbmNlIH0pO1xuICB9XG5cbiAgQEFjdGlvbihSZWZldGNoQWNjb3VudERhdGEpXG4gIGFzeW5jIHJlZmV0Y2hBY2NvdW50RGF0YSh7XG4gICAgcGF0Y2hTdGF0ZSxcbiAgICBnZXRTdGF0ZSxcbiAgfTogU3RhdGVDb250ZXh0PEFjY291bnRTdGF0ZU1vZGVsPikge1xuICAgIGNvbnN0IHN0YXRlID0gZ2V0U3RhdGUoKTtcbiAgICBpZiAoc3RhdGUuYWRkcmVzcykge1xuICAgICAgY29uc3QgeyBzaGFyZCwgYmFsYW5jZSwgbm9uY2UgfSA9IGF3YWl0IGxhc3RWYWx1ZUZyb208YW55PihcbiAgICAgICAgdGhpcy5hY2NvdW50QXBpLmdldEFjY291bnQoc3RhdGUuYWRkcmVzcylcbiAgICAgICk7XG4gICAgICBwYXRjaFN0YXRlKHsgc2hhcmQsIGJhbGFuY2UsIG5vbmNlIH0pO1xuICAgIH1cbiAgfVxuXG4gIEBBY3Rpb24oUmVzZXRBY2NvdW50KVxuICBhc3luYyByZXNldEFjY291bnQoeyBzZXRTdGF0ZSB9OiBTdGF0ZUNvbnRleHQ8QWNjb3VudFN0YXRlTW9kZWw+KSB7XG4gICAgc2V0U3RhdGUoQWNjb3VudEluaXRpYWxTdGF0ZSk7XG4gIH1cbn1cbiJdfQ==