import { createSelector } from '@ngrx/store';
import { InitialStateLogin } from 'src/app/core/models/auth.models';
import { AppState } from '../app.state';

export const selectLoginFeature = (state: AppState) => state.login;

export const selectFeatureLoginToken = createSelector(
  selectLoginFeature,
  (state: InitialStateLogin) => state.token
);

export const selectFeatureLoginLoading = createSelector(
  selectLoginFeature,
  (state: InitialStateLogin) => state.isLoading
);
