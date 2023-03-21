import { Inject, Injectable } from '@angular/core';
import { DAPP_CONFIG } from '../../../config';
import * as i0 from "@angular/core";
import * as i1 from "../../account/account.service";
import * as i2 from "../../authentication/authentication.service";
export class NativeAuthTokenInterceptorService {
    constructor(accountService, authenticationService, config) {
        this.accountService = accountService;
        this.authenticationService = authenticationService;
        this.config = config;
    }
    intercept(request, next) {
        // add auth header with jwt if account is logged in and request is to the api url
        const account = this.accountService.account;
        const isLoggedIn = this.authenticationService.isAuthenticated();
        const isApiUrl = Object.values(this.config.nativeAuthAPIs).some((apiURL) => {
            return request.url.startsWith(apiURL);
        });
        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: { Authorization: `Bearer ${account.accessToken}` },
            });
        }
        return next.handle(request);
    }
}
NativeAuthTokenInterceptorService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: NativeAuthTokenInterceptorService, deps: [{ token: i1.AccountService }, { token: i2.AuthenticationService }, { token: DAPP_CONFIG }], target: i0.ɵɵFactoryTarget.Injectable });
NativeAuthTokenInterceptorService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: NativeAuthTokenInterceptorService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: NativeAuthTokenInterceptorService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.AccountService }, { type: i2.AuthenticationService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DAPP_CONFIG]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF0aXZlLWF1dGgtdG9rZW4taW50ZXJjZXB0b3Iuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1zZGstZGFwcC9zcmMvbGliL3NlcnZpY2VzL2ludGVyY2VwdG9ycy9uYXRpdmVBdXRoVG9rZW5JbnRlcmNlcHRvci9uYXRpdmUtYXV0aC10b2tlbi1pbnRlcmNlcHRvci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU1BLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRW5ELE9BQU8sRUFBYyxXQUFXLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7OztBQU8xRCxNQUFNLE9BQU8saUNBQWlDO0lBQzVDLFlBQ1UsY0FBOEIsRUFDOUIscUJBQTRDLEVBQ3ZCLE1BQWtCO1FBRnZDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QiwwQkFBcUIsR0FBckIscUJBQXFCLENBQXVCO1FBQ3ZCLFdBQU0sR0FBTixNQUFNLENBQVk7SUFDOUMsQ0FBQztJQUVKLFNBQVMsQ0FDUCxPQUF5QixFQUN6QixJQUFpQjtRQUVqQixpRkFBaUY7UUFDakYsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUM7UUFDNUMsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ2hFLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxJQUFJLENBQzdELENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDVCxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3hDLENBQUMsQ0FDRixDQUFDO1FBQ0YsSUFBSSxVQUFVLElBQUksUUFBUSxFQUFFO1lBQzFCLE9BQU8sR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO2dCQUN0QixVQUFVLEVBQUUsRUFBRSxhQUFhLEVBQUUsVUFBVSxPQUFPLENBQUMsV0FBVyxFQUFFLEVBQUU7YUFDL0QsQ0FBQyxDQUFDO1NBQ0o7UUFFRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDOUIsQ0FBQzs7OEhBMUJVLGlDQUFpQyxxRkFJbEMsV0FBVztrSUFKVixpQ0FBaUMsY0FGaEMsTUFBTTsyRkFFUCxpQ0FBaUM7a0JBSDdDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzswQkFLSSxNQUFNOzJCQUFDLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBIdHRwRXZlbnQsXG4gIEh0dHBIYW5kbGVyLFxuICBIdHRwSW50ZXJjZXB0b3IsXG4gIEh0dHBSZXF1ZXN0LFxufSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IERhcHBDb25maWcsIERBUFBfQ09ORklHIH0gZnJvbSAnLi4vLi4vLi4vY29uZmlnJztcbmltcG9ydCB7IEFjY291bnRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vYWNjb3VudC9hY2NvdW50LnNlcnZpY2UnO1xuaW1wb3J0IHsgQXV0aGVudGljYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vYXV0aGVudGljYXRpb24vYXV0aGVudGljYXRpb24uc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBOYXRpdmVBdXRoVG9rZW5JbnRlcmNlcHRvclNlcnZpY2UgaW1wbGVtZW50cyBIdHRwSW50ZXJjZXB0b3Ige1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGFjY291bnRTZXJ2aWNlOiBBY2NvdW50U2VydmljZSxcbiAgICBwcml2YXRlIGF1dGhlbnRpY2F0aW9uU2VydmljZTogQXV0aGVudGljYXRpb25TZXJ2aWNlLFxuICAgIEBJbmplY3QoREFQUF9DT05GSUcpIHByaXZhdGUgY29uZmlnOiBEYXBwQ29uZmlnXG4gICkge31cblxuICBpbnRlcmNlcHQoXG4gICAgcmVxdWVzdDogSHR0cFJlcXVlc3Q8YW55PixcbiAgICBuZXh0OiBIdHRwSGFuZGxlclxuICApOiBPYnNlcnZhYmxlPEh0dHBFdmVudDxhbnk+PiB7XG4gICAgLy8gYWRkIGF1dGggaGVhZGVyIHdpdGggand0IGlmIGFjY291bnQgaXMgbG9nZ2VkIGluIGFuZCByZXF1ZXN0IGlzIHRvIHRoZSBhcGkgdXJsXG4gICAgY29uc3QgYWNjb3VudCA9IHRoaXMuYWNjb3VudFNlcnZpY2UuYWNjb3VudDtcbiAgICBjb25zdCBpc0xvZ2dlZEluID0gdGhpcy5hdXRoZW50aWNhdGlvblNlcnZpY2UuaXNBdXRoZW50aWNhdGVkKCk7XG4gICAgY29uc3QgaXNBcGlVcmwgPSBPYmplY3QudmFsdWVzKHRoaXMuY29uZmlnLm5hdGl2ZUF1dGhBUElzKS5zb21lKFxuICAgICAgKGFwaVVSTCkgPT4ge1xuICAgICAgICByZXR1cm4gcmVxdWVzdC51cmwuc3RhcnRzV2l0aChhcGlVUkwpO1xuICAgICAgfVxuICAgICk7XG4gICAgaWYgKGlzTG9nZ2VkSW4gJiYgaXNBcGlVcmwpIHtcbiAgICAgIHJlcXVlc3QgPSByZXF1ZXN0LmNsb25lKHtcbiAgICAgICAgc2V0SGVhZGVyczogeyBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7YWNjb3VudC5hY2Nlc3NUb2tlbn1gIH0sXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV4dC5oYW5kbGUocmVxdWVzdCk7XG4gIH1cbn1cbiJdfQ==