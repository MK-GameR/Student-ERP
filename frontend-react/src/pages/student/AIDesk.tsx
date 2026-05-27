import React, { useState, useRef, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { AI_API } from '../services/api/ai.api';
import { appendChatMessage, setChatLoading } from '../redux/slices/aiSlice';
import { BrainCircuit, Send, Sparkles, User, Bot, Loader2 } from 'lucide-react';

export const AIDesk: React.FC = () => {
  const dispatch = useAppDispatch();
  const { chatHistory, isChatLoading } = useAppSelector((state) => state.ai);
  const [input, setInput] = useState('');
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, isChatLoading]);

  const handleSendMessage = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput || isChatLoading) return;

    const userMessage = { role: 'user' as const, content: trimmedInput };
    
    setInput('');
    const updatedHistorySnapshot = [...chatHistory, userMessage];
    
    dispatch(appendChatMessage(userMessage));
    dispatch(setChatLoading(true));

    try {
      const response = await AI_API.sendMessage(updatedHistorySnapshot);
      dispatch(appendChatMessage({ role: 'assistant', content: response.reply }));
    } catch (err) {
      dispatch(appendChatMessage({ 
        role: 'assistant', 
        content: "I'm sorry, my neural pathways are temporarily congested." 
      }));
    } finally {
      dispatch(setChatLoading(false));
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[calc(100vh-10rem)]">
      
      {/* Left Column: AI Performance Insights */}
      <div className="lg:col-span-5 space-y-6 overflow-y-auto pr-2">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-blue-100 dark:border-blue-900/30 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-bold">Neural Performance Insights</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Core Strengths</p>
              <div className="flex flex-wrap gap-2">
                {['Algorithmic Logic', 'Data Science', 'Consistent Attendance'].map(s => (
                  <span key={s} className="px-3 py-1 bg-green-50 dark:bg-green-950/40 text-green-600 dark:text-green-400 text-[10px] font-bold rounded-full border border-green-100 dark:border-green-900/50">{s}</span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Predicted GPA Trend</p>
              <div className="h-32 bg-gray-50 dark:bg-gray-700/50 rounded-xl flex items-end justify-between p-4 gap-2">
                {[40, 60, 50, 90, 85].map((h, i) => (
                  <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-blue-500 rounded-t-md transition-all duration-500"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: AI Chat Interface */}
      <div className="lg:col-span-7 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl flex flex-col overflow-hidden">
        <div className="p-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold">EduAI Assistant</h4>
              <p className="text-[10px] text-green-500 font-bold uppercase tracking-tighter">Online • Sandbox Engine Ready</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {chatHistory.length === 0 && (
            <div className="text-center py-10">
              <p className="text-sm text-gray-400">Ask me anything about your syllabus, exam dates, or performance trends!</p>
            </div>
          )}
          {chatHistory.map((msg, i) => (
            <div key={i} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600 dark:bg-gray-700'}`}>
                {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-gray-50 dark:bg-gray-700/50 text-gray-800 dark:text-gray-200 rounded-tl-none'}`}>
                {msg.content}
              </div>
            </div>
          ))}
          {isChatLoading && (
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center"><Bot className="w-4 h-4" /></div>
              <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-2xl rounded-tl-none"><Loader2 className="w-4 h-4 animate-spin" /></div>
            </div>
          )}
          <div ref={chatBottomRef} />
        </div>

        <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-700 rounded-xl px-4 py-2 border border-gray-200 dark:border-gray-600 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask about your GPA or attendance..."
              className="flex-1 bg-transparent border-none focus:outline-none text-sm py-2 text-gray-900 dark:text-gray-100"
            />
            <button 
              onClick={handleSendMessage} 
              disabled={!input.trim() || isChatLoading} 
              className="text-blue-600 disabled:opacity-30 p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};