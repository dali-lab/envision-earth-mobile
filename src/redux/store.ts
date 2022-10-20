import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import connectionReducer from './slices/connectionSlice';
import authReducer from './slices/authSlice';
import resourcesReducer from './slices/resourcesSlice';
import usersReducer from './slices/usersSlice';
import teamsReducer from './slices/teamsSlice';
import syncReducer from './slices/syncSlice';
import herdReducer from './slices/herdsSlice';
import plotReducer from './slices/plotsSlice';
import cowCensusReducer from './slices/cowCensusSlice';
import dungCensusReducer from './slices/dungCensusSlice';
import forageQualityCensusReducer from './slices/forageQualityCensusSlice';

export const store = configureStore({
  reducer: {
    connection: connectionReducer,
    auth: authReducer,
    resources: resourcesReducer,
    users: usersReducer,
    sync: syncReducer,
    teams: teamsReducer,
    herds: herdReducer,
    plots: plotReducer,
    cowCensuses: cowCensusReducer,
    dungCensuses: dungCensusReducer,
    forageQuality: forageQualityCensusReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>;
