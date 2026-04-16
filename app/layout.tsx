import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { QueryProvider } from "@/components/QueryProvider";
import { Toaster } from "@/components/ui/toaster";

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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://amer.center"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Amer Center Dubai",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
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
