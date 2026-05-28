import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Input } from '../common/Input';
import { Button } from '../common/Button';

export const LoginForm: React.FC = () => {
  const { login, isLoading, error: authError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    if (!email || !password) {
      setValidationError('All identification indices are strictly mandatory.');
      return;
    }

    try {
      await login({ email, password });
    } catch (err) {
      // Caught runtime sequence handled via useAuth state pipeline
      console.error('Session orchestration failed:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-xl space-y-4">
      <div className="space-y-1">
        <h2 className="text-base font-bold text-gray-900 dark:text-gray-100">Authenticate Gateway</h2>
        <p className="text-xs text-gray-400 dark:text-gray-500">Provide verified system login credentials</p>
      </div>

      {(validationError || authError) && (
        <div className="p-3 text-xs font-medium text-red-600 bg-red-50 dark:bg-red-950/20 dark:text-red-400 rounded-lg border border-red-100 dark:border-red-900/30">
          {validationError || authError}
        </div>
      )}

      <div className="space-y-3">
        <Input
          label="Institutional Email"
          type="email"
          id="login-email"
          placeholder="name@institution.edu"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Password Access Key"
          type="password"
          id="login-password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <Button type="submit" variant="primary" className="w-full py-2.5 text-xs font-semibold" isLoading={isLoading}>
        Sign In to Portal
      </Button>
    </form>
  );
};