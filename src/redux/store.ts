import { AnyAction, configureStore, combineReducers } from '@reduxjs/toolkit';
import forageQualityCensusReducer from './slices/forageQualityCensusSlice';
import { RootState } from './util';
import { persistStore, persistReducer, createTransform } from 'redux-persist';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import ExpoFileSystemStorage from 'redux-persist-expo-filesystem';
import connectionReducer, { ConnectionState } from './slices/connectionSlice';
import authReducer from './slices/authSlice';
import resourcesReducer from './slices/resourcesSlice';
import usersReducer, { UserScopes } from './slices/usersSlice';
import teamsReducer from './slices/teamsSlice';
import syncReducer from './slices/syncSlice';
import herdReducer from './slices/herdsSlice';
import plotReducer from './slices/plotsSlice';
import cowCensusReducer from './slices/cowCensusSlice';
import dungCensusReducer from './slices/dungCensusSlice';

const reducers = { 
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
};

// Combine reducers from slices here, so that it can be passed to Redux Persist
const rootReducer = combineReducers<RootState>(reducers);

const NonPersistedTransformer = createTransform(
  (inboundState: RootState[keyof RootState]) => {
    if ('isConnected' in inboundState) {
      return { ...inboundState, isConnected: false };
    } else if ('authenticated' in inboundState) {
      return {
        ...inboundState, 
        authenticated: false,
        loading: false,
        id: '',
        email: '',
        name: '',
        role: UserScopes.Unverified,
      };
    }
    return inboundState;
  },
  (outboundState) => outboundState,
);

export const persistConfig = {
  key: 'root',
  version: 0,
  storage: ExpoFileSystemStorage,
  stateReconciler: hardSet,
  debug: true,
  transforms: [
    NonPersistedTransformer,
  ],
};

const persistedReducer = persistReducer<RootState, AnyAction>(
  persistConfig,
  rootReducer,
);

export const store = configureStore({
  // reducer: rootReducer,
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false, immutableCheck: false }),
});

export const persistor = persistStore(store, {});

export type AppDispatch = typeof store.dispatch;

/*
export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>;  
*/

// Note: "redux-persist: rehydrate for "root" called after timeout."
// error is just because of React Native Debugger
// https://stackoverflow.com/questions/70815562/why-is-my-useeffect-not-running-on-first-render