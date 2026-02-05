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
    expect(screen.getByRole('link', { name: 'À Propos' })).toHaveAttribute('href', '/about');
    expect(screen.getByRole('link', { name: 'Équipe' })).toHaveAttribute('href', '/team');
    expect(screen.getByRole('link', { name: 'Conférenciers' })).toHaveAttribute('href', '/speakers');
    expect(screen.getByRole('link', { name: 'Infos' })).toHaveAttribute('href', '/practical-info');
    expect(screen.getByRole('link', { name: 'Partenaires' })).toHaveAttribute('href', '/partners');
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/contact');
  });
});
