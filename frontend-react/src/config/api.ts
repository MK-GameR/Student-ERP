import { ENV } from './env';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${ENV.API_URL}/auth/login`,
    LOGOUT: `${ENV.API_URL}/auth/logout`,
    REFRESH: `${ENV.API_URL}/auth/refresh`,
    ME: `${ENV.API_URL}/auth/me`,
  },
  STUDENT: {
    PROFILE: `${ENV.API_URL}/students/profile`,
    ATTENDANCE: `${ENV.API_URL}/students/attendance`,
    FEES: `${ENV.API_URL}/students/fees`,
  },
  TEACHER: {
    CLASSES: `${ENV.API_URL}/teachers/classes`,
    MARK_ATTENDANCE: `${ENV.API_URL}/teachers/attendance`,
  },
  AI: {
    ANALYZE: `${ENV.API_URL}/ai/analyze-performance`,
    CHAT: `${ENV.API_URL}/ai/chat`,
  },
};