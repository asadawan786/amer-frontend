"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const WHATSAPP_NUMBER = "971504512311";
const WHATSAPP_MESSAGE = encodeURIComponent("Hello! I need help with Dubai visa services.");
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { t } = useLanguage();

  const navLinks = [
    { href: "/", label: t.nav.home },
    {
      href: "/services",
      label: t.nav.services,
      dropdown: [
        { href: "/golden-visa", label: t.nav.goldenVisa },
        { href: "/family-visa", label: t.nav.familyVisa },
        { href: "/emirates-id", label: t.nav.emiratesId },
        { href: "/visa-services", label: t.nav.visaServices },
        { href: "/business-setup", label: t.nav.businessSetup },
        { href: "/services", label: t.nav.proServices },
      ],
    },
    {
      href: "/amer-center-dubai",
      label: t.nav.locations,
      dropdown: [
        { href: "/amer-center-dubai", label: "Amer Center Dubai" },
        { href: "/amer-center-al-twar", label: "Al Twar / DAFZA" },
        { href: "/amer-center-deira", label: "Deira" },
        { href: "/amer-center-nahda", label: "Al Nahda" },
        { href: "/amer-center-mirdif", label: "Mirdif" },
        { href: "/amer-center-karama", label: "Karama" },
        { href: "/amer-center-sharjah", label: "Sharjah" },
      ],
    },
    { href: "/tools", label: t.nav.tools },
    { href: "/blog", label: "Blog" },
    { href: "/faq", label: t.nav.faq },
    { href: "/contact", label: t.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-[9999] bg-white/95 backdrop-blur-md border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="h-12 px-4 bg-gold/10 rounded-lg flex items-center justify-center">
              <span className="font-bold text-gold-dark text-lg">AMER CENTER</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => link.dropdown && setActiveDropdown(link.href)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={link.href}
                  className={`text-sm transition-colors hover:text-gray-900 flex items-center gap-1 ${
                    pathname === link.href ? "text-gray-900 font-medium" : "text-gray-600"
                  }`}
                >
                  {link.label}
                  {link.dropdown && <ChevronDown className="h-3 w-3" />}
                </Link>
                {link.dropdown && activeDropdown === link.href && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-100 shadow-lg rounded-md py-2 z-50">
                    {link.dropdown.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className="block px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <LanguageSwitcher />
            <a href={`tel:+${WHATSAPP_NUMBER}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
              <Phone className="h-4 w-4" />
              +971 50 451 2311
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <Button size="sm" className="bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-md">
                <SiWhatsapp className="h-4 w-4 mr-2" />
                WhatsApp
              </Button>
            </a>
          </div>

          {/* Mobile: language switcher + hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <button
              className="p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100 max-h-[calc(100vh-5rem)] overflow-y-auto">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <div key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => !link.dropdown && setMobileOpen(false)}
                    className={`text-sm px-3 py-2 rounded flex items-center justify-between transition-colors ${
                      pathname === link.href
                        ? "text-gray-900 font-medium bg-gray-50"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    {link.label}
                    {link.dropdown && <ChevronDown className="h-4 w-4" />}
                  </Link>
                  {link.dropdown && (
                    <div className="pl-4 mt-1 space-y-1">
                      {link.dropdown.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          onClick={() => setMobileOpen(false)}
                          className="block text-sm text-gray-500 px-3 py-2 hover:text-gray-900"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="border-t border-gray-100 mt-4 pt-4 px-3 space-y-3">
                <a href={`tel:+${WHATSAPP_NUMBER}`} className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="h-4 w-4" />
                  +971 50 451 2311
                </a>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full bg-[#25D366] hover:bg-[#20BD5A] text-white">
                    <SiWhatsapp className="h-4 w-4 mr-2" />
                    Chat on WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
