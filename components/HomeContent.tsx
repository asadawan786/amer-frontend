"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import GoogleMapEmbed from "@/components/GoogleMapEmbed";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import {
  Award, FileCheck, Users, Building2, Shield, CreditCard,
  ArrowRight, CheckCircle2, Star, Car,
} from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

const WHATSAPP_URL = `https://wa.me/971504512311?text=${encodeURIComponent("Hello! I need help with Dubai visa services.")}`;

const services = [
  { icon: Award, title: "Golden Visa Dubai", titleAr: "أقامه ذهبيه الإمارات", description: "10-year residency for investors, entrepreneurs, and talents", href: "/golden-visa" },
  { icon: Users, title: "Family Visa", titleAr: "تأشيرة عائلية", description: "Sponsor your spouse, children, and parents in the UAE", href: "/family-visa" },
  { icon: CreditCard, title: "Emirates ID", titleAr: "الهوية الإماراتية", description: "New, renewal, replacement, and status updates", href: "/emirates-id" },
  { icon: FileCheck, title: "Visa Renewal", titleAr: "تجديد التأشيرة", description: "Fast residence visa renewal with zero hassle", href: "/visa-services" },
  { icon: Building2, title: "Business Setup", titleAr: "تأسيس الشركات", description: "Mainland, Free Zone & Offshore company formation", href: "/business-setup" },
  { icon: Shield, title: "Attestation & Translation", titleAr: "التصديق والترجمة", description: "All embassies worldwide, certified translation in all languages", href: "/services" },
];

const steps = [
  { step: "01", title: "Contact Us", description: "Reach out via WhatsApp or call" },
  { step: "02", title: "Submit Documents", description: "Send your documents digitally" },
  { step: "03", title: "We Process", description: "We handle everything with Dubai Immigration" },
  { step: "04", title: "Done!", description: "Receive your visa or service" },
];

const stats = [
  { number: "8+", label: "Years Experience" },
  { number: "50K+", label: "Visas Processed" },
  { number: "24hrs", label: "Fast Processing" },
  { number: "100%", label: "Success Rate" },
];

const trustBadges = ["Dubai Immigration", "MOHRE Registered", "ICP Certified", "DHA Medical", "Tasheel", "Dubai Municipality"];

// Per-language "no hidden fees" etc. — kept inline since they're not in the translations object
const miniBadges: Record<string, [string, string, string]> = {
  ar: ["بدون رسوم مخفية", "معالجة في نفس اليوم", "نسبة نجاح 100%"],
  hi: ["कोई छिपी फीस नहीं", "उसी दिन प्रोसेसिंग", "100% सफलता दर"],
  ru: ["Без скрытых комиссий", "Обработка в тот же день", "100% успех"],
  fa: ["بدون هزینه پنهان", "پردازش همان روز", "100% موفقیت"],
  ur: ["کوئی پوشیدہ فیس نہیں", "اسی دن پروسیسنگ", "100% کامیابی"],
};

