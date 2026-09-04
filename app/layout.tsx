import type { Metadata, Viewport } from "next";
import { Fraunces, Geist } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import AmbientField from "@/components/AmbientField";
import RibbonSpine from "@/components/RibbonSpine";
import SmoothScroll from "@/components/SmoothScroll";
import { priceRangeSchema } from "@/lib/pricing";
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
  // `default` is the homepage's own title — every other page sets its
  // own and gets the template appended.
  title: {
    default:
      "Handmade Gift Boxes in Karachi | Delivered Across Pakistan — HeartMade Craft",
    template: "%s · HeartMade Craft",
  },
  description:
    "Handmade gift boxes and hampers from Karachi, made to order. Every box has one hand-made piece — a hand-lettered card, a painted name plaque. From Rs 900, COD available, delivery across Pakistan.",
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

        <SmoothScroll />
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
              // Stable id so other pages can point at THIS business
              // instead of declaring a second one. The city delivery
              // pages reference it as the provider of their Service.
              "@id": `${site.url}/#business`,
              name: "HeartMade Craft",
              description:
                "Handmade gift boxes and hampers, made to order in Karachi.",
              url: site.url,
              // Reads from lib/site.ts — still the placeholder number
              // until `whatsapp` is set there.
              telephone: `+${site.whatsapp}`,
              priceRange: priceRangeSchema,
              address: {
                "@type": "PostalAddress",
                addressLocality: "Karachi",
                addressRegion: "Sindh",
                addressCountry: "PK",
              },
              // Named cities, not just the country — this is what a
              // "gift delivery Lahore" style query matches against.
              areaServed: ["Karachi", "Lahore", "Islamabad", "Pakistan"],
              // Add the Google Business Profile URL here once it's live.
              sameAs: [`https://instagram.com/${site.instagram}`],
            }),
          }}
        />
      </body>
    </html>
  );
}
