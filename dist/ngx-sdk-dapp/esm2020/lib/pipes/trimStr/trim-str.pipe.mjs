import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
export class TrimStrPipe {
    transform(value, ...args) {
        return value.slice(0, 6) + '...' + value.slice(-6);
    }
}
TrimStrPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: TrimStrPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
TrimStrPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "15.2.1", ngImport: i0, type: TrimStrPipe, name: "trimStr" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: TrimStrPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'trimStr',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJpbS1zdHIucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1zZGstZGFwcC9zcmMvbGliL3BpcGVzL3RyaW1TdHIvdHJpbS1zdHIucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQzs7QUFLcEQsTUFBTSxPQUFPLFdBQVc7SUFDdEIsU0FBUyxDQUFDLEtBQWEsRUFBRSxHQUFHLElBQWU7UUFDekMsT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JELENBQUM7O3dHQUhVLFdBQVc7c0dBQVgsV0FBVzsyRkFBWCxXQUFXO2tCQUh2QixJQUFJO21CQUFDO29CQUNKLElBQUksRUFBRSxTQUFTO2lCQUNoQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQFBpcGUoe1xuICBuYW1lOiAndHJpbVN0cicsXG59KVxuZXhwb3J0IGNsYXNzIFRyaW1TdHJQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIHRyYW5zZm9ybSh2YWx1ZTogc3RyaW5nLCAuLi5hcmdzOiB1bmtub3duW10pOiB1bmtub3duIHtcbiAgICByZXR1cm4gdmFsdWUuc2xpY2UoMCwgNikgKyAnLi4uJyArIHZhbHVlLnNsaWNlKC02KTtcbiAgfVxufVxuIl19