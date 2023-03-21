import { Pipe, PipeTransform } from '@angular/core';
import { parseAmount } from '../../helpers';

@Pipe({
  name: 'parseAmount',
})
export class ParseAmountPipe implements PipeTransform {
  transform(value: string, decimals?: number): string {
    return parseAmount(value, decimals);
  }
}
