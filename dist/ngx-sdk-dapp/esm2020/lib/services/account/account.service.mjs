import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { Select } from '@ngxs/store';
import { AccountInitialState, } from '../../ngxs/account/account.slice';
import { LoginAccount, RefetchAccountData, ResetAccount, } from '../../ngxs/account/account.actions';
import { actionsExecuting, } from '@ngxs-labs/actions-executing';
import * as i0 from "@angular/core";
import * as i1 from "@ngxs/store";
export class AccountService {
    constructor(store) {
        this.store = store;
        this.account = AccountInitialState;
        this.account$?.subscribe((account) => {
            this.account = account;
        });
    }
    refetchAccountData() {
        this.store.dispatch(new RefetchAccountData());
    }
    resetToInitialState() {
        this.store.dispatch(new ResetAccount());
    }
}
AccountService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: AccountService, deps: [{ token: i1.Store }], target: i0.ɵɵFactoryTarget.Injectable });
AccountService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: AccountService, providedIn: 'root' });
__decorate([
    Select()
], AccountService.prototype, "account$", void 0);
__decorate([
    Select(actionsExecuting([LoginAccount, RefetchAccountData]))
], AccountService.prototype, "accountDataLoading$", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: AccountService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.Store }]; }, propDecorators: { account$: [], accountDataLoading$: [] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LXNkay1kYXBwL3NyYy9saWIvc2VydmljZXMvYWNjb3VudC9hY2NvdW50LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLE1BQU0sRUFBUyxNQUFNLGFBQWEsQ0FBQztBQUU1QyxPQUFPLEVBQ0wsbUJBQW1CLEdBRXBCLE1BQU0sa0NBQWtDLENBQUM7QUFDMUMsT0FBTyxFQUNMLFlBQVksRUFFWixrQkFBa0IsRUFDbEIsWUFBWSxHQUNiLE1BQU0sb0NBQW9DLENBQUM7QUFDNUMsT0FBTyxFQUVMLGdCQUFnQixHQUNqQixNQUFNLDhCQUE4QixDQUFDOzs7QUFLdEMsTUFBTSxPQUFPLGNBQWM7SUFPekIsWUFBb0IsS0FBWTtRQUFaLFVBQUssR0FBTCxLQUFLLENBQU87UUFGekIsWUFBTyxHQUFzQixtQkFBbUIsQ0FBQztRQUd0RCxJQUFJLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ25DLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3pCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNNLGtCQUFrQjtRQUN2QixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLGtCQUFrQixFQUFFLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRU0sbUJBQW1CO1FBQ3hCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksWUFBWSxFQUFFLENBQUMsQ0FBQztJQUMxQyxDQUFDOzsyR0FsQlUsY0FBYzsrR0FBZCxjQUFjLGNBRmIsTUFBTTtBQUdSO0lBQVQsTUFBTSxFQUFFO2dEQUFxRDtBQUU5RDtJQURDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLFlBQVksRUFBRSxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7MkRBQ0c7MkZBSHJELGNBQWM7a0JBSDFCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzRGQUVXLFFBQVEsTUFFbEIsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2VsZWN0LCBTdG9yZSB9IGZyb20gJ0BuZ3hzL3N0b3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7XG4gIEFjY291bnRJbml0aWFsU3RhdGUsXG4gIEFjY291bnRTdGF0ZU1vZGVsLFxufSBmcm9tICcuLi8uLi9uZ3hzL2FjY291bnQvYWNjb3VudC5zbGljZSc7XG5pbXBvcnQge1xuICBMb2dpbkFjY291bnQsXG4gIFBhdGNoQWNjb3VudCxcbiAgUmVmZXRjaEFjY291bnREYXRhLFxuICBSZXNldEFjY291bnQsXG59IGZyb20gJy4uLy4uL25neHMvYWNjb3VudC9hY2NvdW50LmFjdGlvbnMnO1xuaW1wb3J0IHtcbiAgQWN0aW9uc0V4ZWN1dGluZyxcbiAgYWN0aW9uc0V4ZWN1dGluZyxcbn0gZnJvbSAnQG5neHMtbGFicy9hY3Rpb25zLWV4ZWN1dGluZyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBBY2NvdW50U2VydmljZSB7XG4gIEBTZWxlY3QoKSBhY2NvdW50JDogT2JzZXJ2YWJsZTxBY2NvdW50U3RhdGVNb2RlbD4gfCB1bmRlZmluZWQ7XG4gIEBTZWxlY3QoYWN0aW9uc0V4ZWN1dGluZyhbTG9naW5BY2NvdW50LCBSZWZldGNoQWNjb3VudERhdGFdKSlcbiAgYWNjb3VudERhdGFMb2FkaW5nJDogT2JzZXJ2YWJsZTxBY3Rpb25zRXhlY3V0aW5nW10+IHwgdW5kZWZpbmVkO1xuXG4gIHB1YmxpYyBhY2NvdW50OiBBY2NvdW50U3RhdGVNb2RlbCA9IEFjY291bnRJbml0aWFsU3RhdGU7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzdG9yZTogU3RvcmUpIHtcbiAgICB0aGlzLmFjY291bnQkPy5zdWJzY3JpYmUoKGFjY291bnQpID0+IHtcbiAgICAgIHRoaXMuYWNjb3VudCA9IGFjY291bnQ7XG4gICAgfSk7XG4gIH1cbiAgcHVibGljIHJlZmV0Y2hBY2NvdW50RGF0YSgpIHtcbiAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKG5ldyBSZWZldGNoQWNjb3VudERhdGEoKSk7XG4gIH1cblxuICBwdWJsaWMgcmVzZXRUb0luaXRpYWxTdGF0ZSgpIHtcbiAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKG5ldyBSZXNldEFjY291bnQoKSk7XG4gIH1cbn1cbiJdfQ==