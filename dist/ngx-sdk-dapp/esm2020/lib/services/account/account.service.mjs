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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LXNkay1kYXBwL3NyYy9saWIvc2VydmljZXMvYWNjb3VudC9hY2NvdW50LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLE1BQU0sRUFBUyxNQUFNLGFBQWEsQ0FBQztBQUU1QyxPQUFPLEVBQ0wsbUJBQW1CLEdBRXBCLE1BQU0sa0NBQWtDLENBQUM7QUFDMUMsT0FBTyxFQUNMLFlBQVksRUFFWixrQkFBa0IsRUFDbEIsWUFBWSxHQUNiLE1BQU0sb0NBQW9DLENBQUM7QUFDNUMsT0FBTyxFQUVMLGdCQUFnQixHQUNqQixNQUFNLDhCQUE4QixDQUFDOzs7QUFLdEMsTUFBTSxPQUFPLGNBQWM7SUFPekIsWUFBb0IsS0FBWTtRQUFaLFVBQUssR0FBTCxLQUFLLENBQU87UUFGekIsWUFBTyxHQUFzQixtQkFBbUIsQ0FBQztRQUd0RCxJQUFJLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ25DLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3pCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNNLGtCQUFrQjtRQUN2QixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLGtCQUFrQixFQUFFLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRU0sbUJBQW1CO1FBQ3hCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksWUFBWSxFQUFFLENBQUMsQ0FBQztJQUMxQyxDQUFDOzsyR0FsQlUsY0FBYzsrR0FBZCxjQUFjLGNBRmIsTUFBTTtBQUdSO0lBQVQsTUFBTSxFQUFFO2dEQUE0RDtBQUVyRTtJQURDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLFlBQVksRUFBRSxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7MkRBQ0c7MkZBSHJELGNBQWM7a0JBSDFCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzRGQUVrQixRQUFRLE1BRXpCLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNlbGVjdCwgU3RvcmUgfSBmcm9tICdAbmd4cy9zdG9yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICBBY2NvdW50SW5pdGlhbFN0YXRlLFxuICBBY2NvdW50U3RhdGVNb2RlbCxcbn0gZnJvbSAnLi4vLi4vbmd4cy9hY2NvdW50L2FjY291bnQuc2xpY2UnO1xuaW1wb3J0IHtcbiAgTG9naW5BY2NvdW50LFxuICBQYXRjaEFjY291bnQsXG4gIFJlZmV0Y2hBY2NvdW50RGF0YSxcbiAgUmVzZXRBY2NvdW50LFxufSBmcm9tICcuLi8uLi9uZ3hzL2FjY291bnQvYWNjb3VudC5hY3Rpb25zJztcbmltcG9ydCB7XG4gIEFjdGlvbnNFeGVjdXRpbmcsXG4gIGFjdGlvbnNFeGVjdXRpbmcsXG59IGZyb20gJ0BuZ3hzLWxhYnMvYWN0aW9ucy1leGVjdXRpbmcnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQWNjb3VudFNlcnZpY2Uge1xuICBAU2VsZWN0KCkgcHVibGljIGFjY291bnQkOiBPYnNlcnZhYmxlPEFjY291bnRTdGF0ZU1vZGVsPiB8IHVuZGVmaW5lZDtcbiAgQFNlbGVjdChhY3Rpb25zRXhlY3V0aW5nKFtMb2dpbkFjY291bnQsIFJlZmV0Y2hBY2NvdW50RGF0YV0pKVxuICBhY2NvdW50RGF0YUxvYWRpbmckOiBPYnNlcnZhYmxlPEFjdGlvbnNFeGVjdXRpbmdbXT4gfCB1bmRlZmluZWQ7XG5cbiAgcHVibGljIGFjY291bnQ6IEFjY291bnRTdGF0ZU1vZGVsID0gQWNjb3VudEluaXRpYWxTdGF0ZTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHN0b3JlOiBTdG9yZSkge1xuICAgIHRoaXMuYWNjb3VudCQ/LnN1YnNjcmliZSgoYWNjb3VudCkgPT4ge1xuICAgICAgdGhpcy5hY2NvdW50ID0gYWNjb3VudDtcbiAgICB9KTtcbiAgfVxuICBwdWJsaWMgcmVmZXRjaEFjY291bnREYXRhKCkge1xuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2gobmV3IFJlZmV0Y2hBY2NvdW50RGF0YSgpKTtcbiAgfVxuXG4gIHB1YmxpYyByZXNldFRvSW5pdGlhbFN0YXRlKCkge1xuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2gobmV3IFJlc2V0QWNjb3VudCgpKTtcbiAgfVxufVxuIl19