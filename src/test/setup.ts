import '@testing-library/jest-dom';
import React from 'react';

// Mock next/image (omit Next-only props for valid DOM)
vi.mock('next/image', () => ({
  default: ({
    src,
    alt,
    priority,
    placeholder,
    ...props
  }: {
    src: string;
    alt: string;
    priority?: boolean;
    placeholder?: string;
  }) => {
    void priority;
    void placeholder;
    return React.createElement('img', { src, alt, ...props });
  },
}));

// Mock next/link to render <a>
vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode }) =>
    React.createElement('a', { href, ...props }, children),
}));

// Chainable Supabase query-builder stub: every method (from/select/eq/in/order/limit/...)
// returns itself, and it's thenable so `await`/`.then()` resolves to an empty result —
// components under test never make a real network call or need real env vars.
function createSupabaseQueryStub(): unknown {
  const handler: ProxyHandler<object> = {
    get(_target, prop) {
      if (prop === 'then') {
        return (resolve: (v: { data: null; error: null }) => void) =>
          resolve({ data: null, error: null });
      }
      return () => new Proxy({}, handler);
    },
  };
  return new Proxy({}, handler);
}

vi.mock('@/lib/supabase/client', () => ({
  createClient: () => ({ from: () => createSupabaseQueryStub() }),
}));

vi.mock('@/lib/supabase/server', () => ({
  createClient: async () => ({ from: () => createSupabaseQueryStub() }),
}));
