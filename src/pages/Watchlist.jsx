import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { SearchX, RotateCw, LayoutGrid, List, Radio, SlidersHorizontal } from 'lucide-react';
import fetchDummyData from '../api/fetchDummyData';
import StockCard from '../components/StockCard';
import SkeletonCard from '../components/SkeletonCard';
import ErrorState from '../components/ErrorState';
import StockDrawer from '../components/StockDrawer';
import SearchBar from '../components/SearchBar';
import FilterDrawer from '../components/FilterDrawer';
import useRelativeTime from '../hooks/useRelativeTime';

const ITEMS_PER_PAGE = 18;

const Watchlist = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSort, setActiveSort] = useState('change');
  const [sortDirection, setSortDirection] = useState('desc');
  const [selectedStock, setSelectedStock] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isCompactView, setIsCompactView] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFuturesFirst, setShowFuturesFirst] = useState(false);

  const lastUpdatedText = useRelativeTime(lastUpdated);

  const fetchStocks = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchDummyData();
      setStocks(data);
      setLastUpdated(new Date());
      toast.success('Watchlist refreshed!');
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStocks();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleSort = (key) => {
    setActiveSort(key);
    setCurrentPage(1);
  };

  const toggleSortDirection = () => {
    setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    setCurrentPage(1);
  };

  const toggleViewMode = (view) => {
    setShowFuturesFirst(view === 'futures-capital');
  };

  const openDrawer = (stock) => {
    setSelectedStock(stock);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setSelectedStock(null);
  };

  const sortStocks = (list) => {
    const sorted = [...list];
    if (activeSort === 'change') {
      sorted.sort((a, b) => sortDirection === 'asc' ? a.percentageChange - b.percentageChange : b.percentageChange - a.percentageChange);
    } else if (activeSort === 'capital') {
      sorted.sort((a, b) => sortDirection === 'asc' ? a.capitalMarketLastTradedPrice - b.capitalMarketLastTradedPrice : b.capitalMarketLastTradedPrice - a.capitalMarketLastTradedPrice);
    } else if (activeSort === 'futures') {
      sorted.sort((a, b) => sortDirection === 'asc' ? a.futuresLastTradedPrice - b.futuresLastTradedPrice : b.futuresLastTradedPrice - a.futuresLastTradedPrice);
    }
    return sorted;
  };

  const filteredStocks = stocks.filter(stock => stock.tradingSymbol.toLowerCase().includes(searchTerm.toLowerCase()));
  const sortedStocks = sortStocks(filteredStocks);

  const totalPages = Math.ceil(sortedStocks.length / ITEMS_PER_PAGE);
  const currentStocks = sortedStocks.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const toggleCompactView = () => setIsCompactView(prev => !prev);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  return (
    <div className="relative z-10 mx-auto flex max-w-full flex-col px-4 pb-24 pt-6 sm:px-4 lg:px-8">
      <Toaster position="top-center" reverseOrder={false} />

      <header className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[#0d1428]/80 p-3 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 shadow-inner cursor-pointer">
            <img src="./logo.webp" alt="Logo" width="full" height="full" />
          </div>
          <div className="flex flex-col cursor-pointer">
            <img src="./logoname.webp" alt="Logo Name"
              width={200}
              height={60}
              className="w-[200px] lg:w-[250px] ml-[-5px]" />
            <p className="text-xs text-slate-400">Track, filter, and explore live market movers</p>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-end gap-2 sm:gap-3">
          <SearchBar searchTerm={searchTerm} onSearchChange={handleSearch} />
          <button
            onClick={() => setFilterOpen(true)}
            className="flex items-center gap-2 h-10 rounded-lg bg-white/5 ring-1 ring-inset ring-white/10 px-3 text-sm transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/50"
          >
            <SlidersHorizontal className="size-4 text-slate-300" />
            <span className="text-slate-200">Filters</span>
          </button>
          <button
            onClick={fetchStocks}
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-white/10 bg-gradient-to-b from-cyan-500/10 to-blue-500/10 px-3 text-sm text-slate-100 shadow-inner transition hover:from-cyan-500/20 hover:to-blue-500/20 hover:shadow-lg hover:shadow-cyan-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/30"
          >
            <RotateCw className="h-4 w-4 text-cyan-300" />
            Refresh
          </button>
        </div>
      </header>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
            <Radio className="h-4 w-4 text-lime-500 animate-spin" />
            Live Update
          </span>
          <span className="hidden text-xs text-slate-400 sm:inline">Last refreshed {lastUpdatedText}</span>
          <span className="lg:hidden text-xs text-slate-400 sm:inline">{lastUpdatedText}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleCompactView}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300 transition hover:border-teal-500/40 hover:bg-teal-500/10"
          >
            {isCompactView ? (
              <>
                <List className="h-4 w-4 text-teal-300" /> List View
              </>
            ) : (
              <>
                <LayoutGrid className="h-4 w-4 text-teal-300" /> Grid View
              </>
            )}
          </button>
        </div>
      </div>

      <main>
        {error ? (
          <ErrorState onRetry={fetchStocks} />
        ) : (
          <div className={isCompactView ? "flex flex-col gap-2" : "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3"}>
            {loading
              ? Array.from({ length: ITEMS_PER_PAGE }).map((_, idx) => (
                <SkeletonCard key={idx} isCompactView={isCompactView} />
              ))
              : currentStocks.length > 0
                ? currentStocks.map(stock => (
                  <StockCard
                    key={stock.id}
                    stock={stock}
                    onCardClick={openDrawer}
                    showFuturesFirst={showFuturesFirst}
                    isCompactView={isCompactView}
                    activeSort={activeSort}
                  />
                ))
                : (
                  <div className="mt-16 flex flex-col items-center justify-center text-center col-span-full">
                    <div className="mb-4 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-inner">
                      <SearchX className="h-12 w-12 text-red-400" />
                    </div>
                    <p className="text-lg text-slate-400">No stocks found for "{searchTerm}"</p>
                  </div>
                )
            }
          </div>
        )}
      </main>

      <div className="mt-6 flex justify-center items-center gap-3">
        <button onClick={prevPage} disabled={currentPage === 1} className="px-4 py-2 rounded bg-white/5 text-slate-300 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed">Prev</button>
        <span className="text-sm text-slate-400">Page {currentPage} of {totalPages}</span>
        <button onClick={nextPage} disabled={currentPage === totalPages} className="px-4 py-2 rounded bg-white/5 text-slate-300 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed">Next</button>
      </div>

      <StockDrawer stock={selectedStock} isOpen={drawerOpen} onClose={closeDrawer} />
      <FilterDrawer
        isOpen={filterOpen}
        onClose={() => setFilterOpen(false)}
        activeSort={activeSort}
        onSortChange={handleSort}
        sortDirection={sortDirection}
        onSortDirectionToggle={toggleSortDirection}
        handleViewToggle={toggleViewMode}
        showFuturesFirst={showFuturesFirst}
      />
    </div>
  );
};

export default Watchlist;
