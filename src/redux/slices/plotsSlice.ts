import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SERVER_URL } from '../../utils/constants.js';
import axios from 'axios';

export interface IPlot {
  id: string;
  teamId: string;
  photoId: string | null;
  latitude: number;
  longitude: number;
  length: number;
  width: number;
  name: string;
}

export interface PlotsState {
  loading: boolean
  allPlots: Record<string, IPlot>
  selectedPlotId: string,
}

const initialState: PlotsState = {
  loading: false,
  allPlots: {},
  selectedPlotId: '',
};

export const getPlotsByTeamId = createAsyncThunk(
  'plots/getAllPlots',
  async (req: { teamId: string }, { dispatch }) => {
    dispatch(startPlotsLoading());
    return axios
      .get<IPlot[]>(`${SERVER_URL}plots/?teamId=${req.teamId}`)
      .finally(() => dispatch(stopPlotsLoading()))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error('Error when getting all plots', error);
        return false;
      });
  },
);

interface IPhotoInput {
  uri: string,
  fileName: string,
  buffer: string, // base64
}

interface ICreatePlotsRequest {
  herdId: string;
  bcs: number,
  notes: string;
  tag: string;
  photo?: IPhotoInput;
}

export const createPlots = createAsyncThunk(
  'plots/createPlots',
  async (req: ICreatePlotsRequest, { dispatch }) => {
    dispatch(startPlotsLoading());
    return axios
      .post(`${SERVER_URL}plots/`, req)
      .finally(() => dispatch(stopPlotsLoading()))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error('Error when creating plot', error);
        return false;
      });
  },
);

export const getPlots = createAsyncThunk(
  'plots/getPlots',
  async (id: string, { dispatch }) => {
    dispatch(startPlotsLoading());
    return axios
      .get(`${SERVER_URL}plots/${id}`)
      .finally(() => dispatch(stopPlotsLoading()))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error('Error when getting plot', error);
        return false;
      });
  },
);

export const updatePlots = createAsyncThunk(
  'plots/updatePlots',
  async (req: IPlot, { dispatch }) => {
    dispatch(startPlotsLoading());
    return axios
      .patch(`${SERVER_URL}plots/${req.id}`, req)
      .finally(() => dispatch(stopPlotsLoading()))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error('Error when getting plot', error);
        return false;
      });
  },
);

export const deletePlots = createAsyncThunk(
  'plots/deletePlots',
  async (req: { id: string }, { dispatch }) => {
    dispatch(startPlotsLoading());
    return axios
      .delete(`${SERVER_URL}plots/${req.id}`)
      .finally(() => dispatch(stopPlotsLoading()))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error('Error when getting plot', error);
        return false;
      });
  },
);

export const plotSlice = createSlice({
  name: 'plots',
  initialState,
  reducers: {
    startPlotsLoading: (state) => ({ ...state, loading: true }),
    stopPlotsLoading: (state) => ({ ...state, loading: false }),
    setSelectedPlotId: (state, action: PayloadAction<string>) => ({ ...state, selectedPlotId: action.payload }),
  },
  extraReducers: (builder) => {
    builder.addCase(getPlotsByTeamId.fulfilled, (state, action) => {
      const plots: IPlot[] = action.payload as IPlot[];
      plots.forEach((plot: IPlot) => {
        state.allPlots[plot.id] = plot;
      });
    });
    builder.addCase(createPlots.fulfilled, (state, action) => {
      const plot: IPlot = action.payload as IPlot;
      state.allPlots[plot.id] = plot;
      alert('Created plot!');
    });
    builder.addCase(getPlots.fulfilled, (state, action) => {
      const plot: IPlot = action.payload as IPlot;
      state.allPlots[plot.id] = plot;
      alert('Retrieved plot!');
    });
    builder.addCase(updatePlots.fulfilled, (state, action) => {
      const plot: IPlot = action.payload as IPlot;
      state.allPlots[plot.id] = plot;
      alert('Updated plot!');
    });
    builder.addCase(deletePlots.fulfilled, (state, action) => {
      const plot: IPlot = action.payload as IPlot;
      delete state.allPlots[plot.id];
      alert('Deleted plot!');
    });
  },
});

export const { startPlotsLoading, stopPlotsLoading, setSelectedPlotId } =
  plotSlice.actions;

export default plotSlice.reducer;
