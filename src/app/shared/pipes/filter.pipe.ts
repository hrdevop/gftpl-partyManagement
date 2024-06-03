import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false,
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchTerm: string, key?: string): any[] {
    if (!items || !searchTerm) {
      return items;
    }

    searchTerm = searchTerm.toLowerCase();

    let filteredItems = [];
    for (let i = 0; i < items.length; i++) {
      let item = items[i];
      let itemKeyValue = key ? item[key] : JSON.stringify(item);
      if (itemKeyValue.toLowerCase().includes(searchTerm)) {
        filteredItems.push(item);
      }
    }
    return filteredItems;
  }
}
