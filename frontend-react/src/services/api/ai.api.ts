import apiClient from './axios';
import { API_ENDPOINTS } from '../../config/api';

export interface PerformanceAnalysis {
  studentId: string;
  gpaTrend: number[];
  strengths: string[];
  weaknesses: string[];
  aiRecommendations: string[];
}

export const AI_API = {
  analyzePerformance: async (studentId: string): Promise<PerformanceAnalysis> => {
    const response = await apiClient.get<PerformanceAnalysis>(`${API_ENDPOINTS.AI.ANALYZE}/${studentId}`);
    return response.data;
  },

  sendMessage: async (chatHistory: Array<{ role: 'user' | 'assistant'; content: string }>): Promise<{ reply: string }> => {
    const response = await apiClient.post(`${API_ENDPOINTS.AI.CHAT}`, { messages: chatHistory });
    return response.data;
  },
};