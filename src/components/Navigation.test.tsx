import { render, screen } from '@testing-library/react';
import Navigation from './Navigation';

describe('Navigation', () => {
  it('renders nav with home link', () => {
    render(<Navigation />);
    const homeLink = screen.getByRole('link', { name: /TEDx/ });
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('renders main nav links', () => {
    render(<Navigation />);
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/about');
    expect(screen.getByRole('link', { name: 'Team' })).toHaveAttribute('href', '/team');
    expect(screen.getByRole('link', { name: 'Speakers' })).toHaveAttribute('href', '/speakers');
    expect(screen.getByRole('link', { name: 'Info' })).toHaveAttribute('href', '/practical-info');
    expect(screen.getByRole('link', { name: 'EULiST mobility' })).toHaveAttribute('href', '/eulist-mobility');
    expect(screen.getByRole('link', { name: 'Partners' })).toHaveAttribute('href', '/partners');
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/contact');
  });
});
