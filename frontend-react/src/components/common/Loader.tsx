import React from 'react';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
}

export const Loader: React.FC<LoaderProps> = ({ size = 'md', fullScreen = false }) => {
  const dimensions = {
    sm: 'h-6 w-6 stroke-[3]',
    md: 'h-10 w-10 stroke-[2.5]',
    lg: 'h-16 w-16 stroke-[2]',
  };

  const containerStyles = fullScreen
    ? 'fixed inset-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm flex items-center justify-center'
    : 'w-full py-12 flex items-center justify-center';

  return (
    <div className={containerStyles}>
      <svg
        className={`animate-spin text-blue-600 dark:text-blue-500 ${dimensions[size]}`}
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
    </div>
  );
};