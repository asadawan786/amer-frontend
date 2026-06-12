export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";
const WHATSAPP_URL = `https://wa.me/971504512311?text=${encodeURIComponent("Hello! I need information about your services.")}`;

interface ServiceData {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  category: string;
  subcategory?: string;
  icon?: string;
  coverImage?: string;
  thumbnailImage?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  focusKeyword?: string;
  canonicalUrl?: string;
  robots?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  geoRegion?: string;
  geoPlacename?: string;
  schemaType?: string;
  createdAt: string;
}

const CATEGORY_LABELS: Record<string, string> = {
  "visa-services": "Visa Services",
  "attestation-translation": "Attestation & Translation",
  "dha-medical-typing": "DHA Medical & Typing",
  "emirates-id-government": "Emirates ID & Government",
  "business-setup": "Business Setup",
  "mohre-employment": "MOHRE & Employment",
};

const CATEGORY_HREFS: Record<string, string> = {
  "visa-services": "/visa-services",
  "attestation-translation": "/services",
  "dha-medical-typing": "/services",
  "emirates-id-government": "/emirates-id",
  "business-setup": "/business-setup",
  "mohre-employment": "/services",
};

async function getService(slug: string): Promise<ServiceData | null> {
  try {
    const res = await fetch(`${API_URL}/api/services/by-slug/${slug}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json() as Promise<ServiceData>;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service = await getService(params.slug);
  if (!service) return { title: "Service Not Found | Amer Center Dubai" };

  const title = service.metaTitle || service.title;
  const description = service.metaDescription || service.excerpt || `${service.title} services at Amer Center Dubai.`;
  const ogTitle = service.ogTitle || title;
  const ogDescription = service.ogDescription || description;
  const ogImage = service.ogImage || service.coverImage;
  const canonical = service.canonicalUrl || `https://www.amer.center/services/${service.slug}`;

  return {
    title,
    description,
    keywords: service.metaKeywords ? service.metaKeywords.split(",").map((k) => k.trim()) : undefined,
    robots: service.robots || "index,follow",
    alternates: { canonical },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: canonical,
      siteName: "Amer Center Dubai",
      type: "website",
      ...(ogImage ? { images: [{ url: ogImage, width: 1200, height: 630, alt: ogTitle }] } : {}),
    },
    other: {
      ...(service.geoRegion ? { "geo.region": service.geoRegion } : {}),
      ...(service.geoPlacename ? { "geo.placename": service.geoPlacename } : {}),
    },
  };
}

export default async function ServicePage({ params }: { params: { slug: string } }) {
  const service = await getService(params.slug);
  if (!service) notFound();

  const categoryLabel = CATEGORY_LABELS[service.category] ?? service.category;
  const categoryHref = CATEGORY_HREFS[service.category] ?? "/services";

  const schemaType = service.schemaType || "Service";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": schemaType,
    name: service.title,
    description: service.excerpt || service.metaDescription,
    url: `https://www.amer.center/services/${service.slug}`,
    provider: {
      "@type": "LocalBusiness",
      name: "Amer Center Dubai",
      address: {
        "@type": "PostalAddress",
        streetAddress: "DAFZA, Al Twar 1, Dubai International Airport Free Zone",
        addressLocality: "Dubai",
        addressCountry: "AE",
      },
      telephone: "+971504512311",
      url: "https://www.amer.center",
    },
    areaServed: {
      "@type": "City",
      name: "Dubai",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-white">
        {/* Hero */}
        {service.coverImage && (
          <div className="relative w-full h-64 sm:h-80 overflow-hidden">
            <Image
              src={service.coverImage}
              alt={service.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        )}

        {/* Breadcrumb */}
        <div className="max-w-4xl mx-auto px-6 pt-6">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-[#C9A962] transition-colors">Home</Link>
            <span>/</span>
            <Link href={categoryHref} className="hover:text-[#C9A962] transition-colors">{categoryLabel}</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{service.title}</span>
          </nav>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="grid lg:grid-cols-[1fr_280px] gap-10">
            {/* Main content */}
            <article>
              {/* Title */}
              <div className="mb-6">
                {service.icon && (
                  <span className="text-4xl mb-3 block">{service.icon}</span>
                )}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-medium text-[#C9A962] uppercase tracking-wider bg-[#C9A962]/10 px-2.5 py-1 rounded-full">
                    {categoryLabel}
                  </span>
                  {service.subcategory && (
                    <span className="text-xs text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                      {service.subcategory.replace(/-/g, " ")}
                    </span>
                  )}
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-3">
                  {service.title}
                </h1>
                {service.excerpt && (
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {service.excerpt}
                  </p>
                )}
              </div>

              {/* Thumbnail (if no cover) */}
              {!service.coverImage && service.thumbnailImage && (
                <div className="relative w-full h-56 sm:h-72 rounded-xl overflow-hidden mb-6">
                  <Image
                    src={service.thumbnailImage}
                    alt={service.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}

              {/* Content */}
              <div
                className="prose prose-lg max-w-none prose-headings:font-semibold prose-headings:text-gray-900 prose-h2:text-2xl prose-h3:text-xl prose-h3:text-[#C9A962] prose-h4:text-lg prose-p:text-gray-700 prose-li:text-gray-700 prose-a:text-[#C9A962] prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900"
                dangerouslySetInnerHTML={{ __html: service.content }}
              />

              {/* Bottom CTA */}
              <div className="mt-10 p-6 bg-gradient-to-br from-[#C9A962]/10 to-[#C9A962]/5 border border-[#C9A962]/20 rounded-2xl">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Ready to get started?</h3>
                <p className="text-gray-600 mb-4">
                  Contact our team at Amer Center Dubai — located inside the Dubai Immigration Building. Apply via WhatsApp or visit us in person.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl font-medium transition-colors"
                  >
                    <SiWhatsapp className="h-5 w-5" />
                    Apply via WhatsApp
                  </a>
                  <a
                    href="tel:+97142200066"
                    className="flex items-center justify-center gap-2 bg-white border border-gray-200 hover:border-[#C9A962]/50 text-gray-700 px-5 py-3 rounded-xl font-medium transition-colors"
                  >
                    <Phone className="h-5 w-5 text-[#C9A962]" />
                    +971 4 220 0066
                  </a>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 text-sm transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to all services
                </Link>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:sticky lg:top-24 lg:self-start space-y-4">
              {/* Quick contact */}
              <div className="bg-[#C9A962] rounded-2xl p-5 text-white">
                <div className="flex items-center gap-2 mb-3">
                  <MessageCircle className="h-5 w-5" />
                  <p className="font-semibold">Apply Now</p>
                </div>
                <p className="text-[#C9A962]/90 text-sm mb-4">
                  Send us a WhatsApp message — we respond within minutes.
                </p>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-white text-[#C9A962] px-4 py-2.5 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-colors"
                >
                  <SiWhatsapp className="h-5 w-5 text-green-600" />
                  WhatsApp Us
                </a>
              </div>

              {/* Location */}
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="h-5 w-5 text-[#C9A962]" />
                  <p className="font-semibold text-gray-900 text-sm">Our Location</p>
                </div>
                <p className="text-sm text-gray-600 mb-1">Amer Center Dubai</p>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Inside Dubai Immigration Building<br />
                  DAFZA, Al Twar 1<br />
                  Near Dubai International Airport
                </p>
                <a
                  href="https://maps.google.com/?q=Amer+Center+Dubai+Immigration+DAFZA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-xs text-[#C9A962] hover:underline"
                >
                  Get directions →
                </a>
              </div>

              {/* Working hours */}
              <div className="bg-white border border-gray-200 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="h-5 w-5 text-[#C9A962]" />
                  <p className="font-semibold text-gray-900 text-sm">Working Hours</p>
                </div>
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Mon – Thu</span>
                    <span className="font-medium text-gray-900">8:30am – 4:30pm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Friday</span>
                    <span className="font-medium text-gray-900">8:30am – 12:00pm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Saturday</span>
                    <span className="font-medium text-gray-900">8:30am – 2:00pm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sunday</span>
                    <span className="font-medium text-gray-500">Closed</span>
                  </div>
                </div>
              </div>

              {/* Related services link */}
              <div className="bg-white border border-gray-200 rounded-2xl p-5">
                <p className="font-semibold text-gray-900 text-sm mb-3">Browse All Services</p>
                <div className="space-y-2">
                  {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                    <Link
                      key={key}
                      href={`/services?category=${key}`}
                      className={`block text-sm transition-colors ${service.category === key ? "text-[#C9A962] font-medium" : "text-gray-600 hover:text-[#C9A962]"}`}
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
