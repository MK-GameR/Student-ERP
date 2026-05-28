import React from 'react';
import { Award, FileText} from 'lucide-react';

export const CertificatesPage: React.FC = () => {
  const accomplishments = [
    { title: 'Data Structures & Algorithms (DSA)', provider: 'Career Credentials • Dr. Amar Panchal', tag: 'Module Topper', code: 'CRT-DSA-987' },
    { title: 'C++ Systems Architecture Engineering', provider: 'Career Credentials Matrix', tag: 'Certified Complete', code: 'CRT-CPP-341' },
    { title: 'Database Management Systems & Optimization', provider: 'C-DAC Institutional Curriculum', tag: 'Module Topper', code: 'CRT-DBMS-102' },
  ];

  return (
    <div className="space-y-6 p-6 bg-slate-50 dark:bg-slate-950 min-h-screen">
      <div>
        <h1 className="text-xl font-black tracking-tight text-gray-900 dark:text-white">Professional Credentials Index</h1>
        <p className="text-xs text-gray-400">Verified cryptographic hash tracking for academic module milestones</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {accomplishments.map((cert, idx) => (
          <div key={idx} className="p-5 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl shadow-sm flex flex-col justify-between group hover:border-blue-500/40 transition-colors">
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <div className="p-2 bg-blue-50 dark:bg-blue-950/30 text-blue-600 rounded-xl">
                  <Award className="h-5 w-5" />
                </div>
                <span className="text-[9px] font-extrabold tracking-wide uppercase px-2 py-0.5 bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400 rounded-md border border-emerald-100 dark:border-emerald-900/30">
                  {cert.tag}
                </span>
              </div>
              <div className="space-y-1 pt-1">
                <h3 className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{cert.title}</h3>
                <p className="text-[11px] text-gray-400">{cert.provider}</p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-gray-100 dark:border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-gray-400">
              <span>ID: {cert.code}</span>
              <button className="flex items-center gap-1 text-blue-600 font-bold font-sans hover:underline">
                <FileText className="h-3 w-3" />
                Fetch PDF
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};