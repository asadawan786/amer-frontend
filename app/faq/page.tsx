"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import GoogleMapEmbed from "@/components/GoogleMapEmbed";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { SiWhatsapp } from "react-icons/si";
import { ChevronDown, ChevronUp } from "lucide-react";

const WHATSAPP_URL = `https://wa.me/971504512311?text=${encodeURIComponent("Hello! I have a question about your services.")}`;

const faqCategories = [
  {
    title: "Golden Visa",
    faqs: [
      { q: "What is UAE Golden Visa?", a: "The UAE Golden Visa is a long-term residence visa (5-10 years) that allows foreign talents, investors, and exceptional individuals to live, work, and study in the UAE without a national sponsor." },
      { q: "What is the minimum investment for Golden Visa?", a: "For property investors, the minimum is AED 2 million. For business investors, requirements vary based on the category." },
      { q: "Can I apply for Golden Visa via WhatsApp?", a: "Yes! Send your documents via WhatsApp and our team will process your entire application remotely." },
      { q: "How long does Golden Visa processing take?", a: "With our expedited service inside Dubai Immigration building, most applications are processed within 3-7 business days." },
    ],
  },
  {
    title: "Family Visa",
    faqs: [
      { q: "What salary is required to sponsor family?", a: "Generally, a minimum salary of AED 4,000 (or AED 3,000 with accommodation) is required to sponsor family members." },
      { q: "Can I sponsor my parents?", a: "Yes, UAE residents can sponsor parents on a 1-year renewable visa, subject to salary and relationship requirements." },
      { q: "What documents are needed for spouse visa?", a: "Attested marriage certificate, spouse's passport, photos, sponsor's salary certificate, and tenancy contract." },
    ],
  },
  {
    title: "Emirates ID",
    faqs: [
      { q: "How long does Emirates ID renewal take?", a: "Emirates ID renewal typically takes 3-5 working days through our expedited service." },
      { q: "What if I lost my Emirates ID?", a: "We can help you apply for a replacement. You'll need to file a police report and submit an application to ICP." },
      { q: "Can I update my Emirates ID information?", a: "Yes, you can update personal information such as mobile number, email, profession, and address." },
    ],
  },
  {
    title: "Business Setup",
    faqs: [
      { q: "What is the difference between mainland and free zone?", a: "Mainland allows trading anywhere in UAE and with government, while free zones offer 100% ownership and tax benefits but limit trading within UAE." },
      { q: "How quickly can I set up a company?", a: "Free zone companies can be set up in 1-2 days, mainland companies typically take 5-7 days." },
      { q: "Do I need a local partner for mainland company?", a: "No, 100% foreign ownership is now allowed for most business activities in UAE mainland." },
    ],
  },
  {
    title: "General",
    faqs: [
      { q: "Where is Amer Center located?", a: "We are located inside the Dubai Immigration building in DAFZA Al Twar area." },
      { q: "What are your working hours?", a: "We operate Sunday to Thursday, 9 AM to 6 PM. WhatsApp support is available extended hours." },
      { q: "Can I apply without visiting your office?", a: "Yes! Most services can be completed via WhatsApp without visiting our office." },
    ],
  },
];

export default function FAQPage() {
  const { t } = useLanguage();
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  return (
    <>
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-light tracking-tight text-gray-900">
              Frequently Asked <span className="gold-gradient-text font-semibold">Questions</span>
            </h1>
            <p className="text-lg text-gray-600 mt-6">Find answers to common questions about our services</p>
            <div className="w-16 h-0.5 bg-gold mx-auto mt-8" />
          </div>

          {faqCategories.map((category) => (
            <div key={category.title} className="mb-10">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{category.title}</h2>
              <div className="space-y-3">
                {category.faqs.map((faq, idx) => {
                  const id = `${category.title}-${idx}`;
                  const isOpen = openItems.includes(id);
                  return (
                    <div key={id} className="border border-gray-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() => toggleItem(id)}
                        className="w-full flex items-center justify-between p-4 text-left bg-white hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-medium text-gray-900">{faq.q}</span>
                        {isOpen ? <ChevronUp className="h-5 w-5 text-gray-500" /> : <ChevronDown className="h-5 w-5 text-gray-500" />}
                      </button>
                      {isOpen && (
                        <div className="p-4 bg-gray-50 border-t border-gray-200">
                          <p className="text-gray-600">{faq.a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="text-center mt-12 p-8 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Still have questions?</h3>
            <p className="text-gray-600 mb-6">Chat with us on WhatsApp for instant answers</p>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-md">
                <SiWhatsapp className="h-5 w-5 mr-2" />
                {t.common.whatsappUs}
              </Button>
            </a>
          </div>
        </div>
      </section>

      <GoogleMapEmbed height={350} />
    </>
  );
}
