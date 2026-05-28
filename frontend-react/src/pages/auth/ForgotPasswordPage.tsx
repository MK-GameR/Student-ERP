import React, { useState } from 'react';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDispatch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsProcessing(false);
    
    // Redirect onward sequence to validation gate terminal
    window.location.href = `/auth/verify-otp?email=${encodeURIComponent(email)}`;
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4">
      <form onSubmit={handleDispatch} className="w-full max-w-sm bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-xl space-y-4">
        <div className="space-y-1">
          <h2 className="text-base font-bold text-gray-900 dark:text-gray-100">Initialize Recovery Sequence</h2>
          <p className="text-xs text-gray-400 dark:text-gray-500">Provide registration routing node to fetch credential token</p>
        </div>

        <Input
          label="Verification Email Link"
          type="email"
          placeholder="name@institution.edu"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Button type="submit" variant="primary" className="w-full py-2 text-xs font-semibold" isLoading={isProcessing}>
          Dispatch One-Time Token
        </Button>

        <div className="pt-2 text-center">
          <a href="/auth/login" className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Cancel and Return to Gateway
          </a>
        </div>
      </form>
    </div>
  );
};