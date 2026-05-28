import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { markAsRead } from '../../redux/slices/notificationSlice';

export const NotificationBell: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, unreadCount } = useAppSelector((state) => state.notification);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 focus:outline-none"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 inline-flex items-center justify-center px-1.5 py-0.5 text-2xl font-bold leading-none text-white bg-red-500 rounded-full scale-50 transform origin-top-right">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 z-50 py-1 overflow-hidden border border-gray-100 dark:border-slate-800">
          <div className="px-4 py-2 font-semibold text-sm text-gray-800 dark:text-gray-200 border-b border-gray-100 dark:border-slate-800">
            Notifications Log
          </div>
          <div className="max-h-64 overflow-y-auto">
            {items.length === 0 ? (
              <div className="px-4 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
                Inbox clear. No new notifications.
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  onClick={() => dispatch(markAsRead(item.id))}
                  className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-slate-800/60 cursor-pointer transition-colors border-b border-gray-50 dark:border-slate-800/40 ${
                    !item.isRead ? 'bg-blue-50/40 dark:bg-blue-950/10' : ''
                  }`}
                >
                  <p className="text-xs font-semibold text-gray-900 dark:text-gray-100">{item.title}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{item.message}</p>
                  <span className="text-[10px] text-gray-400 dark:text-gray-500 block mt-1">{item.timestamp}</span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};