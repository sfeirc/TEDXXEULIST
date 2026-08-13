import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer', () => {
  it('renders the TEDx IMT Paris identity and description', () => {
    render(<Footer />);
    expect(screen.getByAltText('TEDx IMT Paris')).toBeInTheDocument();
    expect(
      screen.getByText(/Un événement TEDx porté par des étudiants des écoles IMT/),
    ).toBeInTheDocument();
    expect(screen.getByText('Événement TEDx officiel')).toBeInTheDocument();
  });

  it('renders footer navigation and legal links', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: 'Accueil' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/contact');
    expect(screen.getByRole('link', { name: 'Mentions légales' })).toHaveAttribute('href', '/legal');
    expect(screen.getByRole('link', { name: 'Confidentialité' })).toHaveAttribute('href', '/privacy');
  });
});
