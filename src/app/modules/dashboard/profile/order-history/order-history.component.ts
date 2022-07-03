import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order/order.service';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/core/models/order.modules';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { selectFeatureUser } from 'src/app/state/selectors/user.selectors';
import { User } from 'src/app/core/models/user.models';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss'],
})
export class OrderHistoryComponent implements OnInit {
  public orders: Order[] = [];
  private user!: User;

  constructor(
    private readonly orderService: OrderService,
    private readonly toastr: ToastrService,
    private readonly store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.getOrdersByUserId();
  }

  private getOrdersByUserId(): void {
    this.orderService.getOrdersByUserId(this.user.id).subscribe({
      next: (res) => {
        this.orders = res.orders;
      },
      error: (err) => this.toastr.error('Ha ocurrido un error. Intente más tarde', 'ERROR'),
    });
  }

  private getUser(): void {
    this.store.select(selectFeatureUser).subscribe((user) => {
      this.user = user;
    });
  }
}
