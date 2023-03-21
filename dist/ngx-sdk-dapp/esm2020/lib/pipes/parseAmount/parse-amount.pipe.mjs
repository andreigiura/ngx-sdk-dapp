import { Pipe } from '@angular/core';
import { parseAmount } from '../../helpers';
import * as i0 from "@angular/core";
export class ParseAmountPipe {
    transform(value, decimals) {
        return parseAmount(value, decimals);
    }
}
ParseAmountPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: ParseAmountPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
ParseAmountPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "15.2.1", ngImport: i0, type: ParseAmountPipe, name: "parseAmount" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: ParseAmountPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'parseAmount',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2UtYW1vdW50LnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtc2RrLWRhcHAvc3JjL2xpYi9waXBlcy9wYXJzZUFtb3VudC9wYXJzZS1hbW91bnQucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUNwRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUs1QyxNQUFNLE9BQU8sZUFBZTtJQUMxQixTQUFTLENBQUMsS0FBYSxFQUFFLFFBQWlCO1FBQ3hDLE9BQU8sV0FBVyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztJQUN0QyxDQUFDOzs0R0FIVSxlQUFlOzBHQUFmLGVBQWU7MkZBQWYsZUFBZTtrQkFIM0IsSUFBSTttQkFBQztvQkFDSixJQUFJLEVBQUUsYUFBYTtpQkFDcEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBwYXJzZUFtb3VudCB9IGZyb20gJy4uLy4uL2hlbHBlcnMnO1xuXG5AUGlwZSh7XG4gIG5hbWU6ICdwYXJzZUFtb3VudCcsXG59KVxuZXhwb3J0IGNsYXNzIFBhcnNlQW1vdW50UGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICB0cmFuc2Zvcm0odmFsdWU6IHN0cmluZywgZGVjaW1hbHM/OiBudW1iZXIpOiBzdHJpbmcge1xuICAgIHJldHVybiBwYXJzZUFtb3VudCh2YWx1ZSwgZGVjaW1hbHMpO1xuICB9XG59XG4iXX0=