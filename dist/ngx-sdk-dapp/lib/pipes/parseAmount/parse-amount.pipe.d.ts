import { PipeTransform } from '@angular/core';
import * as i0 from "@angular/core";
export declare class ParseAmountPipe implements PipeTransform {
    transform(value: string, decimals?: number): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<ParseAmountPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<ParseAmountPipe, "parseAmount", false>;
}
