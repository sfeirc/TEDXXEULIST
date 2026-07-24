import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#030303] flex items-center justify-center px-6 font-inter">
      <div className="text-center max-w-lg">
        <div className="flex items-center justify-center gap-4 mb-12">
          <Image
            src="https://i.imgur.com/NSU2tVP.png"
            alt="TEDx IMT Paris"
            width={160}
            height={40}
            className="w-auto h-16"
          />
        </div>

        <p className="text-[#e62b1e] text-sm font-semibold uppercase tracking-[0.3em] mb-4">404</p>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
          Page not found
        </h1>
        <p className="text-white/60 text-lg mb-12 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#e62b1e] text-white font-semibold hover:bg-[#ff3d2e] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to home
        </Link>
      </div>
    </div>
  );
}
