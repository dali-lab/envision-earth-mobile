import { configureStore, combineReducers } from '@reduxjs/toolkit';
import forageQualityCensusReducer from './slices/forageQualityCensusSlice';
import { RootState } from './util';
import { persistStore, persistReducer } from 'redux-persist';
import ExpoFileSystemStorage from 'redux-persist-expo-filesystem';
import connectionReducer from './slices/connectionSlice';
import { getPersistConfig } from 'redux-deep-persist';
import authReducer from './slices/authSlice';
import resourcesReducer from './slices/resourcesSlice';
import usersReducer from './slices/usersSlice';
import teamsReducer from './slices/teamsSlice';
import syncReducer from './slices/syncSlice';
import herdReducer from './slices/herdsSlice';
import plotReducer from './slices/plotsSlice';
import cowCensusReducer from './slices/cowCensusSlice';
import dungCensusReducer from './slices/dungCensusSlice';
import membershipReducer from './slices/membershipSlice';

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
  membersips: membershipReducer,
};

// Combine reducers from slices here, so that it can be passed to Redux Persist
const rootReducer = combineReducers<RootState>(reducers);

export const config = getPersistConfig({
  key: 'root',
  storage: ExpoFileSystemStorage,
  whitelist: [
    'cowCensuses.drafts',
  ],
  rootReducer,
  debug: true,
});

const persistedReducer = persistReducer(
  config,
  rootReducer,
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false, immutableCheck: false }),
});

export const persistor = persistStore(store, {});

export type AppDispatch = typeof store.dispatch;

// Note: "redux-persist: rehydrate for "root" called after timeout."
// error is just because of React Native Debugger
// https://stackoverflow.com/questions/70815562/why-is-my-useeffect-not-running-on-first-render
