import React, { useState, useEffect } from 'react';
import { X, Star, TrendingUp, TrendingDown, BookX } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { formatPrice, formatPercentage } from '../utils/formatters';
import useRelativeTime from '../hooks/useRelativeTime';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const StockDrawer = ({ stock, isOpen, onClose }) => {
  const [chartData, setChartData] = useState([]);
  const updatedText = useRelativeTime(stock?.lastUpdatedTimestamp);

  useEffect(() => {
    if (stock && stock.capitalMarketLastTradedPrice != null) {
      const createChartData = (base) => {
        const arr = [];
        for (let i = 0; i < 30; i++) {
          const prev = i > 0 ? arr[i - 1] : base;
          const next = prev + (Math.random() - 0.48) * 1.6;
          arr.push(parseFloat(next.toFixed(2)));
        }
        return arr;
      };
      setChartData(createChartData(stock.capitalMarketLastTradedPrice));
    }
  }, [stock]);

  const hasError =
    !stock ||
    stock.capitalMarketLastTradedPrice == null ||
    stock.futuresLastTradedPrice == null ||
    !stock.tradingSymbol;

  if (!isOpen) return null;

  if (hasError) {
    const errorFields = [];
    if (!stock) {
      errorFields.push("Stock data missing entirely.");
    } else {
      if (stock.capitalMarketLastTradedPrice == null) errorFields.push("Missing Capital Market Price.");
      if (stock.futuresLastTradedPrice == null) errorFields.push("Missing Futures Price.");
      if (!stock.tradingSymbol) errorFields.push("Missing Trading Symbol.");
    }

    return (
      <>
        <div
          className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity ${
            isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
          onClick={onClose}
          aria-hidden="true"
        ></div>
        <aside
          className={`fixed right-0 top-0 z-50 h-full w-full max-w-xl overflow-y-auto border-l border-white/10 bg-[#0c1326] shadow-2xl shadow-black/50 transition-transform lg:max-w-3xl transform ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="drawerTitle"
        >
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 ring-1 ring-white/10">
                <span id="drawerSymbol" className="text-sm font-semibold tracking-tight text-cyan-300">
                  {stock && stock.tradingSymbol ? stock.tradingSymbol.charAt(0) : "?"}
                </span>
              </div>
              <div className="flex flex-col">
                <h3 id="drawerTitle" className="text-[20px] tracking-tight font-semibold text-white">
                  {stock && stock.tradingSymbol ? stock.tradingSymbol : "Unknown Stock"}
                </h3>
                <p className="text-xs text-slate-400">Details</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={onClose} className="rounded-lg border border-white/10 bg-white/5 p-2 transition hover:border-rose-400/40 hover:bg-rose-400/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400/30" aria-label="Close panel">
                <X className="h-4 w-4 text-slate-300" />
              </button>
            </div>
          </div>
          <div className="mt-16 flex flex-col items-center justify-center text-center p-6">
            <div className="mb-4 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-inner">
              <BookX className="h-8 w-8 text-rose-400" />
            </div>
            <h2 className="text-[25px] tracking-tight font-semibold text-white">Data Missing!</h2>
            <p className="mt-1 max-w-sm text-lg text-slate-400">
              Some important details are missing for this stock:
            </p>
            <ul className="list-disc list-inside text-sm text-slate-400 mt-2 text-left">
              {errorFields.map((field, index) => (
                <li key={index}>{field}</li>
              ))}
            </ul>
          </div>
        </aside>
      </>
    );
  }

  const isPositive = stock.percentageChange >= 0;
  const pillStyle = isPositive ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-rose-500/10 border-rose-500/30 text-rose-300';
  const trendIcon = isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />;

  const data = {
    labels: Array.from({ length: 30 }).map((_, i) => i + 1),
    datasets: [
      {
        data: chartData,
        borderColor: '#22d3ee',
        borderWidth: 1.8,
        tension: 0.35,
        pointRadius: 0,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(12, 19, 38, 0.9)',
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        padding: 10,
        titleColor: '#cbd5e1',
        bodyColor: '#e2e8f0',
        displayColors: false,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { display: false },
      },
      y: {
        grid: { color: 'rgba(255,255,255,0.06)' },
        ticks: { display: false },
      },
    },
    interaction: { intersect: false, mode: 'nearest' },
    animation: { duration: 600 },
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={onClose}
        aria-hidden="true"
      ></div>
      <aside
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-xl overflow-y-auto border-l border-white/10 bg-[#0c1326] shadow-2xl shadow-black/50 transition-transform lg:max-w-3xl transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawerTitle"
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 ring-1 ring-white/10">
              <span id="drawerSymbol" className="text-sm font-semibold tracking-tight text-cyan-300">{stock.tradingSymbol.charAt(0)}</span>
            </div>
            <div className="flex flex-col">
              <h3 id="drawerTitle" className="text-[20px] tracking-tight font-semibold text-white">{stock.tradingSymbol}</h3>
              <p className="text-xs text-slate-400">Details</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={onClose} className="rounded-lg border border-white/10 bg-white/5 p-2 transition hover:border-rose-400/40 hover:bg-rose-400/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400/30" aria-label="Close panel">
              <X className="h-4 w-4 text-slate-300" />
            </button>
          </div>
        </div>

        <div className="space-y-6 p-5">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <p className="text-xs text-slate-400 uppercase">Capital LTP</p>
                <span className="text-[28px] font-semibold tracking-tight text-white">₹{formatPrice(stock.capitalMarketLastTradedPrice)}</span>
              </div>
              <div className="flex flex-col items-end">
                <p className="text-xs text-slate-400 uppercase">Futures LTP</p>
                <span className="text-[28px] font-semibold tracking-tight text-white">₹{formatPrice(stock.futuresLastTradedPrice)}</span>
              </div>
            </div>
            <span className={`inline-flex items-center rounded-full border px-2 py-[2px] text-xs mt-3 gap-1.5 ${pillStyle}`}>
              {trendIcon}
              <span className="font-semibold">{isPositive ? '+' : ''}{formatPercentage(stock.percentageChange)}%</span>
            </span>

            <div className="mt-4">
              <p className="text-sm tracking-tight font-semibold text-white">Price Trend</p>
              <p className="text-xs text-slate-400">Synthetic last 30 ticks</p>
            </div>
            <div className="relative mt-2">
              <div className="rounded-xl border border-white/10 bg-[#0b1224] p-3">
                <div className="h-44 w-full">
                  <Line data={data} options={options} />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <h4 className="mb-3 text-[18px] tracking-tight font-semibold text-white">Details</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-white/10 bg-[#0b1224] p-3">
                <p className="text-xs text-slate-400 uppercase">Symbol</p>
                <span className="text-sm font-semibold tracking-tight text-white mt-1 block">{stock.tradingSymbol}</span>
              </div>
              <div className="rounded-xl border border-white/10 bg-[#0b1224] p-3">
                <p className="text-xs text-slate-400 uppercase">Last Updated</p>
                <span className="text-sm font-semibold tracking-tight text-white mt-1 block">{updatedText}</span>
              </div>
              <div className="rounded-xl border border-white/10 bg-[#0b1224] p-3">
                <p className="text-xs text-slate-400 uppercase">Capital</p>
                <span className="text-sm font-semibold tracking-tight text-white mt-1 block">₹{formatPrice(stock.capitalMarketLastTradedPrice)}</span>
              </div>
              <div className="rounded-xl border border-white/10 bg-[#0b1224] p-3">
                <p className="text-xs text-slate-400 uppercase">Futures</p>
                <span className="text-sm font-semibold tracking-tight text-white mt-1 block">₹{formatPrice(stock.futuresLastTradedPrice)}</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <h4 className="mb-3 text-[18px] tracking-tight font-semibold text-white">About</h4>
            <p className="text-sm leading-relaxed text-slate-300">{stock.about}</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default StockDrawer;
