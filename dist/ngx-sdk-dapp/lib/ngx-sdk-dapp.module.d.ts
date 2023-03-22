import { StorageEngine } from '@ngxs/storage-plugin';
import * as i0 from "@angular/core";
import * as i1 from "./pipes/formatAmount/format-amount.pipe";
import * as i2 from "./pipes/parseAmount/parse-amount.pipe";
import * as i3 from "./pipes/trimStr/trim-str.pipe";
import * as i4 from "./pipes/timeAgo/time-ago.pipe";
import * as i5 from "./pipes/addressToFormattedBalance/address-to-formatted-balance.pipe";
import * as i6 from "@ngxs/store";
import * as i7 from "@ngxs/storage-plugin";
import * as i8 from "@ngxs-labs/actions-executing";
import * as i9 from "@angular/common/http";
import * as i10 from "@angular/common";
export declare class MyStorageEngine implements StorageEngine {
    static STORAGE_PREFIX: string;
    get length(): number;
    getItem(key: string): any;
    setItem(key: string, val: any): void;
    removeItem(key: string): void;
    clear(): void;
}
export declare class NgxSdkDappModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NgxSdkDappModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NgxSdkDappModule, [typeof i1.FormatAmountPipe, typeof i2.ParseAmountPipe, typeof i3.TrimStrPipe, typeof i4.TimeAgoPipe, typeof i5.AddressToFormattedBalancePipe], [typeof i6.ɵj, typeof i7.NgxsStoragePluginModule, typeof i8.NgxsActionsExecutingModule, typeof i9.HttpClientModule, typeof i10.CommonModule], [typeof i1.FormatAmountPipe, typeof i2.ParseAmountPipe, typeof i3.TrimStrPipe, typeof i4.TimeAgoPipe, typeof i5.AddressToFormattedBalancePipe]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NgxSdkDappModule>;
}
