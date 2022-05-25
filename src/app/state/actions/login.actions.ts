import { ResponseAuth, UserLogin } from './../../core/models/auth.models';
import { createAction, props } from '@ngrx/store';

export const LOAD_LOGIN = '[Login] Load Login';
export const LOGIN_SUCCESS = '[Login] Login Success';
export const LOGIN_FAILURE = '[Login] Login Failure';

export const loadLogin = createAction(LOAD_LOGIN, props<UserLogin>());

export const loginSuccess = createAction(LOGIN_SUCCESS, props<ResponseAuth>());

export const loginFailure = createAction(LOGIN_FAILURE);
