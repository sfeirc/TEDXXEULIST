import { render, screen } from '@testing-library/react';
import Home from './page';

describe('Home', () => {
  it('renders main heading and tagline', () => {
    render(<Home />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/What connects us/);
    expect(screen.getByText(/Exploring human connection/)).toBeInTheDocument();
    expect(screen.getByText(/Against fragmentation/)).toBeInTheDocument();
  });

  it('renders date and venue', () => {
    render(<Home />);
    expect(screen.getByText(/22 February 2027 · Théâtre Mogador/)).toBeInTheDocument();
  });

  it('has CTA links to about and contact', () => {
    render(<Home />);
    expect(screen.getByRole('link', { name: /About the 2026 edition/ })).toHaveAttribute('href', '/about');
    expect(screen.getByRole('link', { name: /Get involved/ })).toHaveAttribute('href', '/contact');
    expect(screen.getByRole('link', { name: /Become a partner/ })).toHaveAttribute('href', '/partners');
  });

  it('renders countdown section', () => {
    render(<Home />);
    expect(screen.getByText(/Countdown/)).toBeInTheDocument();
    expect(screen.getByText('Days')).toBeInTheDocument();
    expect(screen.getByText('Hours')).toBeInTheDocument();
    expect(screen.getByText('Minutes')).toBeInTheDocument();
    expect(screen.getByText('Seconds')).toBeInTheDocument();
  });
});
