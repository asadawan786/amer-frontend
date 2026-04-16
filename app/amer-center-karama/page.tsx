import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Phone, CheckCircle2, Car, Navigation, Star, Globe } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

export const metadata: Metadata = {
  title: "Amer Center Karama Dubai | Visa Services Near Karama & Bur Dubai | مركز آمر الكرامة",
  description:
    "Amer Center serving Karama, Bur Dubai, Oud Metha residents. Inside Dubai Immigration Building DAFZA. Golden Visa, Emirates ID, Family Visa, Attestation for India, Pakistan, Philippines. 1 HOUR FREE SHADED PARKING.",
  keywords: [
    "Amer Center Karama",
    "مركز آمر الكرامة",
    "Amer Center Bur Dubai",
    "visa services Karama",
    "Indian embassy attestation Karama",
    "Pakistan embassy attestation Dubai",
  ],
};

const MAPS_EMBED = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4627.861606053007!2d55.37023557538386!3d25.25973277767082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5d293c44280d%3A0x532b4ea0d44dad31!2sAmer%20Center%20Al%20Tawar!5e1!3m2!1sen!2sae!4v1770185961634!5m2!1sen!2sae";
const GOOGLE_MAPS_URL = "https://g.page/AmerCenterDXB";

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

const nearbyAreas = [
  { area: "Karama", distance: "15 min drive" },
  { area: "Bur Dubai", distance: "18 min drive" },
  { area: "Oud Metha", distance: "12 min drive" },
  { area: "Lamcy Plaza", distance: "14 min drive" },
  { area: "Zabeel", distance: "16 min drive" },
  { area: "Trade Centre", distance: "20 min drive" },
];

const WHATSAPP_URL = `https://wa.me/971504512311?text=${encodeURIComponent("Hello! I'm from Karama/Bur Dubai area. What visa services do you offer?")}`;

export default function AmerCenterKaramaPage() {
  return (
    <>
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#C9A962]/10 text-[#A88B4A] rounded-full text-sm font-medium mb-6">
                <Globe className="h-4 w-4" />
                Multi-Cultural Community Expert
              </div>
              <h1 className="text-4xl md:text-5xl font-light tracking-tight text-gray-900 leading-tight">
                Amer Center Near <span className="gold-gradient-text font-semibold">Karama</span>
              </h1>
              <p className="text-xl text-gray-600 mt-6 leading-relaxed">
                مركز آمر بالقرب من الكرامة | कर्मा के पास आमेर सेंटर
              </p>
              <p className="text-lg text-gray-600 mt-4 leading-relaxed">
                Serving the diverse Karama and Bur Dubai community! Our multilingual staff speaks{" "}
                <strong className="text-gray-900">Hindi, Urdu, Arabic, Tagalog, Malayalam</strong> and more. Just{" "}
                <strong className="text-gray-900">15 minutes drive</strong> to Dubai Immigration Building, DAFZA Al Twar.
              </p>

              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 text-green-700 font-semibold">
                  <Car className="h-5 w-5" />
                  1 HOUR FREE SHADED PARKING
                </div>
                <p className="text-green-600 text-sm mt-1">No Karama parking hassle - easy covered parking at our location</p>
              </div>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-700 font-semibold">Popular Embassy Attestations:</p>
                <p className="text-blue-600 text-sm mt-1">
                  India • Pakistan • Philippines • Bangladesh • Nepal • Sri Lanka • Egypt • All Countries
                </p>
              </div>

              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-[#C9A962] mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Address</p>
                    <p className="text-gray-600">Inside Dubai Immigration Building, DAFZA - Al Twar, Dubai, UAE</p>
                    <p className="text-sm text-[#A88B4A] mt-1">Via Airport Road - no traffic like Downtown</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-[#C9A962] mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Working Hours</p>
                    <p className="text-gray-600">Sunday - Thursday: 8:00 AM - 8:00 PM</p>
                    <p className="text-gray-600">Saturday: 9:00 AM - 3:00 PM</p>
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

              <div className="mt-8 flex flex-wrap gap-3">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-md">
                    <SiWhatsapp className="h-5 w-5 mr-2" />
                    WhatsApp Us
                  </Button>
                </a>
                <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="border-[#C9A962] text-[#A88B4A] hover:bg-[#C9A962]/10 rounded-md">
                    <Navigation className="h-5 w-5 mr-2" />
                    Get Directions
                  </Button>
                </a>
              </div>
            </div>

            <div>
              <div className="bg-white p-6 rounded-lg border border-gray-100 mb-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Star className="h-5 w-5 text-[#C9A962]" />
                  Services Popular with Karama Residents
                </h3>
                <ul className="grid grid-cols-1 gap-2">
                  {services.map((service) => (
                    <li key={service} className="flex items-center gap-2 text-gray-600">
                      <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
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
                  title="Amer Center Location - Near Karama"
                />
              </div>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Driving Distance from Karama & Nearby Areas</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {nearbyAreas.map((item) => (
                <div key={item.area} className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="font-medium text-gray-900 text-sm">{item.area}</p>
                  <p className="text-[#A88B4A] text-lg font-semibold mt-1">{item.distance}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 bg-gradient-to-r from-[#C9A962]/10 to-[#C9A962]/5 p-8 rounded-2xl">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Why Karama & Bur Dubai Residents Choose Us</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900">All Embassy Attestation</h3>
                <p className="text-gray-600 mt-2">
                  Indian, Pakistani, Filipino, Bangladeshi, Egyptian - we handle all embassy attestations from one location.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Multilingual Staff</h3>
                <p className="text-gray-600 mt-2">
                  Speak to us in Hindi, Urdu, Malayalam, Tagalog, Arabic, or English. We understand your needs.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Legal Translation</h3>
                <p className="text-gray-600 mt-2">
                  Certified translation services for all languages. Marriage, birth, education certificates ready same day.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
