import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[Fatal Error Caught via Boundary Trap]:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] w-full flex flex-col items-center justify-center p-6 text-center bg-slate-50 dark:bg-slate-950/20 rounded-2xl border border-dashed border-gray-200 dark:border-slate-800">
          <div className="h-12 w-12 bg-red-100 dark:bg-red-950/30 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center mb-4">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">Application View Execution Faulted</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm mt-1">
            {this.state.error?.message || 'An unhandled exception broke the execution tree sequence inside this dashboard quadrant.'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 text-xs font-medium bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg shadow-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50"
          >
            Refresh Viewport
          </button>
        </div>
      );
    }

    
    return this.props.children;
  }
}