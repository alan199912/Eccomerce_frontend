import { mergeMap, catchError, throwError } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { OrderService } from '../../services/order/order.service';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/core/models/order.modules';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss'],
})
export class OrderHistoryComponent implements OnInit {
  public orders: Order[];

  constructor(
    private readonly orderService: OrderService,
    private readonly authService: AuthService,
    private readonly toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getOrdersByUserId();
  }

  private getOrdersByUserId(): void {
    this.authService
      .getIdByToken()
      .pipe(
        mergeMap((id: number) => {
          return this.orderService.getOrdersByUserId(id);
        }),
        catchError((error) => throwError(() => this.toastr.warning('Usuario no logueado', 'ERROR')))
      )
      .subscribe({
        next: (res: any) => {
          this.orders = res.orders;
          console.log(res.orders);

          res.orders.forEach((o) => {
            console.log(o.OrderItems);
          });
        },
        error: (err) => {
          this.toastr.error('Ha ocurrido un error. Intente más tarde', 'ERROR');
        },
      });
  }
}
