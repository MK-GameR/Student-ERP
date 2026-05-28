import React, { useState } from 'react';

export const AIAssistant: React.FC = () => {
  const [activeTask, setActiveTask] = useState<string | null>(null);

  const triggerAutomation = async (taskName: string) => {
    setActiveTask(taskName);
    // Simulated remote container calculation workload execution
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setActiveTask(null);
    alert(`Automation complete: Contextual synthesis parameters generated for [${taskName}].`);
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900 p-5 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm space-y-4">
      <div>
        <h3 className="text-xs font-bold text-gray-900 dark:text-gray-100 tracking-wide uppercase">AI Assistant Control Desk</h3>
        <p className="text-[11px] text-gray-400 mt-0.5">Trigger targeted analysis routines directly on academic resource arrays</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          type="button"
          disabled={activeTask !== null}
          onClick={() => triggerAutomation('Audit Lab Complexity')}
          className="p-3 bg-slate-50 dark:bg-slate-950/40 border border-gray-200 dark:border-slate-800 text-left rounded-xl hover:border-blue-500 dark:hover:border-blue-500 transition-all group disabled:opacity-50"
        >
          <div className="text-blue-600 dark:text-blue-400 mb-1.5">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h4 className="text-xs font-bold text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {activeTask === 'Audit Lab Complexity' ? 'Analyzing...' : 'Audit Code Performance'}
          </h4>
          <p className="text-[10px] text-gray-400 mt-0.5">Parse code submissions for asymptotic scale vulnerabilities.</p>
        </button>

        <button
          type="button"
          disabled={activeTask !== null}
          onClick={() => triggerAutomation('Summarize Syllabus')}
          className="p-3 bg-slate-50 dark:bg-slate-950/40 border border-gray-200 dark:border-slate-800 text-left rounded-xl hover:border-purple-500 dark:hover:border-purple-500 transition-all group disabled:opacity-50"
        >
          <div className="text-purple-600 dark:text-purple-400 mb-1.5">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h4 className="text-xs font-bold text-gray-800 dark:text-gray-200 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
            {activeTask === 'Summarize Syllabus' ? 'Compressing...' : 'Summarize Syllabus'}
          </h4>
          <p className="text-[10px] text-gray-400 mt-0.5">Extract core conceptual vectors from massive course PDFs.</p>
        </button>

        <button
          type="button"
          disabled={activeTask !== null}
          onClick={() => triggerAutomation('Synthesize Practice MCQs')}
          className="p-3 bg-slate-50 dark:bg-slate-950/40 border border-gray-200 dark:border-slate-800 text-left rounded-xl hover:border-emerald-500 dark:hover:border-emerald-500 transition-all group disabled:opacity-50"
        >
          <div className="text-emerald-600 dark:text-emerald-400 mb-1.5">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <h4 className="text-xs font-bold text-gray-800 dark:text-gray-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
            {activeTask === 'Synthesize Practice MCQs' ? 'Compiling...' : 'Generate Practice MCQs'}
          </h4>
          <p className="text-[10px] text-gray-400 mt-0.5">Auto-generate customized mock testing batches matching your study pace.</p>
        </button>
      </div>
    </div>
  );
};