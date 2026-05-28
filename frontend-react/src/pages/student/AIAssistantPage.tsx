import React from 'react';
import { AIChatbot } from '../../components/ai/AiChatbot';
import { AIAssistant } from '../../components/ai/AIAssistant';
import { AIAnalytics } from '../../components/ai/AIAnalytics';

export const AIAssistantPage: React.FC = () => {
  return (
    <div className="space-y-6 p-6 bg-slate-50 dark:bg-slate-950 min-h-screen">
      <div>
        <h1 className="text-xl font-black tracking-tight text-gray-900 dark:text-white">EduSphere AI Intelligence Matrix</h1>
        <p className="text-xs text-gray-400">Context-aware generative modeling tools mapping student telemetry profiles</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2 space-y-6">
          <AIAssistant />
          <AIAnalytics />
        </div>
        <div className="w-full">
          <AIChatbot />
        </div>
      </div>
    </div>
  );
};