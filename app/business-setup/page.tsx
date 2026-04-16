import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import GoogleMapEmbed from "@/components/GoogleMapEmbed";
import { Building2, CheckCircle2, Globe, Briefcase, FileText } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

export const metadata: Metadata = {
  title: "Business Setup Dubai 2026 | Mainland, Free Zone & Offshore | Amer Center",
  description: "Set up your business in Dubai. Mainland, Free Zone (DMCC, JAFZA, DAFZA), and Offshore company formation. Fast licensing via Amer Center.",
  keywords: ["business setup Dubai", "company formation UAE", "mainland company Dubai", "free zone Dubai", "DMCC setup"],
};

const WHATSAPP_URL = `https://wa.me/971504512311?text=${encodeURIComponent("Hello! I want to set up a business in Dubai. Please guide me.")}`;

const structures = [
  {
    icon: Building2,
    title: "Mainland Company",
    description: "Trade anywhere in UAE including government contracts",
    features: ["100% foreign ownership allowed", "Trade anywhere in UAE", "Government contracts eligible", "Wide range of business activities", "Dubai Economic Department licensed"],
    timeline: "5-7 working days",
  },
  {
    icon: Globe,
    title: "Free Zone Company",
    description: "DMCC, JAFZA, DAFZA, and 40+ free zones available",
    features: ["100% foreign ownership", "0% corporate & personal tax", "100% repatriation of profits", "Streamlined visa process", "Modern office facilities"],
    timeline: "1-3 working days",
  },
  {
    icon: Briefcase,
    title: "Offshore Company",
    description: "RAK ICC, JAFZA Offshore - asset protection & holding",
    features: ["No physical office required", "Maximum privacy", "Asset protection vehicle", "International banking access", "No UAE tax obligations"],
    timeline: "3-5 working days",
  },
];

export default function BusinessSetupPage() {
  return (
    <>
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#C9A962]/10 text-[#A88B4A] rounded-full text-sm font-medium mb-6">
                <Building2 className="h-4 w-4" />
                Company Formation
              </div>
              <h1 className="text-4xl md:text-5xl font-light tracking-tight text-gray-900 leading-tight">
                Business <span className="gold-gradient-text font-semibold">Setup Dubai</span>
              </h1>
              <p className="text-lg text-gray-600 mt-6 leading-relaxed">
                Start your business in Dubai with expert guidance. Mainland, Free Zone, and Offshore company
                formation services. Full licensing, visa quota, and banking support.
              </p>
              <div className="mt-8">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-md">
                    <SiWhatsapp className="h-5 w-5 mr-2" />
                    Free Consultation
                  </Button>
                </a>
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg border border-gray-100 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">Why Setup in Dubai?</h3>
              <ul className="space-y-3">
                {["0% income tax for most businesses", "100% foreign ownership", "Strategic global location", "World-class infrastructure", "Strong banking system", "100+ free zones available"].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light tracking-tight text-gray-900">Choose Your Business Structure</h2>
            <div className="w-16 h-0.5 bg-gold mx-auto mt-6" />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {structures.map((structure) => (
              <div key={structure.title} className="bg-white p-6 rounded-lg border border-gray-100">
                <div className="h-12 w-12 rounded-full bg-[#C9A962]/10 flex items-center justify-center mb-4">
                  <structure.icon className="h-6 w-6 text-gold" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{structure.title}</h3>
                <p className="text-sm text-gray-500 mb-4">{structure.description}</p>
                <ul className="space-y-2 mb-4">
                  {structure.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2 text-sm text-gray-600">
                      <FileText className="h-4 w-4 text-gold flex-shrink-0 mt-0.5" />
                      {feat}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-400">Processing time</p>
                  <p className="text-sm font-medium text-gold">{structure.timeline}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GoogleMapEmbed height={350} />

      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-light tracking-tight">Ready to Start Your Business?</h2>
          <p className="mt-4 text-gray-400">Get a free consultation via WhatsApp today.</p>
          <div className="mt-8">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-md">
                <SiWhatsapp className="h-5 w-5 mr-2" /> Free Consultation
              </Button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
