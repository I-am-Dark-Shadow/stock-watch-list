import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import StockCard from '../components/StockCard';

describe('StockCard', () => {
  const mockStock = {
    id: 1,
    tradingSymbol: 'TCS',
    capitalMarketLastTradedPrice: 3712.2,
    futuresLastTradedPrice: 3715.75,
    percentageChange: -0.45,
    lastUpdatedTimestamp: '2025-09-08T11:02:00Z',
    about: 'Tata Consultancy Services...'
  };

  it('renders correctly with stock data', () => {
    render(<StockCard stock={mockStock} onCardClick={() => {}} />);
    expect(screen.getByText('TCS')).toBeInTheDocument();
    expect(screen.getByText('₹3,712.20')).toBeInTheDocument();
    expect(screen.getByText('0.45 %')).toBeInTheDocument();
  });
});