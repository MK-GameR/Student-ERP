import React, { useState } from 'react';
import { Button } from '../../components/common/Button';

export const OtpVerificationPage: React.FC = () => {
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [validating, setValidating] = useState(false);

  const handlePinUpdate = (value: string, idx: number) => {
    if (isNaN(Number(value))) return;
    
    const nextPinState = [...otpCode];
    nextPinState[idx] = value.substring(value.length - 1);
    setOtpCode(nextPinState);

    // Auto focus next column cell block
    if (value && idx < 5) {
      const nextInputNode = document.getElementById(`otp-cell-${idx + 1}`);
      nextInputNode?.focus();
    }
  };

  const handleVerificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const tokenStr = otpCode.join('');
    if (tokenStr.length < 6) return;

    setValidating(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setValidating(false);

    window.location.href = `/auth/reset-password?token=${tokenStr}`;
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4">
      <form onSubmit={handleVerificationSubmit} className="w-full max-w-sm bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-xl space-y-5 text-center">
        <div className="space-y-1 text-left">
          <h2 className="text-base font-bold text-gray-900 dark:text-gray-100">Audit Verification Code</h2>
          <p className="text-xs text-gray-400 dark:text-gray-500">Insert 6-digit access hash distributed to your device terminal</p>
        </div>

        {/* 6-Digit Flex Box Grid */}
        <div className="flex gap-2 justify-center">
          {otpCode.map((digit, index) => (
            <input
              key={index}
              id={`otp-cell-${index}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handlePinUpdate(e.target.value, index)}
              className="h-11 w-11 text-center font-mono font-bold text-base bg-slate-50 dark:bg-slate-950 text-gray-900 dark:text-white border border-gray-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>

        <Button type="submit" variant="primary" className="w-full py-2.5 text-xs font-semibold" isLoading={validating} disabled={otpCode.join('').length < 6}>
          Validate Signature Token
        </Button>
      </form>
    </div>
  );
};