import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import GoogleMapEmbed from "@/components/GoogleMapEmbed";
import {
  Award, Users, CreditCard, FileCheck, Building2, Shield, Briefcase,
  Globe, FileText, Scale, Car, Heart, ArrowRight,
} from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

export const metadata: Metadata = {
  title: "All Services | Visa, Emirates ID, Business Setup | Amer Center Dubai",
  description: "Complete visa services, Emirates ID, attestation, translation, business setup, MOHRE services at Amer Center Dubai. Inside Dubai Immigration building DAFZA Al Twar.",
  keywords: ["Amer services", "visa services Dubai", "Emirates ID", "business setup UAE", "attestation Dubai"],
};

const WHATSAPP_URL = `https://wa.me/971504512311?text=${encodeURIComponent("Hello! I need information about your services.")}`;

const serviceCategories = [
  {
    title: "Visa Services",
    services: [
      { icon: Award, title: "Golden Visa Dubai", titleAr: "أقامه ذهبيه دبي", href: "/golden-visa", desc: "10-year residency for investors & talents" },
      { icon: Users, title: "Family Visa", titleAr: "تأشيرة عائلية", href: "/family-visa", desc: "Spouse, children, and parent sponsorship" },
      { icon: FileCheck, title: "Visa Renewal", titleAr: "تجديد التأشيرة", href: "/visa-services", desc: "Residence visa renewal services" },
      { icon: FileText, title: "Entry Permits", titleAr: "تصاريح الدخول", href: "/visa-services", desc: "Tourist, visit, and transit visas" },
      { icon: Globe, title: "Visa Cancellation", titleAr: "إلغاء التأشيرة", href: "/visa-services", desc: "Proper visa termination process" },
      { icon: Shield, title: "Visa Status Change", titleAr: "تغيير الحالة", href: "/visa-services", desc: "Change visa type or sponsor" },
    ],
  },
  {
    title: "Attestation & Translation",
    services: [
      { icon: Globe, title: "Embassy Attestation", titleAr: "تصديق السفارات", href: "/services", desc: "All embassies worldwide" },
      { icon: FileCheck, title: "MOFA Attestation", titleAr: "تصديق الخارجية", href: "/services", desc: "Ministry of Foreign Affairs attestation" },
      { icon: FileText, title: "Translation Services", titleAr: "خدمات الترجمة", href: "/services", desc: "Certified translation for all languages" },
      { icon: Scale, title: "Equivalency Certificate", titleAr: "معادلة الشهادات", href: "/services", desc: "Educational certificate equivalency" },
      { icon: Building2, title: "Ministry of Education", titleAr: "وزارة التربية", href: "/services", desc: "MOE attestation and services" },
      { icon: Scale, title: "Notary Public", titleAr: "كاتب العدل", href: "/services", desc: "Document notarization services" },
    ],
  },
  {
    title: "DHA Medical & Typing",
    services: [
      { icon: Heart, title: "DHA Medical Fitness", titleAr: "الفحص الطبي DHA", href: "/services", desc: "Medical tests for visa & Emirates ID" },
      { icon: FileText, title: "Typing Services", titleAr: "خدمات الطباعة", href: "/services", desc: "Government forms & applications" },
      { icon: Building2, title: "Dubai Municipality", titleAr: "بلدية دبي", href: "/services", desc: "Municipality permits and NOCs" },
      { icon: Shield, title: "DEQ Services", titleAr: "خدمات DEQ", href: "/services", desc: "Dubai Economy & Quality services" },
      { icon: FileCheck, title: "Tasheel Services", titleAr: "خدمات تسهيل", href: "/services", desc: "MOHRE Tasheel applications" },
      { icon: CreditCard, title: "Health Card", titleAr: "البطاقة الصحية", href: "/services", desc: "DHA health card services" },
    ],
  },
  {
    title: "Emirates ID & Government",
    services: [
      { icon: CreditCard, title: "Emirates ID", titleAr: "الهوية الإماراتية", href: "/emirates-id", desc: "New, renewal, replacement, updates" },
      { icon: FileText, title: "Mobile Number Update", titleAr: "تحديث رقم الهاتف", href: "/services", desc: "Update mobile on Emirates ID" },
      { icon: FileCheck, title: "Police Clearance", titleAr: "شهادة حسن سيرة", href: "/services", desc: "Good conduct certificate" },
      { icon: Scale, title: "Dubai Courts", titleAr: "محاكم دبي", href: "/services", desc: "Court services and documentation" },
      { icon: Shield, title: "Legal Services", titleAr: "خدمات قانونية", href: "/services", desc: "Power of Attorney, contracts, wills" },
      { icon: Building2, title: "PRO Services", titleAr: "خدمات PRO", href: "/services", desc: "Government liaison services" },
    ],
  },
  {
    title: "Business Setup",
    services: [
      { icon: Building2, title: "Mainland Company", titleAr: "شركة محلية", href: "/business-setup", desc: "Dubai mainland business license" },
      { icon: Globe, title: "Free Zone Setup", titleAr: "المنطقة الحرة", href: "/business-setup", desc: "DMCC, JAFZA, DAFZA, and more" },
      { icon: Briefcase, title: "Offshore Company", titleAr: "شركة خارجية", href: "/business-setup", desc: "RAK, JAFZA offshore formation" },
      { icon: FileCheck, title: "Trade License", titleAr: "رخصة تجارية", href: "/business-setup", desc: "Commercial, professional, industrial" },
      { icon: Users, title: "Quota Increase", titleAr: "زيادة الكوتة", href: "/services", desc: "Staff hiring quota expansion" },
      { icon: Shield, title: "Establishment Card", titleAr: "بطاقة المنشأة", href: "/services", desc: "Company establishment card" },
    ],
  },
  {
    title: "MOHRE & Employment",
    services: [
      { icon: Briefcase, title: "Work Permits", titleAr: "تصاريح العمل", href: "/services", desc: "New and renewal work permits" },
      { icon: FileText, title: "Labour Card", titleAr: "بطاقة العمل", href: "/services", desc: "Ministry of Labour card" },
      { icon: Globe, title: "Change Profession", titleAr: "تغيير المهنة", href: "/services", desc: "Job title modification" },
      { icon: Users, title: "Absconding", titleAr: "البلاغ", href: "/services", desc: "Absconding case clearance" },
      { icon: Heart, title: "Maid Visa", titleAr: "تأشيرة خادمة", href: "/services", desc: "Domestic worker sponsorship" },
      { icon: Car, title: "Driver Visa", titleAr: "تأشيرة سائق", href: "/services", desc: "Personal driver sponsorship" },
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-light tracking-tight text-gray-900">
              Our <span className="gold-gradient-text font-semibold">Services</span>
            </h1>
            <p className="text-lg text-gray-600 mt-6">
              Complete visa, government, and business services processed through official channels.
              Apply via WhatsApp without visiting our office.
            </p>
            <div className="w-16 h-0.5 bg-gold mx-auto mt-8" />
          </div>
        </div>
      </section>

      {serviceCategories.map((category, idx) => (
        <section key={category.title} className={`py-12 md:py-16 ${idx % 2 !== 0 ? "bg-gray-50" : ""}`}>
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl font-light tracking-tight text-gray-900 mb-8">{category.title}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.services.map((service) => (
                <Link
                  key={service.title}
                  href={service.href}
                  className="group p-5 bg-white border border-gray-100 rounded-lg hover:border-[#C9A962]/30 hover:shadow-sm transition-all flex items-start gap-4"
                >
                  <div className="h-10 w-10 rounded-full bg-[#C9A962]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#C9A962]/20 transition-colors">
                    <service.icon className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{service.title}</h3>
                    <p className="text-xs text-gold">{service.titleAr}</p>
                    <p className="text-sm text-gray-500 mt-1">{service.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}

      <GoogleMapEmbed height={350} />

      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-light tracking-tight">Need Help Choosing a Service?</h2>
          <p className="mt-4 text-gray-400">Contact us on WhatsApp and our expert team will guide you.</p>
          <div className="mt-8">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-md">
                <SiWhatsapp className="h-5 w-5 mr-2" /> WhatsApp Us
              </Button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
