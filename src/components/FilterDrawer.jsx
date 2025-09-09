import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronsUpDown, SlidersHorizontal, X, Check } from 'lucide-react';

const FilterDrawer = ({
  isOpen,
  onClose,
  activeSort,
  onSortChange,
  sortDirection,
  onSortDirectionToggle,
  handleViewToggle,
  showFuturesFirst
}) => {

  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const sortMenuRef = useRef(null);
  const sortButtonRef = useRef(null);

  const sortOptions = [
    { key: 'change', label: 'Percentage Change' },
    { key: 'capital', label: 'Capital Market Price' },
    { key: 'futures', label: 'Futures Price' },
  ];
  
  const activeLabel = sortOptions.find(option => option.key === activeSort)?.label || 'Percentage Change';

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sortMenuRef.current &&
        !sortMenuRef.current.contains(event.target) &&
        sortButtonRef.current &&
        !sortButtonRef.current.contains(event.target)
      ) {
        setIsSortMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setIsSortMenuOpen]);

  const handleSortClick = (key) => {
    onSortChange(key);
    setIsSortMenuOpen(false);
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-xs transition-opacity ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={onClose}
        aria-hidden="true"
      ></div>
      <aside
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-[280px] overflow-y-auto border-l border-white/10 bg-[#0c1326] shadow-2xl shadow-black/50 transition-transform transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawerTitle"
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <h3 id="drawerTitle" className="text-xl tracking-tight font-semibold text-white">Filters</h3>
          <button onClick={onClose} className="rounded-lg border border-white/10 bg-white/5 p-2 transition hover:border-rose-400/40 hover:bg-rose-400/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400/30" aria-label="Close panel">
            <X className="h-4 w-4 text-slate-300" />
          </button>
        </div>

        <div className="space-y-6 p-5">
          {/* View Toggle Section - Moved to the top */}
          <div>
            <h4 className="mb-3 text-sm tracking-tight font-semibold text-slate-400 uppercase">View Mode</h4>
            <div id="viewToggle" className="flex rounded-lg bg-white/5 ring-1 ring-inset ring-white/10 p-1 w-fit">
              <button
                onClick={() => handleViewToggle('futures-capital')}
                className={`px-3 py-3 mr-0.5 lg:text-xs text-[10px] rounded-md transition hover:bg-white/5 focus-visible:outline-none ${showFuturesFirst ? 'bg-green-200/20' : ''}`}
              >
                Futures – Capital
              </button>
              <button
                onClick={() => handleViewToggle('capital-futures')}
                className={`px-3 py-3 ml-0.5 lg:text-xs text-[10px] rounded-md transition hover:bg-white/5 focus-visible:outline-none ${!showFuturesFirst ? 'bg-green-200/20' : ''}`}
              >
                Capital – Futures
              </button>
            </div>
          </div>

          {/* Sort Section */}
          <div>
            <h4 className="mb-3 text-sm tracking-tight font-semibold text-slate-400 uppercase">Sort By</h4>
            <div className="flex flex-col gap-2">
              <button
                onClick={onSortDirectionToggle}
                className="flex items-center gap-2 h-10 w-24 rounded-lg bg-white/5 ring-1 ring-inset ring-white/10 px-3 text-sm transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/50"
                title="Toggle sort direction"
              >
                <ChevronsUpDown className="size-4 text-slate-300" />
                <span className="text-slate-200">{sortDirection === 'desc' ? 'Desc' : 'Asc'}</span>
              </button>
              <div className="relative">
                <button
                  ref={sortButtonRef}
                  onClick={() => setIsSortMenuOpen(!isSortMenuOpen)}
                  className="flex items-center gap-2 h-10 rounded-lg bg-white/5 ring-1 ring-inset ring-white/10 px-3 text-sm transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/50"
                  aria-haspopup="menu"
                  aria-expanded={isSortMenuOpen}
                >
                  <SlidersHorizontal className="size-4 text-slate-300" />
                  <span className="text-slate-200">{activeLabel}</span>
                  <ChevronDown className="size-4 text-slate-400" />
                </button>
                <div
                  ref={sortMenuRef}
                  className={`absolute z-50 right-auto mt-2 w-[180px] origin-top-right rounded-lg bg-slate-900 ring-1 ring-white/10 shadow-xl backdrop-blur-lg ${isSortMenuOpen ? 'block' : 'hidden'}`}
                  role="menu"
                >
                  <div className="p-1">
                    {sortOptions.map((option) => (
                      <button
                        key={option.key}
                        data-sort={option.key}
                        onClick={() => handleSortClick(option.key)}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-md text-sm text-slate-200 hover:bg-white/5"
                      >
                        {option.label}
                        {activeSort === option.key && <Check className="size-4 text-sky-400" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default FilterDrawer;