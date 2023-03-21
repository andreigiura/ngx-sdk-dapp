import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { Action, State } from '@ngxs/store';
import { TxStatusEnum } from '../../types';
import { AddTransactionsBatch, ChangeTxStatus, MoveToSignedTransactions, RemoveTransaction, ResetTransactions, SetTransactionHashes, } from './transactions.actions';
import * as i0 from "@angular/core";
export const TransactionsInitialState = {
    transactions: [],
};
let TransactionsState = class TransactionsState {
    constructor() { }
    async addTransactionBatch({ setState, getState }, { payload }) {
        const transactions = getState().transactions;
        transactions.push(payload);
        setState({ transactions });
    }
    async moveToSigned({ setState, getState }, { payload }) {
        const transactions = getState().transactions;
        transactions.map((tx) => {
            if (tx.id === payload.id) {
                tx.status = TxStatusEnum.SIGNED;
                tx.transactions = payload.signedTransactions;
            }
        });
        setState({ transactions });
    }
    async resetTransactions({ setState }) {
        setState(TransactionsInitialState);
    }
    async moveToFailed({ setState, getState }, { payload }) {
        const transactions = getState().transactions;
        transactions.map((tx) => {
            if (tx.id === payload.id) {
                tx.status = payload.newStatus;
            }
        });
        setState({ transactions });
    }
    async removeTransaction({ setState, getState }, { payload }) {
        let transactions = getState().transactions;
        transactions = transactions.filter((tx) => {
            return tx.id !== payload.id;
        });
        setState({ transactions });
    }
    async setTxHashes({ setState, getState }, { payload }) {
        const transactions = getState().transactions;
        transactions.map((tx) => {
            if (tx.id === payload.id) {
                tx.transactionsHashes = payload.hashes;
            }
        });
        setState({ transactions });
    }
};
TransactionsState.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: TransactionsState, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
TransactionsState.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: TransactionsState });
__decorate([
    Action(AddTransactionsBatch)
], TransactionsState.prototype, "addTransactionBatch", null);
__decorate([
    Action(MoveToSignedTransactions)
], TransactionsState.prototype, "moveToSigned", null);
__decorate([
    Action(ResetTransactions)
], TransactionsState.prototype, "resetTransactions", null);
__decorate([
    Action(ChangeTxStatus)
], TransactionsState.prototype, "moveToFailed", null);
__decorate([
    Action(RemoveTransaction)
], TransactionsState.prototype, "removeTransaction", null);
__decorate([
    Action(SetTransactionHashes)
], TransactionsState.prototype, "setTxHashes", null);
TransactionsState = __decorate([
    State({
        name: 'transactions',
        defaults: TransactionsInitialState,
    })
], TransactionsState);
export { TransactionsState };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: TransactionsState, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return []; }, propDecorators: { addTransactionBatch: [], moveToSigned: [], resetTransactions: [], moveToFailed: [], removeTransaction: [], setTxHashes: [] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNhY3Rpb25zLnNsaWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LXNkay1kYXBwL3NyYy9saWIvbmd4cy9hY2NvdW50L3RyYW5zYWN0aW9ucy5zbGljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBZ0IsTUFBTSxhQUFhLENBQUM7QUFFMUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUUzQyxPQUFPLEVBQ0wsb0JBQW9CLEVBQ3BCLGNBQWMsRUFDZCx3QkFBd0IsRUFDeEIsaUJBQWlCLEVBQ2pCLGlCQUFpQixFQUNqQixvQkFBb0IsR0FDckIsTUFBTSx3QkFBd0IsQ0FBQzs7QUFhaEMsTUFBTSxDQUFDLE1BQU0sd0JBQXdCLEdBQUc7SUFDdEMsWUFBWSxFQUFFLEVBQUU7Q0FDakIsQ0FBQztBQU9LLElBQU0saUJBQWlCLEdBQXZCLE1BQU0saUJBQWlCO0lBQzVCLGdCQUFlLENBQUM7SUFHVixBQUFOLEtBQUssQ0FBQyxtQkFBbUIsQ0FDdkIsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUF3QyxFQUM1RCxFQUFFLE9BQU8sRUFBd0I7UUFFakMsTUFBTSxZQUFZLEdBQUcsUUFBUSxFQUFFLENBQUMsWUFBWSxDQUFDO1FBQzdDLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0IsUUFBUSxDQUFDLEVBQUUsWUFBWSxFQUFFLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBR0ssQUFBTixLQUFLLENBQUMsWUFBWSxDQUNoQixFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQXdDLEVBQzVELEVBQUUsT0FBTyxFQUE0QjtRQUVyQyxNQUFNLFlBQVksR0FBRyxRQUFRLEVBQUUsQ0FBQyxZQUFZLENBQUM7UUFDN0MsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFO1lBQ3RCLElBQUksRUFBRSxDQUFDLEVBQUUsS0FBSyxPQUFPLENBQUMsRUFBRSxFQUFFO2dCQUN4QixFQUFFLENBQUMsTUFBTSxHQUFHLFlBQVksQ0FBQyxNQUFNLENBQUM7Z0JBQ2hDLEVBQUUsQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDLGtCQUFrQixDQUFDO2FBQzlDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDSCxRQUFRLENBQUMsRUFBRSxZQUFZLEVBQUUsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFHSyxBQUFOLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLFFBQVEsRUFBd0M7UUFDeEUsUUFBUSxDQUFDLHdCQUF3QixDQUFDLENBQUM7SUFDckMsQ0FBQztJQUdLLEFBQU4sS0FBSyxDQUFDLFlBQVksQ0FDaEIsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUF3QyxFQUM1RCxFQUFFLE9BQU8sRUFBa0I7UUFFM0IsTUFBTSxZQUFZLEdBQUcsUUFBUSxFQUFFLENBQUMsWUFBWSxDQUFDO1FBQzdDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRTtZQUN0QixJQUFJLEVBQUUsQ0FBQyxFQUFFLEtBQUssT0FBTyxDQUFDLEVBQUUsRUFBRTtnQkFDeEIsRUFBRSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsU0FBeUIsQ0FBQzthQUMvQztRQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0gsUUFBUSxDQUFDLEVBQUUsWUFBWSxFQUFFLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBR0ssQUFBTixLQUFLLENBQUMsaUJBQWlCLENBQ3JCLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBd0MsRUFDNUQsRUFBRSxPQUFPLEVBQXFCO1FBRTlCLElBQUksWUFBWSxHQUFHLFFBQVEsRUFBRSxDQUFDLFlBQVksQ0FBQztRQUMzQyxZQUFZLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFO1lBQ3hDLE9BQU8sRUFBRSxDQUFDLEVBQUUsS0FBSyxPQUFPLENBQUMsRUFBRSxDQUFDO1FBQzlCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsUUFBUSxDQUFDLEVBQUUsWUFBWSxFQUFFLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBR0ssQUFBTixLQUFLLENBQUMsV0FBVyxDQUNmLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBd0MsRUFDNUQsRUFBRSxPQUFPLEVBQXdCO1FBRWpDLE1BQU0sWUFBWSxHQUFHLFFBQVEsRUFBRSxDQUFDLFlBQVksQ0FBQztRQUM3QyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUU7WUFDdEIsSUFBSSxFQUFFLENBQUMsRUFBRSxLQUFLLE9BQU8sQ0FBQyxFQUFFLEVBQUU7Z0JBQ3hCLEVBQUUsQ0FBQyxrQkFBa0IsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO2FBQ3hDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDSCxRQUFRLENBQUMsRUFBRSxZQUFZLEVBQUUsQ0FBQyxDQUFDO0lBQzdCLENBQUM7OzhHQXZFVSxpQkFBaUI7a0hBQWpCLGlCQUFpQjtBQUl0QjtJQURMLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQzs0REFRNUI7QUFHSztJQURMLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQztxREFhaEM7QUFHSztJQURMLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQzswREFHekI7QUFHSztJQURMLE1BQU0sQ0FBQyxjQUFjLENBQUM7cURBWXRCO0FBR0s7SUFETCxNQUFNLENBQUMsaUJBQWlCLENBQUM7MERBVXpCO0FBR0s7SUFETCxNQUFNLENBQUMsb0JBQW9CLENBQUM7b0RBWTVCO0FBdkVVLGlCQUFpQjtJQUw3QixLQUFLLENBQXlCO1FBQzdCLElBQUksRUFBRSxjQUFjO1FBQ3BCLFFBQVEsRUFBRSx3QkFBd0I7S0FDbkMsQ0FBQztHQUVXLGlCQUFpQixDQXdFN0I7U0F4RVksaUJBQWlCOzJGQUFqQixpQkFBaUI7a0JBRDdCLFVBQVU7MEVBS0gsbUJBQW1CLE1BVW5CLFlBQVksTUFlWixpQkFBaUIsTUFLakIsWUFBWSxNQWNaLGlCQUFpQixNQVlqQixXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSVBsYWluVHJhbnNhY3Rpb25PYmplY3QgfSBmcm9tICdAbXVsdGl2ZXJzeC9zZGstY29yZS9vdXQnO1xuaW1wb3J0IHsgQWN0aW9uLCBTdGF0ZSwgU3RhdGVDb250ZXh0IH0gZnJvbSAnQG5neHMvc3RvcmUnO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25zT3B0aW9ucyB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3RyYW5zYWN0aW9ucy90cmFuc2FjdGlvbnMuc2VydmljZSc7XG5pbXBvcnQgeyBUeFN0YXR1c0VudW0gfSBmcm9tICcuLi8uLi90eXBlcyc7XG5cbmltcG9ydCB7XG4gIEFkZFRyYW5zYWN0aW9uc0JhdGNoLFxuICBDaGFuZ2VUeFN0YXR1cyxcbiAgTW92ZVRvU2lnbmVkVHJhbnNhY3Rpb25zLFxuICBSZW1vdmVUcmFuc2FjdGlvbixcbiAgUmVzZXRUcmFuc2FjdGlvbnMsXG4gIFNldFRyYW5zYWN0aW9uSGFzaGVzLFxufSBmcm9tICcuL3RyYW5zYWN0aW9ucy5hY3Rpb25zJztcblxuZXhwb3J0IGludGVyZmFjZSBTaW5nbGVUcmFuc2FjdGlvbk1vZGVsIHtcbiAgaWQ6IG51bWJlcjtcbiAgdHJhbnNhY3Rpb25zOiBJUGxhaW5UcmFuc2FjdGlvbk9iamVjdFtdO1xuICB0cmFuc2FjdGlvbnNIYXNoZXM/OiBzdHJpbmdbXTtcbiAgc3RhdHVzOiBUeFN0YXR1c0VudW07XG4gIG9wdGlvbnM6IFRyYW5zYWN0aW9uc09wdGlvbnM7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVHJhbnNhY3Rpb25zU3RhdGVNb2RlbCB7XG4gIHRyYW5zYWN0aW9uczogU2luZ2xlVHJhbnNhY3Rpb25Nb2RlbFtdO1xufVxuZXhwb3J0IGNvbnN0IFRyYW5zYWN0aW9uc0luaXRpYWxTdGF0ZSA9IHtcbiAgdHJhbnNhY3Rpb25zOiBbXSxcbn07XG5cbkBTdGF0ZTxUcmFuc2FjdGlvbnNTdGF0ZU1vZGVsPih7XG4gIG5hbWU6ICd0cmFuc2FjdGlvbnMnLFxuICBkZWZhdWx0czogVHJhbnNhY3Rpb25zSW5pdGlhbFN0YXRlLFxufSlcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBUcmFuc2FjdGlvbnNTdGF0ZSB7XG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBAQWN0aW9uKEFkZFRyYW5zYWN0aW9uc0JhdGNoKVxuICBhc3luYyBhZGRUcmFuc2FjdGlvbkJhdGNoKFxuICAgIHsgc2V0U3RhdGUsIGdldFN0YXRlIH06IFN0YXRlQ29udGV4dDxUcmFuc2FjdGlvbnNTdGF0ZU1vZGVsPixcbiAgICB7IHBheWxvYWQgfTogQWRkVHJhbnNhY3Rpb25zQmF0Y2hcbiAgKSB7XG4gICAgY29uc3QgdHJhbnNhY3Rpb25zID0gZ2V0U3RhdGUoKS50cmFuc2FjdGlvbnM7XG4gICAgdHJhbnNhY3Rpb25zLnB1c2gocGF5bG9hZCk7XG4gICAgc2V0U3RhdGUoeyB0cmFuc2FjdGlvbnMgfSk7XG4gIH1cblxuICBAQWN0aW9uKE1vdmVUb1NpZ25lZFRyYW5zYWN0aW9ucylcbiAgYXN5bmMgbW92ZVRvU2lnbmVkKFxuICAgIHsgc2V0U3RhdGUsIGdldFN0YXRlIH06IFN0YXRlQ29udGV4dDxUcmFuc2FjdGlvbnNTdGF0ZU1vZGVsPixcbiAgICB7IHBheWxvYWQgfTogTW92ZVRvU2lnbmVkVHJhbnNhY3Rpb25zXG4gICkge1xuICAgIGNvbnN0IHRyYW5zYWN0aW9ucyA9IGdldFN0YXRlKCkudHJhbnNhY3Rpb25zO1xuICAgIHRyYW5zYWN0aW9ucy5tYXAoKHR4KSA9PiB7XG4gICAgICBpZiAodHguaWQgPT09IHBheWxvYWQuaWQpIHtcbiAgICAgICAgdHguc3RhdHVzID0gVHhTdGF0dXNFbnVtLlNJR05FRDtcbiAgICAgICAgdHgudHJhbnNhY3Rpb25zID0gcGF5bG9hZC5zaWduZWRUcmFuc2FjdGlvbnM7XG4gICAgICB9XG4gICAgfSk7XG4gICAgc2V0U3RhdGUoeyB0cmFuc2FjdGlvbnMgfSk7XG4gIH1cblxuICBAQWN0aW9uKFJlc2V0VHJhbnNhY3Rpb25zKVxuICBhc3luYyByZXNldFRyYW5zYWN0aW9ucyh7IHNldFN0YXRlIH06IFN0YXRlQ29udGV4dDxUcmFuc2FjdGlvbnNTdGF0ZU1vZGVsPikge1xuICAgIHNldFN0YXRlKFRyYW5zYWN0aW9uc0luaXRpYWxTdGF0ZSk7XG4gIH1cblxuICBAQWN0aW9uKENoYW5nZVR4U3RhdHVzKVxuICBhc3luYyBtb3ZlVG9GYWlsZWQoXG4gICAgeyBzZXRTdGF0ZSwgZ2V0U3RhdGUgfTogU3RhdGVDb250ZXh0PFRyYW5zYWN0aW9uc1N0YXRlTW9kZWw+LFxuICAgIHsgcGF5bG9hZCB9OiBDaGFuZ2VUeFN0YXR1c1xuICApIHtcbiAgICBjb25zdCB0cmFuc2FjdGlvbnMgPSBnZXRTdGF0ZSgpLnRyYW5zYWN0aW9ucztcbiAgICB0cmFuc2FjdGlvbnMubWFwKCh0eCkgPT4ge1xuICAgICAgaWYgKHR4LmlkID09PSBwYXlsb2FkLmlkKSB7XG4gICAgICAgIHR4LnN0YXR1cyA9IHBheWxvYWQubmV3U3RhdHVzIGFzIFR4U3RhdHVzRW51bTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBzZXRTdGF0ZSh7IHRyYW5zYWN0aW9ucyB9KTtcbiAgfVxuXG4gIEBBY3Rpb24oUmVtb3ZlVHJhbnNhY3Rpb24pXG4gIGFzeW5jIHJlbW92ZVRyYW5zYWN0aW9uKFxuICAgIHsgc2V0U3RhdGUsIGdldFN0YXRlIH06IFN0YXRlQ29udGV4dDxUcmFuc2FjdGlvbnNTdGF0ZU1vZGVsPixcbiAgICB7IHBheWxvYWQgfTogUmVtb3ZlVHJhbnNhY3Rpb25cbiAgKSB7XG4gICAgbGV0IHRyYW5zYWN0aW9ucyA9IGdldFN0YXRlKCkudHJhbnNhY3Rpb25zO1xuICAgIHRyYW5zYWN0aW9ucyA9IHRyYW5zYWN0aW9ucy5maWx0ZXIoKHR4KSA9PiB7XG4gICAgICByZXR1cm4gdHguaWQgIT09IHBheWxvYWQuaWQ7XG4gICAgfSk7XG4gICAgc2V0U3RhdGUoeyB0cmFuc2FjdGlvbnMgfSk7XG4gIH1cblxuICBAQWN0aW9uKFNldFRyYW5zYWN0aW9uSGFzaGVzKVxuICBhc3luYyBzZXRUeEhhc2hlcyhcbiAgICB7IHNldFN0YXRlLCBnZXRTdGF0ZSB9OiBTdGF0ZUNvbnRleHQ8VHJhbnNhY3Rpb25zU3RhdGVNb2RlbD4sXG4gICAgeyBwYXlsb2FkIH06IFNldFRyYW5zYWN0aW9uSGFzaGVzXG4gICkge1xuICAgIGNvbnN0IHRyYW5zYWN0aW9ucyA9IGdldFN0YXRlKCkudHJhbnNhY3Rpb25zO1xuICAgIHRyYW5zYWN0aW9ucy5tYXAoKHR4KSA9PiB7XG4gICAgICBpZiAodHguaWQgPT09IHBheWxvYWQuaWQpIHtcbiAgICAgICAgdHgudHJhbnNhY3Rpb25zSGFzaGVzID0gcGF5bG9hZC5oYXNoZXM7XG4gICAgICB9XG4gICAgfSk7XG4gICAgc2V0U3RhdGUoeyB0cmFuc2FjdGlvbnMgfSk7XG4gIH1cbn1cbiJdfQ==