import { InitialStateUser } from './../core/models/user.models';
import { ActionReducerMap } from '@ngrx/store';
import { InitialStateLogin } from '../core/models/auth.models';
import { loginReducer } from './reducers/login.reducers';
import { userReducer } from './reducers/user.reducers';

export interface AppState {
  login: InitialStateLogin;
  user: InitialStateUser;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  login: loginReducer,
  user: userReducer,
};
