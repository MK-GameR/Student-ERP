import React, { useState } from 'react';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';

export const ResetPasswordPage: React.FC = () => {
  const [newKey, setNewKey] = useState('');
  const [confirmKey, setConfirmKey] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [errorText, setErrorText] = useState('');

  const executeReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorText('');

    if (newKey !== confirmKey) {
      setErrorText('Security key descriptors are completely unmatched.');
      return;
    }

    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSaving(false);

    alert('Root authorization descriptors mutated successfully.');
    window.location.href = '/auth/login';
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4">
      <form onSubmit={executeReset} className="w-full max-w-sm bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-xl space-y-4">
        <div className="space-y-1">
          <h2 className="text-base font-bold text-gray-900 dark:text-gray-100">Override Security Keys</h2>
          <p className="text-xs text-gray-400 dark:text-gray-500">Provide a new uncompromised entry pass key structure</p>
        </div>

        {errorText && (
          <div className="p-2.5 text-xs font-medium text-red-600 bg-red-50 dark:bg-red-950/20 dark:text-red-400 rounded-lg border border-red-100 dark:border-red-900/20">
            {errorText}
          </div>
        )}

        <div className="space-y-3">
          <Input
            label="New Access Password Key"
            type="password"
            placeholder="••••••••"
            value={newKey}
            onChange={(e) => setNewKey(e.target.value)}
            required
          />
          <Input
            label="Re-type Verification Key"
            type="password"
            placeholder="••••••••"
            value={confirmKey}
            onChange={(e) => setConfirmKey(e.target.value)}
            required
          />
        </div>

        <Button type="submit" variant="primary" className="w-full py-2.5 text-xs font-semibold" isLoading={isSaving}>
          Commit Security Reset
        </Button>
      </form>
    </div>
  );
};