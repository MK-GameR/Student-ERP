import React, { useState } from 'react';
import { Input } from '../common/Input';
import { Button } from '../common/Button';

export const FeeForm: React.FC = () => {
  const [studentId, setStudentId] = useState('');
  const [amount, setAmount] = useState('');
  const [channel, setChannel] = useState('UPI');
  const [txRef, setTxRef] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentId || !amount || !txRef) {
      alert('All banking reference indicators are strict mandatory configurations.');
      return;
    }

    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsProcessing(false);
    
    setStudentId('');
    setAmount('');
    setTxRef('');
    alert('Invoice allocation settled clear in accounting matrices.');
  };

  return (
    <form onSubmit={handlePaymentSubmit} className="w-full max-w-md bg-white dark:bg-slate-900 p-5 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm space-y-4">
      <div>
        <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">Reconcile Fee Payment Voucher</h3>
        <p className="text-xs text-gray-400">Commit settlement confirmation to financial ledger matrices</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input
          label="UID Student Registration"
          type="text"
          placeholder="MET-CDAC-2026"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />
        <Input
          label="Settled Value (INR)"
          type="number"
          placeholder="45000"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Transaction Gateway Mode</label>
        <div className="grid grid-cols-3 gap-2">
          {['UPI', 'NetBanking', 'Card Vault'].map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setChannel(mode)}
              className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                channel === mode
                  ? 'bg-blue-50 text-blue-600 border-blue-500 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-500'
                  : 'bg-white text-gray-600 border-gray-200 dark:bg-slate-900 dark:text-gray-400 dark:border-slate-800'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      <Input
        label="Bank Reference Verification Hash"
        type="text"
        placeholder="TXN-9876543210-OK"
        value={txRef}
        onChange={(e) => setTxRef(e.target.value)}
      />

      <Button type="submit" variant="primary" className="w-full py-2.5 text-xs font-semibold" isLoading={isProcessing}>
        Finalize Ledger Settlement
      </Button>
    </form>
  );
};