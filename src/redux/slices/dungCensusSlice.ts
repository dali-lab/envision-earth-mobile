import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { SERVER_URL } from '../../utils/constants.js';
import axios from 'axios';

export interface IDungCensus {
  id: string,
  herdId: string,
  plotId: string;
  photoId: string,
  ratings: number[],
  notes: string,
  createdAt: Date,
  updatedAt: Date,
}

interface IPhotoInput {
  uri: string,
  fileName: string,
  buffer: string, // base64
}

export interface ICreateDungCensusRequest {
  id?: string;
  plotId: string;
  herdId: string;
  ratings: number[],
  notes: string;
  photo?: IPhotoInput;
}

export interface DungCensusState {
  loading: boolean
  all: Record<string, IDungCensus>
  indices: {
    latest: IDungCensus | undefined
  }
}

const initialState: DungCensusState = {
  loading: false,
  all: {},
  indices: {
    latest: undefined,
  },
};

export const getDungCensusesByHerdId = createAsyncThunk(
  'dungCensuses/getAllDungCensuses',
  async (req: { herdId: string }, { dispatch }) => {
    dispatch(startDungCensusLoading());
    return axios
      .get<IDungCensus[]>(`${SERVER_URL}dung_censuses/?herdId=${req.herdId}`)
      .finally(() => dispatch(stopDungCensusLoading()))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error('Error when getting all dungCensuses', error);
        return false;
      });
  },
);

export const createDungCensus = createAsyncThunk(
  'dungCensuses/createDungCensus',
  async (req: ICreateDungCensusRequest, { dispatch }) => {
    dispatch(startDungCensusLoading());
    return axios
      .post(`${SERVER_URL}dung_censuses/`, req)
      .finally(() => dispatch(stopDungCensusLoading()))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error('Error when creating dungCensus', error);
        return false;
      });
  },
);

export const getDungCensus = createAsyncThunk(
  'dungCensuses/getDungCensus',
  async (id: string, { dispatch }) => {
    dispatch(startDungCensusLoading());
    return axios
      .get(`${SERVER_URL}dung_censuses/${id}`)
      .finally(() => dispatch(stopDungCensusLoading()))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error('Error when getting dungCensus', error);
        return false;
      });
  },
);

export const updateDungCensus = createAsyncThunk(
  'dungCensuses/updateDungCensus',
  async (req: IDungCensus, { dispatch }) => {
    dispatch(startDungCensusLoading());
    return axios
      .patch(`${SERVER_URL}dung_censuses/${req.id}`, req)
      .finally(() => dispatch(stopDungCensusLoading()))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error('Error when getting dungCensus', error);
        return false;
      });
  },
);

export const deleteDungCensus = createAsyncThunk(
  'dungCensuses/deleteDungCensus',
  async (req: { id: string }, { dispatch }) => {
    dispatch(startDungCensusLoading());
    return axios
      .delete(`${SERVER_URL}dung_censuses/${req.id}`)
      .finally(() => dispatch(stopDungCensusLoading()))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error('Error when getting dungCensus', error);
        return false;
      });
  },
);

export const dungCensusSlice = createSlice({
  name: 'dungCensuses',
  initialState,
  reducers: {
    startDungCensusLoading: (state) => ({ ...state, loading: true }),
    stopDungCensusLoading: (state) => ({ ...state, loading: false }),
  },
  extraReducers: (builder) => {
    builder.addCase(getDungCensusesByHerdId.fulfilled, (state, action) => {
      const dungCensuses: IDungCensus[] = action.payload as IDungCensus[];
      dungCensuses.forEach((dungCensus: IDungCensus) => {
        state.all[dungCensus.id] = dungCensus;
      });
      if (dungCensuses.length > 0) {
        state.indices.latest = dungCensuses.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())[0];
      }
    });
    builder.addCase(createDungCensus.fulfilled, (state, action) => {
      const dungCensus: IDungCensus = action.payload as IDungCensus;
      state.all[dungCensus.id] = dungCensus;
      state.indices.latest = dungCensus;
      alert('Created dungCensus!');
    });
    builder.addCase(getDungCensus.fulfilled, (state, action) => {
      const dungCensus: IDungCensus = action.payload as IDungCensus;
      state.all[dungCensus.id] = dungCensus;
      alert('Retrieved dungCensus!');
    });
    builder.addCase(updateDungCensus.fulfilled, (state, action) => {
      const dungCensus: IDungCensus = action.payload as IDungCensus;
      state.all[dungCensus.id] = dungCensus;
      state.indices.latest = dungCensus;
      alert('Updated dungCensus!');
    });
    builder.addCase(deleteDungCensus.fulfilled, (state, action) => {
      const dungCensus: IDungCensus = action.payload as IDungCensus;
      delete state.all[dungCensus.id];
      if (state.indices.latest && dungCensus.id === state.indices.latest.id) {
        delete state.indices.latest;
        if (Object.values(state.all).length > 0) {
          state.indices.latest = Object.values(state.all).sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())[0];
        }
      }
      alert('Deleted dungCensus!');
    });
  },
});

export const { startDungCensusLoading, stopDungCensusLoading } =
  dungCensusSlice.actions;

export default dungCensusSlice.reducer;
