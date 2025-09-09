import React, { useState, useRef, useEffect } from 'react';
import { MoreHorizontal, TrendingUp, TrendingDown } from 'lucide-react';
import useRelativeTime from '../hooks/useRelativeTime';
import { formatPrice } from '../utils/formatters';

// Assign background colors based on the first character of the symbol
const assignColor = (symbol) => {
  const colorMap = {
    A: 'bg-indigo-500', B: 'bg-red-500', C: 'bg-pink-500', D: 'bg-purple-500',
    E: 'bg-gray-500', F: 'bg-lime-500', G: 'bg-green-500', H: 'bg-cyan-500',
    I: 'bg-emerald-500', J: 'bg-yellow-500', K: 'bg-orange-500', L: 'bg-blue-500',
    M: 'bg-orange-500', N: 'bg-sky-500', O: 'bg-amber-500', P: 'bg-fuchsia-500',
    Q: 'bg-rose-500', R: 'bg-purple-500', S: 'bg-yellow-500', T: 'bg-red-500',
    U: 'bg-teal-500', V: 'bg-violet-500', W: 'bg-lime-500', X: 'bg-stone-500',
    Y: 'bg-blue-500', Z: 'bg-fuchsia-500',
  };
  return colorMap[symbol.charAt(0).toUpperCase()] || 'bg-slate-500';
};

const StockCard = ({ stock, onCardClick, showFuturesFirst = true, isCompactView, activeSort }) => {
  const [viewFutures, setViewFutures] = useState(showFuturesFirst);
  const [menuVisible, setMenuVisible] = useState(false);
  const timeAgo = useRelativeTime(stock.lastUpdatedTimestamp);
  const menuElement = useRef(null);
  const buttonElement = useRef(null);

  // Compute differences in prices
  const futuresMinusCapital = stock.futuresLastTradedPrice - stock.capitalMarketLastTradedPrice;
  const capitalMinusFutures = stock.capitalMarketLastTradedPrice - stock.futuresLastTradedPrice;
  const futuresColor = futuresMinusCapital >= 0 ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400';
  const capitalColor = capitalMinusFutures >= 0 ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400';

  // Choose which price to display
  let currentPrice;
  if (activeSort === 'futures') {
    currentPrice = stock.futuresLastTradedPrice;
  } else if (activeSort === 'capital') {
    currentPrice = stock.capitalMarketLastTradedPrice;
  } else {
    currentPrice = stock.capitalMarketLastTradedPrice;
  }

  const priceDifferenceText = viewFutures ? `F - C = ${futuresMinusCapital.toFixed(2)}` : `C - F = ${capitalMinusFutures.toFixed(2)}`;

  // Calculate percentage change and styling
  const percentage = stock.percentageChange;
  const changeDisplay = `${Math.abs(percentage).toFixed(2)} %`;
  const changeColor = percentage >= 0 ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400';
  const changeIcon = percentage >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />;
  const progressColor = percentage >= 0 ? 'bg-green-500' : 'bg-red-500';

  useEffect(() => {
    setViewFutures(showFuturesFirst);
  }, [showFuturesFirst]);

  const toggleMenu = (e) => {
    e.stopPropagation();
    setMenuVisible(!menuVisible);
  };

  const selectView = (e, viewType) => {
    e.stopPropagation();
    setViewFutures(viewType === 'futures');
    setMenuVisible(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuElement.current &&
        !menuElement.current.contains(event.target) &&
        buttonElement.current &&
        !buttonElement.current.contains(event.target)
      ) {
        setMenuVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const containerClasses = isCompactView
    ? `bg-[#181D31] text-white p-4 rounded-xl shadow-lg border border-gray-700 w-full cursor-pointer transition-all duration-300 transform hover:shadow-cyan-500/50 hover:shadow-2xl relative`
    : `bg-[#181D31] text-white p-4 rounded-xl shadow-lg border border-gray-700 w-full cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-cyan-500/50 hover:shadow-2xl relative`;

  return (
    <div
      className={containerClasses}
      onClick={() => onCardClick(stock)}
    >
      {/* Header section */}
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center space-x-2">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-md font-bold ${assignColor(stock.tradingSymbol)}`}>
            {stock.tradingSymbol.charAt(0)}
          </div>
          <h2 className="text-sm font-semibold">
            {window.innerWidth <= 640 ? stock.tradingSymbol.slice(0, 5) : stock.tradingSymbol}
          </h2>
        </div>
        <button
          ref={buttonElement}
          onClick={toggleMenu}
          className="p-1 rounded-full hover:bg-gray-700 transition-colors"
          aria-label="More options"
        >
          <MoreHorizontal size={16} />
        </button>
      </div>

      {/* Dropdown menu */}
      {menuVisible && (
        <div
          ref={menuElement}
          className="absolute right-2 top-13 z-50 lg:w-fit w-[137px] rounded-md bg-[#2d3748] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:w-52 sm:right-3"
        >
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <button
              onClick={(e) => selectView(e, 'capital')}
              className=" w-full text-left px-4 py-2 lg:text-sm text-xs text-gray-200 hover:bg-gray-600 lg:flex block justify-between items-center"
              role="menuitem"
            >
              Capital – Futures
              <span className={` mt-1 lg:mt-0 lg:ml-2 -ml-1 flex items-center gap-1 px-2 py-1 lg:rounded-full rounded w-fit text-xs font-medium ${capitalColor}`}>
                <span>{`₹ ${capitalMinusFutures.toFixed(2)}`}</span>
              </span>
            </button>
            <button
              onClick={(e) => selectView(e, 'futures')}
              className=" w-full text-left px-4 py-2 lg:text-sm text-xs text-gray-200 hover:bg-gray-600 lg:flex block justify-between items-center"
              role="menuitem"
            >
              Futures – Capital
              <span className={` mt-1 lg:mt-0 lg:ml-2 -ml-1 flex items-center gap-1 px-2 py-1 lg:rounded-full rounded w-fit text-xs font-medium ${futuresColor}`}>
                <span>{`₹ ${futuresMinusCapital.toFixed(2)}`}</span>
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Price and change display */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center my-3 gap-2 sm:gap-0">
        <span className="text-xl font-bold">₹{formatPrice(currentPrice)}</span>
        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${changeColor}`}>
          {changeIcon}
          <span>{changeDisplay}</span>
        </div>
      </div>

      {/* Price type and last update */}
      <div className="flex flex-col sm:flex-row justify-between text-xs text-gray-400">
        <p>{priceDifferenceText}</p>
        <p>{timeAgo}</p>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-gray-600 rounded-full mt-4">
        <div className={`h-full w-full rounded-full ${progressColor}`}></div>
      </div>
    </div>
  );
};

export default StockCard;
