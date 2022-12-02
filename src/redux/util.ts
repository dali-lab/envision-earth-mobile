import {
  AsyncThunkPayloadCreator,
  AsyncThunkOptions,
  AsyncThunk,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import { ConnectionState } from './slices/connectionSlice';
import { AuthState } from './slices/authSlice';
import { ResourceState } from './slices/resourcesSlice';
import { UserState } from './slices/usersSlice';
import { TeamState } from './slices/teamsSlice';
import { SyncState } from './slices/syncSlice';
import { HerdState } from './slices/herdsSlice';
import { PlotsState } from './slices/plotsSlice';
import { CowCensusState } from './slices/cowCensusSlice';
import { DungCensusState } from './slices/dungCensusSlice';
import { ForageQualityCensusState } from './slices/forageQualityCensusSlice';
import { ForageQuantityCensusState } from './slices/forageQuantityCensusSlice';

export type RootState = {
  connection: ConnectionState,
  auth: AuthState,
  resources: ResourceState,
  users: UserState,
  sync: SyncState,
  teams: TeamState,
  herds: HerdState,
  plots: PlotsState,
  cowCensuses: CowCensusState,
  dungCensuses: DungCensusState,
  forageQuality: ForageQualityCensusState,
  forageQuantity: ForageQuantityCensusState,
};
