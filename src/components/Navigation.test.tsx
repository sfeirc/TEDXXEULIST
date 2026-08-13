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
    expect(screen.getByRole('link', { name: 'À propos' })).toHaveAttribute('href', '/about');
    expect(screen.getByRole('link', { name: 'Conférenciers' })).toHaveAttribute('href', '/speakers');
    expect(screen.getByRole('link', { name: 'Programme' })).toHaveAttribute('href', '/programme');
    expect(screen.getByRole('link', { name: 'FAQ' })).toHaveAttribute('href', '/faq');
    expect(screen.getByRole('link', { name: 'Partenaires' })).toHaveAttribute('href', '/partners');
    expect(screen.getByRole('link', { name: 'Équipe' })).toHaveAttribute('href', '/team');
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/contact');
  });

  it('renders the register CTA', () => {
    render(<Navigation />);
    expect(screen.getByRole('link', { name: 'Réserver' })).toHaveAttribute('href', '/register');
  });
});
