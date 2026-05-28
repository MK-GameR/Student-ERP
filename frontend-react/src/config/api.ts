export const API_ENDPOINTS = {
  // Your existing endpoints
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
    CLASSES: '/teacher/classes',
    MARK_ATTENDANCE: '/teacher/attendance',
  },
  AI: {
    ANALYZE: '/ai/analyze',
    CHAT: '/ai/chat',
  },

  // Added endpoints to support the newly added services
  PARENT: {
    WARDS: '/parent/wads',
    WARD_PROFILE: '/parent/ward-profile',
    WARD_ATTENDANCE: '/parent/ward-attendance',
    WARD_FEES: '/parent/ward-fees',
  },
  PRINCIPAL: {
    METRICS: '/principal/metrics',
    DEPARTMENTS: '/principal/departments',
  },
  ACCOUNTING: {
    INVOICES: '/accounting/invoices',
    CREATE_INVOICE: '/accounting/invoices/create',
    COLLECT: '/accounting/collect-payment',
  },
  LIBRARY: {
    SEARCH: '/library/books/search',
    ISSUE: '/library/books/issue',
    RETURN: '/library/books/return',
  },
  TRANSPORT: {
    ROUTES: '/transport/routes',
    LIVE_LOCATION: '/transport/live-location',
  },
  HOSTEL: {
    ROOMS: '/hostel/rooms',
    ALLOCATE: '/hostel/allocate',
  },
  NOTIFICATIONS: {
    LIST: '/notifications',
    MARK_READ: '/notifications/mark-read',
  },
} as const;