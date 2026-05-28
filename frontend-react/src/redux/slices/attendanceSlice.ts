import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TeacherAPI } from '../../services/api/teacher.api';
import type { AttendancePayload } from '../../services/api/teacher.api';

interface AttendanceState {
  isSubmitting: boolean;
  submitSuccess: boolean;
  error: string | null;
}

const initialState: AttendanceState = {
  isSubmitting: false,
  submitSuccess: false,
  error: null,
};

export const submitClassAttendance = createAsyncThunk(
  'attendance/submitClassAttendance',
  async (payload: AttendancePayload, { rejectWithValue }) => {
    try {
      return await TeacherAPI.submitAttendance(payload);
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {
    resetAttendanceStatus: (state) => {
      state.submitSuccess = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitClassAttendance.pending, (state) => {
        state.isSubmitting = true;
        state.submitSuccess = false;
        state.error = null;
      })
      .addCase(submitClassAttendance.fulfilled, (state) => {
        state.isSubmitting = false;
        state.submitSuccess = true;
      })
      .addCase(submitClassAttendance.rejected, (state, action: any) => {
        state.isSubmitting = false;
        state.submitSuccess = false;
        state.error = action.payload?.message || 'Failed to submit attendance registry ledger.';
      });
  },
});

export const { resetAttendanceStatus } = attendanceSlice.actions;
export default attendanceSlice.reducer;