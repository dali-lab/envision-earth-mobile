import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { SERVER_URL } from '../../utils/constants.js';
import axios from 'axios';

export interface IHerd {
  id: string;
  teamId: string;
  breed: string;
  count: number,
  breedingDate: Date,
  calvingDate: Date,
}

export interface HerdState {
  loading: boolean
  selectedHerd: IHerd | undefined
}

const initialState: HerdState = {
  loading: false,
  selectedHerd: undefined,
};

export const createHerd = createAsyncThunk(
  'herds/createHerd',
  async (req: { name: string }, { dispatch }) => {
    dispatch(startHerdsLoading());
    return axios
      .post(`${SERVER_URL}herds/`, req)
      .finally(() => dispatch(stopHerdsLoading()))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error('Error when creating herd', error);
        return false;
      });
  },
);

export const getHerd = createAsyncThunk(
  'herds/getHerd',
  async (req: { id: string }, { dispatch }) => {
    dispatch(startHerdsLoading());
    return axios
      .get(`${SERVER_URL}herds/?id=${req.id}`)
      .finally(() => dispatch(stopHerdsLoading()))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error('Error when getting herd', error);
        return false;
      });
  },
);

export const getHerdByTeamId = createAsyncThunk(
  'herds/getHerdByTeamId',
  async (req: { teamId: string }, { dispatch }) => {
    dispatch(startHerdsLoading());
    return axios
      .get(`${SERVER_URL}herds/?teamId=${req.teamId}`)
      .finally(() => dispatch(stopHerdsLoading()))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error('Error when getting herd by teamId', error);
        return false;
      });
  },
);

export const updateHerd = createAsyncThunk(
  'herds/updateHerd',
  async (req: { id: string, name: string, }, { dispatch }) => {
    dispatch(startHerdsLoading());
    return axios
      .patch(`${SERVER_URL}herds/${req.id}`, req)
      .finally(() => dispatch(stopHerdsLoading()))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error('Error when updating herd', error);
        return false;
      });
  },
);

export const deleteHerd = createAsyncThunk(
  'herds/deleteHerd',
  async (req: { id: string }, { dispatch }) => {
    dispatch(startHerdsLoading());
    return axios
      .delete(`${SERVER_URL}herds/${req.id}`)
      .finally(() => dispatch(stopHerdsLoading()))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error('Error when deleting herd', error);
        return false;
      });
  },
);

export const herdSlice = createSlice({
  name: 'herds',
  initialState,
  reducers: {
    startHerdsLoading: (state) => ({ ...state, loading: true }),
    stopHerdsLoading: (state) => ({ ...state, loading: false }),
  },
  extraReducers: (builder) => {
    builder.addCase(createHerd.fulfilled, (state, action) => {
      state.selectedHerd = action.payload as IHerd;
      alert('Created herd!');
    });
    builder.addCase(getHerd.fulfilled, (state, action) => {
      state.selectedHerd = action.payload as IHerd;
      alert('Retrieved herd!');
    });
    builder.addCase(getHerdByTeamId.fulfilled, (state, action) => {
      state.selectedHerd = action.payload as IHerd;
      // alert('Retrieved herd as: ' + JSON.stringify(action.payload));
    });
    builder.addCase(updateHerd.fulfilled, (state, action) => {
      state.selectedHerd = action.payload as IHerd;
      alert('Updated herd!');
    });
    builder.addCase(deleteHerd.fulfilled, (state, action) => {
      const herd: IHerd = action.payload as IHerd;
      state.selectedHerd = undefined;
      alert('Deleted herd!');
    });
  },
});

export const { startHerdsLoading, stopHerdsLoading } =
  herdSlice.actions;

export default herdSlice.reducer;
