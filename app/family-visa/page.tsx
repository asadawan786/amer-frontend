import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import GoogleMapEmbed from "@/components/GoogleMapEmbed";
import { Users, CheckCircle2, FileText, Heart, User } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

export const metadata: Metadata = {
  title: "Family Visa Dubai 2026 | Sponsor Your Family | Amer Center",
  description: "Sponsor your spouse, children, and parents in UAE. Complete requirements for family visa Dubai. Fast processing via WhatsApp.",
  keywords: ["Family Visa Dubai", "spouse visa UAE", "dependent visa", "parent visa Dubai"],
};

const WHATSAPP_URL = `https://wa.me/971504512311?text=${encodeURIComponent("Hello! I need help with Family Visa in Dubai.")}`;

const visaTypes = [
  {
    icon: Heart,
    title: "Spouse Visa",
    description: "Sponsor your husband or wife in the UAE",
    requirements: ["Attested marriage certificate", "Sponsor salary min AED 4,000", "Tenancy contract or accommodation", "Spouse passport & photos", "Medical fitness test"],
  },
  {
    icon: Users,
    title: "Child Visa",
    description: "Sponsor children under 18 (or up to 22 for students)",
    requirements: ["Birth certificate (attested)", "Child passport & photos", "Sponsor's Emirates ID", "School enrollment (for older children)", "Medical fitness test"],
  },
  {
    icon: User,
    title: "Parent Visa",
    description: "Sponsor parents on 1-year renewable visa",
    requirements: ["Proof of relationship", "Sponsor salary min AED 20,000", "Medical insurance", "Parents' passport & photos", "Medical fitness test"],
  },
];

export default function FamilyVisaPage() {
  return (
    <>
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#C9A962]/10 text-[#A88B4A] rounded-full text-sm font-medium mb-6">
                <Users className="h-4 w-4" />
                Family Sponsorship
              </div>
              <h1 className="text-4xl md:text-5xl font-light tracking-tight text-gray-900 leading-tight">
                Family <span className="gold-gradient-text font-semibold">Visa Dubai</span>
              </h1>
              <p className="text-lg text-gray-600 mt-6 leading-relaxed">
                Bring your loved ones to the UAE. We process spouse, child, and parent visas quickly and
                efficiently. Apply via WhatsApp from anywhere in the world.
              </p>
              <div className="mt-8">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-md">
                    <SiWhatsapp className="h-5 w-5 mr-2" />
                    Apply via WhatsApp
                  </Button>
                </a>
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg border border-gray-100 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">Why Apply with Amer Center?</h3>
              <ul className="space-y-3">
                {[
                  "Inside Dubai Immigration Building",
                  "3-7 working days processing",
                  "100% document accuracy",
                  "WhatsApp application available",
                  "No office visit required",
                  "Expert guidance throughout",
                ].map((item) => (
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
            <h2 className="text-3xl font-light tracking-tight text-gray-900">Family Visa Types</h2>
            <div className="w-16 h-0.5 bg-gold mx-auto mt-6" />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {visaTypes.map((type) => (
              <div key={type.title} className="bg-white p-6 rounded-lg border border-gray-100">
                <div className="h-12 w-12 rounded-full bg-[#C9A962]/10 flex items-center justify-center mb-4">
                  <type.icon className="h-6 w-6 text-gold" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{type.title}</h3>
                <p className="text-sm text-gray-500 mb-4">{type.description}</p>
                <ul className="space-y-2">
                  {type.requirements.map((req) => (
                    <li key={req} className="flex items-start gap-2 text-sm text-gray-600">
                      <FileText className="h-4 w-4 text-gold flex-shrink-0 mt-0.5" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GoogleMapEmbed height={350} />

      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-light tracking-tight">Ready to Bring Your Family?</h2>
          <p className="mt-4 text-gray-400">Start your family visa application today via WhatsApp.</p>
          <div className="mt-8">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-md">
                <SiWhatsapp className="h-5 w-5 mr-2" /> Start Now
              </Button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
