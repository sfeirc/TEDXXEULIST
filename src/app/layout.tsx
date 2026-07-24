import type { Metadata } from "next";
import { Inter, Syne, Playfair_Display } from "next/font/google";
import "./globals.css";
import NuclearAtmosphere from "@/components/NuclearAtmosphere";
import { ScrollProgress } from "@/components/MotionElements";

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

const playfair = Playfair_Display({
  variable: "--font-cormorant",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "TEDxEULiSTParis 2027 — What Connects Us",
  description:
    "TEDx IMT Paris — 22 February 2027 at Théâtre de Paris. An independently organized TEDx event bringing together innovators, researchers, and changemakers.",
  keywords: [
    "TEDx",
    "TEDx Paris",
    "TEDx IMT",
    "IMT Atlantique",
    "conference",
    "innovation",
    "ideas",
  ],
  authors: [{ name: "TEDxEULiSTParis Team" }],
  creator: "TEDxEULiSTParis",
  publisher: "TEDxEULiSTParis",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://tedximtparis.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "TEDxEULiSTParis 2027 — What Connects Us",
    description:
      "TEDx IMT Paris — 22 February 2027 at Théâtre de Paris. An independently organized TEDx event bringing together innovators, researchers, and changemakers.",
    url: "https://tedximtparis.com",
    siteName: "TEDx IMT Paris",
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
      "TEDx IMT Paris — 22 February 2027 at Théâtre de Paris. An independently organized TEDx event bringing together innovators, researchers, and changemakers.",
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "TEDx IMT Paris",
  startDate: "2027-02-22T09:00:00+01:00",
  endDate: "2027-02-22T18:00:00+01:00",
  location: {
    "@type": "Place",
    name: "Théâtre de Paris",
    address: {
      "@type": "PostalAddress",
      streetAddress: "32 Rue Richer",
      addressLocality: "Paris",
      postalCode: "75009",
      addressCountry: "FR",
    },
  },
  organizer: {
    "@type": "Organization",
    name: "TEDx IMT Paris",
    url: "https://tedximtparis.com",
  },
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable} ${playfair.variable}`}>
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.png" />
      </head>
      <body className="font-sans antialiased text-white min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <NuclearAtmosphere />
        <ScrollProgress />
        <div className="relative z-10 min-h-screen">{children}</div>
      </body>
    </html>
  );
}
