import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { SERVER_URL } from '../../utils/constants.js';
import axios from 'axios';

export interface ITeam {
  id: string,
  name: string,
  acreSize: number;
  address: string;
  yrsRanch: number;
  yrsHolMang: number;
  code: string;
}

export interface TeamState {
  loading: boolean
  selectedTeam: ITeam | undefined
}

const initialState: TeamState = {
  loading: false,
  selectedTeam: undefined,
};

export const createTeam = createAsyncThunk(
  'teams/createTeam',
  async (req: { name: string }, { dispatch }) => {
    dispatch(startTeamsLoading());
    return axios
      .post(`${SERVER_URL}teams/`, req)
      .finally(() => dispatch(stopTeamsLoading()))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error('Error when creating team', error);
        return false;
      });
  },
);

export const getTeam = createAsyncThunk(
  'teams/getTeam',
  async (req: { id: string }, { dispatch }) => {
    dispatch(startTeamsLoading());
    return axios
      .get(`${SERVER_URL}teams/?id=${req.id}`)
      .finally(() => dispatch(stopTeamsLoading()))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error('Error when getting team', error);
        return false;
      });
  },
);

export const getTeamByUserId = createAsyncThunk(
  'teams/getTeamByUserId',
  async (req: { userId: string }, { dispatch }) => {
    dispatch(startTeamsLoading());
    return axios
      .get(`${SERVER_URL}teams/?userId=${req.userId}`)
      .finally(() => dispatch(stopTeamsLoading()))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error('Error when getting team by userId', error);
        return false;
      });
  },
);

export const updateTeam = createAsyncThunk(
  'teams/updateTeam',
  async (req: { id: string, name: string, }, { dispatch }) => {
    dispatch(startTeamsLoading());
    return axios
      .patch(`${SERVER_URL}teams/${req.id}`, req)
      .finally(() => dispatch(stopTeamsLoading()))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error('Error when updating team', error);
        return false;
      });
  },
);

export const deleteTeam = createAsyncThunk(
  'teams/deleteTeam',
  async (req: { id: string }, { dispatch }) => {
    dispatch(startTeamsLoading());
    return axios
      .delete(`${SERVER_URL}teams/${req.id}`)
      .finally(() => dispatch(stopTeamsLoading()))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error('Error when deleting team', error);
        return false;
      });
  },
);

export const teamSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {
    startTeamsLoading: (state) => ({ ...state, loading: true }),
    stopTeamsLoading: (state) => ({ ...state, loading: false }),
  },
  extraReducers: (builder) => {
    builder.addCase(createTeam.fulfilled, (state, action) => {
      state.selectedTeam = action.payload as ITeam;
      alert('Created team as: ' + JSON.stringify(action.payload));
    });
    builder.addCase(getTeam.fulfilled, (state, action) => {
      state.selectedTeam = action.payload as ITeam;
      alert('Retrieved team as: ' + JSON.stringify(action.payload));
    });
    builder.addCase(getTeamByUserId.fulfilled, (state, action) => {
      state.selectedTeam = action.payload as ITeam;
      // alert('Retrieved team as: ' + JSON.stringify(action.payload));
    });
    builder.addCase(updateTeam.fulfilled, (state, action) => {
      state.selectedTeam = action.payload as ITeam;
      alert('Updated team to: ' + JSON.stringify(action.payload));
    });
    builder.addCase(deleteTeam.fulfilled, (state, action) => {
      const team: ITeam = action.payload as ITeam;
      state.selectedTeam = undefined;
      alert('Deleted team with id ' + team.id);
    });
  },
});

export const { startTeamsLoading, stopTeamsLoading } =
  teamSlice.actions;

export default teamSlice.reducer;
