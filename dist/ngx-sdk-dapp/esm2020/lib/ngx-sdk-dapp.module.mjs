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
NgxSdkDappModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.1", ngImport: i0, type: NgxSdkDappModule, declarations: [FormatAmountPipe, ParseAmountPipe, TrimStrPipe, TimeAgoPipe], imports: [i1.ɵj, i2.NgxsStoragePluginModule, i3.NgxsActionsExecutingModule, HttpClientModule,
        CommonModule], exports: [FormatAmountPipe, ParseAmountPipe, TrimStrPipe, TimeAgoPipe] });
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
                    declarations: [FormatAmountPipe, ParseAmountPipe, TrimStrPipe, TimeAgoPipe],
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
                    exports: [FormatAmountPipe, ParseAmountPipe, TrimStrPipe, TimeAgoPipe],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXNkay1kYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1zZGstZGFwcC9zcmMvbGliL25neC1zZGstZGFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMxRSxPQUFPLEVBQ0wsdUJBQXVCLEVBRXZCLGNBQWMsR0FDZixNQUFNLHNCQUFzQixDQUFDO0FBQzlCLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzVELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDeEUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDdEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzVELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQzs7Ozs7QUFFNUQsTUFBTSxPQUFPLGVBQWU7SUFFMUIsSUFBSSxNQUFNO1FBQ1IsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQzVDLENBQUMsQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxDQUM3QyxDQUFDLE1BQU0sQ0FBQztJQUNYLENBQUM7SUFFRCxPQUFPLENBQUMsR0FBVztRQUNqQixPQUFPLFlBQVksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLGNBQWMsR0FBRyxHQUFHLENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBRUQsT0FBTyxDQUFDLEdBQVcsRUFBRSxHQUFRO1FBQzNCLFlBQVksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLGNBQWMsR0FBRyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQUVELFVBQVUsQ0FBQyxHQUFXO1FBQ3BCLFlBQVksQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLGNBQWMsR0FBRyxHQUFHLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRUQsS0FBSztRQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO2FBQ3RCLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLENBQUM7YUFDM0QsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDaEQsQ0FBQzs7QUF2Qk0sOEJBQWMsR0FBRyxlQUFlLENBQUM7QUEyQzFDLE1BQU0sT0FBTyxnQkFBZ0I7OzZHQUFoQixnQkFBZ0I7OEdBQWhCLGdCQUFnQixpQkFoQlosZ0JBQWdCLEVBQUUsZUFBZSxFQUFFLFdBQVcsRUFBRSxXQUFXLCtFQUt4RSxnQkFBZ0I7UUFDaEIsWUFBWSxhQVFKLGdCQUFnQixFQUFFLGVBQWUsRUFBRSxXQUFXLEVBQUUsV0FBVzs4R0FFMUQsZ0JBQWdCLGFBUmhCO1FBQ1Q7WUFDRSxPQUFPLEVBQUUsY0FBYztZQUN2QixRQUFRLEVBQUUsZUFBZTtTQUMxQjtLQUNGLFlBWEMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFlBQVksRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1FBQ3JELHVCQUF1QixDQUFDLE9BQU8sRUFBRTtRQUNqQywwQkFBMEIsQ0FBQyxPQUFPLEVBQUU7UUFDcEMsZ0JBQWdCO1FBQ2hCLFlBQVk7MkZBVUgsZ0JBQWdCO2tCQWpCNUIsUUFBUTttQkFBQztvQkFDUixZQUFZLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFLFdBQVcsQ0FBQztvQkFDM0UsT0FBTyxFQUFFO3dCQUNQLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxZQUFZLEVBQUUsaUJBQWlCLENBQUMsQ0FBQzt3QkFDckQsdUJBQXVCLENBQUMsT0FBTyxFQUFFO3dCQUNqQywwQkFBMEIsQ0FBQyxPQUFPLEVBQUU7d0JBQ3BDLGdCQUFnQjt3QkFDaEIsWUFBWTtxQkFDYjtvQkFDRCxTQUFTLEVBQUU7d0JBQ1Q7NEJBQ0UsT0FBTyxFQUFFLGNBQWM7NEJBQ3ZCLFFBQVEsRUFBRSxlQUFlO3lCQUMxQjtxQkFDRjtvQkFDRCxPQUFPLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFLFdBQVcsQ0FBQztpQkFDdkUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmd4c0FjdGlvbnNFeGVjdXRpbmdNb2R1bGUgfSBmcm9tICdAbmd4cy1sYWJzL2FjdGlvbnMtZXhlY3V0aW5nJztcbmltcG9ydCB7XG4gIE5neHNTdG9yYWdlUGx1Z2luTW9kdWxlLFxuICBTdG9yYWdlRW5naW5lLFxuICBTVE9SQUdFX0VOR0lORSxcbn0gZnJvbSAnQG5neHMvc3RvcmFnZS1wbHVnaW4nO1xuaW1wb3J0IHsgTmd4c01vZHVsZSB9IGZyb20gJ0BuZ3hzL3N0b3JlJztcbmltcG9ydCB7IEFjY291bnRTdGF0ZSB9IGZyb20gJy4vbmd4cy9hY2NvdW50L2FjY291bnQuc2xpY2UnO1xuaW1wb3J0IHsgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEZvcm1hdEFtb3VudFBpcGUgfSBmcm9tICcuL3BpcGVzL2Zvcm1hdEFtb3VudC9mb3JtYXQtYW1vdW50LnBpcGUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFBhcnNlQW1vdW50UGlwZSB9IGZyb20gJy4vcGlwZXMvcGFyc2VBbW91bnQvcGFyc2UtYW1vdW50LnBpcGUnO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25zU3RhdGUgfSBmcm9tICcuL25neHMvYWNjb3VudC90cmFuc2FjdGlvbnMuc2xpY2UnO1xuaW1wb3J0IHsgVHJpbVN0clBpcGUgfSBmcm9tICcuL3BpcGVzL3RyaW1TdHIvdHJpbS1zdHIucGlwZSc7XG5pbXBvcnQgeyBUaW1lQWdvUGlwZSB9IGZyb20gJy4vcGlwZXMvdGltZUFnby90aW1lLWFnby5waXBlJztcblxuZXhwb3J0IGNsYXNzIE15U3RvcmFnZUVuZ2luZSBpbXBsZW1lbnRzIFN0b3JhZ2VFbmdpbmUge1xuICBzdGF0aWMgU1RPUkFHRV9QUkVGSVggPSAnbmd4LXNkay1kYXBwXyc7XG4gIGdldCBsZW5ndGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMobG9jYWxTdG9yYWdlKS5maWx0ZXIoKHgpID0+XG4gICAgICB4LnN0YXJ0c1dpdGgoTXlTdG9yYWdlRW5naW5lLlNUT1JBR0VfUFJFRklYKVxuICAgICkubGVuZ3RoO1xuICB9XG5cbiAgZ2V0SXRlbShrZXk6IHN0cmluZyk6IGFueSB7XG4gICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5nZXRJdGVtKE15U3RvcmFnZUVuZ2luZS5TVE9SQUdFX1BSRUZJWCArIGtleSk7XG4gIH1cblxuICBzZXRJdGVtKGtleTogc3RyaW5nLCB2YWw6IGFueSk6IHZvaWQge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKE15U3RvcmFnZUVuZ2luZS5TVE9SQUdFX1BSRUZJWCArIGtleSwgdmFsKTtcbiAgfVxuXG4gIHJlbW92ZUl0ZW0oa2V5OiBzdHJpbmcpOiB2b2lkIHtcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShNeVN0b3JhZ2VFbmdpbmUuU1RPUkFHRV9QUkVGSVggKyBrZXkpO1xuICB9XG5cbiAgY2xlYXIoKTogdm9pZCB7XG4gICAgT2JqZWN0LmtleXMobG9jYWxTdG9yYWdlKVxuICAgICAgLmZpbHRlcigoeCkgPT4geC5zdGFydHNXaXRoKE15U3RvcmFnZUVuZ2luZS5TVE9SQUdFX1BSRUZJWCkpXG4gICAgICAuZm9yRWFjaCgoeCkgPT4gbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oeCkpO1xuICB9XG59XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW0Zvcm1hdEFtb3VudFBpcGUsIFBhcnNlQW1vdW50UGlwZSwgVHJpbVN0clBpcGUsIFRpbWVBZ29QaXBlXSxcbiAgaW1wb3J0czogW1xuICAgIE5neHNNb2R1bGUuZm9yUm9vdChbQWNjb3VudFN0YXRlLCBUcmFuc2FjdGlvbnNTdGF0ZV0pLFxuICAgIE5neHNTdG9yYWdlUGx1Z2luTW9kdWxlLmZvclJvb3QoKSxcbiAgICBOZ3hzQWN0aW9uc0V4ZWN1dGluZ01vZHVsZS5mb3JSb290KCksXG4gICAgSHR0cENsaWVudE1vZHVsZSxcbiAgICBDb21tb25Nb2R1bGUsXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IFNUT1JBR0VfRU5HSU5FLFxuICAgICAgdXNlQ2xhc3M6IE15U3RvcmFnZUVuZ2luZSxcbiAgICB9LFxuICBdLFxuICBleHBvcnRzOiBbRm9ybWF0QW1vdW50UGlwZSwgUGFyc2VBbW91bnRQaXBlLCBUcmltU3RyUGlwZSwgVGltZUFnb1BpcGVdLFxufSlcbmV4cG9ydCBjbGFzcyBOZ3hTZGtEYXBwTW9kdWxlIHt9XG4iXX0=