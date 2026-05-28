import React from 'react';

interface BreadcrumbItem {
  label: string;
  active?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="flex px-1 py-2 text-gray-500 dark:text-gray-400" aria-label="Breadcrumb navigation trail">
      <ol className="inline-flex items-center space-x-1.5 md:space-x-2 text-xs font-medium">
        <li className="inline-flex items-center">
          <span className="text-gray-400 dark:text-gray-600 mr-2">Core Desk</span>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <svg className="w-3 h-3 text-gray-300 dark:text-slate-700 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            <span className={`${item.active ? 'text-gray-800 dark:text-gray-200 font-semibold' : 'text-gray-400 dark:text-gray-500'}`}>
              {item.label}
            </span>
          </li>
        ))}
      </ol>
    </nav>
  );
};