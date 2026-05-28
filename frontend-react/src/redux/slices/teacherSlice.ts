import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { TeacherAPI } from '../../services/api/teacher.api';
import type { ClassSchedule } from '../../services/api/teacher.api';

interface TeacherState {
  classes: ClassSchedule[];
  isLoading: boolean;
  error: string | null;
}

const initialState: TeacherState = {
  classes: [],
  isLoading: false,
  error: null,
};

export const fetchTeacherClasses = createAsyncThunk(
  'teacher/fetchClasses',
  async (_, { rejectWithValue }) => {
    try {
      return await TeacherAPI.getSchedules();
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

const teacherSlice = createSlice({
  name: 'teacher',
  initialState,
  reducers: {
    clearTeacherState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeacherClasses.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTeacherClasses.fulfilled, (state, action: PayloadAction<ClassSchedule[]>) => {
        state.isLoading = false;
        state.classes = action.payload;
      })
      .addCase(fetchTeacherClasses.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload?.message || 'Failed to sync institutional schedule registers.';
      });
  },
});

export const { clearTeacherState } = teacherSlice.actions;
export default teacherSlice.reducer;