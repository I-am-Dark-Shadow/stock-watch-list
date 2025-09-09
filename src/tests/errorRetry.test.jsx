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

describe('Watchlist Error and Retry', () => {
  it('displays an error message and a retry button on fetch failure', async () => {
    fetchDummyData.mockRejectedValue(new Error('Data fetch failed. Please retry.'));
    
    render(<Watchlist />);
    
    expect(await screen.findByText('Oops! Something went wrong')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Retry/i })).toBeInTheDocument();
  });

  it('re-fetches data when the retry button is clicked', async () => {
    fetchDummyData.mockRejectedValueOnce(new Error('Fetch failed.'));
    render(<Watchlist />);
    
    await screen.findByText('Oops! Something went wrong');

    fetchDummyData.mockResolvedValueOnce([
      { id: 1, tradingSymbol: 'TCS', capitalMarketLastTradedPrice: 100, futuresLastTradedPrice: 105, percentageChange: 0.5, lastUpdatedTimestamp: "2025-09-08T11:00:00Z" }
    ]);

    fireEvent.click(screen.getByRole('button', { name: /Retry/i }));
    
    expect(await screen.findByText('TCS')).toBeInTheDocument();
  });
});