"use client";

import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const WHATSAPP_NUMBER = "971504512311";
const WHATSAPP_MESSAGE = encodeURIComponent("Hello! I need help with Dubai visa services.");
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

const locations = [
  { href: "/amer-center-dubai", label: "Amer Center Dubai" },
  { href: "/amer-center-al-twar", label: "Al Twar / DAFZA" },
  { href: "/amer-center-deira", label: "Deira" },
  { href: "/amer-center-nahda", label: "Al Nahda" },
  { href: "/amer-center-mirdif", label: "Mirdif" },
  { href: "/amer-center-karama", label: "Karama" },
  { href: "/amer-center-sharjah", label: "Sharjah" },
];

export default function Footer() {
  const { t } = useLanguage();

  const visaServices = [
    { href: "/golden-visa", label: t.nav.goldenVisa },
    { href: "/family-visa", label: t.nav.familyVisa },
    { href: "/emirates-id", label: t.nav.emiratesId },
    { href: "/visa-services", label: t.nav.visaServices },
  ];

  const businessServices = [
    { href: "/business-setup", label: t.nav.businessSetup },
    { href: "/services", label: t.nav.proServices },
  ];

  const quickLinks = [
    { href: "/", label: t.nav.home },
    { href: "/tools", label: t.nav.tools },
    { href: "/blog", label: "Blog" },
    { href: "/faq", label: t.nav.faq },
    { href: "/services", label: t.nav.services },
    { href: "/contact", label: t.nav.contact },
  ];

  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Visa Services */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">
              {t.footer.visaServices}
            </h3>
            <ul className="space-y-3">
              {visaServices.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Business Services */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">
              {t.footer.businessServices}
            </h3>
            <ul className="space-y-3">
              {businessServices.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">
              {t.footer.locations}
            </h3>
            <ul className="space-y-3">
              {locations.map((loc) => (
                <li key={loc.href}>
                  <Link href={loc.href} className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                    {loc.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">
              {t.footer.quickLinks}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">
              {t.footer.contactUs}
            </h3>
            <ul className="space-y-4">
              <li>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                  className="flex items-start gap-3 text-sm text-gray-500 hover:text-[#25D366]">
                  <SiWhatsapp className="h-4 w-4 mt-0.5 text-[#25D366]" />
                  +971 50 451 2311
                </a>
              </li>
              <li>
                <a href="tel:+971504512311" className="flex items-start gap-3 text-sm text-gray-500 hover:text-gray-900">
                  <Phone className="h-4 w-4 mt-0.5 text-gold" />
                  +971 50 451 2311
                </a>
              </li>
              <li>
                <a href="mailto:info@amer.center" className="flex items-start gap-3 text-sm text-gray-500 hover:text-gray-900">
                  <Mail className="h-4 w-4 mt-0.5 text-gold" />
                  info@amer.center
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-sm text-gray-500">
                  <MapPin className="h-4 w-4 mt-0.5 text-gold flex-shrink-0" />
                  <span>
                    Inside Dubai Immigration Building,<br />
                    DAFZA - Al Twar,<br />
                    Dubai, UAE
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col items-center justify-center mt-16 pt-8 border-t border-gray-200">
          <div className="h-16 w-16 bg-gold/10 rounded-full flex items-center justify-center">
            <span className="font-bold text-gold-dark text-xs text-center">AMER<br/>CENTER</span>
          </div>
          <p className="text-xs text-gray-400 mt-4 text-center">
            Amer Center Dubai Airport Freezone Al Twar
          </p>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} Amer Center Dubai Airport Freezone Al Twar. {t.footer.allRightsReserved}
            </p>
            <p className="text-sm text-gray-400">{t.footer.trustedPartner}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
