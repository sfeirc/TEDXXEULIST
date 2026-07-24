'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, RefreshCw } from 'lucide-react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#030303] flex items-center justify-center px-6 font-inter">
      <div className="text-center max-w-lg">
        <p className="text-[#e62b1e] text-sm font-semibold uppercase tracking-[0.3em] mb-4">Error</p>
        <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">Something went wrong</h1>
        <p className="text-white/60 mb-10 leading-relaxed">
          An unexpected error occurred. Please try again or return home.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#e62b1e] text-white font-semibold hover:bg-[#ff3d2e] transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white/70 hover:text-white hover:border-white/40 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
