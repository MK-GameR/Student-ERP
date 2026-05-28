import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { RoleBasedRoute } from './RoleBasedRoute';
import { ROLES, ROUTES } from '../config/constants';

// 1. Import Unauthenticated Shells & Authentication Pages
import { AuthLayout } from '../layouts/AuthLayout';
// Placeholder for login page - swap with your actual Login form component
const LoginPage = () => <div className="p-4">Login Form View</div>; 
const UnauthorizedPage = () => (
  <div className="p-8 text-center space-y-4">
    <h1 className="text-2xl font-bold text-red-600">403 - Access Denied</h1>
    <p className="text-gray-500">Your account parameters do not grant clear clearance for this sub-system.</p>
  </div>
);

// 2. Import Institutional Layout Shells
import { DashboardLayout } from '../layouts/DashboardLayout'; // Universal authenticated wrapper
import { AdminLayout } from '../layouts/AdminLayout';
import { TeacherLayout } from '../layouts/TeacherLayout';
import { StudentLayout } from '../layouts/StudentLayout';
import { ParentLayout } from '../layouts/ParentLayout';
import { PrincipalLayout } from '../layouts/PrincipalLayout';

// 3. Page Level Canvas Component Placeholders (Swap with your true view files)
const AdminDashboard = () => <div>System Performance Logs & Core Metrics</div>;
const AdminUsersView = () => <div>User Directory Matrix Allocation Panel</div>;
const TeacherDashboard = () => <div>Class Assignment Registries & Roll Call</div>;
const StudentDashboard = () => <div>Academic Progress Portal Hub</div>;
const StudentAIDesk = () => <div>AI Cognitive Vector Assistance Engine</div>;
const ParentDashboard = () => <div>Ward Academic Run-Rate Metric Cards</div>;
const PrincipalDashboard = () => <div>Enterprise Analytical Financial Run-Rates</div>;

export const router = createBrowserRouter([
  // PUBLIC FLOW ENTRIES
  {
    element: <AuthLayout />,
    children: [
      { path: ROUTES.LOGIN, element: <LoginPage /> },
    ],
  },
  {
    path: ROUTES.UNAUTHORIZED,
    element: <UnauthorizedPage />,
  },

  // ENTERPRISE SECURED INFRASTRUCTURE PIPELINES
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />, // Loads global header top-bar and universal frame
        children: [
          
          // ADMINISTATIVE REGISTRATION WORKSPACE
          {
            element: <RoleBasedRoute allowedRoles={[ROLES.ADMIN, ROLES.SUPER_ADMIN]} />,
            children: [
              {
                element: <AdminLayout />, // Loads left system-side navigation columns
                children: [
                  { path: '/admin/dashboard', element: <AdminDashboard /> },
                  { path: ROUTES.ADMIN.USER_MANAGEMENT, element: <AdminUsersView /> },
                ],
              },
            ],
          },

          // INSTRUCTIONAL SECTOR SUITE
          {
            element: <RoleBasedRoute allowedRoles={[ROLES.TEACHER]} />,
            children: [
              {
                element: <TeacherLayout />,
                children: [
                  { path: ROUTES.TEACHER.DASHBOARD, element: <TeacherDashboard /> },
                  { path: ROUTES.TEACHER.ATTENDANCE_CONTROL, element: <div>Attendance Control Panel</div> },
                ],
              },
            ],
          },

          // STUDENT ENGAGEMENT SUITE
          {
            element: <RoleBasedRoute allowedRoles={[ROLES.STUDENT]} />,
            children: [
              {
                element: <StudentLayout />,
                children: [
                  { path: ROUTES.STUDENT.DASHBOARD, element: <StudentDashboard /> },
                  { path: ROUTES.STUDENT.AI_DESK, element: <StudentAIDesk /> },
                  { path: ROUTES.STUDENT.ATTENDANCE, element: <div>Student Attendance Log Sheet</div> },
                  { path: ROUTES.STUDENT.FEES, element: <div>Student Fee Ledger Transcripts</div> },
                ],
              },
            ],
          },

          // GUARDIAN OBSERVABILITY SUITE
          {
            element: <RoleBasedRoute allowedRoles={[ROLES.PARENT]} />,
            children: [
              {
                element: <ParentLayout />,
                children: [
                  { path: '/parent/dashboard', element: <ParentDashboard /> },
                  { path: '/parent/attendance', element: <div>Ward Roll-Call Flags</div> },
                  { path: '/parent/fees', element: <div>Pending Remittance Gateway</div> },
                ],
              },
            ],
          },

          // EXECUTIVE OVERSIGHT PORTAL
          {
            element: <RoleBasedRoute allowedRoles={[ROLES.PRINCIPAL]} />,
            children: [
              {
                element: <PrincipalLayout />,
                children: [
                  { path: ROUTES.PRINCIPAL.ANALYTICS, element: <PrincipalDashboard /> },
                ],
              },
            ],
          },

        ],
      },
    ],
  },

  // FALLBACK RUNTIME REDIRECT SAFEGUARD
  {
    path: '*',
    element: <Navigate to={ROUTES.LOGIN} replace />,
  },
]);