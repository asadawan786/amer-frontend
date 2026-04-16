import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import GoogleMapEmbed from "@/components/GoogleMapEmbed";
import { Award, CheckCircle2, FileText, Users, Briefcase, GraduationCap, Building2 } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

export const metadata: Metadata = {
  title: "Golden Visa Dubai 2026 | Apply via WhatsApp | Amer Center",
  description:
    "Apply for Dubai Golden Visa in 3-7 days. 10-year residency for investors, entrepreneurs, scientists, and talented professionals. WhatsApp application available.",
  keywords: ["Golden Visa Dubai", "أقامه ذهبيه الإمارات", "Dubai Golden Visa 2026", "UAE 10 year visa"],
};

const WHATSAPP_URL = `https://wa.me/971504512311?text=${encodeURIComponent("Hello! I'm interested in applying for UAE Golden Visa. Please guide me.")}`;

const eligibilityCategories = [
  {
    icon: Briefcase,
    title: "Investors",
    description: "Property investors (AED 2M+), public investment fund depositors",
    requirements: ["Property worth AED 2 million or more", "Investment fund deposit", "Valid passport", "Emirates ID (if applicable)"],
  },
  {
    icon: Building2,
    title: "Entrepreneurs",
    description: "Business owners with approved projects",
    requirements: ["Approved startup from accredited incubator", "Minimum capital requirements", "Valid business license", "Business plan approval"],
  },
  {
    icon: GraduationCap,
    title: "Talented Professionals",
    description: "Scientists, doctors, engineers, artists, and specialists",
    requirements: ["Valid employment contract", "Salary threshold (varies by category)", "Educational credentials attested", "Recommendation from relevant authority"],
  },
  {
    icon: Users,
    title: "Outstanding Students",
    description: "Top graduates from UAE and international universities",
    requirements: ["GPA of 3.75 or higher", "Graduation from top 100 universities", "Recent graduation (within 2 years)", "No prior employment required"],
  },
];

const benefits = [
  "10-year renewable residency visa",
  "100% business ownership allowed",
  "Sponsor family members with same duration",
  "No need for UAE employer sponsor",
  "Multiple entries and flexible stay",
  "Work permit included",
];

const faqs = [
  { q: "How long does Golden Visa processing take?", a: "With our expedited service inside Dubai Immigration building, most Golden Visa applications are processed within 3-7 business days." },
  { q: "Can I apply for Golden Visa via WhatsApp?", a: "Yes! Simply send your documents via WhatsApp and our team will handle the entire application process remotely." },
  { q: "What is the minimum property value for investor visa?", a: "The minimum property value is AED 2 million for the Golden Visa investor category." },
  { q: "Can my family get Golden Visa too?", a: "Yes, Golden Visa holders can sponsor spouse, children, and even domestic workers for the same 10-year duration." },
];

export default function GoldenVisaPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#C9A962]/10 text-[#A88B4A] rounded-full text-sm font-medium mb-6">
                <Award className="h-4 w-4" />
                10-Year Renewable Visa
              </div>
              <h1 className="text-4xl md:text-5xl font-light tracking-tight text-gray-900 leading-tight">
                UAE <span className="gold-gradient-text font-semibold">Golden Visa</span>
              </h1>
              <p className="text-lg text-gray-600 mt-6 leading-relaxed">
                Secure your future in the UAE with the prestigious Golden Visa. 10-year renewable residency
                for investors, entrepreneurs, scientists, and exceptional talents. Apply via WhatsApp from anywhere.
              </p>
              <div className="mt-8">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-md">
                    <SiWhatsapp className="h-5 w-5 mr-2" />
                    Apply Now via WhatsApp
                  </Button>
                </a>
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg border border-gray-100 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">Golden Visa Benefits</h3>
              <ul className="space-y-3">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light tracking-tight text-gray-900">Who is Eligible for Golden Visa?</h2>
            <div className="w-16 h-0.5 bg-gold mx-auto mt-6" />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {eligibilityCategories.map((cat) => (
              <div key={cat.title} className="bg-white p-6 rounded-lg border border-gray-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-[#C9A962]/10 flex items-center justify-center">
                    <cat.icon className="h-6 w-6 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{cat.title}</h3>
                    <p className="text-sm text-gray-500">{cat.description}</p>
                  </div>
                </div>
                <ul className="space-y-2 mt-4">
                  {cat.requirements.map((req) => (
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

      {/* FAQ */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light tracking-tight text-gray-900">Frequently Asked Questions</h2>
            <div className="w-16 h-0.5 bg-gold mx-auto mt-6" />
          </div>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-white p-6 rounded-lg border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GoogleMapEmbed height={350} />

      {/* CTA */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-light tracking-tight">Ready for Your Golden Visa?</h2>
          <p className="mt-4 text-gray-400">Start your application today via WhatsApp.</p>
          <div className="mt-8">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-md">
                <SiWhatsapp className="h-5 w-5 mr-2" />
                Start Now
              </Button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
