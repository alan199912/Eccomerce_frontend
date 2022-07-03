import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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

  constructor(private readonly orderService: OrderService, private readonly toastr: ToastrService) {}

  ngOnInit(): void {
    this.getOrderList();
  }

  private getOrderList(): void {
    this.isLoading = true;
    this.orderService.getOrdersList().subscribe({
      next: (res) => {
        if (!res || res.length === 0) {
          this.isLoading = false;
          return;
        }

        this.orders = res;
        this.orders = this.orders.map((order) => {
          return {
            ...order,
            createdAt: new Date(order.createdAt).toLocaleDateString(),
            updatedAt: new Date(order.updatedAt).toLocaleDateString(),
            deletedAt: order.deletedAt && new Date(order.deletedAt).toLocaleDateString(),
          };
        });
        this.columns = Object.keys(this.orders[0]);
        this.columns = this.columns.filter((column) => column !== 'User' && column !== 'OrderItems');
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('Ha ocurrido un error al cargar las ordenes. Intente mas tarde', 'Error');
        this.isLoading = false;
      },
    });
  }

  public deleteOrder(id: string): void {
    this.isLoading = true;
    this.orderService.deleteOrder(id).subscribe({
      next: () => {
        this.toastr.success('La orden se elimino correctamente', 'Eliminado');
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('No se pudo eliminar la order. Intente mas tarde', 'Error');
        this.isLoading = false;
      },
      complete: () => this.getOrderList(),
    });
  }

  public restoreOrder(id: string): void {
    this.isLoading = true;
    this.orderService.restoreOrder(id).subscribe({
      next: () => {
        this.toastr.success('La order se restauro correctamente', 'Restaurado');
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('No se pudo restaurar la order. Intente mas tarde', 'Error');
        this.isLoading = false;
      },
      complete: () => this.getOrderList(),
    });
  }
}
