import apiClient from './axios';
import { API_ENDPOINTS } from '../../config/api';

export interface SystemMetrics {
  totalStudents: number;
  totalTeachers: number;
  overallAttendanceRate: number;
  monthlyRevenue: number;
}

export interface DepartmentPerformance {
  department: string;
  averageGpa: number;
  syllabusCoverage: number;
}

export const PrincipalAPI = {
  getSystemMetrics: async (): Promise<SystemMetrics> => {
    const response = await apiClient.get<SystemMetrics>(API_ENDPOINTS.PRINCIPAL.METRICS);
    return response.data;
  },

  getDepartmentPerformance: async (): Promise<DepartmentPerformance[]> => {
    const response = await apiClient.get<DepartmentPerformance[]>(API_ENDPOINTS.PRINCIPAL.DEPARTMENTS);
    return response.data;
  },
};