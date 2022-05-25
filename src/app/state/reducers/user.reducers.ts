import { createReducer, on } from '@ngrx/store';
import { InitialStateUser } from 'src/app/core/models/user.models';
import { userFailure, userLoad, userSuccess, userUpdate } from '../actions/user.actions';

export const initialState: InitialStateUser = {
  isLoading: false,
  user: null,
};

export const userReducer = createReducer(
  initialState,
  on(userLoad, (state) => {
    return { ...state, isLoading: true };
  }),
  on(userSuccess, (state, { user }) => {
    return { ...state, user, isLoading: false };
  }),
  on(userFailure, (state) => {
    return { ...state, isLoading: false };
  }),
  on(userUpdate, (state, { user }) => {
    return { ...state, user };
  })
);
