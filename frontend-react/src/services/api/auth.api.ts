import apiClient from './axios';
import { API_ENDPOINTS } from '../../config/api';

export interface LoginPayload {
  email: string;
  password:  string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'principal' | 'teacher' | 'student' | 'parent';
  };
}

export const AuthAPI = {
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, payload);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
  },

  getCurrentUser: async (): Promise<AuthResponse['user']> => {
    const response = await apiClient.get<AuthResponse['user']>(API_ENDPOINTS.AUTH.ME);
    return response.data;
  }
};