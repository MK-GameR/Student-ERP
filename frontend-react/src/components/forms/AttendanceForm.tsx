import React, { useState } from 'react';
import { Button } from '../common/Button';

interface StudentRoster {
  id: string;
  rollNo: number;
  name: string;
}

const mockRoster: StudentRoster[] = [
  { id: 'st-01', rollNo: 1, name: 'Mayur Kumavat' },
  { id: 'st-02', rollNo: 2, name: 'Amit Sharma' },
  { id: 'st-03', rollNo: 3, name: 'Priya Patel' },
];

export const AttendanceForm: React.FC = () => {
  const [courseCode, setCourseCode] = useState('CS-DSA');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceRecords, setAttendanceRecords] = useState<Record<string, 'PRESENT' | 'ABSENT'>>(
    mockRoster.reduce((acc, current) => ({ ...acc, [current.id]: 'PRESENT' }), {})
  );
  const [isSaving, setIsSaving] = useState(false);

  const toggleStatus = (id: string) => {
    setAttendanceRecords((prev) => ({
      ...prev,
      [id]: prev[id] === 'PRESENT' ? 'ABSENT' : 'PRESENT',
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // Mimic database operational latency
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    alert('Attendance ledger snapshot locked successfully.');
  };

  return (
    <form onSubmit={handleSave} className="w-full max-w-xl bg-white dark:bg-slate-900 p-5 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-gray-100 dark:border-slate-800 pb-3">
        <div>
          <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">Roll-Call Management Terminal</h3>
          <p className="text-xs text-gray-400">Commit real-time batch attendance state logs</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <select 
            value={courseCode} 
            onChange={(e) => setCourseCode(e.target.value)}
            className="px-2 py-1.5 text-xs border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-lg text-gray-800 dark:text-gray-200 focus:outline-none"
          >
            <option value="CS-DSA">Data Structures (DSA)</option>
            <option value="CS-DBMS">Database Technologies</option>
            <option value="CS-CPP">C++ Engine Architecture</option>
          </select>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="px-2 py-1.5 text-xs border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-lg text-gray-800 dark:text-gray-200 focus:outline-none"
          />
        </div>
      </div>

      <div className="divide-y divide-gray-100 dark:divide-slate-800/60 max-h-64 overflow-y-auto pr-1">
        {mockRoster.map((student) => {
          const isPresent = attendanceRecords[student.id] === 'PRESENT';
          return (
            <div key={student.id} className="flex justify-between items-center py-2.5">
              <div className="flex items-center gap-3 text-xs">
                <span className="font-mono font-bold text-gray-400">#{String(student.rollNo).padStart(2, '0')}</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{student.name}</span>
              </div>
              <button
                type="button"
                onClick={() => toggleStatus(student.id)}
                className={`px-3 py-1 text-[11px] font-bold tracking-wide uppercase rounded-md border transition-all ${
                  isPresent
                    ? 'bg-green-50 border-green-200 text-green-600 dark:bg-green-950/20 dark:border-green-900/40 dark:text-green-400'
                    : 'bg-red-50 border-red-200 text-red-600 dark:bg-red-950/20 dark:border-red-900/40 dark:text-red-400'
                }`}
              >
                {attendanceRecords[student.id]}
              </button>
            </div>
          );
        })}
      </div>

      <Button type="submit" variant="primary" className="w-full py-2 text-xs" isLoading={isSaving}>
        Commit Current Roster Snapshot
      </Button>
    </form>
  );
};