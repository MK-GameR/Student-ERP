import React from 'react';
import { StudentGrowthChart } from '../../components/charts/StudentGrowthChart';
import { AIInsightsCard } from '../../components/ai/AIInsightsCard';
import { AIRecommendationPanel } from '../../components/ai/AIRecommendationPanel';
import { BookOpen, CheckCircle, Clock, Award } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-6 p-6 bg-slate-50 dark:bg-slate-950 min-h-screen text-gray-900 dark:text-gray-100">
      <div>
        <h1 className="text-xl font-black tracking-tight">Student Workspace Terminal</h1>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Real-time synchronization engine feed</p>
      </div>

      {/* Top Banner Metric Blocks */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Overall Attendance', val: '94.2%', icon: CheckCircle, color: 'text-emerald-500' },
          { label: 'Pending Assignments', val: '3 Tasks', icon: Clock, color: 'text-amber-500' },
          { label: 'Current Semester CGPA', val: '9.12 / 10', icon: Award, color: 'text-blue-500' },
          { label: 'Active Modules', val: '4 Streams', icon: BookOpen, color: 'text-purple-500' },
        ].map((item, i) => (
          <div key={i} className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400">{item.label}</span>
              <p className="text-lg font-black font-mono">{item.val}</p>
            </div>
            <item.icon className={`h-5 w-5 ${item.color}`} />
          </div>
        ))}
      </div>

      {/* AI Telemetry Strip */}
      <AIInsightsCard 
        topic="Data Structures Module Acceleration"
        finding="You achieved Module Topper designation! Your graph traversal time complexities are perfect, but tree height balancing requires review."
        remediation="Execute the recommended AVL or Red-Black Tree optimization interactive challenge loops."
        impactLevel="MODERATE"
      />

      {/* Analytics Matrix Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <StudentGrowthChart />
        </div>
        <div>
          <AIRecommendationPanel />
        </div>
      </div>
    </div>
  );
};