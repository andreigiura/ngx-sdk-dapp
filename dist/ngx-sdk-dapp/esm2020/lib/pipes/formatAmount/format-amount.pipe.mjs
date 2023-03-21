import { Pipe } from '@angular/core';
import { formatAmount } from '../../helpers/formatAmount';
import * as i0 from "@angular/core";
export class FormatAmountPipe {
    transform(value, formatOptions = {}) {
        return formatAmount({ ...formatOptions, input: value });
    }
}
FormatAmountPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: FormatAmountPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
FormatAmountPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "15.2.1", ngImport: i0, type: FormatAmountPipe, name: "formatAmount" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: FormatAmountPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'formatAmount',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWF0LWFtb3VudC5waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LXNkay1kYXBwL3NyYy9saWIvcGlwZXMvZm9ybWF0QW1vdW50L2Zvcm1hdC1hbW91bnQucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUNwRCxPQUFPLEVBQUUsWUFBWSxFQUFvQixNQUFNLDRCQUE0QixDQUFDOztBQUs1RSxNQUFNLE9BQU8sZ0JBQWdCO0lBQzNCLFNBQVMsQ0FBQyxLQUFhLEVBQUUsZ0JBQXVDLEVBQUU7UUFDaEUsT0FBTyxZQUFZLENBQUMsRUFBRSxHQUFHLGFBQWEsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUMxRCxDQUFDOzs2R0FIVSxnQkFBZ0I7MkdBQWhCLGdCQUFnQjsyRkFBaEIsZ0JBQWdCO2tCQUg1QixJQUFJO21CQUFDO29CQUNKLElBQUksRUFBRSxjQUFjO2lCQUNyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGZvcm1hdEFtb3VudCwgRm9ybWF0QW1vdW50VHlwZSB9IGZyb20gJy4uLy4uL2hlbHBlcnMvZm9ybWF0QW1vdW50JztcblxuQFBpcGUoe1xuICBuYW1lOiAnZm9ybWF0QW1vdW50Jyxcbn0pXG5leHBvcnQgY2xhc3MgRm9ybWF0QW1vdW50UGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICB0cmFuc2Zvcm0odmFsdWU6IHN0cmluZywgZm9ybWF0T3B0aW9uczogRm9ybWF0QW1vdW50VHlwZSB8IHt9ID0ge30pOiB1bmtub3duIHtcbiAgICByZXR1cm4gZm9ybWF0QW1vdW50KHsgLi4uZm9ybWF0T3B0aW9ucywgaW5wdXQ6IHZhbHVlIH0pO1xuICB9XG59XG4iXX0=