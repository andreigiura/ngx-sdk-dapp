import { __decorate } from "tslib";
import { Inject, Injectable } from '@angular/core';
import { Select } from '@ngxs/store';
import { lastValueFrom, map, skipWhile, take, } from 'rxjs';
import { DAPP_CONFIG } from '../../config';
import { AddTransactionsBatch, CancelPendingSignature, ChangeTxStatus, RemoveTransaction, ResetTransactions, SetTransactionHashes, } from '../../ngxs/account/transactions.actions';
import { TxStatusEnum } from '../../types';
import * as i0 from "@angular/core";
import * as i1 from "../authProviders/PermissionsProvider";
import * as i2 from "@ngxs/store";
import * as i3 from "../../ngxs/account/account-api.service";
import * as i4 from "../account/account.service";
import * as i5 from "../../pipes/parseAmount/parse-amount.pipe";
export class TransactionsService {
    constructor(permissionsProvider, store, accountApi, accountService, parseAmount, config) {
        this.permissionsProvider = permissionsProvider;
        this.store = store;
        this.accountApi = accountApi;
        this.accountService = accountService;
        this.parseAmount = parseAmount;
        this.config = config;
        this.toasts = [];
        this.toastTemplate = null;
        this.trackedTransactions = [];
        setTimeout(() => {
            this.transactions$?.subscribe((state) => {
                for (const transaction of state.transactions) {
                    if (transaction.status === TxStatusEnum.SIGNED &&
                        !transaction.options.signOnly) {
                        this.sendTxToAPI(transaction.transactions, transaction.id);
                    }
                    if (transaction.status === TxStatusEnum.SIGNATURE_FAILED ||
                        transaction.status === TxStatusEnum.CANCELLED ||
                        transaction.status === TxStatusEnum.SEND_IN_PROGRESS ||
                        transaction.status === TxStatusEnum.SENT_SUCCESS ||
                        transaction.status === TxStatusEnum.SENT_ERROR) {
                        const transactionsInfo = transaction.transactionsHashes?.map((txHash) => ({
                            txHash: txHash,
                            status: TxStatusEnum.SEND_IN_PROGRESS,
                        }));
                        this.show(transaction.options.transactionTitle, transactionsInfo || [], transaction.id, transaction.status);
                        if (transaction.transactionsHashes?.length &&
                            !this.trackedTransactions.includes(transaction.id)) {
                            this.trackedTransactions.push(transaction.id);
                            this.trackTransactionStatus(transaction);
                        }
                    }
                }
            });
        }, 1000);
        this.watchUnload();
    }
    async watchUnload() {
        window.onbeforeunload = (e) => {
            if (this.permissionsProvider.provider?.cancelAction) {
                this.permissionsProvider.provider.cancelAction();
                this.store.dispatch(new CancelPendingSignature());
            }
        };
    }
    async trackTransactionStatus(transaction) {
        if (!transaction.transactionsHashes)
            return;
        try {
            const txStatuses = await lastValueFrom(this.accountApi.trackTransactions(transaction.transactionsHashes));
            const shouldContinueTracking = this.updateToastStatus(txStatuses, transaction.id);
            if (shouldContinueTracking) {
                setTimeout(() => {
                    this.trackTransactionStatus(transaction);
                }, 6000);
            }
        }
        catch (error) { }
    }
    watchTransactionByTitle(txTitle, watchForStatus) {
        if (this.transactions$ === undefined)
            throw new Error('transactions$ is undefined');
        return this.transactions$
            .pipe(map((state) => {
            const tx = state.transactions.filter((tx) => {
                return tx.options.transactionTitle === txTitle;
            });
            return tx[0];
        }))
            .pipe(skipWhile((tx) => !tx || tx.status !== watchForStatus))
            .pipe(take(1));
    }
    hasTransactionsInStatus(status) {
        if (this.transactions$ === undefined)
            throw new Error('transactions$ is undefined');
        return this.transactions$.pipe(map((transaction) => transaction.transactions.some((tx) => {
            return tx.status === status;
        })));
    }
    updateToastStatus(txHashesStatus, transactionId) {
        let shouldContinueTracking = false;
        this.toasts.map((toast) => {
            if (toast.id === transactionId) {
                for (let i in txHashesStatus) {
                    switch (txHashesStatus[i].status) {
                        case 'fail':
                            this.store.dispatch(new ChangeTxStatus({
                                id: transactionId,
                                newStatus: TxStatusEnum.SENT_ERROR,
                            }));
                            toast.transactionsInfo[i].status = TxStatusEnum.SENT_ERROR;
                            break;
                        case 'success':
                            this.store.dispatch(new ChangeTxStatus({
                                id: transactionId,
                                newStatus: TxStatusEnum.SENT_SUCCESS,
                            }));
                            toast.transactionsInfo[i].status = TxStatusEnum.SENT_SUCCESS;
                            break;
                        default:
                            break;
                    }
                }
                const shouldContinue = toast.transactionsInfo.some((tx) => tx.status === TxStatusEnum.SEND_IN_PROGRESS);
                const shouldSetSuccess = toast.transactionsInfo.every((tx) => tx.status === TxStatusEnum.SENT_SUCCESS);
                const shouldSetError = toast.transactionsInfo.some((tx) => tx.status === TxStatusEnum.SENT_ERROR);
                if (shouldSetError) {
                    toast.status = TxStatusEnum.SENT_ERROR;
                }
                if (shouldSetSuccess) {
                    toast.status = TxStatusEnum.SENT_SUCCESS;
                }
                shouldContinueTracking = shouldContinue;
            }
            return false;
        });
        if (!shouldContinueTracking) {
            this.accountService.refetchAccountData();
        }
        return shouldContinueTracking;
    }
    async sendTxToAPI(transactions, transactionsId) {
        this.store.dispatch(new ChangeTxStatus({
            newStatus: TxStatusEnum.READY_TO_SEND,
            id: transactionsId,
        }));
        try {
            const { data: { txsHashes, numOfSentTxs }, error, } = await lastValueFrom(this.accountApi.sendTransactions(transactions));
            const hashesArray = Object.values(txsHashes);
            if (error ||
                !txsHashes ||
                numOfSentTxs === 0 ||
                hashesArray.length === 0) {
                this.store.dispatch(new ChangeTxStatus({
                    newStatus: TxStatusEnum.SENT_ERROR,
                    id: transactionsId,
                }));
                return;
            }
            this.store.dispatch(new SetTransactionHashes({
                id: transactionsId,
                hashes: hashesArray,
            }));
            this.store.dispatch(new ChangeTxStatus({
                newStatus: TxStatusEnum.SEND_IN_PROGRESS,
                id: transactionsId,
            }));
        }
        catch (error) {
            this.store.dispatch(new ChangeTxStatus({
                newStatus: TxStatusEnum.SENT_ERROR,
                id: transactionsId,
            }));
        }
    }
    sendTransactions(transactions, txOptions) {
        const txId = Date.now();
        const transactionsToSend = transactions.map((tx, index) => ({
            ...tx,
            nonce: this.accountService.account.nonce + index,
            sender: this.accountService.account.address,
            data: Buffer.from(tx.data ?? '', 'utf8').toString('base64'),
            value: this.parseAmount.transform(tx.value),
            chainID: this.config.chainID,
            //TODO: change version if needed (ledger, guardians, etc)
            version: 1,
        }));
        this.store.dispatch(new AddTransactionsBatch({
            id: txId,
            transactions: transactionsToSend,
            status: TxStatusEnum.PENDING_SIGNATURE,
            options: txOptions,
        }));
        this.permissionsProvider.sendTransactions(transactionsToSend, txId);
        return txId;
    }
    show(header, transactionsInfo, txId, status) {
        if (!this.toastTemplate)
            throw new Error('TransactionsService: toastTemplate is not set');
        if (this.toasts.find((t) => t.id === txId))
            return;
        this.toasts.push({
            id: txId,
            header,
            status,
            transactionsInfo,
            templateRef: this.toastTemplate,
        });
    }
    remove(toastId) {
        this.store.dispatch(new RemoveTransaction({ id: toastId }));
        this.toasts = this.toasts.filter((t) => t.id != toastId);
    }
    setTxTemplate(template) {
        this.toastTemplate = template;
    }
    resetToInitialState() {
        this.store.dispatch(new ResetTransactions());
    }
}
TransactionsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: TransactionsService, deps: [{ token: i1.PermissionsProviderService }, { token: i2.Store }, { token: i3.AccountApiService }, { token: i4.AccountService }, { token: i5.ParseAmountPipe }, { token: DAPP_CONFIG }], target: i0.ɵɵFactoryTarget.Injectable });
TransactionsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: TransactionsService, providedIn: 'root' });
__decorate([
    Select()
], TransactionsService.prototype, "transactions$", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: TransactionsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.PermissionsProviderService }, { type: i2.Store }, { type: i3.AccountApiService }, { type: i4.AccountService }, { type: i5.ParseAmountPipe }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DAPP_CONFIG]
                }] }]; }, propDecorators: { transactions$: [] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNhY3Rpb25zLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtc2RrLWRhcHAvc3JjL2xpYi9zZXJ2aWNlcy90cmFuc2FjdGlvbnMvdHJhbnNhY3Rpb25zLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFlLE1BQU0sZUFBZSxDQUFDO0FBRWhFLE9BQU8sRUFBRSxNQUFNLEVBQVMsTUFBTSxhQUFhLENBQUM7QUFDNUMsT0FBTyxFQUVMLGFBQWEsRUFDYixHQUFHLEVBRUgsU0FBUyxFQUNULElBQUksR0FFTCxNQUFNLE1BQU0sQ0FBQztBQUNkLE9BQU8sRUFBYyxXQUFXLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFdkQsT0FBTyxFQUNMLG9CQUFvQixFQUNwQixzQkFBc0IsRUFDdEIsY0FBYyxFQUNkLGlCQUFpQixFQUNqQixpQkFBaUIsRUFDakIsb0JBQW9CLEdBQ3JCLE1BQU0seUNBQXlDLENBQUM7QUFNakQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGFBQWEsQ0FBQzs7Ozs7OztBQStCM0MsTUFBTSxPQUFPLG1CQUFtQjtJQVE5QixZQUNVLG1CQUErQyxFQUMvQyxLQUFZLEVBQ1osVUFBNkIsRUFDN0IsY0FBOEIsRUFDOUIsV0FBNEIsRUFDUixNQUFrQjtRQUx0Qyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQTRCO1FBQy9DLFVBQUssR0FBTCxLQUFLLENBQU87UUFDWixlQUFVLEdBQVYsVUFBVSxDQUFtQjtRQUM3QixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsZ0JBQVcsR0FBWCxXQUFXLENBQWlCO1FBQ1IsV0FBTSxHQUFOLE1BQU0sQ0FBWTtRQWJ6QyxXQUFNLEdBQWdCLEVBQUUsQ0FBQztRQUdoQyxrQkFBYSxHQUE0QixJQUFJLENBQUM7UUFFdEMsd0JBQW1CLEdBQWEsRUFBRSxDQUFDO1FB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QUNOLGdCQUFnQjtZQUNoQixXQUFXLEVBQUUsSUFBSSxDQUFDLGFBQWE7U0FDaEMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELE1BQU0sQ0FBQyxPQUFlO1FBQ3BCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksaUJBQWlCLENBQUMsRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzVELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksT0FBTyxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVELGFBQWEsQ0FBQyxRQUFhO1FBQ3pCLElBQUksQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDO0lBQ2hDLENBQUM7SUFFRCxtQkFBbUI7UUFDakIsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxpQkFBaUIsRUFBRSxDQUFDLENBQUM7SUFDL0MsQ0FBQzs7Z0hBeFRVLG1CQUFtQiwrS0FjcEIsV0FBVztvSEFkVixtQkFBbUIsY0FGbEIsTUFBTTtBQUlSO0lBQVQsTUFBTSxFQUFFOzBEQUErRDsyRkFGN0QsbUJBQW1CO2tCQUgvQixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7MEJBZUksTUFBTTsyQkFBQyxXQUFXOzRDQVpYLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJUGxhaW5UcmFuc2FjdGlvbk9iamVjdCwgVHJhbnNhY3Rpb24gfSBmcm9tICdAbXVsdGl2ZXJzeC9zZGstY29yZS9vdXQnO1xuaW1wb3J0IHsgU2VsZWN0LCBTdG9yZSB9IGZyb20gJ0BuZ3hzL3N0b3JlJztcbmltcG9ydCB7XG4gIGV2ZXJ5LFxuICBsYXN0VmFsdWVGcm9tLFxuICBtYXAsXG4gIE9ic2VydmFibGUsXG4gIHNraXBXaGlsZSxcbiAgdGFrZSxcbiAgdGFrZVdoaWxlLFxufSBmcm9tICdyeGpzJztcbmltcG9ydCB7IERhcHBDb25maWcsIERBUFBfQ09ORklHIH0gZnJvbSAnLi4vLi4vY29uZmlnJztcbmltcG9ydCB7IEFjY291bnRBcGlTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vbmd4cy9hY2NvdW50L2FjY291bnQtYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHtcbiAgQWRkVHJhbnNhY3Rpb25zQmF0Y2gsXG4gIENhbmNlbFBlbmRpbmdTaWduYXR1cmUsXG4gIENoYW5nZVR4U3RhdHVzLFxuICBSZW1vdmVUcmFuc2FjdGlvbixcbiAgUmVzZXRUcmFuc2FjdGlvbnMsXG4gIFNldFRyYW5zYWN0aW9uSGFzaGVzLFxufSBmcm9tICcuLi8uLi9uZ3hzL2FjY291bnQvdHJhbnNhY3Rpb25zLmFjdGlvbnMnO1xuaW1wb3J0IHtcbiAgU2luZ2xlVHJhbnNhY3Rpb25Nb2RlbCxcbiAgVHJhbnNhY3Rpb25zU3RhdGVNb2RlbCxcbn0gZnJvbSAnLi4vLi4vbmd4cy9hY2NvdW50L3RyYW5zYWN0aW9ucy5zbGljZSc7XG5pbXBvcnQgeyBQYXJzZUFtb3VudFBpcGUgfSBmcm9tICcuLi8uLi9waXBlcy9wYXJzZUFtb3VudC9wYXJzZS1hbW91bnQucGlwZSc7XG5pbXBvcnQgeyBUeFN0YXR1c0VudW0gfSBmcm9tICcuLi8uLi90eXBlcyc7XG5pbXBvcnQgeyBBY2NvdW50U2VydmljZSB9IGZyb20gJy4uL2FjY291bnQvYWNjb3VudC5zZXJ2aWNlJztcbmltcG9ydCB7IFBlcm1pc3Npb25zUHJvdmlkZXJTZXJ2aWNlIH0gZnJvbSAnLi4vYXV0aFByb3ZpZGVycy9QZXJtaXNzaW9uc1Byb3ZpZGVyJztcblxuZXhwb3J0IGludGVyZmFjZSBUcmFuc2FjdGlvbnNPcHRpb25zIHtcbiAgc2lnbk9ubHk/OiBib29sZWFuO1xuICB0cmFuc2FjdGlvblRpdGxlOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVHJhbnNhY3Rpb25zVG9TZW5kIHtcbiAgaWQ6IG51bWJlcjtcbiAgdHJhbnNhY3Rpb25zOiBJUGxhaW5UcmFuc2FjdGlvbk9iamVjdFtdO1xuICB0eE9wdGlvbnM6IFRyYW5zYWN0aW9uc09wdGlvbnM7XG59XG5cbmludGVyZmFjZSBUeEluZm9UeXBlIHtcbiAgdHhIYXNoOiBzdHJpbmc7XG4gIHN0YXR1czogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFRvYXN0SW5mbyB7XG4gIGlkOiBudW1iZXI7XG4gIGhlYWRlcjogc3RyaW5nO1xuICB0cmFuc2FjdGlvbnNJbmZvOiBUeEluZm9UeXBlW107XG4gIHN0YXR1czogc3RyaW5nO1xuICB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8YW55Pjtcbn1cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFRyYW5zYWN0aW9uc1NlcnZpY2Uge1xuICBwdWJsaWMgdG9hc3RzOiBUb2FzdEluZm9bXSA9IFtdO1xuICBAU2VsZWN0KCkgdHJhbnNhY3Rpb25zJDogT2JzZXJ2YWJsZTxUcmFuc2FjdGlvbnNTdGF0ZU1vZGVsPiB8IHVuZGVmaW5lZDtcblxuICB0b2FzdFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+IHwgbnVsbCA9IG51bGw7XG5cbiAgcHJpdmF0ZSB0cmFja2VkVHJhbnNhY3Rpb25zOiBudW1iZXJbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcGVybWlzc2lvbnNQcm92aWRlcjogUGVybWlzc2lvbnNQcm92aWRlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBzdG9yZTogU3RvcmUsXG4gICAgcHJpdmF0ZSBhY2NvdW50QXBpOiBBY2NvdW50QXBpU2VydmljZSxcbiAgICBwcml2YXRlIGFjY291bnRTZXJ2aWNlOiBBY2NvdW50U2VydmljZSxcbiAgICBwcml2YXRlIHBhcnNlQW1vdW50OiBQYXJzZUFtb3VudFBpcGUsXG4gICAgQEluamVjdChEQVBQX0NPTkZJRykgcHVibGljIGNvbmZpZzogRGFwcENvbmZpZ1xuICApIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMudHJhbnNhY3Rpb25zJD8uc3Vic2NyaWJlKChzdGF0ZTogVHJhbnNhY3Rpb25zU3RhdGVNb2RlbCkgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IHRyYW5zYWN0aW9uIG9mIHN0YXRlLnRyYW5zYWN0aW9ucykge1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIHRyYW5zYWN0aW9uLnN0YXR1cyA9PT0gVHhTdGF0dXNFbnVtLlNJR05FRCAmJlxuICAgICAgICAgICAgIXRyYW5zYWN0aW9uLm9wdGlvbnMuc2lnbk9ubHlcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMuc2VuZFR4VG9BUEkodHJhbnNhY3Rpb24udHJhbnNhY3Rpb25zLCB0cmFuc2FjdGlvbi5pZCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgdHJhbnNhY3Rpb24uc3RhdHVzID09PSBUeFN0YXR1c0VudW0uU0lHTkFUVVJFX0ZBSUxFRCB8fFxuICAgICAgICAgICAgdHJhbnNhY3Rpb24uc3RhdHVzID09PSBUeFN0YXR1c0VudW0uQ0FOQ0VMTEVEIHx8XG4gICAgICAgICAgICB0cmFuc2FjdGlvbi5zdGF0dXMgPT09IFR4U3RhdHVzRW51bS5TRU5EX0lOX1BST0dSRVNTIHx8XG4gICAgICAgICAgICB0cmFuc2FjdGlvbi5zdGF0dXMgPT09IFR4U3RhdHVzRW51bS5TRU5UX1NVQ0NFU1MgfHxcbiAgICAgICAgICAgIHRyYW5zYWN0aW9uLnN0YXR1cyA9PT0gVHhTdGF0dXNFbnVtLlNFTlRfRVJST1JcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGNvbnN0IHRyYW5zYWN0aW9uc0luZm86IFR4SW5mb1R5cGVbXSB8IHVuZGVmaW5lZCA9XG4gICAgICAgICAgICAgIHRyYW5zYWN0aW9uLnRyYW5zYWN0aW9uc0hhc2hlcz8ubWFwKFxuICAgICAgICAgICAgICAgICh0eEhhc2gpOiBUeEluZm9UeXBlID0+ICh7XG4gICAgICAgICAgICAgICAgICB0eEhhc2g6IHR4SGFzaCxcbiAgICAgICAgICAgICAgICAgIHN0YXR1czogVHhTdGF0dXNFbnVtLlNFTkRfSU5fUFJPR1JFU1MsXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHRoaXMuc2hvdyhcbiAgICAgICAgICAgICAgdHJhbnNhY3Rpb24ub3B0aW9ucy50cmFuc2FjdGlvblRpdGxlLFxuICAgICAgICAgICAgICB0cmFuc2FjdGlvbnNJbmZvIHx8IFtdLFxuICAgICAgICAgICAgICB0cmFuc2FjdGlvbi5pZCxcbiAgICAgICAgICAgICAgdHJhbnNhY3Rpb24uc3RhdHVzXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIHRyYW5zYWN0aW9uLnRyYW5zYWN0aW9uc0hhc2hlcz8ubGVuZ3RoICYmXG4gICAgICAgICAgICAgICF0aGlzLnRyYWNrZWRUcmFuc2FjdGlvbnMuaW5jbHVkZXModHJhbnNhY3Rpb24uaWQpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgdGhpcy50cmFja2VkVHJhbnNhY3Rpb25zLnB1c2godHJhbnNhY3Rpb24uaWQpO1xuICAgICAgICAgICAgICB0aGlzLnRyYWNrVHJhbnNhY3Rpb25TdGF0dXModHJhbnNhY3Rpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSwgMTAwMCk7XG5cbiAgICB0aGlzLndhdGNoVW5sb2FkKCk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIHdhdGNoVW5sb2FkKCkge1xuICAgIHdpbmRvdy5vbmJlZm9yZXVubG9hZCA9IChlKSA9PiB7XG4gICAgICBpZiAodGhpcy5wZXJtaXNzaW9uc1Byb3ZpZGVyLnByb3ZpZGVyPy5jYW5jZWxBY3Rpb24pIHtcbiAgICAgICAgdGhpcy5wZXJtaXNzaW9uc1Byb3ZpZGVyLnByb3ZpZGVyLmNhbmNlbEFjdGlvbigpO1xuICAgICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKG5ldyBDYW5jZWxQZW5kaW5nU2lnbmF0dXJlKCkpO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIHRyYWNrVHJhbnNhY3Rpb25TdGF0dXModHJhbnNhY3Rpb246IFNpbmdsZVRyYW5zYWN0aW9uTW9kZWwpIHtcbiAgICBpZiAoIXRyYW5zYWN0aW9uLnRyYW5zYWN0aW9uc0hhc2hlcykgcmV0dXJuO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB0eFN0YXR1c2VzID0gYXdhaXQgbGFzdFZhbHVlRnJvbTxhbnk+KFxuICAgICAgICB0aGlzLmFjY291bnRBcGkudHJhY2tUcmFuc2FjdGlvbnModHJhbnNhY3Rpb24udHJhbnNhY3Rpb25zSGFzaGVzKVxuICAgICAgKTtcbiAgICAgIGNvbnN0IHNob3VsZENvbnRpbnVlVHJhY2tpbmcgPSB0aGlzLnVwZGF0ZVRvYXN0U3RhdHVzKFxuICAgICAgICB0eFN0YXR1c2VzLFxuICAgICAgICB0cmFuc2FjdGlvbi5pZFxuICAgICAgKTtcbiAgICAgIGlmIChzaG91bGRDb250aW51ZVRyYWNraW5nKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRoaXMudHJhY2tUcmFuc2FjdGlvblN0YXR1cyh0cmFuc2FjdGlvbik7XG4gICAgICAgIH0sIDYwMDApO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7fVxuICB9XG5cbiAgcHVibGljIHdhdGNoVHJhbnNhY3Rpb25CeVRpdGxlKFxuICAgIHR4VGl0bGU6IHN0cmluZyxcbiAgICB3YXRjaEZvclN0YXR1czogVHhTdGF0dXNFbnVtXG4gICk6IE9ic2VydmFibGU8U2luZ2xlVHJhbnNhY3Rpb25Nb2RlbCB8IHVuZGVmaW5lZD4ge1xuICAgIGlmICh0aGlzLnRyYW5zYWN0aW9ucyQgPT09IHVuZGVmaW5lZClcbiAgICAgIHRocm93IG5ldyBFcnJvcigndHJhbnNhY3Rpb25zJCBpcyB1bmRlZmluZWQnKTtcblxuICAgIHJldHVybiB0aGlzLnRyYW5zYWN0aW9ucyRcbiAgICAgIC5waXBlKFxuICAgICAgICBtYXAoKHN0YXRlKSA9PiB7XG4gICAgICAgICAgY29uc3QgdHggPSBzdGF0ZS50cmFuc2FjdGlvbnMuZmlsdGVyKCh0eCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHR4Lm9wdGlvbnMudHJhbnNhY3Rpb25UaXRsZSA9PT0gdHhUaXRsZTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm4gdHhbMF07XG4gICAgICAgIH0pXG4gICAgICApXG4gICAgICAucGlwZShza2lwV2hpbGUoKHR4KSA9PiAhdHggfHwgdHguc3RhdHVzICE9PSB3YXRjaEZvclN0YXR1cykpXG4gICAgICAucGlwZSh0YWtlKDEpKTtcbiAgfVxuXG4gIHB1YmxpYyBoYXNUcmFuc2FjdGlvbnNJblN0YXR1cyhzdGF0dXM6IFR4U3RhdHVzRW51bSk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIGlmICh0aGlzLnRyYW5zYWN0aW9ucyQgPT09IHVuZGVmaW5lZClcbiAgICAgIHRocm93IG5ldyBFcnJvcigndHJhbnNhY3Rpb25zJCBpcyB1bmRlZmluZWQnKTtcblxuICAgIHJldHVybiB0aGlzLnRyYW5zYWN0aW9ucyQucGlwZShcbiAgICAgIG1hcCgodHJhbnNhY3Rpb24pID0+XG4gICAgICAgIHRyYW5zYWN0aW9uLnRyYW5zYWN0aW9ucy5zb21lKCh0eCkgPT4ge1xuICAgICAgICAgIHJldHVybiB0eC5zdGF0dXMgPT09IHN0YXR1cztcbiAgICAgICAgfSlcbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVUb2FzdFN0YXR1cyhcbiAgICB0eEhhc2hlc1N0YXR1czogQXJyYXk8eyBzdGF0dXM6IHN0cmluZyB9PixcbiAgICB0cmFuc2FjdGlvbklkOiBudW1iZXJcbiAgKTogYm9vbGVhbiB7XG4gICAgbGV0IHNob3VsZENvbnRpbnVlVHJhY2tpbmcgPSBmYWxzZTtcblxuICAgIHRoaXMudG9hc3RzLm1hcCgodG9hc3QpID0+IHtcbiAgICAgIGlmICh0b2FzdC5pZCA9PT0gdHJhbnNhY3Rpb25JZCkge1xuICAgICAgICBmb3IgKGxldCBpIGluIHR4SGFzaGVzU3RhdHVzKSB7XG4gICAgICAgICAgc3dpdGNoICh0eEhhc2hlc1N0YXR1c1tpXS5zdGF0dXMpIHtcbiAgICAgICAgICAgIGNhc2UgJ2ZhaWwnOlxuICAgICAgICAgICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKFxuICAgICAgICAgICAgICAgIG5ldyBDaGFuZ2VUeFN0YXR1cyh7XG4gICAgICAgICAgICAgICAgICBpZDogdHJhbnNhY3Rpb25JZCxcbiAgICAgICAgICAgICAgICAgIG5ld1N0YXR1czogVHhTdGF0dXNFbnVtLlNFTlRfRVJST1IsXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgdG9hc3QudHJhbnNhY3Rpb25zSW5mb1tpXS5zdGF0dXMgPSBUeFN0YXR1c0VudW0uU0VOVF9FUlJPUjtcbiAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ3N1Y2Nlc3MnOlxuICAgICAgICAgICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKFxuICAgICAgICAgICAgICAgIG5ldyBDaGFuZ2VUeFN0YXR1cyh7XG4gICAgICAgICAgICAgICAgICBpZDogdHJhbnNhY3Rpb25JZCxcbiAgICAgICAgICAgICAgICAgIG5ld1N0YXR1czogVHhTdGF0dXNFbnVtLlNFTlRfU1VDQ0VTUyxcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB0b2FzdC50cmFuc2FjdGlvbnNJbmZvW2ldLnN0YXR1cyA9IFR4U3RhdHVzRW51bS5TRU5UX1NVQ0NFU1M7XG4gICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzaG91bGRDb250aW51ZSA9IHRvYXN0LnRyYW5zYWN0aW9uc0luZm8uc29tZShcbiAgICAgICAgICAodHgpID0+IHR4LnN0YXR1cyA9PT0gVHhTdGF0dXNFbnVtLlNFTkRfSU5fUFJPR1JFU1NcbiAgICAgICAgKTtcblxuICAgICAgICBjb25zdCBzaG91bGRTZXRTdWNjZXNzID0gdG9hc3QudHJhbnNhY3Rpb25zSW5mby5ldmVyeShcbiAgICAgICAgICAodHgpID0+IHR4LnN0YXR1cyA9PT0gVHhTdGF0dXNFbnVtLlNFTlRfU1VDQ0VTU1xuICAgICAgICApO1xuXG4gICAgICAgIGNvbnN0IHNob3VsZFNldEVycm9yID0gdG9hc3QudHJhbnNhY3Rpb25zSW5mby5zb21lKFxuICAgICAgICAgICh0eCkgPT4gdHguc3RhdHVzID09PSBUeFN0YXR1c0VudW0uU0VOVF9FUlJPUlxuICAgICAgICApO1xuXG4gICAgICAgIGlmIChzaG91bGRTZXRFcnJvcikge1xuICAgICAgICAgIHRvYXN0LnN0YXR1cyA9IFR4U3RhdHVzRW51bS5TRU5UX0VSUk9SO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNob3VsZFNldFN1Y2Nlc3MpIHtcbiAgICAgICAgICB0b2FzdC5zdGF0dXMgPSBUeFN0YXR1c0VudW0uU0VOVF9TVUNDRVNTO1xuICAgICAgICB9XG4gICAgICAgIHNob3VsZENvbnRpbnVlVHJhY2tpbmcgPSBzaG91bGRDb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuXG4gICAgaWYgKCFzaG91bGRDb250aW51ZVRyYWNraW5nKSB7XG4gICAgICB0aGlzLmFjY291bnRTZXJ2aWNlLnJlZmV0Y2hBY2NvdW50RGF0YSgpO1xuICAgIH1cblxuICAgIHJldHVybiBzaG91bGRDb250aW51ZVRyYWNraW5nO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBzZW5kVHhUb0FQSShcbiAgICB0cmFuc2FjdGlvbnM6IElQbGFpblRyYW5zYWN0aW9uT2JqZWN0W10sXG4gICAgdHJhbnNhY3Rpb25zSWQ6IG51bWJlclxuICApIHtcbiAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKFxuICAgICAgbmV3IENoYW5nZVR4U3RhdHVzKHtcbiAgICAgICAgbmV3U3RhdHVzOiBUeFN0YXR1c0VudW0uUkVBRFlfVE9fU0VORCxcbiAgICAgICAgaWQ6IHRyYW5zYWN0aW9uc0lkLFxuICAgICAgfSlcbiAgICApO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgZGF0YTogeyB0eHNIYXNoZXMsIG51bU9mU2VudFR4cyB9LFxuICAgICAgICBlcnJvcixcbiAgICAgIH0gPSBhd2FpdCBsYXN0VmFsdWVGcm9tPGFueT4oXG4gICAgICAgIHRoaXMuYWNjb3VudEFwaS5zZW5kVHJhbnNhY3Rpb25zKHRyYW5zYWN0aW9ucylcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IGhhc2hlc0FycmF5OiBzdHJpbmdbXSA9IE9iamVjdC52YWx1ZXModHhzSGFzaGVzKTtcbiAgICAgIGlmIChcbiAgICAgICAgZXJyb3IgfHxcbiAgICAgICAgIXR4c0hhc2hlcyB8fFxuICAgICAgICBudW1PZlNlbnRUeHMgPT09IDAgfHxcbiAgICAgICAgaGFzaGVzQXJyYXkubGVuZ3RoID09PSAwXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChcbiAgICAgICAgICBuZXcgQ2hhbmdlVHhTdGF0dXMoe1xuICAgICAgICAgICAgbmV3U3RhdHVzOiBUeFN0YXR1c0VudW0uU0VOVF9FUlJPUixcbiAgICAgICAgICAgIGlkOiB0cmFuc2FjdGlvbnNJZCxcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goXG4gICAgICAgIG5ldyBTZXRUcmFuc2FjdGlvbkhhc2hlcyh7XG4gICAgICAgICAgaWQ6IHRyYW5zYWN0aW9uc0lkLFxuICAgICAgICAgIGhhc2hlczogaGFzaGVzQXJyYXksXG4gICAgICAgIH0pXG4gICAgICApO1xuXG4gICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKFxuICAgICAgICBuZXcgQ2hhbmdlVHhTdGF0dXMoe1xuICAgICAgICAgIG5ld1N0YXR1czogVHhTdGF0dXNFbnVtLlNFTkRfSU5fUFJPR1JFU1MsXG4gICAgICAgICAgaWQ6IHRyYW5zYWN0aW9uc0lkLFxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChcbiAgICAgICAgbmV3IENoYW5nZVR4U3RhdHVzKHtcbiAgICAgICAgICBuZXdTdGF0dXM6IFR4U3RhdHVzRW51bS5TRU5UX0VSUk9SLFxuICAgICAgICAgIGlkOiB0cmFuc2FjdGlvbnNJZCxcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNlbmRUcmFuc2FjdGlvbnMoXG4gICAgdHJhbnNhY3Rpb25zOiBPbWl0PFxuICAgICAgSVBsYWluVHJhbnNhY3Rpb25PYmplY3QsXG4gICAgICAnbm9uY2UnIHwgJ3NlbmRlcicgfCAnY2hhaW5JRCcgfCAndmVyc2lvbidcbiAgICA+W10sXG4gICAgdHhPcHRpb25zOiBUcmFuc2FjdGlvbnNPcHRpb25zXG4gICk6IG51bWJlciB7XG4gICAgY29uc3QgdHhJZCA9IERhdGUubm93KCk7XG5cbiAgICBjb25zdCB0cmFuc2FjdGlvbnNUb1NlbmQgPSB0cmFuc2FjdGlvbnMubWFwKCh0eCwgaW5kZXgpID0+ICh7XG4gICAgICAuLi50eCxcbiAgICAgIG5vbmNlOiB0aGlzLmFjY291bnRTZXJ2aWNlLmFjY291bnQubm9uY2UgKyBpbmRleCxcbiAgICAgIHNlbmRlcjogdGhpcy5hY2NvdW50U2VydmljZS5hY2NvdW50LmFkZHJlc3MsXG4gICAgICBkYXRhOiBCdWZmZXIuZnJvbSh0eC5kYXRhID8/ICcnLCAndXRmOCcpLnRvU3RyaW5nKCdiYXNlNjQnKSxcbiAgICAgIHZhbHVlOiB0aGlzLnBhcnNlQW1vdW50LnRyYW5zZm9ybSh0eC52YWx1ZSksXG4gICAgICBjaGFpbklEOiB0aGlzLmNvbmZpZy5jaGFpbklELFxuICAgICAgLy9UT0RPOiBjaGFuZ2UgdmVyc2lvbiBpZiBuZWVkZWQgKGxlZGdlciwgZ3VhcmRpYW5zLCBldGMpXG4gICAgICB2ZXJzaW9uOiAxLFxuICAgIH0pKTtcblxuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goXG4gICAgICBuZXcgQWRkVHJhbnNhY3Rpb25zQmF0Y2goe1xuICAgICAgICBpZDogdHhJZCxcbiAgICAgICAgdHJhbnNhY3Rpb25zOiB0cmFuc2FjdGlvbnNUb1NlbmQsXG4gICAgICAgIHN0YXR1czogVHhTdGF0dXNFbnVtLlBFTkRJTkdfU0lHTkFUVVJFLFxuICAgICAgICBvcHRpb25zOiB0eE9wdGlvbnMsXG4gICAgICB9KVxuICAgICk7XG5cbiAgICB0aGlzLnBlcm1pc3Npb25zUHJvdmlkZXIuc2VuZFRyYW5zYWN0aW9ucyh0cmFuc2FjdGlvbnNUb1NlbmQsIHR4SWQpO1xuXG4gICAgcmV0dXJuIHR4SWQ7XG4gIH1cblxuICBzaG93KFxuICAgIGhlYWRlcjogc3RyaW5nLFxuICAgIHRyYW5zYWN0aW9uc0luZm86IFR4SW5mb1R5cGVbXSxcbiAgICB0eElkOiBudW1iZXIsXG4gICAgc3RhdHVzOiBUeFN0YXR1c0VudW1cbiAgKSB7XG4gICAgaWYgKCF0aGlzLnRvYXN0VGVtcGxhdGUpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RyYW5zYWN0aW9uc1NlcnZpY2U6IHRvYXN0VGVtcGxhdGUgaXMgbm90IHNldCcpO1xuXG4gICAgaWYgKHRoaXMudG9hc3RzLmZpbmQoKHQpID0+IHQuaWQgPT09IHR4SWQpKSByZXR1cm47XG5cbiAgICB0aGlzLnRvYXN0cy5wdXNoKHtcbiAgICAgIGlkOiB0eElkLFxuICAgICAgaGVhZGVyLFxuICAgICAgc3RhdHVzLFxuICAgICAgdHJhbnNhY3Rpb25zSW5mbyxcbiAgICAgIHRlbXBsYXRlUmVmOiB0aGlzLnRvYXN0VGVtcGxhdGUsXG4gICAgfSk7XG4gIH1cblxuICByZW1vdmUodG9hc3RJZDogbnVtYmVyKSB7XG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaChuZXcgUmVtb3ZlVHJhbnNhY3Rpb24oeyBpZDogdG9hc3RJZCB9KSk7XG4gICAgdGhpcy50b2FzdHMgPSB0aGlzLnRvYXN0cy5maWx0ZXIoKHQpID0+IHQuaWQgIT0gdG9hc3RJZCk7XG4gIH1cblxuICBzZXRUeFRlbXBsYXRlKHRlbXBsYXRlOiBhbnkpIHtcbiAgICB0aGlzLnRvYXN0VGVtcGxhdGUgPSB0ZW1wbGF0ZTtcbiAgfVxuXG4gIHJlc2V0VG9Jbml0aWFsU3RhdGUoKSB7XG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaChuZXcgUmVzZXRUcmFuc2FjdGlvbnMoKSk7XG4gIH1cbn1cbiJdfQ==