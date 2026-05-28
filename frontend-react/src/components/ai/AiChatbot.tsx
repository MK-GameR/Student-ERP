import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../common/Button';

interface ChatMessage {
  id: string;
  sender: 'USER' | 'AI';
  text: string;
  timestamp: Date;
}

export const AIChatbot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'AI',
      text: "Greetings. I've indexed your current educational parameters. Ask me anything about your current module metrics or request optimization reviews for code execution blocks.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const scrollAnchor = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollAnchor.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isGenerating]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isGenerating) return;

    const userPayload: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'USER',
      text: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userPayload]);
    setInput('');
    setIsGenerating(true);

    // Simulate AI inference latency stream
    setTimeout(() => {
      const aiPayload: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'AI',
        text: "Analyzing query constraints... Based on your module criteria for Database Technologies and C++ class layout structures, your relational index configurations are running optimal, but memory leaks were flagged inside your subquery layers.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiPayload]);
      setIsGenerating(false);
    }, 1400);
  };

  return (
    <div className="w-full max-w-md h-[500px] bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden">
      {/* Top Banner Control */}
      <div className="px-4 py-3 bg-slate-50 dark:bg-slate-950 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative h-2.5 w-2.5 bg-emerald-500 rounded-full animate-pulse">
            <span className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-75" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-gray-900 dark:text-gray-100 tracking-wide">EduSphere AI Assistant</h3>
            <p className="text-[10px] text-gray-400">LLM Inference Node Active</p>
          </div>
        </div>
      </div>

      {/* Main Dialogue Stream Frame */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3.5 custom-scrollbar">
        {messages.map((msg) => {
          const isUser = msg.sender === 'USER';
          return (
            <div key={msg.id} className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[85%] px-3.5 py-2.5 rounded-xl text-xs leading-relaxed transition-colors shadow-sm ${
                  isUser
                    ? 'bg-blue-600 text-white rounded-tr-none'
                    : 'bg-slate-100 dark:bg-slate-800/70 text-gray-800 dark:text-gray-200 rounded-tl-none border border-gray-200/40 dark:border-slate-700/30'
                }`}
              >
                <p>{msg.text}</p>
                <span className={`block text-[9px] mt-1 text-right ${isUser ? 'text-blue-200' : 'text-gray-400 dark:text-gray-500'}`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          );
        })}

        {isGenerating && (
          <div className="flex w-full justify-start animate-pulse">
            <div className="bg-slate-100 dark:bg-slate-800/70 px-4 py-3 rounded-xl rounded-tl-none border border-gray-200/40 dark:border-slate-700/30 flex items-center gap-1">
              <span className="h-1.5 w-1.5 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="h-1.5 w-1.5 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="h-1.5 w-1.5 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
        <div ref={scrollAnchor} />
      </div>

      {/* Input Form Submission Engine */}
      <form onSubmit={handleSendMessage} className="p-3 bg-slate-50 dark:bg-slate-950 border-t border-gray-100 dark:border-slate-800 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about your academic performance trail..."
          className="flex-1 px-3 py-2 text-xs bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-inner"
        />
        <Button type="submit" variant="primary" className="px-3 rounded-xl" disabled={isGenerating || !input.trim()}>
          <svg className="h-4 w-4 transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </Button>
      </form>
    </div>
  );
};