import apiClient from './axios';
import { API_ENDPOINTS } from '../../config/api';

export interface HostelRoom {
  id: string;
  roomNo: string;
  blockName: string;
  roomType: 'AC_Sharing' | 'Non_AC_Sharing' | 'Single';
  capacity: number;
  occupiedCount: number;
}

export const HostelAPI = {
  getRooms: async (block?: string): Promise<HostelRoom[]> => {
    const response = await apiClient.get<HostelRoom[]>(API_ENDPOINTS.HOSTEL.ROOMS, { params: { block } });
    return response.data;
  },

  allocateRoom: async (studentId: string, roomId: string): Promise<{ success: boolean; message: string }> => {
    const response = await apiClient.post(API_ENDPOINTS.HOSTEL.ALLOCATE, { studentId, roomId });
    return response.data;
  },
};