export default function HomeContent() {
  const { t, language } = useLanguage();
  const badges = miniBadges[language] ?? ["No Hidden Fees", "Same Day Processing", "100% Success Rate"];

  return (
    <>
      {/* Hero */}
      <section className="min-h-[85vh] flex items-center">
        <div className="max-w-7xl mx-auto px-6 pt-6 pb-20 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-4 tracking-tight">
                  Amer Center DAFZA Al Twar
                </h2>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#C9A962]/10 text-[#A88B4A] rounded-full text-sm font-medium">
                  <Shield className="h-4 w-4" />
                  {t.location.insideDubaiImmigration} — {t.location.dafzaAlTwar.split(",")[0]}
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-gray-900 leading-[1.1]">
                {t.hero.subtitle}{" "}
                <span className="gold-gradient-text font-semibold">{t.hero.title}</span>
              </h1>

              <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                {t.hero.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-md w-full sm:w-auto">
                    <SiWhatsapp className="h-5 w-5 mr-2" />
                    {t.common.whatsappUs}
                  </Button>
                </a>
                <Link href="/golden-visa">
                  <Button size="lg" variant="outline" className="btn-outline-gold rounded-md w-full sm:w-auto">
                    {t.nav.goldenVisa}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 pt-4">
                {badges.map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    {item}
                  </div>
                ))}
              </div>

              <div className="p-3 bg-[#C9A962]/10 border border-[#C9A962]/30 rounded-lg inline-flex items-center gap-2">
                <Car className="h-5 w-5 text-[#C9A962]" />
                <span className="text-[#A88B4A] font-semibold text-sm">{t.parking.title}</span>
                <span className="text-gray-600 text-sm">{t.parking.description}</span>
              </div>
            </div>

            <div>
              <div className="bg-gradient-to-br from-[#C9A962]/10 to-[#C9A962]/5 rounded-lg p-8 border border-[#C9A962]/20">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Amer Center Dubai</h3>
                <p className="text-gray-600 mb-6">{t.location.insideDubaiImmigration}, {t.location.dafzaAlTwar}</p>
                <div className="grid grid-cols-2 gap-3">
                  {stats.map((stat) => (
                    <div key={stat.label} className="p-4 text-center bg-white/90 backdrop-blur border border-gray-100 rounded-lg shadow-sm">
                      <div className="text-2xl font-light text-[#C9A962]">{stat.number}</div>
                      <div className="text-xs text-gray-500 mt-1 uppercase tracking-wider">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-8 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12">
            {trustBadges.map((badge) => (
              <div key={badge} className="text-sm text-gray-500 font-medium">{badge}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-gray-900">
              {t.nav.services}
            </h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              Complete visa and government services processed directly through official channels.
              Apply via WhatsApp without visiting our office.
            </p>
            <div className="w-16 h-0.5 bg-[#C9A962] mx-auto mt-6" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="group p-6 bg-white border border-gray-100 rounded-lg hover:border-[#C9A962]/30 hover:shadow-md transition-all"
              >
                <div className="h-12 w-12 rounded-full bg-[#C9A962]/10 flex items-center justify-center mb-4 group-hover:bg-[#C9A962]/20 transition-colors">
                  <service.icon className="h-6 w-6 text-[#C9A962]" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">{service.title}</h3>
                <p className="text-sm text-[#C9A962] mb-2">{service.titleAr}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{service.description}</p>
                <div className="flex items-center text-[#C9A962] text-sm font-medium mt-4">
                  {t.common.learnMore} <ArrowRight className="h-4 w-4 ml-1" />
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/services">
              <Button variant="outline" className="btn-outline-gold rounded-md">
                {t.nav.services} — {t.common.learnMore} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-gray-900">
                Why Choose Amer Center Al Twar?
              </h2>
              <div className="w-16 h-0.5 bg-[#C9A962] mt-6 mb-8" />
              <p className="text-gray-600 leading-relaxed mb-10">
                Located directly inside the Dubai Immigration building in DAFZA Al Twar, we provide the fastest,
                most reliable{" "}
                <Link href="/golden-visa" className="text-[#C9A962] hover:underline">{t.nav.goldenVisa}</Link>,{" "}
                <Link href="/family-visa" className="text-[#C9A962] hover:underline">{t.nav.familyVisa}</Link>,{" "}
                <Link href="/emirates-id" className="text-[#C9A962] hover:underline">{t.nav.emiratesId}</Link>, and{" "}
                <Link href="/visa-services" className="text-[#C9A962] hover:underline">{t.nav.visaServices}</Link> in Dubai.
              </p>
              <div className="space-y-6">
                {[
                  { title: "Inside Dubai Immigration", desc: "Direct access to immigration authorities for instant processing" },
                  { title: "WhatsApp-First Service", desc: "Apply from anywhere without visiting our office" },
                  { title: "8+ Years Experience", desc: "Trusted by 50,000+ satisfied customers" },
                  { title: "100% Approval Rate", desc: "We don't submit until your application is perfect" },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4 items-start">
                    <div className="w-2 h-2 rounded-full bg-[#C9A962] mt-2 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-gray-900">{item.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg border border-gray-100 shadow-sm">
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-5 w-5 fill-[#C9A962] text-[#C9A962]" />
                ))}
              </div>
              <blockquote className="text-gray-700 text-lg leading-relaxed mb-6">
                &ldquo;Got my Golden Visa processed in just 3 days! The team at Amer Center Al Twar
                handled everything via WhatsApp. Best visa service in Dubai.&rdquo;
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#C9A962]/20 flex items-center justify-center text-[#C9A962] font-semibold">
                  AK
                </div>
                <div>
                  <div className="font-medium text-gray-900">Ahmed K.</div>
                  <div className="text-sm text-gray-500">Golden Visa Client</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Step Process */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-gray-900">
              Simple 4-Step Process
            </h2>
            <p className="text-gray-500 mt-4">Apply from anywhere via WhatsApp</p>
            <div className="w-16 h-0.5 bg-[#C9A962] mx-auto mt-6" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((item) => (
              <div key={item.step} className="text-center">
                <div className="text-5xl font-light text-[#C9A962]/30 mb-4">{item.step}</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map */}
      <GoogleMapEmbed />

      {/* CTA */}
      <section className="py-20 md:py-28 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-light tracking-tight">
            Ready to Apply for Your Visa?
          </h2>
          <p className="mt-6 text-gray-400 max-w-xl mx-auto">
            Get started today via WhatsApp. Our expert team will guide you through every step.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-md">
                <SiWhatsapp className="h-5 w-5 mr-2" />
                {t.common.whatsappUs}
              </Button>
            </a>
            <a href="tel:+971504512311">
              <Button size="lg" variant="outline" className="rounded-md border-white/30 text-white hover:bg-white/10">
                {t.common.callUs} +971 50 451 2311
              </Button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
