import apiClient from './axios';
import { API_ENDPOINTS } from '../../config/api';

export interface RouteDetail {
  id: string;
  routeName: string;
  vehicleNo: string;
  driverName: string;
  driverPhone: string;
  stops: string[];
}

export interface LiveLocation {
  vehicleNo: string;
  latitude: number;
  longitude: number;
  lastUpdated: string;
  speed: number;
}

export const TransportAPI = {
  getRoutes: async (): Promise<RouteDetail[]> => {
    const response = await apiClient.get<RouteDetail[]>(API_ENDPOINTS.TRANSPORT.ROUTES);
    return response.data;
  },

  getLiveLocation: async (vehicleNo: string): Promise<LiveLocation> => {
    const response = await apiClient.get<LiveLocation>(`${API_ENDPOINTS.TRANSPORT.LIVE_LOCATION}/${vehicleNo}`);
    return response.data;
  },
};