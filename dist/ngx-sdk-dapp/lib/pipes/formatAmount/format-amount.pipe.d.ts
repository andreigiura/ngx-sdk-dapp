import { PipeTransform } from '@angular/core';
import { FormatAmountType } from '../../helpers/formatAmount';
import * as i0 from "@angular/core";
export declare class FormatAmountPipe implements PipeTransform {
    transform(value: string, formatOptions?: FormatAmountType | {}): unknown;
    static ɵfac: i0.ɵɵFactoryDeclaration<FormatAmountPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<FormatAmountPipe, "formatAmount", false>;
}
