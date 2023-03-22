import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { Action, State } from '@ngxs/store';
import { TxStatusEnum } from '../../types';
import { AddTransactionsBatch, CancelPendingSignature, ChangeTxStatus, MoveToSignedTransactions, RemoveTransaction, ResetTransactions, SetTransactionHashes, } from './transactions.actions';
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
    async cancelPendingSignature({ setState, getState, }) {
        const transactions = getState().transactions;
        transactions.map((tx) => {
            if (tx.status === TxStatusEnum.PENDING_SIGNATURE) {
                tx.status = TxStatusEnum.CANCELLED;
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
__decorate([
    Action(CancelPendingSignature)
], TransactionsState.prototype, "cancelPendingSignature", null);
TransactionsState = __decorate([
    State({
        name: 'transactions',
        defaults: TransactionsInitialState,
    })
], TransactionsState);
export { TransactionsState };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: TransactionsState, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return []; }, propDecorators: { addTransactionBatch: [], moveToSigned: [], resetTransactions: [], moveToFailed: [], removeTransaction: [], setTxHashes: [], cancelPendingSignature: [] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNhY3Rpb25zLnNsaWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LXNkay1kYXBwL3NyYy9saWIvbmd4cy9hY2NvdW50L3RyYW5zYWN0aW9ucy5zbGljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBZ0IsTUFBTSxhQUFhLENBQUM7QUFFMUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUUzQyxPQUFPLEVBQ0wsb0JBQW9CLEVBQ3BCLHNCQUFzQixFQUN0QixjQUFjLEVBQ2Qsd0JBQXdCLEVBQ3hCLGlCQUFpQixFQUNqQixpQkFBaUIsRUFDakIsb0JBQW9CLEdBQ3JCLE1BQU0sd0JBQXdCLENBQUM7O0FBYWhDLE1BQU0sQ0FBQyxNQUFNLHdCQUF3QixHQUFHO0lBQ3RDLFlBQVksRUFBRSxFQUFFO0NBQ2pCLENBQUM7QUFPSyxJQUFNLGlCQUFpQixHQUF2QixNQUFNLGlCQUFpQjtJQUM1QixnQkFBZSxDQUFDO0lBR1YsQUFBTixLQUFLLENBQUMsbUJBQW1CLENBQ3ZCLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBd0MsRUFDNUQsRUFBRSxPQUFPLEVBQXdCO1FBRWpDLE1BQU0sWUFBWSxHQUFHLFFBQVEsRUFBRSxDQUFDLFlBQVksQ0FBQztRQUM3QyxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzNCLFFBQVEsQ0FBQyxFQUFFLFlBQVksRUFBRSxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUdLLEFBQU4sS0FBSyxDQUFDLFlBQVksQ0FDaEIsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUF3QyxFQUM1RCxFQUFFLE9BQU8sRUFBNEI7UUFFckMsTUFBTSxZQUFZLEdBQUcsUUFBUSxFQUFFLENBQUMsWUFBWSxDQUFDO1FB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O0lBREwsTUFBTSxDQUFDLGlCQUFpQixDQUFDOzBEQUd6QjtBQUdLO0lBREwsTUFBTSxDQUFDLGNBQWMsQ0FBQztxREFZdEI7QUFHSztJQURMLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQzswREFVekI7QUFHSztJQURMLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQztvREFZNUI7QUFHSztJQURMLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQzsrREFZOUI7QUFyRlUsaUJBQWlCO0lBTDdCLEtBQUssQ0FBeUI7UUFDN0IsSUFBSSxFQUFFLGNBQWM7UUFDcEIsUUFBUSxFQUFFLHdCQUF3QjtLQUNuQyxDQUFDO0dBRVcsaUJBQWlCLENBc0Y3QjtTQXRGWSxpQkFBaUI7MkZBQWpCLGlCQUFpQjtrQkFEN0IsVUFBVTswRUFLSCxtQkFBbUIsTUFVbkIsWUFBWSxNQWVaLGlCQUFpQixNQUtqQixZQUFZLE1BY1osaUJBQWlCLE1BWWpCLFdBQVcsTUFjWCxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJUGxhaW5UcmFuc2FjdGlvbk9iamVjdCB9IGZyb20gJ0BtdWx0aXZlcnN4L3Nkay1jb3JlL291dCc7XG5pbXBvcnQgeyBBY3Rpb24sIFN0YXRlLCBTdGF0ZUNvbnRleHQgfSBmcm9tICdAbmd4cy9zdG9yZSc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbnNPcHRpb25zIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvdHJhbnNhY3Rpb25zL3RyYW5zYWN0aW9ucy5zZXJ2aWNlJztcbmltcG9ydCB7IFR4U3RhdHVzRW51bSB9IGZyb20gJy4uLy4uL3R5cGVzJztcblxuaW1wb3J0IHtcbiAgQWRkVHJhbnNhY3Rpb25zQmF0Y2gsXG4gIENhbmNlbFBlbmRpbmdTaWduYXR1cmUsXG4gIENoYW5nZVR4U3RhdHVzLFxuICBNb3ZlVG9TaWduZWRUcmFuc2FjdGlvbnMsXG4gIFJlbW92ZVRyYW5zYWN0aW9uLFxuICBSZXNldFRyYW5zYWN0aW9ucyxcbiAgU2V0VHJhbnNhY3Rpb25IYXNoZXMsXG59IGZyb20gJy4vdHJhbnNhY3Rpb25zLmFjdGlvbnMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFNpbmdsZVRyYW5zYWN0aW9uTW9kZWwge1xuICBpZDogbnVtYmVyO1xuICB0cmFuc2FjdGlvbnM6IElQbGFpblRyYW5zYWN0aW9uT2JqZWN0W107XG4gIHRyYW5zYWN0aW9uc0hhc2hlcz86IHN0cmluZ1tdO1xuICBzdGF0dXM6IFR4U3RhdHVzRW51bTtcbiAgb3B0aW9uczogVHJhbnNhY3Rpb25zT3B0aW9ucztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBUcmFuc2FjdGlvbnNTdGF0ZU1vZGVsIHtcbiAgdHJhbnNhY3Rpb25zOiBTaW5nbGVUcmFuc2FjdGlvbk1vZGVsW107XG59XG5leHBvcnQgY29uc3QgVHJhbnNhY3Rpb25zSW5pdGlhbFN0YXRlID0ge1xuICB0cmFuc2FjdGlvbnM6IFtdLFxufTtcblxuQFN0YXRlPFRyYW5zYWN0aW9uc1N0YXRlTW9kZWw+KHtcbiAgbmFtZTogJ3RyYW5zYWN0aW9ucycsXG4gIGRlZmF1bHRzOiBUcmFuc2FjdGlvbnNJbml0aWFsU3RhdGUsXG59KVxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFRyYW5zYWN0aW9uc1N0YXRlIHtcbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIEBBY3Rpb24oQWRkVHJhbnNhY3Rpb25zQmF0Y2gpXG4gIGFzeW5jIGFkZFRyYW5zYWN0aW9uQmF0Y2goXG4gICAgeyBzZXRTdGF0ZSwgZ2V0U3RhdGUgfTogU3RhdGVDb250ZXh0PFRyYW5zYWN0aW9uc1N0YXRlTW9kZWw+LFxuICAgIHsgcGF5bG9hZCB9OiBBZGRUcmFuc2FjdGlvbnNCYXRjaFxuICApIHtcbiAgICBjb25zdCB0cmFuc2FjdGlvbnMgPSBnZXRTdGF0ZSgpLnRyYW5zYWN0aW9ucztcbiAgICB0cmFuc2FjdGlvbnMucHVzaChwYXlsb2FkKTtcbiAgICBzZXRTdGF0ZSh7IHRyYW5zYWN0aW9ucyB9KTtcbiAgfVxuXG4gIEBBY3Rpb24oTW92ZVRvU2lnbmVkVHJhbnNhY3Rpb25zKVxuICBhc3luYyBtb3ZlVG9TaWduZWQoXG4gICAgeyBzZXRTdGF0ZSwgZ2V0U3RhdGUgfTogU3RhdGVDb250ZXh0PFRyYW5zYWN0aW9uc1N0YXRlTW9kZWw+LFxuICAgIHsgcGF5bG9hZCB9OiBNb3ZlVG9TaWduZWRUcmFuc2FjdGlvbnNcbiAgKSB7XG4gICAgY29uc3QgdHJhbnNhY3Rpb25zID0gZ2V0U3RhdGUoKS50cmFuc2FjdGlvbnM7XG4gICAgdHJhbnNhY3Rpb25zLm1hcCgodHgpID0+IHtcbiAgICAgIGlmICh0eC5pZCA9PT0gcGF5bG9hZC5pZCkge1xuICAgICAgICB0eC5zdGF0dXMgPSBUeFN0YXR1c0VudW0uU0lHTkVEO1xuICAgICAgICB0eC50cmFuc2FjdGlvbnMgPSBwYXlsb2FkLnNpZ25lZFRyYW5zYWN0aW9ucztcbiAgICAgIH1cbiAgICB9KTtcbiAgICBzZXRTdGF0ZSh7IHRyYW5zYWN0aW9ucyB9KTtcbiAgfVxuXG4gIEBBY3Rpb24oUmVzZXRUcmFuc2FjdGlvbnMpXG4gIGFzeW5jIHJlc2V0VHJhbnNhY3Rpb25zKHsgc2V0U3RhdGUgfTogU3RhdGVDb250ZXh0PFRyYW5zYWN0aW9uc1N0YXRlTW9kZWw+KSB7XG4gICAgc2V0U3RhdGUoVHJhbnNhY3Rpb25zSW5pdGlhbFN0YXRlKTtcbiAgfVxuXG4gIEBBY3Rpb24oQ2hhbmdlVHhTdGF0dXMpXG4gIGFzeW5jIG1vdmVUb0ZhaWxlZChcbiAgICB7IHNldFN0YXRlLCBnZXRTdGF0ZSB9OiBTdGF0ZUNvbnRleHQ8VHJhbnNhY3Rpb25zU3RhdGVNb2RlbD4sXG4gICAgeyBwYXlsb2FkIH06IENoYW5nZVR4U3RhdHVzXG4gICkge1xuICAgIGNvbnN0IHRyYW5zYWN0aW9ucyA9IGdldFN0YXRlKCkudHJhbnNhY3Rpb25zO1xuICAgIHRyYW5zYWN0aW9ucy5tYXAoKHR4KSA9PiB7XG4gICAgICBpZiAodHguaWQgPT09IHBheWxvYWQuaWQpIHtcbiAgICAgICAgdHguc3RhdHVzID0gcGF5bG9hZC5uZXdTdGF0dXMgYXMgVHhTdGF0dXNFbnVtO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHNldFN0YXRlKHsgdHJhbnNhY3Rpb25zIH0pO1xuICB9XG5cbiAgQEFjdGlvbihSZW1vdmVUcmFuc2FjdGlvbilcbiAgYXN5bmMgcmVtb3ZlVHJhbnNhY3Rpb24oXG4gICAgeyBzZXRTdGF0ZSwgZ2V0U3RhdGUgfTogU3RhdGVDb250ZXh0PFRyYW5zYWN0aW9uc1N0YXRlTW9kZWw+LFxuICAgIHsgcGF5bG9hZCB9OiBSZW1vdmVUcmFuc2FjdGlvblxuICApIHtcbiAgICBsZXQgdHJhbnNhY3Rpb25zID0gZ2V0U3RhdGUoKS50cmFuc2FjdGlvbnM7XG4gICAgdHJhbnNhY3Rpb25zID0gdHJhbnNhY3Rpb25zLmZpbHRlcigodHgpID0+IHtcbiAgICAgIHJldHVybiB0eC5pZCAhPT0gcGF5bG9hZC5pZDtcbiAgICB9KTtcbiAgICBzZXRTdGF0ZSh7IHRyYW5zYWN0aW9ucyB9KTtcbiAgfVxuXG4gIEBBY3Rpb24oU2V0VHJhbnNhY3Rpb25IYXNoZXMpXG4gIGFzeW5jIHNldFR4SGFzaGVzKFxuICAgIHsgc2V0U3RhdGUsIGdldFN0YXRlIH06IFN0YXRlQ29udGV4dDxUcmFuc2FjdGlvbnNTdGF0ZU1vZGVsPixcbiAgICB7IHBheWxvYWQgfTogU2V0VHJhbnNhY3Rpb25IYXNoZXNcbiAgKSB7XG4gICAgY29uc3QgdHJhbnNhY3Rpb25zID0gZ2V0U3RhdGUoKS50cmFuc2FjdGlvbnM7XG4gICAgdHJhbnNhY3Rpb25zLm1hcCgodHgpID0+IHtcbiAgICAgIGlmICh0eC5pZCA9PT0gcGF5bG9hZC5pZCkge1xuICAgICAgICB0eC50cmFuc2FjdGlvbnNIYXNoZXMgPSBwYXlsb2FkLmhhc2hlcztcbiAgICAgIH1cbiAgICB9KTtcbiAgICBzZXRTdGF0ZSh7IHRyYW5zYWN0aW9ucyB9KTtcbiAgfVxuXG4gIEBBY3Rpb24oQ2FuY2VsUGVuZGluZ1NpZ25hdHVyZSlcbiAgYXN5bmMgY2FuY2VsUGVuZGluZ1NpZ25hdHVyZSh7XG4gICAgc2V0U3RhdGUsXG4gICAgZ2V0U3RhdGUsXG4gIH06IFN0YXRlQ29udGV4dDxUcmFuc2FjdGlvbnNTdGF0ZU1vZGVsPikge1xuICAgIGNvbnN0IHRyYW5zYWN0aW9ucyA9IGdldFN0YXRlKCkudHJhbnNhY3Rpb25zO1xuICAgIHRyYW5zYWN0aW9ucy5tYXAoKHR4KSA9PiB7XG4gICAgICBpZiAodHguc3RhdHVzID09PSBUeFN0YXR1c0VudW0uUEVORElOR19TSUdOQVRVUkUpIHtcbiAgICAgICAgdHguc3RhdHVzID0gVHhTdGF0dXNFbnVtLkNBTkNFTExFRDtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBzZXRTdGF0ZSh7IHRyYW5zYWN0aW9ucyB9KTtcbiAgfVxufVxuIl19