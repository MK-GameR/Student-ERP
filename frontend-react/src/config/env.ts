interface EnvConfig {
  API_URL: string;
  SOCKET_URL: string;
  MODE: 'development' | 'production' | 'test';
}

export const ENV: EnvConfig = {
  API_URL: (import.meta.env.VITE_API_URL as string) || 'http://localhost:5000/api/v1',
  SOCKET_URL: (import.meta.env.VITE_SOCKET_URL as string) || 'http://localhost:5000',
  MODE: (import.meta.env.MODE as 'development' | 'production' | 'test') || 'development',
};