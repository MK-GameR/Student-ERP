import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { StudentAPI } from '../../services/api/student.api';
import { setFeesSuccess } from '../../redux/slices/studentSlice';
import { CreditCard, Download, ExternalLink, Receipt } from 'lucide-react';

export const StudentFees: React.FC = () => {
  const dispatch = useAppDispatch();
  const { fees } = useAppSelector((state) => state.student);

  useEffect(() => {
    const loadFees = async () => {
      try {
        const data = await StudentAPI.getFees();
        dispatch(setFeesSuccess(data));
      } catch (err) { console.error(err); }
    };
    loadFees();
  }, [dispatch]);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Payment Balance Card */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 dark:from-blue-900 dark:to-indigo-900 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
          <CreditCard className="absolute -right-4 -bottom-4 w-32 h-32 text-white/5 rotate-12" />
          <p className="text-sm font-medium text-blue-200 uppercase tracking-widest">Total Outstanding Balance</p>
          <h2 className="text-4xl font-extrabold mt-2">${fees?.totalAmount.toLocaleString()}</h2>
          <div className="mt-8 flex gap-4">
            <button className="bg-blue-600 hover:bg-blue-500 px-6 py-2.5 rounded-lg text-sm font-bold transition-all shadow-lg shadow-blue-600/30">
              Pay Online Now
            </button>
            <button className="bg-white/10 hover:bg-white/20 border border-white/10 px-6 py-2.5 rounded-lg text-sm font-bold backdrop-blur-md">
              Download Invoice
            </button>
          </div>
        </div>

        {/* Payment Summary Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
            <p className="text-xs text-gray-400 font-bold uppercase mb-1">Last Paid Date</p>
            <p className="text-lg font-bold">Oct 12, 2025</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
            <p className="text-xs text-gray-400 font-bold uppercase mb-1">Due Date</p>
            <p className="text-lg font-bold text-red-500">Jun 15, 2026</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm col-span-2 flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 font-bold uppercase mb-1">Payment Status</p>
              <p className="text-lg font-bold text-amber-500">Partially Paid</p>
            </div>
            <Receipt className="w-8 h-8 text-gray-200" />
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold px-1">Transaction History</h3>
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
          {fees?.transactions.map((t, idx) => (
            <div key={t.id} className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/40 border-b border-gray-100 dark:border-gray-700 last:border-0 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <ExternalLink className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-bold">Tuition Fee - Installment {idx + 1}</p>
                  <p className="text-xs text-gray-400 font-medium">{t.date} • {t.method}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-gray-900 dark:text-white">${t.amount}</p>
                <button className="text-[10px] text-blue-600 font-bold uppercase flex items-center gap-1 mt-1">
                  <Download className="w-3 h-3" /> Receipt
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};