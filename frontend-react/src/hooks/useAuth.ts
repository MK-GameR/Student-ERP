import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
// Separate runtime object from compile-time type:
import { AuthAPI } from '../services/api/auth.api';
import type { LoginPayload } from '../services/api/auth.api';
import { loginStart, loginSuccess, loginFailure, logout } from '../redux/slices/authSlice';
import { TokenStorage } from '../services/storage/token.storage';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, isLoading, error } = useAppSelector((state) => state.auth);

  const loginUser = useCallback(async (credentials: LoginPayload) => {
    dispatch(loginStart());
    try {
      const data = await AuthAPI.login(credentials);
      TokenStorage.setToken(data.token);
      dispatch(loginSuccess({ user: data.user, token: data.token }));
      return data.user;
    } catch (err: any) {
      const message = err?.message || 'Authentication sequence failed';
      dispatch(loginFailure(message));
      throw err;
    }
  }, [dispatch]);

  const logoutUser = useCallback(async () => {
    try {
      await AuthAPI.logout();
    } catch (err) {
      console.warn('Backend session unregistration could not settle cleanly', err);
    } finally {
      TokenStorage.clearToken();
      dispatch(logout());
    }
  }, [dispatch]);

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login: loginUser,
    logout: logoutUser,
  };
};