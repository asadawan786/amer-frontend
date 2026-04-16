import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import GoogleMapEmbed from "@/components/GoogleMapEmbed";
import { FileCheck, CheckCircle2, FileText, XCircle, ArrowLeftRight, Stamp } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

export const metadata: Metadata = {
  title: "Visa Renewal, Cancellation & Transfer Dubai | Amer Center",
  description: "UAE residence visa renewal, cancellation, transfer, and stamping services. Fast processing at Amer Center inside Dubai Immigration Building.",
  keywords: ["visa renewal Dubai", "visa cancellation UAE", "visa transfer Dubai", "visa stamping Dubai"],
};

const WHATSAPP_URL = `https://wa.me/971504512311?text=${encodeURIComponent("Hello! I need help with visa services in Dubai.")}`;

const services = [
  {
    icon: FileCheck,
    title: "Visa Renewal",
    description: "Renew your UAE residence visa before or after expiry",
    points: ["All visa types (employment, family, investor)", "Same-day processing available", "Grace period assistance", "Status check service"],
  },
  {
    icon: XCircle,
    title: "Visa Cancellation",
    description: "Properly cancel your UAE residence visa",
    points: ["Exit permit coordination", "Labour card cancellation", "Emirates ID deactivation", "Final settlement assistance"],
  },
  {
    icon: ArrowLeftRight,
    title: "Visa Transfer / Change",
    description: "Transfer sponsorship or change visa type",
    points: ["Employer to employer transfer", "Family to employment visa", "Free zone to mainland", "Status change processing"],
  },
  {
    icon: Stamp,
    title: "Visa Stamping",
    description: "Get your visa stamped in your passport",
    points: ["Same-day stamping service", "All nationality passports", "Medical coordination", "Emirates ID concurrent processing"],
  },
];

export default function VisaServicesPage() {
  return (
    <>
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#C9A962]/10 text-[#A88B4A] rounded-full text-sm font-medium mb-6">
                <FileCheck className="h-4 w-4" />
                All Visa Services
              </div>
              <h1 className="text-4xl md:text-5xl font-light tracking-tight text-gray-900 leading-tight">
                Visa <span className="gold-gradient-text font-semibold">Services Dubai</span>
              </h1>
              <p className="text-lg text-gray-600 mt-6 leading-relaxed">
                Complete visa services — renewal, cancellation, transfer, and stamping. All processed directly
                inside Dubai Immigration Building for fastest results.
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
              <h3 className="font-semibold text-gray-900 mb-4">Why Process Here?</h3>
              <ul className="space-y-3">
                {["Inside Dubai Immigration Building", "Faster than any external typing center", "Direct submission to immigration", "Same-day service available", "100% document accuracy", "WhatsApp updates throughout"].map((item) => (
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
            <h2 className="text-3xl font-light tracking-tight text-gray-900">All Visa Services</h2>
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
                  {service.points.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm text-gray-600">
                      <FileText className="h-4 w-4 text-gold flex-shrink-0 mt-0.5" />
                      {point}
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
          <h2 className="text-3xl font-light tracking-tight">Need Visa Help?</h2>
          <p className="mt-4 text-gray-400">Contact us via WhatsApp for same-day service.</p>
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
