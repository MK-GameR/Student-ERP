import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { StudentAPI } from '../../services/api/student.api';
import { setAttendanceSuccess, setStudentDataStart } from '../../redux/slices/studentSlice';
import { CheckCircle, XCircle, Clock, Loader2, CalendarRange } from 'lucide-react';

export const StudentAttendance: React.FC = () => {
  const dispatch = useAppDispatch();
  // Safe array fallback assignment prevents undefined mapping crashes
  const { attendance = [], isLoading } = useAppSelector((state) => state.student);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const loadAttendance = async () => {
      dispatch(setStudentDataStart());
      try {
        const data = await StudentAPI.getAttendance();
        dispatch(setAttendanceSuccess(data));
      } catch (err) {
        console.error('Attendance Load Error', err);
      }
    };
    loadAttendance();
  }, [dispatch]);

  // Derived metrics with defensive initialization safeguards
  const stats = {
    present: attendance.filter(a => a.status === 'Present').length,
    absent: attendance.filter(a => a.status === 'Absent').length,
    late: attendance.filter(a => a.status === 'Late').length,
  };

  const filteredAttendance = attendance.filter(
    a => filter === 'All' || a.status === filter
  );

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <p className="text-sm font-medium text-gray-400">Compiling ledger matrix logs...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold tracking-tight">Attendance Logs</h2>
        
        {/* Filter Toggle Bar */}
        <div className="flex items-center gap-2 bg-white dark:bg-gray-800 p-1 rounded-lg border border-gray-200 dark:border-gray-700 w-fit">
          {['All', 'Present', 'Absent', 'Late'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${
                filter === f 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Analytics Summary Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-emerald-100 dark:border-emerald-900/30 flex items-center gap-4 shadow-sm">
          <div className="p-2 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-lg">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Total Present</p>
            <p className="text-xl font-bold text-gray-900 dark:text-gray-100">{stats.present} Days</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-red-100 dark:border-red-900/30 flex items-center gap-4 shadow-sm">
          <div className="p-2 bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 rounded-lg">
            <XCircle className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Total Absent</p>
            <p className="text-xl font-bold text-gray-900 dark:text-gray-100">{stats.absent} Days</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-amber-100 dark:border-amber-900/30 flex items-center gap-4 shadow-sm">
          <div className="p-2 bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 rounded-lg">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Late Arrivals</p>
            <p className="text-xl font-bold text-gray-900 dark:text-gray-100">{stats.late} Days</p>
          </div>
        </div>
      </div>

      {/* Attendance Table Window */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 dark:bg-gray-700/40 text-xs font-bold uppercase text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
            <tr>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Remarks</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {filteredAttendance.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center py-12 text-sm text-gray-400">
                  <div className="flex flex-col items-center gap-2">
                    <CalendarRange className="w-8 h-8 text-gray-300 dark:text-gray-600" />
                    <span>No records found for filter choice: "{filter}"</span>
                  </div>
                </td>
              </tr>
            ) : (
              filteredAttendance.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">{row.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      row.status === 'Present' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400' :
                      row.status === 'Absent' ? 'bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400' :
                      'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-500 dark:text-gray-400">{row.remarks || '—'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};