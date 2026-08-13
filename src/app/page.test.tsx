import { render, screen } from '@testing-library/react';
import Home from './page';

// Home is an async Server Component: calling it as a plain function (not JSX)
// and awaiting the result gives the resolved element, which render() can mount.
describe('Home', () => {
  it('renders main heading and tagline', async () => {
    render(await Home());
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading.textContent).toMatch(/What/);
    expect(heading.textContent).toMatch(/Connects/);
    expect(heading.textContent).toMatch(/Us/);
  });

  it('renders date and venue', async () => {
    render(await Home());
    expect(screen.getAllByText(/22 février 2027/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Théâtre de Paris/).length).toBeGreaterThan(0);
  });

  it('has CTA links to register and programme', async () => {
    render(await Home());
    const registerLinks = screen.getAllByRole('link', { name: /Réserver ma place/ });
    expect(registerLinks.length).toBeGreaterThan(0);
    registerLinks.forEach(link => expect(link).toHaveAttribute('href', '/register'));
    expect(screen.getByRole('link', { name: 'Voir le programme' })).toHaveAttribute('href', '/programme');
  });

  it('renders countdown section', async () => {
    render(await Home());
    expect(screen.getByText('jours')).toBeInTheDocument();
    expect(screen.getByText('heures')).toBeInTheDocument();
    expect(screen.getByText('min')).toBeInTheDocument();
    expect(screen.getByText('sec')).toBeInTheDocument();
  });
});
