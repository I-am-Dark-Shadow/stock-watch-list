import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Watchlist from '../pages/Watchlist';
import fetchDummyData from '../api/fetchDummyData';

jest.mock('../api/fetchDummyData');
jest.mock('react-hot-toast', () => ({
  Toaster: () => null,
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe('Watchlist View Toggle', () => {
  beforeEach(() => {
    fetchDummyData.mockResolvedValue([
      { id: 1, tradingSymbol: 'TCS', capitalMarketLastTradedPrice: 100, futuresLastTradedPrice: 105, percentageChange: 0.5, lastUpdatedTimestamp: "2025-09-08T11:00:00Z" }
    ]);
  });

  it('toggles between Grid View and List View', async () => {
    render(<Watchlist />);
    
    const toggleButton = await screen.findByText('Grid View');
    expect(toggleButton).toBeInTheDocument();
    
    fireEvent.click(toggleButton);
    expect(await screen.findByText('List View')).toBeInTheDocument();
  });
});