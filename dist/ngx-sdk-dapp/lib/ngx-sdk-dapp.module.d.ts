import { StorageEngine } from '@ngxs/storage-plugin';
import * as i0 from "@angular/core";
import * as i1 from "./pipes/formatAmount/format-amount.pipe";
import * as i2 from "./pipes/parseAmount/parse-amount.pipe";
import * as i3 from "./pipes/trimStr/trim-str.pipe";
import * as i4 from "./pipes/timeAgo/time-ago.pipe";
import * as i5 from "@ngxs/store";
import * as i6 from "@ngxs/storage-plugin";
import * as i7 from "@ngxs-labs/actions-executing";
import * as i8 from "@angular/common/http";
import * as i9 from "@angular/common";
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
    static ɵmod: i0.ɵɵNgModuleDeclaration<NgxSdkDappModule, [typeof i1.FormatAmountPipe, typeof i2.ParseAmountPipe, typeof i3.TrimStrPipe, typeof i4.TimeAgoPipe], [typeof i5.ɵj, typeof i6.NgxsStoragePluginModule, typeof i7.NgxsActionsExecutingModule, typeof i8.HttpClientModule, typeof i9.CommonModule], [typeof i1.FormatAmountPipe, typeof i2.ParseAmountPipe, typeof i3.TrimStrPipe, typeof i4.TimeAgoPipe]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NgxSdkDappModule>;
}
