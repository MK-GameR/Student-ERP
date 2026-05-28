import apiClient from './axios';
import { API_ENDPOINTS } from '../../config/api';

export interface Book {
  id: string;
  isbn: string;
  title: string;
  author: string;
  category: string;
  availableCopies: number;
  locationRack: string;
}

export interface BookIssueRecord {
  id: string;
  bookId: string;
  bookTitle: string;
  borrowerId: string;
  borrowerName: string;
  issueDate: string;
  dueDate: string;
  status: 'Issued' | 'Returned' | 'Overdue';
}

export const LibraryAPI = {
  searchBooks: async (query: string): Promise<Book[]> => {
    const response = await apiClient.get<Book[]>(API_ENDPOINTS.LIBRARY.SEARCH, { params: { query } });
    return response.data;
  },

  issueBook: async (bookId: string, borrowerId: string, dueDate: string): Promise<BookIssueRecord> => {
    const response = await apiClient.post<BookIssueRecord>(API_ENDPOINTS.LIBRARY.ISSUE, { bookId, borrowerId, dueDate });
    return response.data;
  },

  returnBook: async (issueRecordId: string): Promise<{ fineAmount: number; success: boolean }> => {
    const response = await apiClient.post(`${API_ENDPOINTS.LIBRARY.RETURN}/${issueRecordId}`);
    return response.data;
  },
};