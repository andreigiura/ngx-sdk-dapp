import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trimStr',
})
export class TrimStrPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    return value.slice(0, 6) + '...' + value.slice(-6);
  }
}
