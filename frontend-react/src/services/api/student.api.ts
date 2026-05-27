import apiClient from './axios';
import { API_ENDPOINTS } from '../../config/api';

export interface StudentProfile {
  id: string;
  rollNo: string;
  className: string;
  section: string;
  bloodGroup?: string;
  guardianName: string;
  guardianPhone: string;
}

export interface AttendanceRecord {
  date: string;
  status: 'Present' | 'Absent' | 'Late' | 'Half-Day';
  remarks?: string;
}

export interface FeeStructure {
  totalAmount: number;
  paidAmount: number;
  dueDate: string;
  status: 'Paid' | 'Partial' | 'Unpaid';
  transactions: Array<{ id: string; date: string; amount: number; method: string }>;
}

export const StudentAPI = {
  getProfile: async (): Promise<StudentProfile> => {
    const response = await apiClient.get<StudentProfile>(API_ENDPOINTS.STUDENT.PROFILE);
    return response.data;
  },

  getAttendance: async (month?: string): Promise<AttendanceRecord[]> => {
    const response = await apiClient.get<AttendanceRecord[]>(API_ENDPOINTS.STUDENT.ATTENDANCE, {
      params: { month },
    });
    return response.data;
  },

  getFees: async (): Promise<FeeStructure> => {
    const response = await apiClient.get<FeeStructure>(API_ENDPOINTS.STUDENT.FEES);
    return response.data;
  },
};