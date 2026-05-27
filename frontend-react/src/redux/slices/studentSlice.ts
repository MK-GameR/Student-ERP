import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type StudentProfile, type AttendanceRecord, type FeeStructure } from '../../services/api/student.api';

interface StudentState {
  profile: StudentProfile | null;
  attendance: AttendanceRecord[];
  fees: FeeStructure | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: StudentState = {
  profile: null,
  attendance: [],
  fees: null,
  isLoading: false,
  error: null,
};

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    setStudentDataStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    setProfileSuccess: (state, action: PayloadAction<StudentProfile>) => {
      state.profile = action.payload;
      state.isLoading = false;
    },
    setAttendanceSuccess: (state, action: PayloadAction<AttendanceRecord[]>) => {
      state.attendance = action.payload;
      state.isLoading = false;
    },
    setFeesSuccess: (state, action: PayloadAction<FeeStructure>) => {
      state.fees = action.payload;
      state.isLoading = false;
    },
    setStudentDataFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    clearStudentState: (state) => {
      return initialState;
    },
  },
});

export const {
  setStudentDataStart,
  setProfileSuccess,
  setAttendanceSuccess,
  setFeesSuccess,
  setStudentDataFailure,
  clearStudentState,
} = studentSlice.actions;

export default studentSlice.reducer;