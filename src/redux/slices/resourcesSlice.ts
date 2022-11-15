import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { SERVER_URL } from '../../utils/constants.js';
import axios from 'axios';

export interface IResource {
  id: string
  title: string
  description: string
  value: number
}

export interface ResourceState {
  loading: boolean
  all: Record<string, IResource>
  indices: {
    byValue: Record<number, string> // value => id
  }
}

const initialState: ResourceState = {
  loading: false,
  all: {},
  indices: {
    byValue: {},
  },
};

export const getAllResources = createAsyncThunk(
  'resources/getAllResources',
  async (req: unknown, { dispatch }) => {
    dispatch(startResourceLoading());
    return axios
      .get<IResource[]>(`${SERVER_URL}resources/`)
      .finally(() => dispatch(stopResourceLoading()))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error('Error when getting all resources', error);
        return false;
      });
  },
);

export const createResource = createAsyncThunk(
  'resources/createResource',
  async (req: { title: string, description: string, value: number }, { dispatch }) => {
    dispatch(startResourceLoading());
    return axios
      .post(`${SERVER_URL}resources/`, req)
      .finally(() => dispatch(stopResourceLoading()))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error('Error when creating resource', error);
        return false;
      });
  },
);

export const getResource = createAsyncThunk(
  'resources/getResource',
  async (id: string, { dispatch }) => {
    dispatch(startResourceLoading());
    return axios
      .get(`${SERVER_URL}resources/${id}`)
      .finally(() => dispatch(stopResourceLoading()))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error('Error when getting resource', error);
        return false;
      });
  },
);

export const updateResource = createAsyncThunk(
  'resources/updateResource',
  async (req: IResource, { dispatch }) => {
    dispatch(startResourceLoading());
    return axios
      .patch(`${SERVER_URL}resources/${req.id}`, req)
      .finally(() => dispatch(stopResourceLoading()))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error('Error when getting resource', error);
        return false;
      });
  },
);

export const deleteResource = createAsyncThunk(
  'resources/deleteResource',
  async (req: { id: string }, { dispatch }) => {
    dispatch(startResourceLoading());
    return axios
      .delete(`${SERVER_URL}resources/${req.id}`)
      .finally(() => dispatch(stopResourceLoading()))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error('Error when getting resource', error);
        return false;
      });
  },
);

export const resourceSlice = createSlice({
  name: 'resources',
  initialState,
  reducers: {
    startResourceLoading: (state) => ({ ...state, loading: true }),
    stopResourceLoading: (state) => ({ ...state, loading: false }),
  },
  extraReducers: (builder) => {
    builder.addCase(getAllResources.fulfilled, (state, action) => {
      const resources: IResource[] = action.payload as IResource[];
      resources.forEach((resource: IResource) => {
        state.all[resource.id] = resource;
        state.indices.byValue[resource.value] = resource.id;
      });
    });
    builder.addCase(createResource.fulfilled, (state, action) => {
      const resource: IResource = action.payload as IResource;
      state.all[resource.id] = resource;
      state.indices.byValue[resource.value] = resource.id;
      alert('Created resource!');
    });
    builder.addCase(getResource.fulfilled, (state, action) => {
      const resource: IResource = action.payload as IResource;
      state.all[resource.id] = resource;
      state.indices.byValue[resource.value] = resource.id;
      alert('Retrieved resource!');
    });
    builder.addCase(updateResource.fulfilled, (state, action) => {
      const resource: IResource = action.payload as IResource;
      state.all[resource.id] = resource;
      state.indices.byValue[resource.value] = resource.id;
      alert('Updated resource!');
    });
    builder.addCase(deleteResource.fulfilled, (state, action) => {
      const resource: IResource = action.payload as IResource;
      delete state.all[resource.id];
      delete state.indices.byValue[resource.value];
      alert('Deleted resource!');
    });
  },
});

export const { startResourceLoading, stopResourceLoading } =
  resourceSlice.actions;

export default resourceSlice.reducer;
