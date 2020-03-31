import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterFavorites'
})
export class FilterFavoritesPipe implements PipeTransform {
  transform(value: object[], ...args: unknown[]): unknown {
    if (value) {
      return value.filter((item: any) => item.favorite === args[0]);
    }
  }
}
