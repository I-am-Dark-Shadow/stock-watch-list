import React from 'react';
import { RefreshCcw, WifiOff } from 'lucide-react';



const ErrorState = ({ onRetry }) => {
  return (
    <div className="mt-16 flex flex-col items-center justify-center text-center">
      <div className="mb-4 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-inner">
        <WifiOff className="h-8 w-8 text-rose-400" />
      </div>
      <h2 className="text-[20px] tracking-tight font-semibold text-white">Something went wrong</h2>
      <p className="mt-1 max-w-sm text-sm text-slate-400">
        We couldn't fetch the latest stock data. Please check your connection or try again.
      </p>
      <button
        onClick={onRetry}
        className="mt-4 inline-flex h-9 items-center gap-2 rounded-xl border border-white/10 bg-gradient-to-b from-rose-500/10 to-pink-500/10 px-3 text-sm text-slate-100 shadow-inner transition hover:from-rose-500/20 hover:to-pink-500/20 hover:shadow-lg hover:shadow-rose-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/30"
      >
        <RefreshCcw className="h-4 w-4 text-rose-300" />
        Retry
      </button>
    </div>
  );
};

export default ErrorState;