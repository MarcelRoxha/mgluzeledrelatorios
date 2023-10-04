import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;

    searchText = searchText.toLowerCase();

    return items.filter(item => {
      return (
        item.categoria.toLowerCase().includes(searchText) ||
        item.cod.toLowerCase().includes(searchText) ||
        item.produto.toLowerCase().includes(searchText) ||
        item.custo.toString().toLowerCase().includes(searchText) ||
        item.fornecedor.toLowerCase().includes(searchText)
      );
    });
  }

}
