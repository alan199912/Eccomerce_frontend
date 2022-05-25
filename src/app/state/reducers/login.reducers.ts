import { loginFailure, loginSuccess } from './../actions/login.actions';
import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import { InitialStateLogin } from 'src/app/core/models/auth.models';
import { loadLogin } from '../actions/login.actions';

export const initialState: InitialStateLogin = {
  isLoading: false,
  token: null,
};

export const loginReducer = createReducer(
  initialState,
  on(loadLogin, (state) => {
    return { ...state, isLoading: true };
  }),
  on(loginSuccess, (state, { token }) => {
    return { ...state, token };
  }),
  on(loginFailure, (state) => {
    return { ...state, isLoading: false };
  })
);
