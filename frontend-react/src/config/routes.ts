export const ROUTES = {
  // Public Paths
  AUTH: {
    LOGIN: '/login',
  },
  UNAUTHORIZED: '/unauthorized',
  SERVER_ERROR: '/500',

  // Core RBAC Module Dashboards
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    USERS: '/admin/users',
    ROLES: '/admin/roles',
    PERMISSIONS: '/admin/permissions',
    SETTINGS: '/admin/settings',
    NOTIFICATIONS: '/admin/notifications',
    AUDIT_LOGS: '/admin/audit-logs',
  },

  PRINCIPAL: {
    ANALYTICS: '/principal/analytics',
    FINANCIALS: '/principal/financials',
    STUDENT_REPORTS: '/principal/student-reports',
    TEACHER_REPORTS: '/principal/teacher-reports',
    DEPARTMENTS: '/principal/departments',
    AI_ANALYTICS: '/principal/ai-analytics',
  },

  TEACHER: {
    DASHBOARD: '/teacher/dashboard',
  },

  STUDENT: {
    DASHBOARD: '/student/dashboard',
    ANALYTICS: '/student/analytics',
    TIMETABLE: '/student/timetable',
  },

  ACCOUNTING: {
    FEES: '/accounting/fees',
    PAYROLL: '/accounting/payroll',
    EXPENSES: '/accounting/expenses',
    INCOME: '/accounting/income',
    REPORTS: '/accounting/reports',
  },

  LIBRARY: {
    BOOKS: '/library/books',
    ISSUE_RETURN: '/library/issue-return',
    FINES: '/library/fines',
  },

  TRANSPORT: {
    BUS_TRACKING: '/transport/bus-tracking',
    GPS_TRACKING: '/transport/gps-tracking',
    ROUTES: '/transport/routes',
  },

  HOSTEL: {
    ROOM_ALLOCATION: '/hostel/room-allocation',
    FEES: '/hostel/fees',
    VISITORS: '/hostel/visitors',
  },
} as const;