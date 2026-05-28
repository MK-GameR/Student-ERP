import React from 'react';

export const AIRecommendationPanel: React.FC = () => {
  return (
    <div className="p-4 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl">
      <h3 className="text-xs font-bold uppercase tracking-wide text-gray-400">AI Recommendations</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
        Processing telemetry... awaiting analytical stream.
      </p>
    </div>
  );
};