import { __decorate, __param } from "tslib";
import { Inject } from '@angular/core';
import { NativeAuthClient } from '@multiversx/sdk-native-auth-client';
import { DAPP_CONFIG } from '../../config';
import { ResetAccount } from '../../ngxs/account/account.actions';
import { ChangeTxStatus, MoveToSignedTransactions, ResetTransactions, } from '../../ngxs/account/transactions.actions';
import { TxStatusEnum } from '../../types';
export var ProvidersType;
(function (ProvidersType) {
    ProvidersType["Extension"] = "Extension";
    ProvidersType["WebWallet"] = "WebWallet";
    ProvidersType["XPortal"] = "XPortal";
    ProvidersType["EMPTY"] = "";
})(ProvidersType || (ProvidersType = {}));
/**
 * @ignore
 */
let GenericProvider = class GenericProvider {
    constructor(store, accountService, authenticationService, config) {
        this.store = store;
        this.accountService = accountService;
        this.authenticationService = authenticationService;
        this.config = config;
        if (this.accountService.account.currentProvider !== ProvidersType.EMPTY &&
            this.authenticationService.isAuthenticated()) {
            this.reInitialize(accountService.account);
        }
    }
    async connect(navAfterConnectRoute) {
        if (this.accountService.account.currentProvider !== ProvidersType.EMPTY &&
            this.authenticationService.isAuthenticated()) {
            throw new Error('Provider is already connected, please logout first.');
        }
        const client = new NativeAuthClient();
        const init = await client.initialize();
        return { client, init };
    }
    async logout() {
        this.store.dispatch(new ResetAccount());
        this.store.dispatch(new ResetTransactions());
        return true;
    }
    sendTransactions(transactions, txId) { }
    addSignedTransactionsToState(transactions, txId) {
        this.store.dispatch(new MoveToSignedTransactions({
            signedTransactions: transactions,
            id: txId,
        }));
    }
    addFailedTransactionsToState(txId) {
        this.store.dispatch(new ChangeTxStatus({
            id: txId,
            newStatus: TxStatusEnum.SIGNATURE_FAILED,
        }));
    }
    addToCancelledTransaction(txId) {
        this.store.dispatch(new ChangeTxStatus({
            id: txId,
            newStatus: TxStatusEnum.CANCELLED,
        }));
    }
    reInitialize(account) { }
};
GenericProvider = __decorate([
    __param(3, Inject(DAPP_CONFIG))
], GenericProvider);
export { GenericProvider };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJpY1Byb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LXNkay1kYXBwL3NyYy9saWIvc2VydmljZXMvYXV0aFByb3ZpZGVycy9nZW5lcmljUHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFdkMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFFdEUsT0FBTyxFQUFjLFdBQVcsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN2RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFFbEUsT0FBTyxFQUNMLGNBQWMsRUFDZCx3QkFBd0IsRUFDeEIsaUJBQWlCLEdBQ2xCLE1BQU0seUNBQXlDLENBQUM7QUFDakQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUszQyxNQUFNLENBQU4sSUFBWSxhQUtYO0FBTEQsV0FBWSxhQUFhO0lBQ3ZCLHdDQUF1QixDQUFBO0lBQ3ZCLHdDQUF1QixDQUFBO0lBQ3ZCLG9DQUFtQixDQUFBO0lBQ25CLDJCQUFVLENBQUE7QUFDWixDQUFDLEVBTFcsYUFBYSxLQUFiLGFBQWEsUUFLeEI7QUFDRDs7R0FFRztBQUNJLElBQU0sZUFBZSxHQUFyQixNQUFNLGVBQWU7SUFDMUIsWUFDVSxLQUFZLEVBQ1osY0FBOEIsRUFDOUIscUJBQTRDLEVBQ3hCLE1BQWtCO1FBSHRDLFVBQUssR0FBTCxLQUFLLENBQU87UUFDWixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUF1QjtRQUN4QixXQUFNLEdBQU4sTUFBTSxDQUFZO1FBRTlDLElBQ0UsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsZUFBZSxLQUFLLGFBQWEsQ0FBQyxLQUFLO1lBQ25FLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxlQUFlLEVBQUUsRUFDNUM7WUFDQSxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUMzQztJQUNILENBQUM7SUFFRCxLQUFLLENBQUMsT0FBTyxDQUNYLG9CQUE0QjtRQUU1QixJQUNFLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLGVBQWUsS0FBSyxhQUFhLENBQUMsS0FBSztZQUNuRSxJQUFJLENBQUMscUJBQXFCLENBQUMsZUFBZSxFQUFFLEVBQzVDO1lBQ0EsTUFBTSxJQUFJLEtBQUssQ0FBQyxxREFBcUQsQ0FBQyxDQUFDO1NBQ3hFO1FBQ0QsTUFBTSxNQUFNLEdBQUcsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3RDLE1BQU0sSUFBSSxHQUFHLE1BQU0sTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBRXZDLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVELEtBQUssQ0FBQyxNQUFNO1FBQ1YsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxZQUFZLEVBQUUsQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO1FBQzdDLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELGdCQUFnQixDQUFDLFlBQXVDLEVBQUUsSUFBWSxJQUFHLENBQUM7SUFFMUUsNEJBQTRCLENBQzFCLFlBQXVDLEVBQ3ZDLElBQVk7UUFFWixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FDakIsSUFBSSx3QkFBd0IsQ0FBQztZQUMzQixrQkFBa0IsRUFBRSxZQUFZO1lBQ2hDLEVBQUUsRUFBRSxJQUFJO1NBQ1QsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDO0lBRUQsNEJBQTRCLENBQUMsSUFBWTtRQUN2QyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FDakIsSUFBSSxjQUFjLENBQUM7WUFDakIsRUFBRSxFQUFFLElBQUk7WUFDUixTQUFTLEVBQUUsWUFBWSxDQUFDLGdCQUFnQjtTQUN6QyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFFRCx5QkFBeUIsQ0FBQyxJQUFZO1FBQ3BDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUNqQixJQUFJLGNBQWMsQ0FBQztZQUNqQixFQUFFLEVBQUUsSUFBSTtZQUNSLFNBQVMsRUFBRSxZQUFZLENBQUMsU0FBUztTQUNsQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFFRCxZQUFZLENBQUMsT0FBMEIsSUFBUyxDQUFDO0NBQ2xELENBQUE7QUFyRVksZUFBZTtJQUt2QixXQUFBLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQTtHQUxYLGVBQWUsQ0FxRTNCO1NBckVZLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IElQbGFpblRyYW5zYWN0aW9uT2JqZWN0LCBUcmFuc2FjdGlvbiB9IGZyb20gJ0BtdWx0aXZlcnN4L3Nkay1jb3JlL291dCc7XG5pbXBvcnQgeyBOYXRpdmVBdXRoQ2xpZW50IH0gZnJvbSAnQG11bHRpdmVyc3gvc2RrLW5hdGl2ZS1hdXRoLWNsaWVudCc7XG5pbXBvcnQgeyBTdG9yZSB9IGZyb20gJ0BuZ3hzL3N0b3JlJztcbmltcG9ydCB7IERhcHBDb25maWcsIERBUFBfQ09ORklHIH0gZnJvbSAnLi4vLi4vY29uZmlnJztcbmltcG9ydCB7IFJlc2V0QWNjb3VudCB9IGZyb20gJy4uLy4uL25neHMvYWNjb3VudC9hY2NvdW50LmFjdGlvbnMnO1xuaW1wb3J0IHsgQWNjb3VudFN0YXRlTW9kZWwgfSBmcm9tICcuLi8uLi9uZ3hzL2FjY291bnQvYWNjb3VudC5zbGljZSc7XG5pbXBvcnQge1xuICBDaGFuZ2VUeFN0YXR1cyxcbiAgTW92ZVRvU2lnbmVkVHJhbnNhY3Rpb25zLFxuICBSZXNldFRyYW5zYWN0aW9ucyxcbn0gZnJvbSAnLi4vLi4vbmd4cy9hY2NvdW50L3RyYW5zYWN0aW9ucy5hY3Rpb25zJztcbmltcG9ydCB7IFR4U3RhdHVzRW51bSB9IGZyb20gJy4uLy4uL3R5cGVzJztcbmltcG9ydCB7IEFjY291bnRTZXJ2aWNlIH0gZnJvbSAnLi4vYWNjb3VudC9hY2NvdW50LnNlcnZpY2UnO1xuaW1wb3J0IHsgQXV0aGVudGljYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vYXV0aGVudGljYXRpb24vYXV0aGVudGljYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbnNTZXJ2aWNlIH0gZnJvbSAnLi4vdHJhbnNhY3Rpb25zL3RyYW5zYWN0aW9ucy5zZXJ2aWNlJztcblxuZXhwb3J0IGVudW0gUHJvdmlkZXJzVHlwZSB7XG4gIEV4dGVuc2lvbiA9ICdFeHRlbnNpb24nLFxuICBXZWJXYWxsZXQgPSAnV2ViV2FsbGV0JyxcbiAgWFBvcnRhbCA9ICdYUG9ydGFsJyxcbiAgRU1QVFkgPSAnJyxcbn1cbi8qKlxuICogQGlnbm9yZVxuICovXG5leHBvcnQgY2xhc3MgR2VuZXJpY1Byb3ZpZGVyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBzdG9yZTogU3RvcmUsXG4gICAgcHJpdmF0ZSBhY2NvdW50U2VydmljZTogQWNjb3VudFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBhdXRoZW50aWNhdGlvblNlcnZpY2U6IEF1dGhlbnRpY2F0aW9uU2VydmljZSxcbiAgICBASW5qZWN0KERBUFBfQ09ORklHKSBwdWJsaWMgY29uZmlnOiBEYXBwQ29uZmlnXG4gICkge1xuICAgIGlmIChcbiAgICAgIHRoaXMuYWNjb3VudFNlcnZpY2UuYWNjb3VudC5jdXJyZW50UHJvdmlkZXIgIT09IFByb3ZpZGVyc1R5cGUuRU1QVFkgJiZcbiAgICAgIHRoaXMuYXV0aGVudGljYXRpb25TZXJ2aWNlLmlzQXV0aGVudGljYXRlZCgpXG4gICAgKSB7XG4gICAgICB0aGlzLnJlSW5pdGlhbGl6ZShhY2NvdW50U2VydmljZS5hY2NvdW50KTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBjb25uZWN0KFxuICAgIG5hdkFmdGVyQ29ubmVjdFJvdXRlOiBzdHJpbmdcbiAgKTogUHJvbWlzZTx7IGNsaWVudDogTmF0aXZlQXV0aENsaWVudDsgaW5pdDogc3RyaW5nIH0+IHtcbiAgICBpZiAoXG4gICAgICB0aGlzLmFjY291bnRTZXJ2aWNlLmFjY291bnQuY3VycmVudFByb3ZpZGVyICE9PSBQcm92aWRlcnNUeXBlLkVNUFRZICYmXG4gICAgICB0aGlzLmF1dGhlbnRpY2F0aW9uU2VydmljZS5pc0F1dGhlbnRpY2F0ZWQoKVxuICAgICkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdQcm92aWRlciBpcyBhbHJlYWR5IGNvbm5lY3RlZCwgcGxlYXNlIGxvZ291dCBmaXJzdC4nKTtcbiAgICB9XG4gICAgY29uc3QgY2xpZW50ID0gbmV3IE5hdGl2ZUF1dGhDbGllbnQoKTtcbiAgICBjb25zdCBpbml0ID0gYXdhaXQgY2xpZW50LmluaXRpYWxpemUoKTtcblxuICAgIHJldHVybiB7IGNsaWVudCwgaW5pdCB9O1xuICB9XG5cbiAgYXN5bmMgbG9nb3V0KCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2gobmV3IFJlc2V0QWNjb3VudCgpKTtcbiAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKG5ldyBSZXNldFRyYW5zYWN0aW9ucygpKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHNlbmRUcmFuc2FjdGlvbnModHJhbnNhY3Rpb25zOiBJUGxhaW5UcmFuc2FjdGlvbk9iamVjdFtdLCB0eElkOiBudW1iZXIpIHt9XG5cbiAgYWRkU2lnbmVkVHJhbnNhY3Rpb25zVG9TdGF0ZShcbiAgICB0cmFuc2FjdGlvbnM6IElQbGFpblRyYW5zYWN0aW9uT2JqZWN0W10sXG4gICAgdHhJZDogbnVtYmVyXG4gICkge1xuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goXG4gICAgICBuZXcgTW92ZVRvU2lnbmVkVHJhbnNhY3Rpb25zKHtcbiAgICAgICAgc2lnbmVkVHJhbnNhY3Rpb25zOiB0cmFuc2FjdGlvbnMsXG4gICAgICAgIGlkOiB0eElkLFxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgYWRkRmFpbGVkVHJhbnNhY3Rpb25zVG9TdGF0ZSh0eElkOiBudW1iZXIpIHtcbiAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKFxuICAgICAgbmV3IENoYW5nZVR4U3RhdHVzKHtcbiAgICAgICAgaWQ6IHR4SWQsXG4gICAgICAgIG5ld1N0YXR1czogVHhTdGF0dXNFbnVtLlNJR05BVFVSRV9GQUlMRUQsXG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBhZGRUb0NhbmNlbGxlZFRyYW5zYWN0aW9uKHR4SWQ6IG51bWJlcikge1xuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goXG4gICAgICBuZXcgQ2hhbmdlVHhTdGF0dXMoe1xuICAgICAgICBpZDogdHhJZCxcbiAgICAgICAgbmV3U3RhdHVzOiBUeFN0YXR1c0VudW0uQ0FOQ0VMTEVELFxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgcmVJbml0aWFsaXplKGFjY291bnQ6IEFjY291bnRTdGF0ZU1vZGVsKTogdm9pZCB7fVxufVxuIl19