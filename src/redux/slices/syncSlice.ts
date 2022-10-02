import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getHerdByTeamId } from './herdsSlice';

export type SyncState = {
  loadingTasks: string,
};

const initialState: SyncState = {
  loadingTasks: '',
};

export const loadTeamData = createAsyncThunk(
  'sync/loadTeamData',
  async (teamId: string, { dispatch }) => {
    const loadMessage = 'Loading Census Data...';
    try {
      dispatch(startLoading(loadMessage));
      await dispatch(getHerdByTeamId({ teamId }));
      dispatch(stopLoading(loadMessage));
    } catch (err) {
      console.error(err);
      alert('Error while loading team data: ' + err);
      dispatch(stopLoading(loadMessage));
      throw err;
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
      // state.loadingTasks.add(action.payload);
      return state;
    },
    stopLoading: (
      state,
      action: { payload: string } = { payload: 'Loading...' },
    ) => {
      // state.loadingTasks.delete(action.payload);
      return state;
    },
  },
});

export const { resetData, startLoading, stopLoading } = syncSlice.actions;

export default syncSlice.reducer;
