import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { SERVER_URL } from '../../utils/constants.js';
import axios from 'axios';

export enum TeamScopes {
  User = 'USER',
  Contributor = 'CONTRIBUTOR',
  Owner = 'OWNER',
}

export interface IMembership {
  id: string;
  membershipId: string;
  userId: string;
  role: TeamScopes;
}

export interface MembershipState {
  loading: boolean
}

const initialState: MembershipState = {
  loading: false,
};

export const createMembership = createAsyncThunk(
  'memberships/createMembership',
  async (req: { teamId: string, userId: string }, { dispatch }) => {
    dispatch(startMembershipsLoading());
    return axios
      .post(`${SERVER_URL}memberships/`, req)
      .finally(() => dispatch(stopMembershipsLoading()))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error('Error when creating membership', error);
        return false;
      });
  },
);

export const membershipSlice = createSlice({
  name: 'memberships',
  initialState,
  reducers: {
    startMembershipsLoading: (state) => ({ ...state, loading: true }),
    stopMembershipsLoading: (state) => ({ ...state, loading: false }),
  },
  extraReducers: (builder) => {
    builder.addCase(createMembership.fulfilled, (state, action) => {
      alert('Created membership as: ' + JSON.stringify(action.payload));
    });
  },
});

export const { startMembershipsLoading, stopMembershipsLoading } =
  membershipSlice.actions;

export default membershipSlice.reducer;


