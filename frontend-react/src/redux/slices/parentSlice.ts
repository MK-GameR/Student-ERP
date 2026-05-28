import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { ParentAPI } from '../../services/api/parent.api';
import type { WardOverview } from '../../services/api/parent.api';

interface ParentState {
  wards: WardOverview[];
  selectedWardId: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ParentState = {
  wards: [],
  selectedWardId: null,
  isLoading: false,
  error: null,
};

export const fetchWardsData = createAsyncThunk(
  'parent/fetchWards',
  async (_, { rejectWithValue }) => {
    try {
      return await ParentAPI.getWards();
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

const parentSlice = createSlice({
  name: 'parent',
  initialState,
  reducers: {
    setSelectedWard: (state, action: PayloadAction<string>) => {
      state.selectedWardId = action.payload;
    },
    clearParentState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWardsData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchWardsData.fulfilled, (state, action: PayloadAction<WardOverview[]>) => {
        state.isLoading = false;
        state.wards = action.payload;
        if (action.payload.length > 0 && !state.selectedWardId) {
          state.selectedWardId = action.payload[0].wardId;
        }
      })
      .addCase(fetchWardsData.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload?.message || 'Failed to extract guardian context profiles.';
      });
  },
});

export const { setSelectedWard, clearParentState } = parentSlice.actions;
export default parentSlice.reducer;