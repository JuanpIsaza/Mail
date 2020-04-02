import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterSearch'
})
export class FilterSearchPipe implements PipeTransform {
  transform(data: object[], ...args: string[]): unknown {
    if (data) {
      return data.filter(item =>
        item[`${args[1]}`].toLowerCase().includes(`${args[0]}`.toLowerCase())
      );
    }
  }
}
