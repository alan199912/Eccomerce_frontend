import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/core/models/order.modules';
import { OrderService } from '../../dashboard/services/order/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  public orders: Order[] = [];
  public isLoading = false;
  public columns: string[] = [];

  constructor(private readonly orderService: OrderService) {}

  ngOnInit(): void {
    this.getProductList();
  }

  private getProductList(): void {
    this.isLoading = true;
    this.orderService.getOrdersList().subscribe({
      next: (res) => {
        console.log(res);
        if (!res || res.length === 0) {
          this.isLoading = false;
          return;
        }

        this.orders = res;
        this.orders = this.orders.map((category) => {
          return {
            ...category,
            createdAt: new Date(category.createdAt).toLocaleDateString(),
            updatedAt: new Date(category.updatedAt).toLocaleDateString(),
            deletedAt: category.deletedAt && new Date(category.deletedAt).toLocaleDateString(),
          };
        });
        this.columns = Object.keys(this.orders[0]);
        this.columns = this.columns.filter((column) => column !== 'User' && column !== 'OrderItems');
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }

  public deleteOrder(event) {}
  public restoreOrder(event) {}
}
