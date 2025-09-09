import React from 'react';
import Watchlist from './pages/Watchlist';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-[#0b1020] text-slate-200 antialiased font-[Inter] overflow-x-hidden">
      {/* Background gradients and blur */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0">
        <div className="absolute -top-32 -left-24 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute -bottom-40 -right-16 h-96 w-96 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_0%,rgba(88,28,135,0.12),rgba(0,0,0,0))]" />
      </div>

      {/* Main page */}
      <Watchlist />
    </div>
  );
}

export default App;
