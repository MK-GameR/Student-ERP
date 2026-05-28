import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { PrincipalAPI } from '../../services/api/principal.api';
import type { SystemMetrics, DepartmentPerformance } from '../../services/api/principal.api';

interface AnalyticsState {
  metrics: SystemMetrics | null;
  departments: DepartmentPerformance[];
  isLoading: boolean;
  error: string | null;
}

const initialState: AnalyticsState = {
  metrics: null,
  departments: [],
  isLoading: false,
  error: null,
};

export const fetchExecutiveMetrics = createAsyncThunk(
  'analytics/fetchExecutiveMetrics',
  async (_, { rejectWithValue }) => {
    try {
      const [metrics, departments] = await Promise.all([
        PrincipalAPI.getSystemMetrics(),
        PrincipalAPI.getDepartmentPerformance(),
      ]);
      return { metrics, departments };
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    clearAnalyticsState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExecutiveMetrics.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchExecutiveMetrics.fulfilled, (state, action: PayloadAction<{ metrics: SystemMetrics; departments: DepartmentPerformance[] }>) => {
        state.isLoading = false;
        state.metrics = action.payload.metrics;
        state.departments = action.payload.departments;
      })
      .addCase(fetchExecutiveMetrics.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload?.message || 'System metrics analytical parsing aborted.';
      });
  },
});

export const { clearAnalyticsState } = analyticsSlice.actions;
export default analyticsSlice.reducer;