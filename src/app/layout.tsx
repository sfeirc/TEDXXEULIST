import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import NuclearAtmosphere from "@/components/NuclearAtmosphere";
import { ScrollProgress, GlowCursor } from "@/components/MotionElements";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "TEDxEULiSTParis 2027 — What Connects Us",
  description:
    "TEDx IMT Paris — exploring human connection. February 2027 at Théâtre Folies Bergère. Ideas worth spreading.",
  keywords:
    "TEDx, EULiST, Paris, IMT, technology, innovation, Europe, universities",
  authors: [{ name: "TEDxEULiSTParis Team" }],
  creator: "TEDxEULiSTParis",
  publisher: "TEDxEULiSTParis",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://tedxeulistparis.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "TEDxEULiSTParis 2027 — What Connects Us",
    description:
      "TEDx IMT Paris — exploring human connection. February 2027 at Théâtre Folies Bergère.",
    url: "https://tedxeulistparis.com",
    siteName: "TEDxEULiSTParis",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TEDxEULiSTParis 2027",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TEDxEULiSTParis 2027 — What Connects Us",
    description:
      "TEDx IMT Paris — exploring human connection. February 2027 at Théâtre Folies Bergère.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable}`}>
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.png" />
      </head>
      <body className="font-sans antialiased text-white min-h-screen">
        <NuclearAtmosphere />
        <ScrollProgress />
        <GlowCursor />
        <div className="relative z-10 min-h-screen">{children}</div>
      </body>
    </html>
  );
}
