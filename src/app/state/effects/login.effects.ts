import { LOAD_LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE } from './../actions/login.actions';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { CartService } from 'src/app/core/services/cart/cart.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Injectable()
export class LoginEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LOAD_LOGIN),
      mergeMap(({ email, password }) =>
        this.authService.login({ email, password }).pipe(
          map((res) => {
            localStorage.setItem('TOKEN', res.token);
            this.cartService.initCart();
            if (res.isAdmin) {
              this.router.navigate(['/admin']);
            } else {
              this.router.navigate(['/dashboard']);
            }
            return { type: LOGIN_SUCCESS, user: res.user, token: res.token };
          }),
          catchError((error) => {
            this.toastr.error(error, 'ERROR');
            return of({ type: LOGIN_FAILURE });
          })
        )
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly authService: AuthService,
    private readonly toastr: ToastrService,
    private readonly router: Router,
    private readonly cartService: CartService
  ) {}
}
