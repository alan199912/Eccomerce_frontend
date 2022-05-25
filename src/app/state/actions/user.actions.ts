import { createAction, props } from '@ngrx/store';
import { ResponseUser, User } from 'src/app/core/models/user.models';

export const USER_LOAD = '[User] Load User';
export const USER_SUCCESS = '[User] User Success';
export const USER_FAILURE = '[User] User Failure';
export const USER_UPDATE = '[User] User Update';

export const userLoad = createAction(USER_LOAD);

export const userSuccess = createAction(USER_SUCCESS, props<ResponseUser>());

export const userFailure = createAction(USER_FAILURE);

export const userUpdate = createAction(USER_UPDATE, props<{ id: number; user: User }>());
