import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { SearchX, RotateCw, LayoutGrid, List, Radio } from 'lucide-react';
import fetchDummyData from '../api/fetchDummyData';
import StockCard from '../components/StockCard';
import SkeletonCard from '../components/SkeletonCard';
import ErrorState from '../components/ErrorState';
import StockDrawer from '../components/StockDrawer';
import SearchBar from '../components/SearchBar';
import SortMenu from '../components/SortMenu';
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
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isCompactView, setIsCompactView] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFuturesFirst, setShowFuturesFirst] = useState(false);

  const lastUpdatedText = useRelativeTime(lastUpdated);

  const getStocks = async () => {
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
    getStocks();
  }, []);

  const handleSearchChange = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleSortChange = (sortKey) => {
    setActiveSort(sortKey);
    setCurrentPage(1);
  };

  const handleSortDirectionToggle = () => {
    setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    setCurrentPage(1);
  };

  const handleViewToggle = (view) => {
    setShowFuturesFirst(view === 'futures-capital');
  };

  const handleCardClick = (stock) => {
    setSelectedStock(stock);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setSelectedStock(null);
  };

  const sortStocks = (data) => {
    let sortedData = [...data];
    let sortKey = activeSort;
    let direction = sortDirection;
    if (sortKey === 'change') {
      sortedData.sort((a, b) =>
        direction === 'asc' ? a.percentageChange - b.percentageChange : b.percentageChange - a.percentageChange
      );
    } else if (sortKey === 'capital') {
      sortedData.sort((a, b) =>
        direction === 'asc'
          ? a.capitalMarketLastTradedPrice - b.capitalMarketLastTradedPrice
          : b.capitalMarketLastTradedPrice - a.capitalMarketLastTradedPrice
      );
    } else if (sortKey === 'futures') {
      sortedData.sort((a, b) =>
        direction === 'asc'
          ? a.futuresLastTradedPrice - b.futuresLastTradedPrice
          : b.futuresLastTradedPrice - a.futuresLastTradedPrice
      );
    }
    return sortedData;
  };

  const filteredStocks = stocks.filter((stock) =>
    stock.tradingSymbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedAndFilteredStocks = sortStocks(filteredStocks);

  const totalPages = Math.ceil(sortedAndFilteredStocks.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentStocks = sortedAndFilteredStocks.slice(startIndex, endIndex);

  const refreshHandler = async () => {
    await getStocks();
  };

  const toggleView = () => {
    setIsCompactView(!isCompactView);
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const goToPrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div className="relative z-10 mx-auto flex max-w-full flex-col px-4 pb-24 pt-6 sm:px-4 lg:px-8">
      <Toaster position="top-right" reverseOrder={false} />

      <header className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[#0d1428]/80 p-3 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 shadow-inner cursor-pointer">
            <img src="./logo.png" alt="" />
          </div>
          <div className="hidden flex-col sm:flex">
            <img src="./logoname.png" alt="" className='w-[200px] lg:w-[250px] ml-[-5px]' />
            <p className="text-xs text-slate-400 ">Track, filter, and explore live market movers</p>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-end gap-2 sm:gap-3">
          <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
          <div id="viewToggle" className="flex rounded-lg bg-white/5 ring-1 ring-inset ring-white/10 p-0.5">
            <button
              onClick={() => handleViewToggle('futures-capital')}
              className={`px-3 py-1.5 text-xs rounded-md transition hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/50 ${showFuturesFirst ? 'bg-white/5' : ''}`}
            >
              Futures – Capital
            </button>
            <button
              onClick={() => handleViewToggle('capital-futures')}
              className={`px-3 py-1.5 text-xs rounded-md transition hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/50 ${!showFuturesFirst ? 'bg-white/5' : ''}`}
            >
              Capital – Futures
            </button>
          </div>

          <SortMenu
            activeSort={activeSort}
            onSortChange={handleSortChange}
            sortDirection={sortDirection}
            onSortDirectionToggle={handleSortDirectionToggle}
            isOpen={isSortMenuOpen}
            setIsOpen={setIsSortMenuOpen}
          />

          <button
            onClick={refreshHandler}
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
            Live snapshot
          </span>
          <span className="hidden text-xs text-slate-400 sm:inline">Last refreshed {lastUpdatedText}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleView}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300 transition hover:border-teal-500/40 hover:bg-teal-500/10"
          >
            {isCompactView ? (
              <>
                <List className="h-4 w-4 text-teal-300" />
                List View
              </>
            ) : (
              <>
                <LayoutGrid className="h-4 w-4 text-teal-300" />
                Grid View
              </>
            )}
          </button>
        </div>
      </div>

      <main>
        {error ? (
          <ErrorState onRetry={getStocks} />
        ) : (
          <div className={isCompactView ? "flex flex-col gap-2" : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3"}>
            {loading
              ? Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
                <SkeletonCard key={index} isCompactView={isCompactView} />
              ))
              : currentStocks.length > 0
                ? currentStocks.map((stock) => (
                  <StockCard
                    key={stock.id}
                    stock={stock}
                    onCardClick={handleCardClick}
                    showFuturesFirst={showFuturesFirst}
                    isCompactView={isCompactView}
                    activeSort={activeSort}
                    isSortMenuOpen={isSortMenuOpen}
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

      {/* Pagination */}
      <div className="mt-6 flex justify-center items-center gap-3">
        <button onClick={goToPrevPage} disabled={currentPage === 1} className="px-4 py-2 rounded bg-white/5 text-slate-300 hover:bg-white/10 disabled:opacity-50">
          Prev
        </button>
        <span className="text-sm text-slate-400">Page {currentPage} of {totalPages}</span>
        <button onClick={goToNextPage} disabled={currentPage === totalPages} className="px-4 py-2 rounded bg-white/5 text-slate-300 hover:bg-white/10 disabled:opacity-50">
          Next
        </button>
      </div>

      <StockDrawer stock={selectedStock} isOpen={drawerOpen} onClose={closeDrawer} />
    </div>
  );
};

export default Watchlist;