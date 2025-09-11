import React, { useState, useEffect } from 'react';
import { X, TrendingUp, TrendingDown, BookX } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { formatPrice } from '../utils/formatters';
import useRelativeTime from '../hooks/useRelativeTime';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const StockDrawer = ({ stock, isOpen, onClose }) => {
  const [chartData, setChartData] = useState([]);
  const [timeframe, setTimeframe] = useState('day'); // day or month
  const [year, setYear] = useState(new Date().getFullYear());
  const [range, setRange] = useState([1, 30]); // default 1-30 days
  const [startInput, setStartInput] = useState('1');
  const [endInput, setEndInput] = useState('30');


  const lastUpdated = useRelativeTime(stock?.lastUpdatedTimestamp);

  // generate random chart data
  useEffect(() => {
    if (!stock || stock.capitalMarketLastTradedPrice == null) return;

    const dataLength = timeframe === 'day' ? 30 : 12;
    const basePrice = stock.capitalMarketLastTradedPrice;
    const newData = [];
    let prev = basePrice;

    for (let i = 0; i < dataLength; i++) {
      const next = prev + (Math.random() - 0.48) * 1.6;
      newData.push(parseFloat(next.toFixed(2)));
      prev = next;
    }

    setChartData(newData);
    setRange([1, dataLength]);
    setStartInput('1');
    setEndInput(`${dataLength}`);
  }, [stock, timeframe]);

  if (!isOpen) return null;

  // show error if data missing
  if (!stock || stock.capitalMarketLastTradedPrice == null || stock.futuresLastTradedPrice == null) {
    return (
      <>
        {/* Overlay */}
        <div
          className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
            }`}
          onClick={onClose}
          aria-hidden="true"
        ></div>

        {/* Drawer */}
        <div
          className={`fixed right-0 top-0 z-50 h-full w-full max-w-xl overflow-y-auto border-l border-white/10 bg-[#0c1326] shadow-2xl shadow-black/50 transition-transform lg:max-w-3xl transform ${isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="drawerTitle"
        >
          <div className="flex justify-end p-5 border-b border-white/10">
            <button
              onClick={onClose}
              className="rounded-lg border border-white/10 bg-white/5 p-2 hover:border-rose-400/40 hover:bg-rose-400/10 focus:outline-none focus:ring-2 focus:ring-rose-400/30"
            >
              <X className="h-4 w-4 text-slate-300" />
            </button>
          </div>

          <div className="text-center mt-20 p-6">
            <BookX className="mx-auto text-rose-400" size={40} />
            <h2 className="text-white text-2xl mt-4">Data Missing!</h2>
            <p className="text-slate-400 mt-2">Some important details are missing.</p>
            <ul className="text-slate-400 mt-2 list-disc list-inside">
              {!stock && <li>Stock data not available</li>}
              {stock?.capitalMarketLastTradedPrice == null && <li>Capital Market Price missing</li>}
              {stock?.futuresLastTradedPrice == null && <li>Futures Price missing</li>}
            </ul>
          </div>
        </div>
      </>

    );
  }

  // trend
  const percentage = stock.percentageChange;
  const isPositive = percentage >= 0;
  const changeDisplay = `${Math.abs(percentage).toFixed(2)} %`;
  const changeColor = isPositive ? 'bg-green-900/30 text-green-400 border-green-500/30' : 'bg-red-900/30 text-red-400 border-red-500/30';
  const changeIcon = isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />;

  // chart labels
  const totalLabels = timeframe === 'day' ? 30 : 12;
  const isMobile = window.innerWidth < 640;
  const labelsAll = Array.from({ length: totalLabels }, (_, i) => {
    if (timeframe === 'day') {
      return isMobile ? `${i + 1}` : `D${i + 1}`;
    } else {
      return isMobile ? `${i + 1}` : `M${i + 1}`;
    }
  });
  const labels = labelsAll.slice(range[0] - 1, range[1]);
  const dataSlice = chartData.slice(range[0] - 1, range[1]);

  const chartConfig = {
    labels,
    datasets: [
      {
        data: dataSlice,
        borderColor: '#22d3ee',
        borderWidth: 2,
        tension: 0, // straight line
        pointRadius: 2,
        pointHoverRadius: 4,
        segment: {
          borderColor: (ctx) => {
            const i = ctx.p0DataIndex;
            if (i === null || i + 1 >= dataSlice.length) return '#22d3ee';
            return dataSlice[i + 1] > dataSlice[i] ? '#22c55e' : '#ef4444';
          },
        },
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(12,19,38,0.9)',
        titleColor: '#22d3ee',
        bodyColor: '#f8fafc',
        displayColors: false,
      },
    },
    scales: {
      x: { grid: { color: 'rgba(255,255,255,0.05)' }, 
      ticks: { color: '#94a3b8', font: { size: isMobile ? 9 : 10 } } },
      y: {

        grid: { color: 'rgba(255,255,255,0.08)' }, ticks: { display: false }
      },
    },
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/60" onClick={onClose}></div>
      <div className="fixed right-0 top-0 z-50 h-full w-full  max-w-5xl bg-[#0c1326] p-5 overflow-y-auto border-l border-white/10">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 bg-white/5 rounded-lg ring-1 ring-white/10">
              <span className="text-cyan-300 font-semibold">{stock.tradingSymbol.charAt(0)}</span>
            </div>
            <div className="flex flex-col">
              <h3 className="text-white font-semibold text-lg">{stock.tradingSymbol}</h3>
              <p className="text-slate-400 text-xs">Details</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg border border-white/10 bg-white/5 p-2 hover:border-rose-400/40 hover:bg-rose-400/10"
          >
            <X className="h-4 w-4 text-slate-300" />
          </button>
        </div>

        {/* Prices */}
        <div className="rounded-xl border border-white/10 bg-white/5 p-4 mt-4">
          <div className="flex justify-between">
            <div>
              <p className="text-xs text-slate-400 uppercase">Capital LTP</p>
              <span className="text-white font-semibold text-xl">₹{formatPrice(stock.capitalMarketLastTradedPrice)}</span>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-400 uppercase">Futures LTP</p>
              <span className="text-white font-semibold text-xl">₹{formatPrice(stock.futuresLastTradedPrice)}</span>
            </div>
          </div>
          <span className={`inline-flex items-center gap-1 mt-2 px-2 py-[2px] text-xs rounded-full border ${changeColor}`}>
            {changeIcon} {changeDisplay}
          </span>

          {/* Chart */}
          <div className="mt-4">
            <p className="text-white font-semibold text-sm">Price Trend</p>
            <div className="flex gap-2 my-2">
              <button
                onClick={() => setTimeframe('day')}
                className={`px-3 py-1 rounded text-xs ${timeframe === 'day' ? 'bg-cyan-500/20 text-cyan-300' : 'bg-white/10 text-slate-400'}`}
              >Daywise</button>
              <button
                onClick={() => setTimeframe('month')}
                className={`px-3 py-1 rounded text-xs ${timeframe === 'month' ? 'bg-cyan-500/20 text-cyan-300' : 'bg-white/10 text-slate-400'}`}
              >Monthwise</button>
              <select value={year} onChange={e => setYear(e.target.value)} className="bg-[#0b1224] text-slate-300 text-xs px-2 py-1 rounded border border-white/10">
                {[2024, 2025].map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>

            {timeframe === 'day' && (
              <div className="flex gap-2 items-center text-xs text-slate-400 mb-2">
                <input type="text" value={startInput} onChange={e => { const val = e.target.value; if (/^\d*$/.test(val)) { setStartInput(val); const n = Number(val); if (n >= 1 && n <= 30) setRange([n, range[1]]); } }} className="bg-[#0b1224] border border-white/10 text-slate-300 rounded px-2 py-1 w-16" />
                <span>to</span>
                <input type="text" value={endInput} onChange={e => { const val = e.target.value; if (/^\d*$/.test(val)) { setEndInput(val); const n = Number(val); if (n >= 1 && n <= 30) setRange([range[0], n]); } }} className="bg-[#0b1224] border border-white/10 text-slate-300 rounded px-2 py-1 w-16" />
              </div>
            )}

            <div className="rounded-xl border border-white/10 bg-[#0b1224] p-3 lg:h-[300px] h-[250px]">
              <Line data={chartConfig} options={chartOptions} />
            </div>
          </div>
        </div>

        {/* Other Details */}
        <div className="rounded-xl border border-white/10 bg-white/5 p-4 mt-4 grid grid-cols-2 gap-4">
          <div className="p-3 bg-[#0b1224] rounded border border-white/10">
            <p className="text-xs text-slate-400 uppercase">Symbol</p>
            <span className="text-white font-semibold">{stock.tradingSymbol}</span>
          </div>
          <div className="p-3 bg-[#0b1224] rounded border border-white/10">
            <p className="text-xs text-slate-400 uppercase">Last Updated</p>
            <span className="text-white font-semibold">{lastUpdated}</span>
          </div>
          <div className="p-3 bg-[#0b1224] rounded border border-white/10">
            <p className="text-xs text-slate-400 uppercase">Capital</p>
            <span className="text-white font-semibold">₹{formatPrice(stock.capitalMarketLastTradedPrice)}</span>
          </div>
          <div className="p-3 bg-[#0b1224] rounded border border-white/10">
            <p className="text-xs text-slate-400 uppercase">Futures</p>
            <span className="text-white font-semibold">₹{formatPrice(stock.futuresLastTradedPrice)}</span>
          </div>
        </div>

        {/* About */}
        <div className="rounded-xl border border-white/10 bg-white/5 p-4 mt-4">
          <h4 className="text-white font-semibold mb-2">About</h4>
          <p className="text-slate-300 text-sm">{stock.about}</p>
        </div>
      </div>
    </>
  );
};

export default StockDrawer;
