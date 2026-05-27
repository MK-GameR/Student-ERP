import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/slices/authSlice'
import studentReducer from '../redux/slices/studentSlice';
import teacherReducer from '../redux/slices/teacherSlice';
import notificationReducer from '../redux/slices/notificationSlice';
import { errorMiddleware } from '../redux/middleware/errorMiddleware';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    student: studentReducer,
    teacher: teacherReducer,
    notification: notificationReducer,
  },
  // Explicitly casting the middleware array solves compiler type checking issues
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Prevents annoying warnings with mock data objects
    }).concat(errorMiddleware),
});

// Use 'type' keyword explicitly so Vite's bundler handles them safely
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;