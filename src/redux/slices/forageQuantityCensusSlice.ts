import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { SERVER_URL } from '../../utils/constants.js';
import axios from 'axios';

export interface IForageQuantityCensus {
  id: string;
  plotId: string;
  photoId: string | null;
  sda: number;
  notes: string;
  createdAt: Date,
  updatedAt: Date,
}

interface IPhotoInput {
  uri: string,
  fileName: string,
  buffer: string, // base64
}

export interface ICreateForageQuantityCensusRequest {
  plotId: string;
  rating: number,
  notes: string;
  photo?: IPhotoInput;
}

export interface ForageQuantityCensusState {
  loading: boolean
  all: Record<string, IForageQuantityCensus>
  byPlot: Record<string, IForageQuantityCensus[]>
  drafts: ICreateForageQuantityCensusRequest[],
}

const initialState: ForageQuantityCensusState = {
  loading: false,
  all: {},
  byPlot: {},
  drafts: [],
};

export const getForageQuantityCensusesByPlotId = createAsyncThunk(
  'forageQuantityCensuses/getAllForageQuantityCensuses',
  async (req: { plotId: string }, { dispatch }) => {
    dispatch(startForageQuantityCensusLoading());
    return axios
      .get<IForageQuantityCensus[]>(`${SERVER_URL}forage_quantity_censuses/?plotId=${req.plotId}`)
      .finally(() => dispatch(stopForageQuantityCensusLoading()))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error('Error when getting all forageQuantityCensuses', error);
        return false;
      });
  },
);

export const createForageQuantityCensus = createAsyncThunk(
  'forageQuantityCensuses/createForageQuantityCensus',
  async (req: ICreateForageQuantityCensusRequest, { dispatch }) => {
    dispatch(startForageQuantityCensusLoading());
    return axios
      .post(`${SERVER_URL}forage_quantity_censuses/`, req)
      .finally(() => dispatch(stopForageQuantityCensusLoading()))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error('Error when creating forageQuantityCensus', error);
        return false;
      });
  },
);

export const getForageQuantityCensus = createAsyncThunk(
  'forageQuantityCensuses/getForageQuantityCensus',
  async (id: string, { dispatch }) => {
    dispatch(startForageQuantityCensusLoading());
    return axios
      .get(`${SERVER_URL}forage_quantity_censuses/${id}`)
      .finally(() => dispatch(stopForageQuantityCensusLoading()))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error('Error when getting forageQuantityCensus', error);
        return false;
      });
  },
);

export const updateForageQuantityCensus = createAsyncThunk(
  'forageQuantityCensuses/updateForageQuantityCensus',
  async (req: IForageQuantityCensus, { dispatch }) => {
    dispatch(startForageQuantityCensusLoading());
    return axios
      .patch(`${SERVER_URL}forage_quantity_censuses/${req.id}`, req)
      .finally(() => dispatch(stopForageQuantityCensusLoading()))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error('Error when getting forageQuantityCensus', error);
        return false;
      });
  },
);

export const deleteForageQuantityCensus = createAsyncThunk(
  'forageQuantityCensuses/deleteForageQuantityCensus',
  async (req: { id: string }, { dispatch }) => {
    dispatch(startForageQuantityCensusLoading());
    return axios
      .delete(`${SERVER_URL}forage_quantity_censuses/${req.id}`)
      .finally(() => dispatch(stopForageQuantityCensusLoading()))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error('Error when getting forageQuantityCensus', error);
        return false;
      });
  },
);

export const forageQuantityCensusSlice = createSlice({
  name: 'forageQuantityCensuses',
  initialState,
  reducers: {
    locallyCreateForageQuantityCensus: (state, action) => {
      state.drafts.push(action.payload);
    },
    clearForageQuantityCensusDrafts: (state) => {
      state.drafts = [];
    },
    startForageQuantityCensusLoading: (state) => ({ ...state, loading: true }),
    stopForageQuantityCensusLoading: (state) => ({ ...state, loading: false }),
  },
  extraReducers: (builder) => {
    builder.addCase(getForageQuantityCensusesByPlotId.fulfilled, (state, action) => {
      const forageQuantityCensuses: IForageQuantityCensus[] = action.payload as IForageQuantityCensus[];
      forageQuantityCensuses.forEach((forageQuantityCensus: IForageQuantityCensus) => {
        state.all[forageQuantityCensus.id] = forageQuantityCensus;
        if (!state.byPlot[forageQuantityCensus.plotId]) {
          state.byPlot[forageQuantityCensus.plotId] = [];
        }
        state.byPlot[forageQuantityCensus.plotId].push(forageQuantityCensus);
      });
      Object.keys(state.byPlot).forEach((plotId: string) => {
        state.byPlot[plotId] = state.byPlot[plotId].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
      });
    });
    builder.addCase(createForageQuantityCensus.fulfilled, (state, action) => {
      const forageQuantityCensus: IForageQuantityCensus = action.payload as IForageQuantityCensus;
      state.all[forageQuantityCensus.id] = forageQuantityCensus;
      if (!state.byPlot[forageQuantityCensus.plotId]) {
        state.byPlot[forageQuantityCensus.plotId] = [];
      }
      state.byPlot[forageQuantityCensus.plotId].push(forageQuantityCensus);
      state.byPlot[forageQuantityCensus.plotId] = state.byPlot[forageQuantityCensus.plotId].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
      alert('Created forageQuantityCensus!');
    });
    builder.addCase(getForageQuantityCensus.fulfilled, (state, action) => {
      const forageQuantityCensus: IForageQuantityCensus = action.payload as IForageQuantityCensus;
      state.all[forageQuantityCensus.id] = forageQuantityCensus;
      if (!state.byPlot[forageQuantityCensus.plotId]) {
        state.byPlot[forageQuantityCensus.plotId] = [];
      }
      state.byPlot[forageQuantityCensus.plotId].push(forageQuantityCensus);
      state.byPlot[forageQuantityCensus.plotId] = state.byPlot[forageQuantityCensus.plotId].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
      alert('Retrieved forageQuantityCensus!');
    });
    builder.addCase(updateForageQuantityCensus.fulfilled, (state, action) => {
      const forageQuantityCensus: IForageQuantityCensus = action.payload as IForageQuantityCensus;
      state.all[forageQuantityCensus.id] = forageQuantityCensus;
      if (!state.byPlot[forageQuantityCensus.plotId]) {
        state.byPlot[forageQuantityCensus.plotId] = [];
      }
      state.byPlot[forageQuantityCensus.plotId].push(forageQuantityCensus);
      state.byPlot[forageQuantityCensus.plotId] = state.byPlot[forageQuantityCensus.plotId].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
      alert('Updated forageQuantityCensus!');
    });
    builder.addCase(deleteForageQuantityCensus.fulfilled, (state, action) => {
      const forageQuantityCensus: IForageQuantityCensus = action.payload as IForageQuantityCensus;
      delete state.all[forageQuantityCensus.id];
      // TODO: Splice from byPlot
      alert('Deleted forageQuantityCensus!');
    });
  },
});

export const { 
  locallyCreateForageQuantityCensus,
  clearForageQuantityCensusDrafts,
  startForageQuantityCensusLoading, 
  stopForageQuantityCensusLoading,
} = forageQuantityCensusSlice.actions;

export default forageQuantityCensusSlice.reducer;
