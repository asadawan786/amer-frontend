import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Phone, CheckCircle2, Car, Navigation, Star, Zap, Shield } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

export const metadata: Metadata = {
  title: "Amer Center Sharjah | 5 Min from Sharjah Border | Visa Services | مركز آمر للشارقة",
  description:
    "Sharjah residents - skip the queues! Amer Center is just 5 MINUTES from Sharjah border inside Dubai Immigration Building. Golden Visa, Emirates ID, Family Visa, Business Setup. 1 HOUR FREE SHADED PARKING. Faster than Sharjah centers!",
  keywords: [
    "Amer Center Sharjah",
    "مركز آمر الشارقة",
    "Amer Center near Sharjah",
    "visa services Sharjah",
    "Golden Visa Sharjah residents",
    "Dubai visa for Sharjah residents",
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
  { area: "Sharjah City", distance: "5 min drive" },
  { area: "Al Nahda Sharjah", distance: "5 min drive" },
  { area: "Al Majaz", distance: "8 min drive" },
  { area: "Al Khan", distance: "10 min drive" },
  { area: "Industrial Area", distance: "12 min drive" },
  { area: "Muwaileh", distance: "15 min drive" },
];

const WHATSAPP_URL = `https://wa.me/971504512311?text=${encodeURIComponent("Hello! I'm from Sharjah. I need visa services. What do you offer?")}`;

export default function AmerCenterSharjahPage() {
  return (
    <>
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-6">
                <Zap className="h-4 w-4" />
                ONLY 5 MINUTES FROM SHARJAH BORDER!
              </div>
              <h1 className="text-4xl md:text-5xl font-light tracking-tight text-gray-900 leading-tight">
                Amer Center for <span className="gold-gradient-text font-semibold">Sharjah</span> Residents
              </h1>
              <p className="text-xl text-gray-600 mt-6 leading-relaxed">
                مركز آمر لسكان الشارقة - 5 دقائق فقط!
              </p>
              <p className="text-lg text-gray-600 mt-4 leading-relaxed">
                <strong className="text-gray-900">Sharjah residents:</strong> Why wait in long Sharjah queues? Our Amer Center is{" "}
                <strong className="text-gray-900">just 5 minutes past the Dubai-Sharjah border</strong>, inside Dubai Immigration
                Building, DAFZA Al Twar. Faster processing, shorter waits, better service.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 text-green-700 font-semibold">
                    <Car className="h-5 w-5" />
                    FREE PARKING
                  </div>
                  <p className="text-green-600 text-sm mt-1">1 hour free shaded parking</p>
                </div>
                <div className="p-4 bg-[#C9A962]/10 border border-[#C9A962]/30 rounded-lg">
                  <div className="flex items-center gap-2 text-[#A88B4A] font-semibold">
                    <Zap className="h-5 w-5" />
                    5 MIN DRIVE
                  </div>
                  <p className="text-[#A88B4A] text-sm mt-1">From Sharjah border</p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2 text-blue-700 font-semibold">
                  <Shield className="h-5 w-5" />
                  INSIDE DUBAI IMMIGRATION BUILDING
                </div>
                <p className="text-blue-600 text-sm mt-1">
                  Your documents stay in the official government premises. Fastest processing guaranteed.
                </p>
              </div>

              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-[#C9A962] mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Address</p>
                    <p className="text-gray-600">Inside Dubai Immigration Building, DAFZA - Al Twar, Dubai, UAE</p>
                    <p className="text-sm text-[#A88B4A] mt-1">Take Airport Road exit after Sharjah border</p>
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
                    Get Directions from Sharjah
                  </Button>
                </a>
              </div>
            </div>

            <div>
              <div className="bg-white p-6 rounded-lg border border-gray-100 mb-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Star className="h-5 w-5 text-[#C9A962]" />
                  All Services Available for Sharjah Residents
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
                  title="Amer Center Location - Near Sharjah"
                />
              </div>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Driving Distance from Sharjah Areas</h2>
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
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Why Sharjah Residents Prefer Our Dubai Location</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900">Skip Sharjah Queues</h3>
                <p className="text-gray-600 mt-2">
                  No more waiting hours at crowded Sharjah centers. Our location inside Dubai Immigration means faster processing.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Off-Peak Border Crossing</h3>
                <p className="text-gray-600 mt-2">
                  Visit us during work hours when border traffic is light. Return to Sharjah before evening rush.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">One-Stop Processing</h3>
                <p className="text-gray-600 mt-2">
                  Documents processed at source. No need to visit multiple locations - everything under one roof.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 p-6 bg-gray-900 text-white rounded-2xl">
            <h2 className="text-xl font-semibold mb-3">Directions from Sharjah to Amer Center DAFZA</h2>
            <ol className="space-y-2 text-gray-300">
              <li>1. Cross the Dubai-Sharjah border via Al Ittihad Road</li>
              <li>2. Take the Airport Road exit immediately after the border</li>
              <li>3. Continue on Airport Road for 2 km</li>
              <li>4. Turn right towards Al Twar / GDRFA</li>
              <li>5. Dubai Immigration Building is on your left - we&apos;re inside!</li>
            </ol>
            <p className="text-[#C9A962] mt-4 font-medium">Total drive time: ~5 minutes from border</p>
          </div>
        </div>
      </section>
    </>
  );
}
