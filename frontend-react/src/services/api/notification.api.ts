import apiClient from './axios';
import { API_ENDPOINTS } from '../../config/api';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'Info' | 'Alert' | 'Success';
  isRead: boolean;
  createdAt: string;
}

export const NotificationAPI = {
  getNotifications: async (): Promise<NotificationItem[]> => {
    const response = await apiClient.get<NotificationItem[]>(API_ENDPOINTS.NOTIFICATIONS.LIST);
    return response.data;
  },

  markAsRead: async (id: string): Promise<void> => {
    await apiClient.patch(`${API_ENDPOINTS.NOTIFICATIONS.MARK_READ}/${id}`);
  },
};