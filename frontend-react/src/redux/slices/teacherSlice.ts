import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
interface TeacherState {
  classes: any[];
  currentClassRoster: any[];
  isLoading: boolean;
  error: string | null;
}

const initialState: TeacherState = {
  classes: [],
  currentClassRoster: [],
  isLoading: false,
  error: null,
};

const teacherSlice = createSlice({
  name: 'teacher',
  initialState,
  reducers: {
    fetchClassesStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchClassesSuccess: (state, action: PayloadAction<any[]>) => {
      state.classes = action.payload;
      state.isLoading = false;
    },
    fetchClassesFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    clearTeacherState: (state) => {
      return initialState;
    },
  },
});

export const {
  fetchClassesStart,
  fetchClassesSuccess,
  fetchClassesFailure,
  clearTeacherState,
} = teacherSlice.actions;

export default teacherSlice.reducer;