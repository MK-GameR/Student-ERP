import apiClient from './axios';
import { API_ENDPOINTS } from '../../config/api';

export interface ClassSchedule {
  id: string;
  className: string;
  subject: string;
  timeSlot: string;
  roomNo: string;
}

export interface AttendancePayload {
  classId: string;
  date: string;
  records: Array<{ studentId: string; status: 'Present' | 'Absent' | 'Late' }>;
}

export const TeacherAPI = {
  getSchedules: async (): Promise<ClassSchedule[]> => {
    const response = await apiClient.get<ClassSchedule[]>(API_ENDPOINTS.TEACHER.CLASSES);
    return response.data;
  },

  submitAttendance: async (payload: AttendancePayload): Promise<{ success: boolean; message: string }> => {
    const response = await apiClient.post(API_ENDPOINTS.TEACHER.MARK_ATTENDANCE, payload);
    return response.data;
  },
};