import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import EulistMobilityPage from './page';
import { isMobilityUnlockedAt, MOBILITY_UNLOCK } from './mobility';

describe('isMobilityUnlockedAt', () => {
  it('is false before 1 October 2026', () => {
    expect(isMobilityUnlockedAt(new Date('2026-09-30T23:59:59').getTime())).toBe(false);
  });

  it('is true from 1 October 2026 local midnight', () => {
    expect(isMobilityUnlockedAt(MOBILITY_UNLOCK.getTime())).toBe(true);
    expect(isMobilityUnlockedAt(new Date('2026-12-01').getTime())).toBe(true);
  });
});

describe('EULiST mobility page', () => {
  it('shows locked registration before October 2026', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-06-15T12:00:00'));
    render(<EulistMobilityPage />);
    expect(screen.getByRole('heading', { name: /Registration is closed/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Open form \(from October 2026\)/i })).toBeDisabled();
    vi.useRealTimers();
  });
});
