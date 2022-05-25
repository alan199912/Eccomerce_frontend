import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/core/models/product.models';

@Component({
  selector: 'app-most-popular-products',
  templateUrl: './most-popular-products.component.html',
  styleUrls: ['./most-popular-products.component.scss'],
})
export class MostPopularProductsComponent implements OnInit {
  @Input() public mostPopularProducts: Product[] = [];

  constructor() {}

  ngOnInit(): void {}
}
