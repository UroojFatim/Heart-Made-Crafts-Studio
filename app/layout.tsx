import type { Metadata, Viewport } from "next";
import { Fraunces, Geist } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import AmbientField from "@/components/AmbientField";
import RibbonSpine from "@/components/RibbonSpine";
import { site } from "@/lib/site";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "HeartMade Craft — Handmade Gift Boxes in Karachi",
    template: "%s · HeartMade Craft",
  },
  description:
    "Handmade gift boxes and hampers from Karachi. Every box carries one piece made only for them — a handwritten card, a painted keepsake, something that can't be bought off a shelf. Delivery across Pakistan.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  keywords: [
    "gift boxes Karachi",
    "handmade gifts Pakistan",
    "birthday gift box Karachi",
    "custom gift hamper Pakistan",
    "anniversary gifts Karachi",
    "nikah gift box",
  ],
  openGraph: {
    type: "website",
    locale: "en_PK",
    siteName: "HeartMade Craft",
    title: "HeartMade Craft — Handmade Gift Boxes in Karachi",
    description:
      "Every box carries one piece made only for them. Handmade in Karachi, delivered across Pakistan.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#fbf7f1",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${geist.variable} h-full antialiased`}
    >
      <body className="relative min-h-full flex flex-col bg-paper text-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-ink focus:text-paper focus:px-5 focus:py-3 focus:text-sm"
        >
          Skip to content
        </a>

        <AmbientField />
        <RibbonSpine />
        <Nav />

        <main id="main" className="relative z-10 flex-1">
          {children}
        </main>

        <Footer />

        <script
          type="application/ld+json"
          // Local business schema — this is what gets a Karachi gift
          // business into "gift shop near me" style results.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "HeartMade Craft",
              description:
                "Handmade gift boxes and hampers. Every box carries one piece made only for the recipient.",
              url: site.url,
              telephone: `+${site.whatsapp}`,
              address: {
                "@type": "PostalAddress",
                addressLocality: "Karachi",
                addressRegion: "Sindh",
                addressCountry: "PK",
              },
              areaServed: "Pakistan",
              priceRange: "PKR 600 – 35,000",
              sameAs: [`https://instagram.com/${site.instagram}`],
            }),
          }}
        />
      </body>
    </html>
  );
}
