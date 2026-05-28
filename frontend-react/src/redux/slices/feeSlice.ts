import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { AccountingAPI } from '../../services/api/accounting.api';
import type { Invoice } from '../../services/api/accounting.api';

interface FeeState {
  invoices: Invoice[];
  isLoading: boolean;
  isProcessingPayment: boolean;
  error: string | null;
}

const initialState: FeeState = {
  invoices: [],
  isLoading: false,
  isProcessingPayment: false,
  error: null,
};

export const fetchInvoices = createAsyncThunk(
  'fees/fetchInvoices',
  async (status: string | undefined, { rejectWithValue }) => {
    try {
      return await AccountingAPI.getInvoices(status);
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const recordPayment = createAsyncThunk(
  'fees/recordPayment',
  async ({ invoiceId, amount, method }: { invoiceId: string; amount: number; method: string }, { rejectWithValue }) => {
    try {
      return await AccountingAPI.collectPayment(invoiceId, amount, method);
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

const feeSlice = createSlice({
  name: 'fees',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Invoices Pipeline
      .addCase(fetchInvoices.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchInvoices.fulfilled, (state, action: PayloadAction<Invoice[]>) => {
        state.isLoading = false;
        state.invoices = action.payload;
      })
      .addCase(fetchInvoices.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload?.message || 'Failed to load outstanding invoice registries.';
      })
      // Record Payment Pipeline
      .addCase(recordPayment.pending, (state) => {
        state.isProcessingPayment = true;
      })
      .addCase(recordPayment.fulfilled, (state) => {
        state.isProcessingPayment = false;
      })
      .addCase(recordPayment.rejected, (state, action: any) => {
        state.isProcessingPayment = false;
        state.error = action.payload?.message || 'Payment collections recording faulted.';
      });
  },
});

export default feeSlice.reducer;