import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { SERVER_URL } from '../../utils/constants.js';
import axios from 'axios';

export interface ICowCensus {
  id: string,
  herdId: string,
  plotId: string;
  photoId: string,
  bcs: number[],
  notes: string,
  tag: string,
  createdAt: Date,
  updatedAt: Date,
}

interface IPhotoInput {
  uri: string,
  fileName: string,
  buffer: string, // base64
}

export interface ICreateCowCensusRequest {
  id?: string;
  plotId: string;
  herdId: string;
  bcs: number[],
  notes: string;
  tag: string;
  photo?: IPhotoInput;
}

export interface CowCensusState {
  loading: boolean
  all: Record<string, ICowCensus>
  indices: {
    byTag: Record<string, ICowCensus> // value => ICowCensus
    latest: ICowCensus | undefined
  },
  drafts: ICreateCowCensusRequest[],
}

const initialState: CowCensusState = {
  loading: false,
  all: {},
  indices: {
    byTag: {},
    latest: undefined,
  },
  drafts: [],
};

export const getCowCensusesByHerdId = createAsyncThunk(
  'cowCensuses/getAllCowCensuses',
  async (req: { herdId: string }, { dispatch }) => {
    dispatch(startCowCensusLoading());
    return axios
      .get<ICowCensus[]>(`${SERVER_URL}cow_censuses/?herdId=${req.herdId}`)
      .finally(() => dispatch(stopCowCensusLoading()))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error('Error when getting all cowCensuses', error);
        return false;
      });
  },
);

export const createCowCensus = createAsyncThunk(
  'cowCensuses/createCowCensus',
  async (req: ICreateCowCensusRequest, { dispatch }) => {
    dispatch(startCowCensusLoading());
    return axios
      .post(`${SERVER_URL}cow_censuses/`, req)
      .finally(() => dispatch(stopCowCensusLoading()))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error('Error when creating cowCensus', error);
        return false;
      });
  },
);

export const getCowCensus = createAsyncThunk(
  'cowCensuses/getCowCensus',
  async (id: string, { dispatch }) => {
    dispatch(startCowCensusLoading());
    return axios
      .get(`${SERVER_URL}cow_censuses/${id}`)
      .finally(() => dispatch(stopCowCensusLoading()))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error('Error when getting cowCensus', error);
        return false;
      });
  },
);

export const updateCowCensus = createAsyncThunk(
  'cowCensuses/updateCowCensus',
  async (req: ICowCensus, { dispatch }) => {
    dispatch(startCowCensusLoading());
    return axios
      .patch(`${SERVER_URL}cow_censuses/${req.id}`, req)
      .finally(() => dispatch(stopCowCensusLoading()))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error('Error when getting cowCensus', error);
        return false;
      });
  },
);

export const deleteCowCensus = createAsyncThunk(
  'cowCensuses/deleteCowCensus',
  async (req: { id: string }, { dispatch }) => {
    dispatch(startCowCensusLoading());
    return axios
      .delete(`${SERVER_URL}cow_censuses/${req.id}`)
      .finally(() => dispatch(stopCowCensusLoading()))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error('Error when getting cowCensus', error);
        return false;
      });
  },
);

export const cowCensusSlice = createSlice({
  name: 'cowCensuses',
  initialState,
  reducers: {
    locallyCreateCowCensus: (state, action) => {
      state.drafts.push(action.payload);
    },
    clearCowCensusDrafts: (state) => {
      state.drafts = [];
    },
    startCowCensusLoading: (state) => ({ ...state, loading: true }),
    stopCowCensusLoading: (state) => ({ ...state, loading: false }),
  },
  extraReducers: (builder) => {
    builder.addCase(getCowCensusesByHerdId.fulfilled, (state, action) => {
      const cowCensuses: ICowCensus[] = action.payload as ICowCensus[];
      cowCensuses.forEach((cowCensus: ICowCensus) => {
        state.all[cowCensus.id] = cowCensus;
        state.indices.byTag[cowCensus.tag] = cowCensus;
      });
      if (cowCensuses.length > 0) {
        state.indices.latest = cowCensuses.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())[0];
      }
    });
    builder.addCase(createCowCensus.fulfilled, (state, action) => {
      const cowCensus: ICowCensus = action.payload as ICowCensus;
      state.all[cowCensus.id] = cowCensus;
      state.indices.byTag[cowCensus.tag] = cowCensus;
      state.indices.latest = cowCensus;
      alert('Created cowCensus!');
    });
    builder.addCase(getCowCensus.fulfilled, (state, action) => {
      const cowCensus: ICowCensus = action.payload as ICowCensus;
      state.all[cowCensus.id] = cowCensus;
      state.indices.byTag[cowCensus.tag] = cowCensus;
      alert('Retrieved cowCensus!');
    });
    builder.addCase(updateCowCensus.fulfilled, (state, action) => {
      const cowCensus: ICowCensus = action.payload as ICowCensus;
      state.all[cowCensus.id] = cowCensus;
      state.indices.byTag[cowCensus.tag] = cowCensus;
      state.indices.latest = cowCensus;
      alert('Updated cowCensus!');
    });
    builder.addCase(deleteCowCensus.fulfilled, (state, action) => {
      const cowCensus: ICowCensus = action.payload as ICowCensus;
      delete state.all[cowCensus.id];
      delete state.indices.byTag[cowCensus.tag];
      if (state.indices.latest && cowCensus.id === state.indices.latest.id) {
        delete state.indices.latest;
        if (Object.values(state.all).length > 0) {
          state.indices.latest = Object.values(state.all).sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())[0];
        }
      }
      alert('Deleted cowCensus!');
    });
  },
});

export const { 
  locallyCreateCowCensus,
  clearCowCensusDrafts,
  startCowCensusLoading, 
  stopCowCensusLoading,
} = cowCensusSlice.actions;

export default cowCensusSlice.reducer;
