import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer', () => {
  it('renders partnership text', () => {
    render(<Footer />);
    expect(screen.getByText(/A TEDx × IMT collaboration/)).toBeInTheDocument();
    expect(screen.getByText(/with the support of EULiST/)).toBeInTheDocument();
  });

  it('renders external links', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: 'TEDx' })).toHaveAttribute(
      'href',
      'https://www.ted.com/about/programs-initiatives/tedx-program',
    );
    expect(screen.getByRole('link', { name: 'IMT' })).toHaveAttribute('href', 'https://www.imt.fr/');
    expect(screen.getByRole('link', { name: 'EULiST' })).toHaveAttribute('href', 'https://eulist.university/');
  });
});
