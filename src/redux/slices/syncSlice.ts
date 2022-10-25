import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'redux/util';
import { getHerdByTeamId } from './herdsSlice';
import { ICowCensus, ICreateCowCensusRequest } from './cowCensusSlice';
import { SERVER_URL } from '../../utils/constants.js';
import axios from 'axios';

export type SyncState = {
  loadingTasks: Set<string>,
};

interface SyncData {
  upserted: {
    cowCensusRequests: ICreateCowCensusRequest[],
  };
}

interface SyncResponse {
  cowCensuses: ICowCensus[],
}

const initialState: SyncState = {
  loadingTasks: new Set([]),
};

export const uploadCensusData = createAsyncThunk(
  'sync/uploadCensusData',
  async (_params, { getState, dispatch }) => {
    const loadMessage = 'Uploading New Census Data...';
    dispatch(startLoading(loadMessage));
    const appState = getState() as RootState;
    
    const cowCensusRequests: ICreateCowCensusRequest[] = [];
    appState.cowCensuses.drafts.forEach((draft: ICreateCowCensusRequest) => {
      cowCensusRequests.push(draft);
    });

    const syncData: SyncData = {
      upserted: { cowCensusRequests },
    };

    return axios
      .post<SyncData, { data: SyncResponse }>(`${SERVER_URL}sync/`, syncData)
      .then(async (response) => {
        dispatch(stopLoading(loadMessage));
        return response.data;
      })
      .catch((err) => {
        dispatch(stopLoading(loadMessage));
        alert(
          'An error occurred while syncing your data: ' +
            err?.message +
            '. Once new data is loaded check your censuses and re-census any missing entries.',
        );
        throw err;
      });

  },
);

export const syncSlice = createSlice({
  name: 'sync',
  initialState,
  reducers: {
    resetData: () => {

    },
    startLoading: (
      state,
      action: { payload: string } = { payload: 'Loading...' },
    ) => {
      state.loadingTasks.add(action.payload);
      return state;
    },
    stopLoading: (
      state,
      action: { payload: string } = { payload: 'Loading...' },
    ) => {
      state.loadingTasks.delete(action.payload);
      return state;
    },
  },
});

export const { resetData, startLoading, stopLoading } = syncSlice.actions;

export default syncSlice.reducer;
