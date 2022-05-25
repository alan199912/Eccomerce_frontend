import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/core/models/product.models';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit {
  @Input() public latestProducts: Product[] = [];

  constructor() {}

  ngOnInit(): void {}
}
