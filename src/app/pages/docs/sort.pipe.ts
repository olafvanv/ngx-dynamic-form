import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
  standalone: true
})
export class SortPipe implements PipeTransform {
  transform(array: any[] | null, property: string): any[] {
    if (!array || !property) {
      return array || [];
    }

    return [...array].sort((a, b) => {
      const valA = a[property];
      const valB = b[property];

      if (typeof valA === 'string' && typeof valB === 'string') {
        return valA.localeCompare(valB);
      }

      return valA > valB ? 1 : valA < valB ? -1 : 0;
    });
  }
}
