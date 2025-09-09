export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};

export const formatPercentage = (percentage) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(percentage));
};

export const formatFuturesDifference = (capitalPrice, futuresPrice, view) => {
  const diff = Math.abs(capitalPrice - futuresPrice).toFixed(2);
  const sign = (futuresPrice - capitalPrice) >= 0 ? '▲' : '▼';
  if (view === 'capital') {
    return `${sign} ₹${diff}`;
  } else {
    return `${sign} ₹${diff}`;
  }
};