import { createSelector } from '@ngrx/store';
import { InitialStateUser } from 'src/app/core/models/user.models';
import { AppState } from '../app.state';

export const selectUserFeature = (state: AppState) => state.user;

export const selectFeatureUserLoading = createSelector(
  selectUserFeature,
  (state: InitialStateUser) => state.isLoading
);

export const selectFeatureUser = createSelector(
  selectUserFeature,
  (state: InitialStateUser) => state.user
);
