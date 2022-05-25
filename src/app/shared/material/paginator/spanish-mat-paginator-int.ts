import { MatPaginatorIntl } from '@angular/material/paginator';
import { Injectable } from '@angular/core';

@Injectable()
export class SpanishMatPaginatorIntl extends MatPaginatorIntl {
  public separator: string;
  public getRangeLabel: (page: number, pageSize: number, length: number) => string;

  constructor() {
    super();
    this.getAndInitTranslations();
    this.getRangeLabel = (page: number, pageSize: number, length: number): string => {
      if (length === 0 || pageSize === 0) {
        return `0 ${this.separator} ${length}`;
      }
      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
      return `${startIndex + 1} - ${endIndex} ${this.separator} ${length}`;
    };
  }

  public getAndInitTranslations(): void {
    this.itemsPerPageLabel = 'Items por página';
    this.nextPageLabel = 'Siguiente';
    this.previousPageLabel = 'Anterior';
    this.firstPageLabel = 'Primera página';
    this.lastPageLabel = 'Última página';
    this.separator = 'de';
    this.changes.next();
  }
}
