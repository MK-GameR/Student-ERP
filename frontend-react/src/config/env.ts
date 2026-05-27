export const ENV = {
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  SOCKET_URL: import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000',
  MODE: import.meta.env.MODE || 'development', // Vite uses .MODE instead of .NODE_ENV
};