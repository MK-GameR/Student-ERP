import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import type { LoginPayload } from '../services/api/auth.api';
import { loginUser, logout } from '../redux/slices/authSlice';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, isLoading, error } = useAppSelector((state) => state.auth);

  const login = useCallback(async (credentials: LoginPayload) => {
    // Executes the automated async workflow (storage handling + state mutations)
    const resultAction = await dispatch(loginUser(credentials));
    
    if (loginUser.rejected.match(resultAction)) {
      throw resultAction.payload || new Error('Authentication process failed');
    }
    
    return resultAction.payload;
  }, [dispatch]);

  const logoutUser = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout: logoutUser,
  };
};