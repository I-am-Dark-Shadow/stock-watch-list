import React, { useState, useRef, useEffect } from 'react';
import { MoreHorizontal, TrendingUp, TrendingDown } from 'lucide-react';
import useRelativeTime from '../hooks/useRelativeTime';
import { formatPrice } from '../utils/formatters';

const getInitialColor = (symbol) => {
  const colors = {
    A: 'bg-indigo-500', B: 'bg-red-500', C: 'bg-pink-500', D: 'bg-purple-500',
    E: 'bg-gray-500', F: 'bg-lime-500', G: 'bg-green-500', H: 'bg-cyan-500',
    I: 'bg-emerald-500', J: 'bg-yellow-500', K: 'bg-orange-500', L: 'bg-blue-500',
    M: 'bg-orange-500', N: 'bg-sky-500', O: 'bg-amber-500', P: 'bg-fuchsia-500',
    Q: 'bg-rose-500', R: 'bg-purple-500', S: 'bg-yellow-500', T: 'bg-red-500',
    U: 'bg-teal-500', V: 'bg-violet-500', W: 'bg-lime-500', X: 'bg-stone-500',
    Y: 'bg-blue-500', Z: 'bg-fuchsia-500',
  };
  return colors[symbol.charAt(0).toUpperCase()] || 'bg-slate-500';
};

const StockCard = ({ stock, onCardClick, showFuturesFirst = true, isCompactView, activeSort }) => {
  const [showFutures, setShowFutures] = useState(showFuturesFirst);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lastUpdatedText = useRelativeTime(stock.lastUpdatedTimestamp);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  // Price differences
  const FMC = stock.futuresLastTradedPrice - stock.capitalMarketLastTradedPrice;
  const CMF = stock.capitalMarketLastTradedPrice - stock.futuresLastTradedPrice;
  const FMCColor = FMC >= 0 ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400';
  const CMFColor = CMF >= 0 ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400';

  // Which price to show
  let price;
  if (activeSort === 'futures') {
    price = stock.futuresLastTradedPrice;
  } else if (activeSort === 'capital') {
    price = stock.capitalMarketLastTradedPrice;
  } else {
    price = stock.capitalMarketLastTradedPrice; // Default to capital if 'change' is active
  }

  const priceType = showFutures ? `F - C = ${FMC.toFixed(2)}` : `C - F = ${CMF.toFixed(2)}`;

  // Price change and percentage
  const percentageChange = stock.percentageChange;
  const displayValue = `${Math.abs(percentageChange).toFixed(2)} %`;
  const changeValue = percentageChange;
  const changeColor = changeValue >= 0 ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400';
  const changeIcon = changeValue >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />;

  const barColor = percentageChange >= 0 ? 'bg-green-500' : 'bg-red-500';

  // Effects
  useEffect(() => {
    setShowFutures(showFuturesFirst);
  }, [showFuturesFirst]);

  const handleMenuClick = (e) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  const handleViewSelect = (e, viewType) => {
    e.stopPropagation();
    setShowFutures(viewType === 'futures');
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const cardClasses = isCompactView
    ? `bg-[#181D31] text-white p-4 rounded-xl shadow-lg border border-gray-700 w-full cursor-pointer transition-all duration-300 transform hover:shadow-cyan-500/50 hover:shadow-2xl relative`
    : `bg-[#181D31] text-white p-4 rounded-xl shadow-lg border border-gray-700 w-full cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-cyan-500/50 hover:shadow-2xl relative`;

  return (
    <div
      className={cardClasses}
      onClick={() => onCardClick(stock)}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center space-x-2">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-md font-bold ${getInitialColor(stock.tradingSymbol)}`}>
            {stock.tradingSymbol.charAt(0)}
          </div>
          <h2 className="text-sm font-semibold">
            {window.innerWidth <= 640 ? stock.tradingSymbol.slice(0, 5) : stock.tradingSymbol}
          </h2>
        </div>
        <button
          ref={buttonRef}
          onClick={handleMenuClick}
          className="p-1 rounded-full hover:bg-gray-700 transition-colors"
        >
          <MoreHorizontal size={16} />
        </button>
      </div>

      {/* Responsive Dropdown Menu */}
      {isMenuOpen && (
        <div
          ref={menuRef}
          className="absolute right-2 top-13 z-50 lg:w-fit w-[137px] rounded-md bg-[#2d3748] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:w-52 sm:right-3"
        >
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <button
              onClick={(e) => handleViewSelect(e, 'capital')}
              className=" w-full text-left px-4 py-2 lg:text-sm text-xs text-gray-200 hover:bg-gray-600 lg:flex block justify-between items-center"
              role="menuitem"
            >
              Capital – Futures
              <span className={` mt-1 lg:mt-0 lg:ml-2 -ml-1 flex items-center gap-1 px-2 py-1 lg:rounded-full rounded w-fit text-xs font-medium ${CMFColor}`}>
                <span>{`₹ ${CMF.toFixed(2)}`}</span>
              </span>
            </button>
            <button
              onClick={(e) => handleViewSelect(e, 'futures')}
              className=" w-full text-left px-4 py-2 lg:text-sm text-xs text-gray-200 hover:bg-gray-600 lg:flex block justify-between items-center"
              role="menuitem"
            >
              Futures – Capital
              <span className={` mt-1 lg:mt-0 lg:ml-2 -ml-1 flex items-center gap-1 px-2 py-1 lg:rounded-full rounded w-fit text-xs font-medium ${FMCColor}`}>
                <span>{`₹ ${FMC.toFixed(2)}`}</span>
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Price and Change */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center my-3 gap-2 sm:gap-0">
        <span className="text-xl font-bold">₹{formatPrice(price)}</span>
        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${changeColor}`}>
          {changeIcon}
          <span>{displayValue}</span>
        </div>
      </div>

      {/* Price Type and Last Updated */}
      <div className="flex flex-col sm:flex-row justify-between text-xs text-gray-400">
        <p>{priceType}</p>
        <p>{lastUpdatedText}</p>
      </div>

      {/* Progress Bar */}
      <div className="h-1 bg-gray-600 rounded-full mt-4">
        <div className={`h-full w-full rounded-full ${barColor}`}></div>
      </div>
    </div>
  );
};

export default StockCard;