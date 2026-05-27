import axios, { type AxiosInstance, type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { ENV } from '../../config/env';
import { TokenStorage } from '../storage/token.storage';
import { ROUTES } from '../../config/routes';

const apiClient: AxiosInstance = axios.create({
  baseURL: ENV.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000, // 15 seconds
});

// Request Interceptor: Attach JWT bearer token automatically to outbound endpoints
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = TokenStorage.getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Global interception of backend errors (like expired tokens)
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized (Expired Session)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Implement token refresh mechanism here if supported by your API backend node
        // const newTokens = await axios.post(`${ENV.API_BASE_URL}/auth/refresh`, { ... });
        // TokenStorage.setToken(newTokens.data.accessToken);
        // return apiClient(originalRequest);
        
        TokenStorage.clearToken();
        window.location.href = ROUTES.AUTH.LOGIN;
      } catch (refreshError) {
        TokenStorage.clearToken();
        window.location.href = ROUTES.AUTH.LOGIN;
        return Promise.reject(refreshError);
      }
    }

    // Pass the safe parsed error along to components or hooks calling it
    const parsedError = {
      message: error.response?.data?.message || 'Something went wrong with the server context',
      status: error.response?.status || 500,
      data: error.response?.data || null,
    };

    return Promise.reject(parsedError);
  }
);

export default apiClient;