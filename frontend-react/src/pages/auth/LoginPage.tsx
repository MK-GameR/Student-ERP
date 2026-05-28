import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { BookOpen, Lock, Mail, AlertCircle, Loader2 } from 'lucide-react';

// Explicitly type the user return interface shape for the login token result
interface AuthUserResponse {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
}

export const Login: React.FC = () => {
  const { login, error, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formValidationError, setFormValidationError] = useState<string | null>(null);

  // Retrieve previous target URI if redirected by ProtectedRoute interceptor engine
  const from = (location.state as any)?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormValidationError(null);

    if (!email || !password) {
      setFormValidationError('Please fill in all required credentials.');
      return;
    }

    try {
      // Cast the response so TypeScript understands the user object properties cleanly
      const user = (await login({ email, password })) as unknown as AuthUserResponse;
      
      // Dynamic role-based landing redirection system map
      if (user && user.role === 'student') {
        navigate('/student/dashboard');
      } else if (user && user.role === 'teacher') {
        navigate('/teacher/dashboard');
      } else {
        navigate(from, { replace: true });
      }
    } catch (err) {
      // Handled globally via redux framework payload pipelines or useAuth context state
      console.error('Portal gateway authentication sequence broken:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 selection:bg-blue-500/30 transition-colors">
      <div className="max-w-md w-full space-y-6 p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
        
        {/* Header Title Branding Area */}
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4 shadow-sm">
            <BookOpen className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">Welcome Back</h2>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Sign in to access your EduSphere ERP profile gateway
          </p>
        </div>

        {/* Dynamic Exception Error Panel alerts */}
        {(error || formValidationError) && (
          <div className="p-3.5 bg-red-50 dark:bg-red-950/20 border-l-4 border-red-500 rounded-r-xl flex items-start gap-3 animate-shake">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            <div className="text-xs text-red-700 dark:text-red-400 font-medium leading-relaxed">
              {formValidationError || error}
            </div>
          </div>
        )}

        {/* Execution Form Control Elements */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                Institutional Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-xs"
                  placeholder="mayur.student@edusphere.edu"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Account Security Password
                </label>
                <a href="/auth/forgot-password" className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                  Forgot Key?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-xs"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2.5 px-4 border border-transparent text-xs font-bold uppercase tracking-wider rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-blue-500/10"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <span>Sign In to Dashboard</span>
            )}
          </button>
        </form>

        <div className="pt-2 border-t border-gray-100 dark:border-gray-700 text-center">
          <p className="text-[11px] text-gray-400 dark:text-gray-500">
            New node entry?{' '}
            <a href="/auth/register" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
              Request credentials
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};