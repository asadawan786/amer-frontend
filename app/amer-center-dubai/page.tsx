import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Phone, CheckCircle2 } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

export const metadata: Metadata = {
  title: "Amer Center Dubai | Dubai Immigration Building DAFZA Al Twar | Visa Services",
  description:
    "Visit Amer Center Dubai inside Dubai Immigration building, DAFZA Al Twar. Golden Visa, Emirates ID, Family Visa, Attestation, Translation services. Apply via WhatsApp.",
  keywords: ["Amer Center Dubai", "مركز آمر دبي", "Amer Center Al Twar", "Amer Center near me", "Dubai Immigration", "DAFZA"],
};

const MAPS_EMBED = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4627.861606053007!2d55.37023557538386!3d25.25973277767082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5d293c44280d%3A0x532b4ea0d44dad31!2sAmer%20Center%20Al%20Tawar!5e1!3m2!1sen!2sae!4v1770185961634!5m2!1sen!2sae";

const services = [
  "Golden Visa Processing",
  "Family Visa Sponsorship",
  "Emirates ID Services",
  "Visa Renewal & Cancellation",
  "Attestation - All Embassies",
  "Translation - All Languages",
  "DHA Medical Fitness",
  "Typing Services",
  "Dubai Municipality & DEQ",
  "Tasheel Services",
  "Business Setup & Licensing",
  "MOHRE & PRO Services",
];

const WHATSAPP_URL = `https://wa.me/971504512311?text=${encodeURIComponent("Hello! I want to visit Amer Center Dubai. What services do you offer?")}`;

export default function AmerCenterDubaiPage() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#C9A962]/10 text-[#A88B4A] rounded-full text-sm font-medium mb-6">
              <MapPin className="h-4 w-4" />
              Inside Dubai Immigration Building
            </div>
            <h1 className="text-4xl md:text-5xl font-light tracking-tight text-gray-900 leading-tight">
              Amer Center <span className="gold-gradient-text font-semibold">Dubai</span>
            </h1>
            <p className="text-lg text-gray-600 mt-6 leading-relaxed">
              Located directly inside the Dubai Immigration building in DAFZA Al Twar. Get your visa and
              government services processed at the source for fastest results.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-[#C9A962] mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Address</p>
                  <p className="text-gray-600">Inside Dubai Immigration Building, DAFZA - Al Twar, Dubai, UAE</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-[#C9A962] mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Working Hours</p>
                  <p className="text-gray-600">Sunday - Thursday: 9:00 AM - 6:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-[#C9A962] mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Contact</p>
                  <p className="text-gray-600">+971 50 451 2311</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-md">
                  <SiWhatsapp className="h-5 w-5 mr-2" />
                  Contact via WhatsApp
                </Button>
              </a>
            </div>
          </div>

          <div>
            <div className="bg-white p-6 rounded-lg border border-gray-100 mb-6">
              <h3 className="font-semibold text-gray-900 mb-4">Services Available</h3>
              <ul className="space-y-2">
                {services.map((service) => (
                  <li key={service} className="flex items-center gap-2 text-gray-600">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    {service}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg overflow-hidden border border-gray-200">
              <iframe
                src={MAPS_EMBED}
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Amer Center Dubai Location"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
