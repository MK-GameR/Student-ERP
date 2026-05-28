import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/slices/authSlice';
import studentReducer from '../redux/slices/studentSlice';
import teacherReducer from '../redux/slices/teacherSlice';
import notificationReducer from '../redux/slices/notificationSlice';
import aiReducer from '../redux/slices/aiSlice';
import { errorMiddleware } from '../redux/middleware/errorMiddleware';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    student: studentReducer,
    teacher: teacherReducer,
    notification: notificationReducer,
    ai: aiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(errorMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;