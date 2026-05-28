import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import studentReducer from './slices/studentSlice';
import teacherReducer from './slices/teacherSlice';
import parentReducer from './slices/parentSlice';
import notificationReducer from './slices/notificationSlice';
import attendanceReducer from './slices/attendanceSlice';
import feeReducer from './slices/feeSlice';
import aiReducer from './slices/aiSlice';
import analyticsReducer from './slices/analyticsSlice';
import { errorMiddleware } from './middleware/errorMiddleware';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    student: studentReducer,
    teacher: teacherReducer,
    parent: parentReducer,
    notification: notificationReducer,
    attendance: attendanceReducer,
    fees: feeReducer,
    ai: aiReducer,
    analytics: analyticsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Prevents errors when working with clean raw date strings or complex entities
    }).concat(errorMiddleware),
});

// Structural TypeScript Typing Configurations
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;