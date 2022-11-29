import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'redux/util';
import { SERVER_URL } from '../../utils/constants.js';
import { getTeamByUserId, ITeam } from './teamsSlice';
import { getPlotsByTeamId, IPlot } from './plotsSlice';
import { getHerdByTeamId, IHerd } from './herdsSlice';
import { clearCowCensusDrafts, ICowCensus, ICreateCowCensusRequest, getCowCensusesByHerdId } from './cowCensusSlice';
import { getDungCensusesByHerdId, IDungCensus } from './dungCensusSlice';
import { getForageQualityCensusesByPlotId } from './forageQualityCensusSlice';
import { getForageQuantityCensusesByPlotId } from './forageQuantityCensusSlice';
import axios from 'axios';

export type SyncState = {
  loadingTasks: Set<string>,
  isDataLoaded: boolean,
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
  isDataLoaded: false,
};

export const uploadCensusData = createAsyncThunk(
  'sync/uploadCensusData',
  async (params, { getState, dispatch }) => {
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
        dispatch(clearCowCensusDrafts());
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

export const loadData = createAsyncThunk(
  'sync/loadData',
  async (userId: string, { dispatch }) => {
    try {
      const selectedTeam: ITeam = await (await dispatch(getTeamByUserId({ userId }))).payload;
      const selectedHerd: IHerd = await (await dispatch(getHerdByTeamId({ teamId: selectedTeam.id }))).payload;
      await dispatch(getCowCensusesByHerdId({ herdId: selectedHerd.id }));
      await dispatch(getDungCensusesByHerdId({ herdId: selectedHerd.id }));
      const plots: IPlot[] = await (await dispatch(getPlotsByTeamId({ teamId: selectedTeam.id }))).payload as IPlot[];
      for (const plot of plots) {
        await dispatch(getForageQualityCensusesByPlotId({ plotId: plot.id }));
        await dispatch(getForageQuantityCensusesByPlotId({ plotId: plot.id }));
      }
      return true;
    } catch (e) {
      console.error(e);
      alert('Error while loading census data:');
      throw e;
    }
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
  extraReducers: (builder) => {
    builder.addCase(loadData.fulfilled, (state) => {
      state.isDataLoaded = true;
    });
  },
});

export const { resetData, startLoading, stopLoading } = syncSlice.actions;

export default syncSlice.reducer;
