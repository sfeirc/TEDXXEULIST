import { render, screen } from '@testing-library/react';
import Home from './page';

describe('Home', () => {
  it('renders main heading and tagline', () => {
    render(<Home />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Ce qui nous relie/);
    expect(screen.getByText(/Explorer le lien humain/)).toBeInTheDocument();
    expect(screen.getByText(/Face à la fragmentation, recréer du lien/)).toBeInTheDocument();
  });

  it('renders date and venue', () => {
    render(<Home />);
    expect(screen.getByText(/Février 2027 · Théâtre Mogador/)).toBeInTheDocument();
  });

  it('has CTA links to about and contact', () => {
    render(<Home />);
    expect(screen.getByRole('link', { name: /Découvrir l'édition 2026/ })).toHaveAttribute('href', '/about');
    expect(screen.getByRole('link', { name: /Participer/ })).toHaveAttribute('href', '/contact');
    expect(screen.getByRole('link', { name: /Devenir partenaire/ })).toHaveAttribute('href', '/partners');
  });

  it('renders countdown section', () => {
    render(<Home />);
    expect(screen.getByText(/Compte à rebours/)).toBeInTheDocument();
    expect(screen.getByText('Jours')).toBeInTheDocument();
    expect(screen.getByText('Heures')).toBeInTheDocument();
    expect(screen.getByText('Minutes')).toBeInTheDocument();
    expect(screen.getByText('Secondes')).toBeInTheDocument();
  });
});
