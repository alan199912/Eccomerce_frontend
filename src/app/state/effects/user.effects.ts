import { USER_LOAD, USER_SUCCESS, USER_FAILURE, USER_UPDATE } from './../actions/user.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { UserService } from 'src/app/core/services/service/user.service';

@Injectable()
export class userEffects {
  user$ = createEffect(() =>
    this.actions$.pipe(
      ofType(USER_LOAD),
      mergeMap(() =>
        this.authService.getIdByToken().pipe(
          mergeMap((id: number) => this.userService.getUserById(id)),
          map((user) => ({ type: USER_SUCCESS, user: user })),
          catchError((error) => {
            this.toastr.error(error, 'ERROR');
            return of({ type: USER_FAILURE });
          })
        )
      )
    )
  );

  userUpdate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(USER_UPDATE),
      mergeMap(({ id, user }) =>
        this.userService.updateUser(id, user).pipe(
          map((res) => {
            this.toastr.success('Usuario actualizado', 'ÉXITO');
            return { type: USER_SUCCESS, user: res.user };
          }),
          catchError((error) => {
            this.toastr.error('Ha ocurrido un error. Intente más tarde', 'ERROR');
            return of({ type: USER_FAILURE });
          })
        )
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly toastr: ToastrService
  ) {}
}
