"use client";

import { SiWhatsapp, SiGooglemaps } from "react-icons/si";

const PHONE_NUMBER = "971504512311";
const MESSAGE = encodeURIComponent("Hello! I need help with Dubai visa services.");
const WHATSAPP_URL = `https://wa.me/${PHONE_NUMBER}?text=${MESSAGE}`;
const GOOGLE_MAPS_URL = "https://g.page/AmerCenterDXB";

export default function WhatsAppButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <a
        href={GOOGLE_MAPS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 bg-white hover:bg-gray-50 rounded-full shadow-lg transition-all hover:scale-105"
        aria-label="Find us on Google Maps"
      >
        <SiGooglemaps className="h-6 w-6 text-[#4285F4]" />
      </a>
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-full shadow-lg transition-all hover:scale-105"
        aria-label="Contact us on WhatsApp"
      >
        <SiWhatsapp className="h-6 w-6" />
      </a>
    </div>
  );
}
