import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import GoogleMapEmbed from "@/components/GoogleMapEmbed";
import { CreditCard, CheckCircle2, FileText, RefreshCw, AlertCircle, Edit } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

export const metadata: Metadata = {
  title: "Emirates ID Services Dubai | New, Renewal & Replacement | Amer Center",
  description: "Emirates ID new application, renewal, replacement for lost/damaged, and data updates. Fast processing at Amer Center Dubai inside Immigration Building.",
  keywords: ["Emirates ID Dubai", "Emirates ID renewal", "Emirates ID replacement", "ICP services Dubai"],
};

const WHATSAPP_URL = `https://wa.me/971504512311?text=${encodeURIComponent("Hello! I need help with Emirates ID services.")}`;

const services = [
  {
    icon: CreditCard,
    title: "New Emirates ID",
    description: "First-time Emirates ID application for new residents",
    steps: ["Submit visa and passport", "Biometric enrollment (fingerprint + photo)", "Application submission to ICP", "Delivery within 3-5 working days"],
  },
  {
    icon: RefreshCw,
    title: "Emirates ID Renewal",
    description: "Renew your expired or soon-to-expire Emirates ID",
    steps: ["Current Emirates ID (can be expired)", "Valid residence visa", "Updated photo if needed", "Processing within 3-5 working days"],
  },
  {
    icon: AlertCircle,
    title: "Lost/Damaged Replacement",
    description: "Replace your lost or damaged Emirates ID",
    steps: ["Police report (for lost ID)", "Passport copy", "Residence visa copy", "Application fee payment", "New card within 5-7 days"],
  },
  {
    icon: Edit,
    title: "Data Updates",
    description: "Update personal information on your Emirates ID",
    steps: ["Mobile number update", "Email address update", "Profession change", "Address update", "Supporting documents required"],
  },
];

export default function EmiratesIdPage() {
  return (
    <>
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#C9A962]/10 text-[#A88B4A] rounded-full text-sm font-medium mb-6">
                <CreditCard className="h-4 w-4" />
                ICP Official Services
              </div>
              <h1 className="text-4xl md:text-5xl font-light tracking-tight text-gray-900 leading-tight">
                Emirates <span className="gold-gradient-text font-semibold">ID Services</span>
              </h1>
              <p className="text-lg text-gray-600 mt-6 leading-relaxed">
                Complete Emirates ID services — new applications, renewals, replacements, and data updates.
                Fast processing inside Dubai Immigration Building.
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
              <h3 className="font-semibold text-gray-900 mb-4">Why Choose Us?</h3>
              <ul className="space-y-3">
                {["Inside Dubai Immigration Building", "Fastest processing in Dubai", "Expert document checking", "No errors - first time approval", "Track application status", "WhatsApp updates"].map((item) => (
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
            <h2 className="text-3xl font-light tracking-tight text-gray-900">Our Emirates ID Services</h2>
            <div className="w-16 h-0.5 bg-gold mx-auto mt-6" />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service) => (
              <div key={service.title} className="bg-white p-6 rounded-lg border border-gray-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-[#C9A962]/10 flex items-center justify-center">
                    <service.icon className="h-6 w-6 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{service.title}</h3>
                    <p className="text-sm text-gray-500">{service.description}</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {service.steps.map((step) => (
                    <li key={step} className="flex items-start gap-2 text-sm text-gray-600">
                      <FileText className="h-4 w-4 text-gold flex-shrink-0 mt-0.5" />
                      {step}
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
          <h2 className="text-3xl font-light tracking-tight">Need Emirates ID Help?</h2>
          <p className="mt-4 text-gray-400">Contact us via WhatsApp for fastest processing.</p>
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
