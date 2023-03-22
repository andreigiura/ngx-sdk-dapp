import { NgModule } from '@angular/core';
import { NgxsActionsExecutingModule } from '@ngxs-labs/actions-executing';
import { NgxsStoragePluginModule, STORAGE_ENGINE, } from '@ngxs/storage-plugin';
import { NgxsModule } from '@ngxs/store';
import { AccountState } from './ngxs/account/account.slice';
import { HttpClientModule } from '@angular/common/http';
import { FormatAmountPipe } from './pipes/formatAmount/format-amount.pipe';
import { CommonModule } from '@angular/common';
import { ParseAmountPipe } from './pipes/parseAmount/parse-amount.pipe';
import { TransactionsState } from './ngxs/account/transactions.slice';
import { TrimStrPipe } from './pipes/trimStr/trim-str.pipe';
import { TimeAgoPipe } from './pipes/timeAgo/time-ago.pipe';
import { AddressToFormattedBalancePipe } from './pipes/addressToFormattedBalance/address-to-formatted-balance.pipe';
import * as i0 from "@angular/core";
import * as i1 from "@ngxs/store";
import * as i2 from "@ngxs/storage-plugin";
import * as i3 from "@ngxs-labs/actions-executing";
export class MyStorageEngine {
    get length() {
        return Object.keys(localStorage).filter((x) => x.startsWith(MyStorageEngine.STORAGE_PREFIX)).length;
    }
    getItem(key) {
        return localStorage.getItem(MyStorageEngine.STORAGE_PREFIX + key);
    }
    setItem(key, val) {
        localStorage.setItem(MyStorageEngine.STORAGE_PREFIX + key, val);
    }
    removeItem(key) {
        localStorage.removeItem(MyStorageEngine.STORAGE_PREFIX + key);
    }
    clear() {
        Object.keys(localStorage)
            .filter((x) => x.startsWith(MyStorageEngine.STORAGE_PREFIX))
            .forEach((x) => localStorage.removeItem(x));
    }
}
MyStorageEngine.STORAGE_PREFIX = 'ngx-sdk-dapp_';
export class NgxSdkDappModule {
}
NgxSdkDappModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: NgxSdkDappModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NgxSdkDappModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.1", ngImport: i0, type: NgxSdkDappModule, declarations: [FormatAmountPipe,
        ParseAmountPipe,
        TrimStrPipe,
        TimeAgoPipe,
        AddressToFormattedBalancePipe], imports: [i1.ɵj, i2.NgxsStoragePluginModule, i3.NgxsActionsExecutingModule, HttpClientModule,
        CommonModule], exports: [FormatAmountPipe,
        ParseAmountPipe,
        TrimStrPipe,
        TimeAgoPipe,
        AddressToFormattedBalancePipe] });
NgxSdkDappModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: NgxSdkDappModule, providers: [
        {
            provide: STORAGE_ENGINE,
            useClass: MyStorageEngine,
        },
    ], imports: [NgxsModule.forRoot([AccountState, TransactionsState]),
        NgxsStoragePluginModule.forRoot(),
        NgxsActionsExecutingModule.forRoot(),
        HttpClientModule,
        CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: NgxSdkDappModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        FormatAmountPipe,
                        ParseAmountPipe,
                        TrimStrPipe,
                        TimeAgoPipe,
                        AddressToFormattedBalancePipe,
                    ],
                    imports: [
                        NgxsModule.forRoot([AccountState, TransactionsState]),
                        NgxsStoragePluginModule.forRoot(),
                        NgxsActionsExecutingModule.forRoot(),
                        HttpClientModule,
                        CommonModule,
                    ],
                    providers: [
                        {
                            provide: STORAGE_ENGINE,
                            useClass: MyStorageEngine,
                        },
                    ],
                    exports: [
                        FormatAmountPipe,
                        ParseAmountPipe,
                        TrimStrPipe,
                        TimeAgoPipe,
                        AddressToFormattedBalancePipe,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXNkay1kYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1zZGstZGFwcC9zcmMvbGliL25neC1zZGstZGFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMxRSxPQUFPLEVBQ0wsdUJBQXVCLEVBRXZCLGNBQWMsR0FDZixNQUFNLHNCQUFzQixDQUFDO0FBQzlCLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzVELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDeEUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDdEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzVELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxxRUFBcUUsQ0FBQzs7Ozs7QUFFcEgsTUFBTSxPQUFPLGVBQWU7SUFFMUIsSUFBSSxNQUFNO1FBQ1IsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQzVDLENBQUMsQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxDQUM3QyxDQUFDLE1BQU0sQ0FBQztJQUNYLENBQUM7SUFFRCxPQUFPLENBQUMsR0FBVztRQUNqQixPQUFPLFlBQVksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLGNBQWMsR0FBRyxHQUFHLENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBRUQsT0FBTyxDQUFDLEdBQVcsRUFBRSxHQUFRO1FBQzNCLFlBQVksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLGNBQWMsR0FBRyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQUVELFVBQVUsQ0FBQyxHQUFXO1FBQ3BCLFlBQVksQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLGNBQWMsR0FBRyxHQUFHLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRUQsS0FBSztRQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO2FBQ3RCLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLENBQUM7YUFDM0QsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDaEQsQ0FBQzs7QUF2Qk0sOEJBQWMsR0FBRyxlQUFlLENBQUM7QUF1RDFDLE1BQU0sT0FBTyxnQkFBZ0I7OzZHQUFoQixnQkFBZ0I7OEdBQWhCLGdCQUFnQixpQkEzQnpCLGdCQUFnQjtRQUNoQixlQUFlO1FBQ2YsV0FBVztRQUNYLFdBQVc7UUFDWCw2QkFBNkIsK0VBTTdCLGdCQUFnQjtRQUNoQixZQUFZLGFBU1osZ0JBQWdCO1FBQ2hCLGVBQWU7UUFDZixXQUFXO1FBQ1gsV0FBVztRQUNYLDZCQUE2Qjs4R0FHcEIsZ0JBQWdCLGFBZGhCO1FBQ1Q7WUFDRSxPQUFPLEVBQUUsY0FBYztZQUN2QixRQUFRLEVBQUUsZUFBZTtTQUMxQjtLQUNGLFlBWEMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFlBQVksRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1FBQ3JELHVCQUF1QixDQUFDLE9BQU8sRUFBRTtRQUNqQywwQkFBMEIsQ0FBQyxPQUFPLEVBQUU7UUFDcEMsZ0JBQWdCO1FBQ2hCLFlBQVk7MkZBZ0JILGdCQUFnQjtrQkE3QjVCLFFBQVE7bUJBQUM7b0JBQ1IsWUFBWSxFQUFFO3dCQUNaLGdCQUFnQjt3QkFDaEIsZUFBZTt3QkFDZixXQUFXO3dCQUNYLFdBQVc7d0JBQ1gsNkJBQTZCO3FCQUM5QjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFlBQVksRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO3dCQUNyRCx1QkFBdUIsQ0FBQyxPQUFPLEVBQUU7d0JBQ2pDLDBCQUEwQixDQUFDLE9BQU8sRUFBRTt3QkFDcEMsZ0JBQWdCO3dCQUNoQixZQUFZO3FCQUNiO29CQUNELFNBQVMsRUFBRTt3QkFDVDs0QkFDRSxPQUFPLEVBQUUsY0FBYzs0QkFDdkIsUUFBUSxFQUFFLGVBQWU7eUJBQzFCO3FCQUNGO29CQUNELE9BQU8sRUFBRTt3QkFDUCxnQkFBZ0I7d0JBQ2hCLGVBQWU7d0JBQ2YsV0FBVzt3QkFDWCxXQUFXO3dCQUNYLDZCQUE2QjtxQkFDOUI7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmd4c0FjdGlvbnNFeGVjdXRpbmdNb2R1bGUgfSBmcm9tICdAbmd4cy1sYWJzL2FjdGlvbnMtZXhlY3V0aW5nJztcbmltcG9ydCB7XG4gIE5neHNTdG9yYWdlUGx1Z2luTW9kdWxlLFxuICBTdG9yYWdlRW5naW5lLFxuICBTVE9SQUdFX0VOR0lORSxcbn0gZnJvbSAnQG5neHMvc3RvcmFnZS1wbHVnaW4nO1xuaW1wb3J0IHsgTmd4c01vZHVsZSB9IGZyb20gJ0BuZ3hzL3N0b3JlJztcbmltcG9ydCB7IEFjY291bnRTdGF0ZSB9IGZyb20gJy4vbmd4cy9hY2NvdW50L2FjY291bnQuc2xpY2UnO1xuaW1wb3J0IHsgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEZvcm1hdEFtb3VudFBpcGUgfSBmcm9tICcuL3BpcGVzL2Zvcm1hdEFtb3VudC9mb3JtYXQtYW1vdW50LnBpcGUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFBhcnNlQW1vdW50UGlwZSB9IGZyb20gJy4vcGlwZXMvcGFyc2VBbW91bnQvcGFyc2UtYW1vdW50LnBpcGUnO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25zU3RhdGUgfSBmcm9tICcuL25neHMvYWNjb3VudC90cmFuc2FjdGlvbnMuc2xpY2UnO1xuaW1wb3J0IHsgVHJpbVN0clBpcGUgfSBmcm9tICcuL3BpcGVzL3RyaW1TdHIvdHJpbS1zdHIucGlwZSc7XG5pbXBvcnQgeyBUaW1lQWdvUGlwZSB9IGZyb20gJy4vcGlwZXMvdGltZUFnby90aW1lLWFnby5waXBlJztcbmltcG9ydCB7IEFkZHJlc3NUb0Zvcm1hdHRlZEJhbGFuY2VQaXBlIH0gZnJvbSAnLi9waXBlcy9hZGRyZXNzVG9Gb3JtYXR0ZWRCYWxhbmNlL2FkZHJlc3MtdG8tZm9ybWF0dGVkLWJhbGFuY2UucGlwZSc7XG5cbmV4cG9ydCBjbGFzcyBNeVN0b3JhZ2VFbmdpbmUgaW1wbGVtZW50cyBTdG9yYWdlRW5naW5lIHtcbiAgc3RhdGljIFNUT1JBR0VfUFJFRklYID0gJ25neC1zZGstZGFwcF8nO1xuICBnZXQgbGVuZ3RoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKGxvY2FsU3RvcmFnZSkuZmlsdGVyKCh4KSA9PlxuICAgICAgeC5zdGFydHNXaXRoKE15U3RvcmFnZUVuZ2luZS5TVE9SQUdFX1BSRUZJWClcbiAgICApLmxlbmd0aDtcbiAgfVxuXG4gIGdldEl0ZW0oa2V5OiBzdHJpbmcpOiBhbnkge1xuICAgIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShNeVN0b3JhZ2VFbmdpbmUuU1RPUkFHRV9QUkVGSVggKyBrZXkpO1xuICB9XG5cbiAgc2V0SXRlbShrZXk6IHN0cmluZywgdmFsOiBhbnkpOiB2b2lkIHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShNeVN0b3JhZ2VFbmdpbmUuU1RPUkFHRV9QUkVGSVggKyBrZXksIHZhbCk7XG4gIH1cblxuICByZW1vdmVJdGVtKGtleTogc3RyaW5nKTogdm9pZCB7XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oTXlTdG9yYWdlRW5naW5lLlNUT1JBR0VfUFJFRklYICsga2V5KTtcbiAgfVxuXG4gIGNsZWFyKCk6IHZvaWQge1xuICAgIE9iamVjdC5rZXlzKGxvY2FsU3RvcmFnZSlcbiAgICAgIC5maWx0ZXIoKHgpID0+IHguc3RhcnRzV2l0aChNeVN0b3JhZ2VFbmdpbmUuU1RPUkFHRV9QUkVGSVgpKVxuICAgICAgLmZvckVhY2goKHgpID0+IGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKHgpKTtcbiAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBGb3JtYXRBbW91bnRQaXBlLFxuICAgIFBhcnNlQW1vdW50UGlwZSxcbiAgICBUcmltU3RyUGlwZSxcbiAgICBUaW1lQWdvUGlwZSxcbiAgICBBZGRyZXNzVG9Gb3JtYXR0ZWRCYWxhbmNlUGlwZSxcbiAgXSxcbiAgaW1wb3J0czogW1xuICAgIE5neHNNb2R1bGUuZm9yUm9vdChbQWNjb3VudFN0YXRlLCBUcmFuc2FjdGlvbnNTdGF0ZV0pLFxuICAgIE5neHNTdG9yYWdlUGx1Z2luTW9kdWxlLmZvclJvb3QoKSxcbiAgICBOZ3hzQWN0aW9uc0V4ZWN1dGluZ01vZHVsZS5mb3JSb290KCksXG4gICAgSHR0cENsaWVudE1vZHVsZSxcbiAgICBDb21tb25Nb2R1bGUsXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IFNUT1JBR0VfRU5HSU5FLFxuICAgICAgdXNlQ2xhc3M6IE15U3RvcmFnZUVuZ2luZSxcbiAgICB9LFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgRm9ybWF0QW1vdW50UGlwZSxcbiAgICBQYXJzZUFtb3VudFBpcGUsXG4gICAgVHJpbVN0clBpcGUsXG4gICAgVGltZUFnb1BpcGUsXG4gICAgQWRkcmVzc1RvRm9ybWF0dGVkQmFsYW5jZVBpcGUsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE5neFNka0RhcHBNb2R1bGUge31cbiJdfQ==