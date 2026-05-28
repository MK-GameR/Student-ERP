// 1. Define all valid roles across your entire ERP infrastructure
export type UserRole = 
  | 'student' 
  | 'teacher' 
  | 'parent' 
  | 'admin' 
  | 'principal' 
  | 'super_admin'
  | 'accountant'
  | 'librarian'
  | 'transport_manager'
  | 'hostel_warden';

// 2. Define the Roles object for runtime evaluation (matching your lowercase backend tokens)
export const ROLES = {
  STUDENT: 'student' as UserRole,
  TEACHER: 'teacher' as UserRole,
  PARENT: 'parent' as UserRole,
  ADMIN: 'admin' as UserRole,
  PRINCIPAL: 'principal' as UserRole,
  SUPER_ADMIN: 'super_admin' as UserRole,
  ACCOUNTANT: 'accountant' as UserRole,
  LIBRARIAN: 'librarian' as UserRole,
  TRANSPORT_MANAGER: 'transport_manager' as UserRole,
  HOSTEL_WARDEN: 'hostel_warden' as UserRole,
} as const;

// 3. Centralized client routing maps matching your exact folder architecture
export const ROUTES = {
  LOGIN: '/login',
  UNAUTHORIZED: '/unauthorized',
  SERVER_ERROR: '/500',

  STUDENT: {
    DASHBOARD: '/student/dashboard',
    ATTENDANCE: '/student/attendance',
    FEES: '/student/fees',
    AI_DESK: '/student/ai-desk',
    ANALYTICS: '/student/analytics',
    TIMETABLE: '/student/timetable',
  },

  TEACHER: {
    DASHBOARD: '/teacher/dashboard',
    ATTENDANCE_CONTROL: '/teacher/attendance-control',
  },

  PRINCIPAL: {
    ANALYTICS: '/principal/analytics',
    FINANCIALS: '/principal/financials',
    STUDENT_REPORTS: '/principal/student-reports',
    TEACHER_REPORTS: '/principal/teacher-reports',
    DEPARTMENTS: '/principal/departments',
    AI_ANALYTICS: '/principal/ai-analytics',
  },

  ADMIN: {
    USER_MANAGEMENT: '/admin/users',
    ROLE_MANAGEMENT: '/admin/roles',
    PERMISSION_MANAGEMENT: '/admin/permissions',
    SYSTEM_SETTINGS: '/admin/settings',
    NOTIFICATIONS: '/admin/notifications',
    AUDIT_LOGS: '/admin/audit-logs',
  },

  ACCOUNTING: {
    FEES_MANAGEMENT: '/accounting/fees',
    PAYROLL: '/accounting/payroll',
    EXPENSES: '/accounting/expenses',
    INCOME: '/accounting/income',
    REPORTS: '/accounting/reports',
  },

  LIBRARY: {
    BOOKS: '/library/books',
    ISSUE_RETURN: '/library/issue-return',
    FINE_MANAGEMENT: '/library/fines',
  },

  TRANSPORT: {
    BUS_TRACKING: '/transport/bus-tracking',
    GPS_TRACKING: '/transport/gps-tracking',
    ROUTE_MANAGEMENT: '/transport/routes',
  },

  HOSTEL: {
    ROOM_ALLOCATION: '/hostel/room-allocation',
    HOSTEL_FEES: '/hostel/fees',
    VISITORS: '/hostel/visitors',
  },
} as const;

// 4. Client-side browser localStorage cache keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'edusphere_jwt_token',
  REFRESH_TOKEN: 'edusphere_refresh_token',
  THEME: 'edusphere_ui_theme',
  USER_SESSION: 'edusphere_user_session',
} as const;

// 5. Shared Global Backend API Endpoint Destinations
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
  },
  // Placeholders for your expanded subsystems
  LIBRARY: '/library',
  ACCOUNTING: '/accounting',
  TRANSPORT: '/transport',
  HOSTEL: '/hostel',
} as const;