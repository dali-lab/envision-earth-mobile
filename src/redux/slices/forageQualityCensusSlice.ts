import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { SERVER_URL } from '../../utils/constants.js';
import axios from 'axios';

export interface IForageQualityCensus {
  id: string;
  plotId: string;
  photoId: string | null;
  rating: number;
  notes: string;
}

export interface ForageQualityCensusState {
  loading: boolean
  all: Record<string, IForageQualityCensus>
}

const initialState: ForageQualityCensusState = {
  loading: false,
  all: {},
};

export const getForageQualityCensusesByPlotId = createAsyncThunk(
  'forageQualityCensuses/getAllForageQualityCensuses',
  async (req: { plotId: string }, { dispatch }) => {
    dispatch(startForageQualityCensusLoading());
    return axios
      .get<IForageQualityCensus[]>(`${SERVER_URL}forage_quality_censuses/?plotId=${req.plotId}`)
      .finally(() => dispatch(stopForageQualityCensusLoading()))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error('Error when getting all forageQualityCensuses', error);
        return false;
      });
  },
);

interface IPhotoInput {
  uri: string,
  fileName: string,
  buffer: string, // base64
}

interface ICreateForageQualityCensusRequest {
  plotId: string;
  rating: number,
  notes: string;
  photo?: IPhotoInput;
}

export const createForageQualityCensus = createAsyncThunk(
  'forageQualityCensuses/createForageQualityCensus',
  async (req: ICreateForageQualityCensusRequest, { dispatch }) => {
    dispatch(startForageQualityCensusLoading());
    return axios
      .post(`${SERVER_URL}forage_quality_censuses/`, req)
      .finally(() => dispatch(stopForageQualityCensusLoading()))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error('Error when creating forageQualityCensus', error);
        return false;
      });
  },
);

export const getForageQualityCensus = createAsyncThunk(
  'forageQualityCensuses/getForageQualityCensus',
  async (id: string, { dispatch }) => {
    dispatch(startForageQualityCensusLoading());
    return axios
      .get(`${SERVER_URL}forage_quality_censuses/${id}`)
      .finally(() => dispatch(stopForageQualityCensusLoading()))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error('Error when getting forageQualityCensus', error);
        return false;
      });
  },
);

export const updateForageQualityCensus = createAsyncThunk(
  'forageQualityCensuses/updateForageQualityCensus',
  async (req: IForageQualityCensus, { dispatch }) => {
    dispatch(startForageQualityCensusLoading());
    return axios
      .patch(`${SERVER_URL}forage_quality_censuses/${req.id}`, req)
      .finally(() => dispatch(stopForageQualityCensusLoading()))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error('Error when getting forageQualityCensus', error);
        return false;
      });
  },
);

export const deleteForageQualityCensus = createAsyncThunk(
  'forageQualityCensuses/deleteForageQualityCensus',
  async (req: { id: string }, { dispatch }) => {
    dispatch(startForageQualityCensusLoading());
    return axios
      .delete(`${SERVER_URL}forage_quality_censuses/${req.id}`)
      .finally(() => dispatch(stopForageQualityCensusLoading()))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error('Error when getting forageQualityCensus', error);
        return false;
      });
  },
);

export const forageQualityCensusSlice = createSlice({
  name: 'forageQualityCensuses',
  initialState,
  reducers: {
    startForageQualityCensusLoading: (state) => ({ ...state, loading: true }),
    stopForageQualityCensusLoading: (state) => ({ ...state, loading: false }),
  },
  extraReducers: (builder) => {
    builder.addCase(getForageQualityCensusesByPlotId.fulfilled, (state, action) => {
      const forageQualityCensuses: IForageQualityCensus[] = action.payload as IForageQualityCensus[];
      forageQualityCensuses.forEach((forageQualityCensus: IForageQualityCensus) => {
        state.all[forageQualityCensus.id] = forageQualityCensus;
      });
    });
    builder.addCase(createForageQualityCensus.fulfilled, (state, action) => {
      const forageQualityCensus: IForageQualityCensus = action.payload as IForageQualityCensus;
      state.all[forageQualityCensus.id] = forageQualityCensus;
      alert('Created forageQualityCensus as: ' + JSON.stringify(action.payload));
    });
    builder.addCase(getForageQualityCensus.fulfilled, (state, action) => {
      const forageQualityCensus: IForageQualityCensus = action.payload as IForageQualityCensus;
      state.all[forageQualityCensus.id] = forageQualityCensus;
      alert('Retrieved forageQualityCensus as: ' + JSON.stringify(action.payload));
    });
    builder.addCase(updateForageQualityCensus.fulfilled, (state, action) => {
      const forageQualityCensus: IForageQualityCensus = action.payload as IForageQualityCensus;
      state.all[forageQualityCensus.id] = forageQualityCensus;
      alert('Updated forageQualityCensus to: ' + JSON.stringify(action.payload));
    });
    builder.addCase(deleteForageQualityCensus.fulfilled, (state, action) => {
      const forageQualityCensus: IForageQualityCensus = action.payload as IForageQualityCensus;
      delete state.all[forageQualityCensus.id];
      alert('Deleted forageQualityCensus with id ' + forageQualityCensus.id);
    });
  },
});

export const { startForageQualityCensusLoading, stopForageQualityCensusLoading } =
  forageQualityCensusSlice.actions;

export default forageQualityCensusSlice.reducer;