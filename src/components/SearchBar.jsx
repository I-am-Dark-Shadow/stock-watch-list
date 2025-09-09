import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="relative w-full max-w-[260px]">
      <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 opacity-80">
        <Search className="h-4 w-4 text-slate-400" />
      </div>
      <input
        id="searchInput"
        type="text"
        placeholder="Search symbol..."
        className="w-full rounded-xl border border-white/10 bg-[#0a1224]/70 py-2 pl-9 pr-3 text-sm text-slate-200 placeholder:text-slate-500 outline-none transition focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/20"
        aria-label="Search for stocks"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
