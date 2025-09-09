// Format a price to Indian decimal style with 2 decimal
export const formatPrice = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

// Format a percentage value with 2 decimal 
export const formatPercentage = (value) => {
  const absValue = Math.abs(value);
  return new Intl.NumberFormat('en-IN', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(absValue);
};


export const formatFuturesDifference = (capitalPrice, futuresPrice) => {
  const difference = Math.abs(futuresPrice - capitalPrice).toFixed(2);
  const arrow = futuresPrice >= capitalPrice ? '▲' : '▼';
  return `${arrow} ₹${difference}`;
};
