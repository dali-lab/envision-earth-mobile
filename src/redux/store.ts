import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import connectionReducer from './slices/connectionSlice';
import authReducer from './slices/authSlice';
import resourcesReducer from './slices/resourcesSlice';
import usersReducer from './slices/usersSlice';
import teamsReducer from './slices/teamsSlice';
import syncReducer from './slices/syncSlice';


export const store = configureStore({
  reducer: {
    connection: connectionReducer,
    auth: authReducer,
    resources: resourcesReducer,
    users: usersReducer,
    teams: teamsReducer,
    sync: syncReducer,
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
