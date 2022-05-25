import { AppState } from './../../../state/app.state';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, distinctUntilChanged, mergeMap } from 'rxjs';
import { CartItem } from 'src/app/core/models/cart.model';
import { User } from 'src/app/core/models/user.models';
import { CartService } from 'src/app/core/services/cart/cart.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { ProductService } from 'src/app/core/services/product/product.service';
import { selectFeatureUser } from 'src/app/state/selectors/user.selectors';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public isSearching = false;
  public isMouseOver = false;
  public user: User;
  public productQuantity: number;
  public cartItems: CartItem[] = [];
  public searchForm: FormGroup;

  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;

  public visabilityNavBar(): boolean {
    if (window.screen.width < 768) {
      return true;
    }

    return this.isSearching;
  }

  constructor(
    private readonly authService: AuthService,
    public readonly cartService: CartService,
    private readonly productService: ProductService,
    private readonly toastr: ToastrService,
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.serachProduct();
    this.watchCart();
  }

  private watchCart(): void {
    this.cartService.subscriptionCart().subscribe({
      next: (cart) => {
        this.productQuantity = cart?.items.length ?? 0;
        this.cartItems = cart?.items ?? [];
      },
      error: (err) => {
        this.toastr.error('Error al cargar el carrito', 'ERROR');
      },
    });
  }

  private getUser(): void {
    this.store.select(selectFeatureUser).subscribe((user) => {
      this.user = user;
    });
  }

  public serachProduct(): void {
    this.searchForm = new FormGroup({
      search: new FormControl(''),
    });

    this.searchForm.controls['search'].valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        mergeMap((value) => this.productService.getProductsByName(value))
      )
      .subscribe((res) => {
        this.productService.searchProductResult$.next(res.products);
        this.router.navigate(['/dashboard/products/page/1']);
      });
  }

  public logOut(): void {
    this.authService.logOut();
    this.cartService.clearCart();
    this.router.navigate(['/login']);
  }
}
