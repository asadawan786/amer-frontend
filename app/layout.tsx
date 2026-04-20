import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { QueryProvider } from "@/components/QueryProvider";
import { Toaster } from "@/components/ui/toaster";

const SITE_URL = "https://www.amer.center";

export const metadata: Metadata = {
  title: {
    default: "Amer Center Dubai | Golden Visa, Emirates ID & Visa Services",
    template: "%s | Amer Center Dubai",
  },
  description:
    "Official Amer Center inside Dubai Immigration Building DAFZA Al Twar. Apply for Golden Visa, Family Visa, Emirates ID, Visa Renewal & Business Setup via WhatsApp. 8+ years trusted service.",
  keywords: [
    "Amer Center Dubai",
    "مركز آمر دبي",
    "Golden Visa Dubai",
    "Emirates ID",
    "Family Visa Dubai",
    "Visa Renewal",
    "Dubai Immigration",
    "Al Twar",
    "DAFZA",
    "Business Setup Dubai",
  ],
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    apple: "/favicon.png",
    shortcut: "/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Amer Center Dubai",
    images: [
      {
        url: "/logo-header.jpeg",
        width: 1200,
        height: 630,
        alt: "Amer Center Dubai — Golden Visa, Emirates ID & Visa Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Amer Center Dubai | Golden Visa, Emirates ID & Visa Services",
    description:
      "Official Amer Center inside Dubai Immigration Building DAFZA Al Twar. Apply for Golden Visa, Family Visa, Emirates ID via WhatsApp.",
    images: ["/logo-header.jpeg"],
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
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Amer Center Dubai",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo-header.jpeg`,
        width: 200,
        height: 56,
      },
      description:
        "Official Amer Center inside Dubai Immigration Building DAFZA Al Twar. Golden Visa, Emirates ID, Family Visa, Visa Renewal & Business Setup services.",
      telephone: "+971504512311",
      email: "info@amer.center",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Inside Dubai Immigration Building, DAFZA - Al Twar",
        addressLocality: "Dubai",
        addressRegion: "Dubai",
        addressCountry: "AE",
      },
      areaServed: "AE",
      serviceType: [
        "Golden Visa",
        "Emirates ID",
        "Family Visa",
        "Visa Renewal",
        "Business Setup",
        "PRO Services",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Amer Center Dubai",
      description:
        "Official Amer Center Dubai — Golden Visa, Emirates ID & Visa Services",
      publisher: { "@id": `${SITE_URL}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/blog?q={search_term_string}` },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Script
          id="gtm-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WPNQBXNB');`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WPNQBXNB"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <QueryProvider>
          <LanguageProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
              <WhatsAppButton />
              <Toaster />
            </div>
          </LanguageProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
