import { BodySetOrder } from 'src/app/core/models/order.modules';
import { CartService } from './../../../../core/services/cart/cart.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order/order.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.scss'],
})
export class CheckoutFormComponent implements OnInit {
  public paymentCard = true;
  public paymentPaypal = false;
  public order: BodySetOrder;

  constructor(
    private readonly orderService: OrderService,
    public readonly cartService: CartService,
    private readonly router: Router,
    private readonly toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.orderService.order$.subscribe((res) => {
      this.order = res;
      console.log(this.order);
    });
  }

  public orderPayment(): void {
    if (this.paymentCard === this.paymentPaypal) return;

    const order = {
      ...this.order,
      isCard: this.paymentCard,
      isPaypal: this.paymentPaypal,
    };

    //todo: add STRIPE
    this.orderService.setOrder(order).subscribe({
      next: (res) => {
        window.location.href = res.link;
        this.cartService.clearCart();
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('Error al crear el pedido', 'ERROR');
      },
    });
  }

  public changePaymentCard(event): void {
    this.paymentCard = !!event.value;
    this.paymentPaypal = !this.paymentCard;
  }

  public changePaymentPaypal(event): void {
    this.paymentPaypal = !!event.value;
    this.paymentCard = !this.paymentPaypal;
  }

  public goBack(): void {
    this.orderService.order$.next(null);
    this.router.navigate(['/dashboard/cart']);
  }
}
