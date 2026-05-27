import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type PerformanceAnalysis } from '../../services/api/ai.api'; 

interface AIState {
  analysis: PerformanceAnalysis | null;
  chatHistory: Array<{ role: 'user' | 'assistant'; content: string }>;
  isAnalyzing: boolean;
  isChatLoading: boolean;
  error: string | null;
}

const initialState: AIState = {
  analysis: null,
  chatHistory: [],
  isAnalyzing: false,
  isChatLoading: false,
  error: null,
};

const aiSlice = createSlice({
  name: 'ai',
  initialState,
  reducers: {
    analysisStart: (state) => {
      state.isAnalyzing = true;
      state.error = null;
    },
    analysisSuccess: (state, action: PayloadAction<PerformanceAnalysis>) => {
      state.analysis = action.payload;
      state.isAnalyzing = false;
    },
    analysisFailure: (state, action: PayloadAction<string>) => {
      state.isAnalyzing = false;
      state.error = action.payload;
    },
    appendChatMessage: (state, action: PayloadAction<{ role: 'user' | 'assistant'; content: string }>) => {
      state.chatHistory.push(action.payload);
    },
    setChatLoading: (state, action: PayloadAction<boolean>) => {
      state.isChatLoading = action.payload;
    },
    clearChatHistory: (state) => {
      state.chatHistory = [];
    },
  },
});

export const {
  analysisStart,
  analysisSuccess,
  analysisFailure,
  appendChatMessage,
  setChatLoading,
  clearChatHistory,
} = aiSlice.actions;

export default aiSlice.reducer;