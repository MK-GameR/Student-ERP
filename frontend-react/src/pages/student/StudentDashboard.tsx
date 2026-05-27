import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { StudentAPI } from '../../services/api/student.api';
import { 
  setStudentDataStart, 
  setProfileSuccess, 
  setStudentDataFailure 
} from '../../redux/slices/studentSlice';
import { BookOpen, Calendar, CreditCard, Award, ArrowUpRight, Bell, AlertTriangle, RefreshCw } from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { profile, isLoading, error } = useAppSelector((state) => state.student);
  const { user } = useAppSelector((state) => state.auth);

  const fetchDashboardContext = async () => {
    dispatch(setStudentDataStart());
    try {
      const profileData = await StudentAPI.getProfile();
      dispatch(setProfileSuccess(profileData));
    } catch (err: any) {
      dispatch(setStudentDataFailure(err.message || 'Failed to capture backend telemetry models'));
    }
  };

  useEffect(() => {
    fetchDashboardContext();
  }, [dispatch]);

  // 1. Loading Skeleton Animation Screen
  if (isLoading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-40 bg-gray-200 dark:bg-gray-800 rounded-2xl w-full"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-28 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 h-64 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
          <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
        </div>
      </div>
    );
  }

  // 2. Clear and Actionable Error Fallback State
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4 text-center max-w-md mx-auto">
        <div className="p-3 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 rounded-2xl border border-red-100 dark:border-red-900/30">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-bold">Telemetry Aggregation Error</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{error}</p>
        </div>
        <button 
          onClick={fetchDashboardContext}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold shadow-md shadow-blue-500/10 transition-all"
        >
          <RefreshCw className="w-4 h-4" /> Retry Connection Sync
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Presentation Jumbotron banner matrix */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 lg:p-8 text-white shadow-lg">
        <h1 className="text-3xl font-bold tracking-tight">Welcome Back, {user?.name || 'Academic Scholar'}!</h1>
        <p className="mt-2 text-blue-100 max-w-xl text-sm md:text-base">
          Track your real-time class attendance logs, active curriculum grade book reports, and outstanding fee configurations instantly.
        </p>
        <div className="mt-4 inline-flex items-center gap-2 bg-blue-500/30 px-3 py-1.5 rounded-lg text-xs font-semibold backdrop-blur-sm border border-white/10">
          Curriculum Track: Class {profile?.className || 'N/A'} — Section {profile?.section || 'N/A'}
        </div>
      </div>

      {/* Grid Dashboard Metric Action Panels Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card 1: Attendance Snapshot */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-center justify-between">
          <div className="space-y-2">
            <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">Net Attendance</span>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">88.4%</h3>
            <span className="text-xs text-green-500 font-semibold flex items-center gap-1">Above Threshold Requirement</span>
          </div>
          <div className="h-12 w-12 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <Calendar className="w-6 h-6" />
          </div>
        </div>

        {/* Card 2: Module Academic Standing KPI */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-center justify-between">
          <div className="space-y-2">
            <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">Current CGPA Rating</span>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">9.42 / 10</h3>
            <span className="text-xs text-blue-500 font-semibold flex items-center gap-1">Top 5% Rank Standing</span>
          </div>
          <div className="h-12 w-12 bg-blue-50 dark:bg-blue-950/30 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400">
            <Award className="w-6 h-6" />
          </div>
        </div>

        {/* Card 3: Outstanding Academic Ledger */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-center justify-between">
          <div className="space-y-2">
            <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">Pending Fees Ledger</span>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">$1,250.00</h3>
            <span className="text-xs text-amber-500 font-semibold flex items-center gap-1">Due Date: June 15th</span>
          </div>
          <div className="h-12 w-12 bg-amber-50 dark:bg-amber-950/30 rounded-lg flex items-center justify-center text-amber-600 dark:text-amber-400">
            <CreditCard className="w-6 h-6" />
          </div>
        </div>

        {/* Card 4: Library Asset Allocation Meter */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-center justify-between">
          <div className="space-y-2">
            <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">Borrowed Books</span>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">2 Active</h3>
            <span className="text-xs text-gray-400 font-medium">0 Overdue Penalties</span>
          </div>
          <div className="h-12 w-12 bg-purple-50 dark:bg-purple-950/30 rounded-lg flex items-center justify-center text-purple-600 dark:text-purple-400">
            <BookOpen className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Primary Context Dashboard Data Grid splits layout panel frameworks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side Section: Course Schedule Timeline Roster list */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold tracking-tight">Today's Class Schedule Lectures</h3>
            <span className="text-xs text-blue-600 font-bold hover:underline cursor-pointer flex items-center gap-1">
              Full Calendar Timetable <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>

          <div className="space-y-4">
            {[
              { subject: 'Advanced Data Structures & Analysis', time: '09:00 AM - 10:30 AM', instructor: 'Dr. A. Panchal', room: 'Lab Block C-3' },
              { subject: 'Relational Database Management Engines', time: '11:00 AM - 12:30 PM', instructor: 'Prof. R. Sharma', room: 'Seminar Hall 2' },
              { subject: 'Full-Stack Software Engineering Lab', time: '02:00 PM - 04:30 PM', instructor: 'Er. S. Verma', room: 'Cloud Computing Hub' }
            ].map((lecture, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/40 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-blue-500/40 dark:hover:border-blue-400/40 transition-all gap-3">
                <div className="space-y-1">
                  <h4 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white">{lecture.subject}</h4>
                  <p className="text-xs text-gray-400 font-medium flex items-center gap-2">
                    <span>{lecture.time}</span> • <span>{lecture.instructor}</span>
                  </p>
                </div>
                <div className="text-left shrink-0">
                  <span className="text-xs font-bold px-2.5 py-1 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 rounded-md border border-blue-100 dark:border-blue-900/50">
                    {lecture.room}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side Section: Live Bulletin Broadcast Feed notifications */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Bell className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-bold tracking-tight">Campus News & Broadcasts</h3>
            </div>

            <div className="space-y-5">
              {[
                { title: 'End-Semester Theory Exam Registrations', date: 'May 28, 2026', body: 'The portal is open for submitting exam entry codes. Ensure all clearances are validated.' },
                { title: 'Campus Hackathon Drive Announcement', date: 'May 24, 2026', body: 'Registration link for the annual 36-hour coding track challenge is now live.' }
              ].map((news, idx) => (
                <div key={idx} className="space-y-1 pb-4 border-b border-gray-100 dark:border-gray-700 last:border-0 last:pb-0">
                  <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">{news.date}</span>
                  <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 hover:text-blue-500 cursor-pointer">{news.title}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">{news.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};