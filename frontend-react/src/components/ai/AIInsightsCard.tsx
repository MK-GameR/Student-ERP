import React from 'react';

interface AIInsightsCardProps {
  topic?: string;
  finding?: string;
  remediation?: string;
  impactLevel?: 'HIGH' | 'MODERATE' | 'LOW';
}

export const AIInsightsCard: React.FC<AIInsightsCardProps> = ({
  topic = "Object Relative Memory Layout Allocation",
  finding = "Redundant pointer copying detected inside nested iterations of the C-DAC C++ laboratory assignments.",
  remediation = "Implement explicit references or pass-by-pointer vectors to completely eliminate stack thrashing.",
  impactLevel = "HIGH"
}) => {
  return (
    <div className="w-full bg-gradient-to-br from-white to-slate-50/50 dark:from-slate-900 dark:to-slate-950/40 p-4 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row gap-4 items-start">
      {/* Visual Impact Status Frame */}
      <div className={`p-2 rounded-lg shrink-0 ${
        impactLevel === 'HIGH' 
          ? 'bg-red-50 text-red-600 dark:bg-red-950/20 dark:text-red-400' 
          : 'bg-amber-50 text-amber-600 dark:bg-amber-950/20 dark:text-amber-400'
      }`}>
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>

      {/* Insight Context Tree */}
      <div className="space-y-1.5 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h4 className="text-xs font-bold text-gray-900 dark:text-gray-100">{topic}</h4>
          <span className={`text-[9px] font-extrabold tracking-wider px-1.5 py-0.5 rounded uppercase ${
            impactLevel === 'HIGH'
              ? 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400'
              : 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400'
          }`}>
            Priority {impactLevel}
          </span>
        </div>
        
        <p className="text-xs text-gray-600 dark:text-gray-300 leading-normal">{finding}</p>
        
        <div className="text-[11px] bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-850 p-2.5 rounded-lg text-gray-500 dark:text-gray-400">
          <strong className="text-blue-600 dark:text-blue-400 font-semibold">Suggested Remediation:</strong> {remediation}
        </div>
      </div>
    </div>
  );
};