import React, { useRef, useEffect } from 'react';
import { ArrowUpDown, ChevronDown, Check, ChevronsUpDown } from 'lucide-react';

const SortMenu = ({ activeSort, onSortChange, sortDirection, onSortDirectionToggle, isOpen, setIsOpen }) => {
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const sortOptions = [
    { key: 'change', label: 'Percentage Change' },
    { key: 'capital', label: 'Capital Market Price' },
    { key: 'futures', label: 'Futures Price' },
  ];

  const handleSortClick = (key) => {
    onSortChange(key);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [setIsOpen]);

  const activeLabel = sortOptions.find(option => option.key === activeSort)?.label || 'Percentage Change';

  return (
    <>
      <div className="relative">
        <button
          ref={buttonRef}
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 h-10 rounded-lg bg-white/5 ring-1 ring-inset ring-white/10 px-3 text-sm transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/50"
          aria-haspopup="menu"
          aria-expanded={isOpen}
        >
          <ArrowUpDown className="size-4 text-slate-300" />
          <span id="sortLabel" className="text-slate-200">{activeLabel}</span>
          <ChevronDown className="size-4 text-slate-400" />
        </button>
        <div
          ref={menuRef}
          className={`absolute z-50 right-0 mt-2 w-44 origin-top-right rounded-lg bg-slate-900 ring-1 ring-white/10 shadow-xl backdrop-blur-lg ${isOpen ? 'block' : 'hidden'}`}
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

      <button
        id="dirBtn"
        onClick={onSortDirectionToggle}
        className="flex items-center gap-2 h-10 rounded-lg bg-white/5 ring-1 ring-inset ring-white/10 px-3 text-sm transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/50"
        title="Toggle sort direction"
      >
        <ChevronsUpDown className="size-4 text-slate-300" />
        <span id="dirLabel" className="text-slate-200">{sortDirection === 'desc' ? 'Desc' : 'Asc'}</span>
      </button>
    </>
  );
};

export default SortMenu;
