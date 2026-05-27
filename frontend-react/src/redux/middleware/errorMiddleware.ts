import { type Middleware } from '@reduxjs/toolkit';
export const errorMiddleware: Middleware = () => (next) => (action: any) => {
  if (action.type.endsWith('/rejected')) {
    const errorMessage = action.payload?.message || action.error?.message || 'An unknown error occurred';
    console.error(`[Redux Error Trap] Action: ${action.type}`, errorMessage);
    // You can dispatch a global UI notification action here if desired
  }
  return next(action);
};