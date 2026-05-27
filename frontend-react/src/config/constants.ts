// 1. Define the valid roles as a strict TypeScript compile-time Type
export type UserRole = 'student' | 'teacher' | 'parent' | 'admin' | 'principal' | 'super_admin';

// 2. Define the Roles object for runtime logic evaluation
export const ROLES = {
  STUDENT: 'student' as UserRole,
  TEACHER: 'teacher' as UserRole,
  PARENT: 'parent' as UserRole,
  ADMIN: 'admin' as UserRole,
  PRINCIPAL: 'principal' as UserRole,
  SUPER_ADMIN: 'super_admin' as UserRole,
} as const;

// 3. Centralized application client routing maps
export const ROUTES = {
  LOGIN: '/login',
  UNAUTHORIZED: '/unauthorized',
  STUDENT: {
    DASHBOARD: '/student/dashboard',
    ATTENDANCE: '/student/attendance',
    FEES: '/student/fees',
    AI_DESK: '/student/ai-desk',
  },
  TEACHER: {
    DASHBOARD: '/teacher/dashboard',
    ATTENDANCE_CONTROL: '/teacher/attendance-control',
  }
};

// 4. Client-side browser localStorage cache keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'edusphere_jwt_token',
  REFRESH_TOKEN: 'edusphere_refresh_token',
  THEME: 'edusphere_ui_theme',
  USER_SESSION: 'edusphere_user_session',
};

// 5. Shared Global Endpoint Defaults
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
  },
  STUDENT: {
    PROFILE: '/student/profile',
    ATTENDANCE: '/student/attendance',
    FEES: '/student/fees',
  },
  TEACHER: {
    SCHEDULES: '/teacher/schedules',
    SUBMIT_ATTENDANCE: '/teacher/attendance/submit',
  },
  AI: {
    CHAT: '/ai/chat',
    ANALYTICS: '/ai/analytics',
  }
};