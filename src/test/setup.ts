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
