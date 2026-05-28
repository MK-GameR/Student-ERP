import React, { useState, useRef, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { appendChatMessage, setChatLoading } from '../../redux/slices/aiSlice';
import { AI_API } from '../../services/api/ai.api';
import { useSocket } from '../../hooks/useSocket';
import { Button } from './Button';

export const ChatWidget: React.FC = () => {
  const dispatch = useAppDispatch();
  const { chatHistory, isChatLoading } = useAppSelector((state) => state.ai);
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Bind live background data pipelines via our automated socket abstraction
  const { emit } = useSocket('ai_response_chunk', (payload: { content: string; complete: boolean }) => {
    // Optional implementation structure for chunked real-time responses
    console.log('Socket streaming token intercepted:', payload);
  });

  useEffect(() => {
    if (isOpen) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory, isOpen]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isChatLoading) return;

    const userPayload = { role: 'user' as const, content: inputMessage.trim() };
    dispatch(appendChatMessage(userPayload));
    setInputMessage('');
    dispatch(setChatLoading(true));

    try {
      // Package payload arrays together for backend compilation 
      const currentHistory = [...chatHistory, userPayload];
      const data = await AI_API.sendMessage(currentHistory);
      
      dispatch(appendChatMessage({ role: 'assistant', content: data.reply }));
      
      // Mirror out to websocket outbox to notify background worker indices
      emit('sync_chat_metrics', { messageCount: currentHistory.length + 1 });
    } catch (err) {
      dispatch(appendChatMessage({ role: 'assistant', content: 'Connection timed out. Could not parse AI instruction set.' }));
    } finally {
      dispatch(setChatLoading(false));
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="w-80 md:w-96 h-[450px] bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-2xl rounded-2xl overflow-hidden flex flex-col mb-4 transition-all animate-fade-in">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              <h3 className="font-semibold text-sm">Institutional AI Copilot</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:opacity-80 text-white">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages Wrapper */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50 dark:bg-slate-950/40">
            {chatHistory.length === 0 && (
              <div className="text-center text-xs text-gray-400 py-12">
                Ask anything regarding curriculum trends, fee profiles, or student assignments.
              </div>
            )}
            {chatHistory.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-3 py-2 rounded-xl text-xs shadow-sm ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white rounded-br-none'
                    : 'bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-200 rounded-bl-none border border-gray-100 dark:border-slate-700/50'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isChatLoading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-slate-800 px-3 py-2 rounded-xl border border-gray-100 dark:border-slate-700/50 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="h-1.5 w-1.5 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="h-1.5 w-1.5 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>

          {/* Input Footer */}
          <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-100 dark:border-slate-800 flex gap-2 bg-white dark:bg-slate-900">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your query..."
              className="flex-1 px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <Button type="submit" variant="primary" className="px-3 py-1.5 text-xs" isLoading={isChatLoading}>
              Send
            </Button>
          </form>
        </div>
      )}

      {/* Floating Toggle Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-12 w-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full flex items-center justify-center shadow-2xl focus:outline-none transition-transform active:scale-95"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>
    </div>
  );
};