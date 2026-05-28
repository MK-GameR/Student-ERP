import apiClient from './axios';
import { API_ENDPOINTS } from '../../config/api';
//  Correct: Added the 'type' keyword
import type { StudentProfile, AttendanceRecord, FeeStructure } from './student.api';
export interface WardOverview {
  wardId: string;
  name: string;
  className: string;
  attendancePercentage: number;
  outstandingFees: number;
}

export const ParentAPI = {
  getWards: async (): Promise<WardOverview[]> => {
    const response = await apiClient.get<WardOverview[]>(API_ENDPOINTS.PARENT.WARDS);
    return response.data;
  },

  getWardProfile: async (wardId: string): Promise<StudentProfile> => {
    const response = await apiClient.get<StudentProfile>(`${API_ENDPOINTS.PARENT.WARD_PROFILE}/${wardId}`);
    return response.data;
  },

  getWardAttendance: async (wardId: string, month?: string): Promise<AttendanceRecord[]> => {
    const response = await apiClient.get<AttendanceRecord[]>(`${API_ENDPOINTS.PARENT.WARD_ATTENDANCE}/${wardId}`, {
      params: { month },
    });
    return response.data;
  },

  getWardFees: async (wardId: string): Promise<FeeStructure> => {
    const response = await apiClient.get<FeeStructure>(`${API_ENDPOINTS.PARENT.WARD_FEES}/${wardId}`);
    return response.data;
  },
};