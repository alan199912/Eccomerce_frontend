import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-paginator',
  templateUrl: './product-paginator.component.html',
  styleUrls: ['./product-paginator.component.scss'],
})
export class ProductPaginatorComponent implements OnInit {
  @Input() pagination!: number[];
  @Input() paginationFromUrl = 1;
  @Input() typePage!: string;
  @Input() pageId!: number | string;

  constructor() {}

  ngOnInit(): void {}
}
