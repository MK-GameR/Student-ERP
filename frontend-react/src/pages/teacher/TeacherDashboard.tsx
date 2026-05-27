import React, { useEffect, useState } from 'react';
import { TeacherAPI } from '../../services/api/teacher.api';
import type { ClassSchedule } from '../../services/api/teacher.api';
import { Users, ClipboardCheck, BookOpen, Clock, ChevronRight, AlertCircle } from 'lucide-react';

export const TeacherDashboard: React.FC = () => {
  const [schedules, setSchedules] = useState<ClassSchedule[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true; // Flag variable to trap detached memory assignments

    const loadTeacherContext = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await TeacherAPI.getSchedules();
        if (isMounted) {
          setSchedules(data || []);
        }
      } catch (err) {
        console.error('Failed to resolve teacher schedules', err);
        if (isMounted) {
          setError('Could not establish a stable connection to your timetable roster.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadTeacherContext();

    // Cancel state commits if the component unmounts mid-transit
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="space-y-8">
      {/* Informative Header Profile Panel */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Faculty Portal</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Welcome back. Here is your academic roadmap for today's curriculum.</p>
        </div>
        <div className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest bg-gray-50 dark:bg-gray-700/50 px-4 py-2 rounded-xl border border-gray-100 dark:border-gray-700">
          Term: Summer 2026 Batch
        </div>
      </div>

      {/* KPI Highlight Summary Cards Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Assigned Rosters</span>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">3 Classes</h3>
          </div>
          <div className="h-10 w-10 bg-blue-50 dark:bg-blue-950/40 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400"><BookOpen className="w-5 h-5" /></div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Handled Students</span>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">142 Enrolled</h3>
          </div>
          <div className="h-10 w-10 bg-purple-50 dark:bg-purple-950/40 rounded-lg flex items-center justify-center text-purple-600 dark:text-purple-400"><Users className="w-5 h-5" /></div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Attendance Status</span>
            <h3 className="text-2xl font-bold text-emerald-500">100% Verified</h3>
          </div>
          <div className="h-10 w-10 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg flex items-center justify-center text-emerald-600 dark:text-emerald-400"><ClipboardCheck className="w-5 h-5" /></div>
        </div>
      </div>

      {/* Main Structural Flow Grid splitting */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Dynamic Class Timelines List Engine */}
        <div className="lg:col-span-8 bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm space-y-6">
          <h3 className="text-lg font-bold tracking-tight">Your Complete Lecture Timetable</h3>
          
          {isLoading ? (
            <div className="space-y-4 animate-pulse">
              {[...Array(3)].map((_, idx) => <div key={idx} className="h-20 bg-gray-100 dark:bg-gray-700 rounded-xl" />)}
            </div>
          ) : error ? (
            <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 text-red-600 dark:text-red-400 text-xs font-semibold rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4" /> {error}
            </div>
          ) : schedules.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 dark:bg-gray-700/20 rounded-xl border border-dashed border-gray-200 dark:border-gray-700">
              <Clock className="w-8 h-8 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
              <p className="text-xs font-medium text-gray-400">No scheduled sessions cataloged for today.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {schedules.map((lecture) => (
                <div key={lecture.id} className="p-4 bg-gray-50 dark:bg-gray-700/30 rounded-xl border border-gray-100 dark:border-gray-700 flex items-center justify-between hover:border-blue-500/30 dark:hover:border-blue-400/30 transition-all group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm sm:text-base text-gray-900 dark:text-white">{lecture.subject}</h4>
                      <p className="text-xs text-gray-400 mt-0.5">{lecture.className} • Room {lecture.roomNo}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold px-3 py-1 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
                      {lecture.timeSlot}
                    </span>
                    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Quick Tools Component Box Container Panel */}
        <div className="lg:col-span-4 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-xl flex flex-col justify-between">
          <div className="space-y-2">
            <h4 className="font-bold text-lg">AI Smart Gradebook Assistant</h4>
            <p className="text-xs text-blue-100 leading-relaxed">
              Instantly run predictive performance matrices on semester rosters or generate custom coding problem tracks dynamically tailored to classroom weaknesses.
            </p>
          </div>
          <button className="w-full bg-white text-blue-600 font-bold py-2.5 rounded-xl text-xs hover:bg-blue-50 transition-colors shadow-lg mt-6">
            Launch AI Grading Suite
          </button>
        </div>
      </div>
    </div>
  );
};