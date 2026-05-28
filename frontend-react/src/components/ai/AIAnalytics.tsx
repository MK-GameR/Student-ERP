import React from 'react';

interface MetricMetricRow {
  label: string;
  score: number;
  status: 'OPTIMAL' | 'ELEVATED' | 'CRITICAL';
}

const predictiveMetrics: MetricMetricRow[] = [
  { label: 'Syllabus Traversal Velocity', score: 94, status: 'OPTIMAL' },
  { label: 'Conceptual Concept Retention Index', score: 81, status: 'OPTIMAL' },
  { label: 'Code Execution Complexity Risk', score: 42, status: 'ELEVATED' },
  { label: 'Predictive Exam Readiness Matrix', score: 88, status: 'OPTIMAL' },
];

export const AIAnalytics: React.FC = () => {
  return (
    <div className="w-full bg-white dark:bg-slate-900 p-5 rounded-2xl border border-gray-200 dark:border-slate-800/80 shadow-sm space-y-4">
      <div>
        <h3 className="text-xs font-bold text-gray-900 dark:text-gray-100 tracking-wide uppercase">AI Predictive Diagnostics</h3>
        <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5">Automated telemetry tracking derived from platform interactions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Metric Progress Bars */}
        <div className="space-y-3.5">
          {predictiveMetrics.map((metric, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between items-center text-xs font-medium">
                <span className="text-gray-700 dark:text-gray-300">{metric.label}</span>
                <span className="font-mono text-gray-900 dark:text-gray-100 font-bold">{metric.score}%</span>
              </div>
              <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${
                    metric.status === 'OPTIMAL' ? 'bg-blue-500' : metric.status === 'ELEVATED' ? 'bg-amber-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${metric.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Abstract Insight Executive Blurb */}
        <div className="bg-slate-50 dark:bg-slate-950/40 border border-gray-100 dark:border-slate-800/60 p-4 rounded-xl flex flex-col justify-between">
          <div className="space-y-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-purple-50 dark:bg-purple-950/20 text-purple-600 dark:text-purple-400 border border-purple-100 dark:border-purple-900/30 uppercase tracking-wide">
              Synthesis Output
            </span>
            <p className="text-xs leading-relaxed text-gray-600 dark:text-gray-300">
              The neural analysis network indicates strong memory layout mastery in C++ and optimized execution steps across structured recursive loops. Minor bottlenecks remain localized within database normalization normalization pipelines.
            </p>
          </div>
          <div className="pt-2 border-t border-gray-200/50 dark:border-slate-800 text-[10px] font-medium text-gray-400 dark:text-gray-500 flex justify-between">
            <span>Model Ref: DistilBERT-v4</span>
            <span>Confidence: 94.2%</span>
          </div>
        </div>
      </div>
    </div>
  );
};