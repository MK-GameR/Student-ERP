import React from 'react';

interface TableProps {
  headers: string[];
  children: React.ReactNode;
  className?: string;
}

export const Table: React.FC<TableProps> = ({ headers, children, className = '' }) => {
  return (
    <div className={`w-full overflow-x-auto rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm ${className}`}>
      <table className="w-full text-left border-collapse bg-white dark:bg-slate-900">
        <thead className="bg-slate-50 dark:bg-slate-950/60 border-b border-gray-200 dark:border-slate-800">
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="px-6 py-3.5 text-xs font-semibold tracking-wider text-gray-500 dark:text-gray-400 uppercase"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-slate-800/60 text-sm text-gray-700 dark:text-gray-300">
          {children}
        </tbody>
      </table>
    </div>
  );
};