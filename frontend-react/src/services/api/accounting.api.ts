import apiClient from './axios';
import { API_ENDPOINTS } from '../../config/api';

export interface Invoice {
  id: string;
  studentId: string;
  studentName: string;
  amount: number;
  type: 'Tuition' | 'Transport' | 'Hostel' | 'Exam';
  status: 'Paid' | 'Unpaid' | 'Overdue';
  date: string;
}

export interface CreateInvoicePayload {
  studentId: string;
  amount: number;
  type: Invoice['type'];
  dueDate: string;
}

export const AccountingAPI = {
  getInvoices: async (status?: string): Promise<Invoice[]> => {
    const response = await apiClient.get<Invoice[]>(API_ENDPOINTS.ACCOUNTING.INVOICES, {
      params: { status },
    });
    return response.data;
  },

  createInvoice: async (payload: CreateInvoicePayload): Promise<Invoice> => {
    const response = await apiClient.post<Invoice>(API_ENDPOINTS.ACCOUNTING.CREATE_INVOICE, payload);
    return response.data;
  },

  collectPayment: async (invoiceId: string, amount: number, method: string): Promise<{ success: boolean; txId: string }> => {
    const response = await apiClient.post(`${API_ENDPOINTS.ACCOUNTING.COLLECT}/${invoiceId}`, { amount, method });
    return response.data;
  },
};