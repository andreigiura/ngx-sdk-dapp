import { Pipe, PipeTransform } from '@angular/core';
import { formatAmount, FormatAmountType } from '../../helpers/formatAmount';

@Pipe({
  name: 'formatAmount',
})
export class FormatAmountPipe implements PipeTransform {
  transform(value: string, formatOptions: FormatAmountType | {} = {}): unknown {
    return formatAmount({ ...formatOptions, input: value });
  }
}
