import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

const WHATSAPP_URL = `https://wa.me/971504512311?text=${encodeURIComponent("Hello! I need help with Dubai visa services.")}`;

const blogPosts: Record<string, {
  title: string; titleAr: string; category: string; date: string; readTime: string;
  description: string; content: string;
}> = {
  "golden-visa-dubai-complete-guide-2026": {
    title: "Golden Visa Dubai 2026: Complete Guide to 10-Year Residency",
    titleAr: "الإقامة الذهبية دبي 2026: دليل كامل للإقامة 10 سنوات",
    category: "Golden Visa",
    date: "January 15, 2026",
    readTime: "8 min read",
    description: "Everything you need to know about UAE Golden Visa eligibility, requirements, and application process.",
    content: `## What is the UAE Golden Visa?

The UAE Golden Visa is a long-term residence visa that allows talented foreigners, investors, entrepreneurs, and outstanding students to live, work, and study in the UAE without a national sponsor. It is valid for 5 or 10 years and renews automatically.

## Who is Eligible?

**Investors:** Property investors with AED 2 million+ investment, public investment fund depositors.

**Entrepreneurs:** Owners of startups approved by accredited UAE incubators, or with a minimum capital of AED 500,000.

**Talented Professionals:** Scientists, doctors, engineers, artists, and cultural professionals.

**Outstanding Students:** Top graduates from UAE or international universities with GPA 3.75+.

## Benefits of Golden Visa

- 10-year renewable residency
- 100% business ownership
- Sponsor family for same duration
- No UAE employer sponsor needed
- Multiple entry and flexible stay
- Work permit included

## How to Apply

1. Check eligibility via WhatsApp consultation
2. Prepare required documents
3. Submit application at Amer Center inside Dubai Immigration Building
4. Biometric enrollment at ICP
5. Receive Golden Visa within 5-10 working days

## Required Documents

- Valid passport (minimum 6 months validity)
- Recent passport photos
- Emirates ID (if applicable)
- Proof of eligibility (property deed, employment contract, etc.)
- Educational certificates (attested)

Contact Amer Center for a free eligibility assessment via WhatsApp.`,
  },
  "how-to-apply-golden-visa-whatsapp": {
    title: "How to Apply for Golden Visa via WhatsApp - Step by Step",
    titleAr: "كيفية التقديم على الإقامة الذهبية عبر واتساب",
    category: "Golden Visa",
    date: "January 10, 2026",
    readTime: "5 min read",
    description: "Apply for your UAE Golden Visa without visiting any office.",
    content: `## Apply for Golden Visa via WhatsApp

Amer Center Dubai offers the most convenient way to apply for UAE Golden Visa — entirely via WhatsApp.

## Step 1: Initial WhatsApp Message

Send a WhatsApp message to +971 50 451 2311 stating your interest in Golden Visa and your category (investor, entrepreneur, professional, or student).

## Step 2: Free Eligibility Check

Our expert team will review your profile and confirm your eligibility within a few hours.

## Step 3: Document Checklist

We will send you a customized document checklist based on your specific category.

## Step 4: Send Documents

Send clear photos/scans of your documents via WhatsApp. Our team will review for completeness.

## Step 5: Application Submission

We submit your application at Dubai Immigration Building on your behalf.

## Step 6: Biometric Enrollment

You will need to visit ICP once for fingerprints and photo (can be done at our office in DAFZA).

## Step 7: Receive Your Golden Visa

Your Golden Visa is issued within 5-10 working days. We send you all documents via WhatsApp.`,
  },
  "family-visa-dubai-requirements-2026": {
    title: "Family Visa Dubai 2026: Sponsor Your Family Complete Guide",
    titleAr: "تأشيرة العائلة دبي 2026: دليل كامل لكفالة عائلتك",
    category: "Family Visa",
    date: "January 8, 2026",
    readTime: "7 min read",
    description: "Complete requirements for spouse visa, children visa, and parent visa in Dubai.",
    content: `## Family Visa Dubai 2026

Sponsoring your family in Dubai is straightforward when you know the requirements. This guide covers everything you need for spouse, child, and parent visas.

## Spouse Visa Requirements

- Attested marriage certificate (from home country + UAE MOFA)
- Sponsor's salary certificate (minimum AED 4,000/month)
- Tenancy contract or accommodation proof
- Spouse's passport (6+ months validity)
- Recent passport photos
- Medical fitness test for spouse

## Children Visa Requirements

- Attested birth certificate
- Child's passport
- Sponsor's Emirates ID
- No salary minimum for children under 18
- School enrollment letter (for children 15-18)

## Parent Visa Requirements

- Proof of relationship (birth certificate)
- Sponsor's salary minimum AED 20,000/month
- Health insurance (mandatory)
- Parents' passports
- Medical fitness test

## Processing Time

Standard processing: 5-7 working days
Express processing: 2-3 working days (available at extra cost)

## Apply via WhatsApp

Send your documents to our WhatsApp and we handle the entire process remotely.`,
  },
  "emirates-id-renewal-replacement-guide": {
    title: "Emirates ID: Complete Guide to Renewal, Replacement & Updates",
    titleAr: "الهوية الإماراتية: دليل التجديد والاستبدال والتحديثات",
    category: "Emirates ID",
    date: "January 5, 2026",
    readTime: "6 min read",
    description: "Step-by-step guide for Emirates ID renewal, replacement, and updates.",
    content: `## Emirates ID Services Guide

Your Emirates ID is your primary identification in the UAE. Here's everything you need to know about renewing, replacing, or updating it.

## Emirates ID Renewal

**When to Renew:** Renew within 30 days before or after expiry.

**Required Documents:**
- Current Emirates ID (expired or about to expire)
- Valid residence visa
- Recent passport photo

**Processing Time:** 3-5 working days

## Lost or Damaged Emirates ID

**Steps:**
1. File police report (for lost ID)
2. Visit Amer Center with police report + passport
3. Pay replacement fee
4. New card delivered in 5-7 working days

## Data Updates

**What You Can Update:**
- Mobile number (most common request)
- Email address
- Profession/job title
- Residential address

**Note:** Some updates require additional documents.

## Apply via WhatsApp

Send us your current Emirates ID photo and residence visa via WhatsApp for a quick assessment and quotation.`,
  },
  "mohre-services-dubai-explained": {
    title: "MOHRE Services Explained: Work Permits, Labour Cards & More",
    titleAr: "خدمات وزارة الموارد البشرية: تصاريح العمل وبطاقة العمل",
    category: "MOHRE",
    date: "January 3, 2026",
    readTime: "9 min read",
    description: "Complete guide to Ministry of Human Resources services.",
    content: `## MOHRE Services in Dubai

The Ministry of Human Resources and Emiratisation (MOHRE) regulates employment in the UAE. Amer Center handles all MOHRE services efficiently.

## Work Permit Services

**New Work Permit:** Required for all new employees in UAE. Process: 2-3 working days.

**Work Permit Renewal:** Must be renewed with residence visa. Same timeline as visa renewal.

**Work Permit Cancellation:** Required when employee leaves company or UAE.

## Labour Card Services

Every employee must have a valid Labour Card. Services include:
- New Labour Card issuance
- Labour Card renewal
- Change of profession (job title change)
- Change of employer/sponsorship transfer

## Tasheel Services

Tasheel is MOHRE's service center network. Services include:
- Work contract attestation
- Salary certificate
- Labour dispute filing
- Company quota requests

## Domestic Worker Sponsorship

Special MOHRE category for:
- Housemaids / domestic helpers
- Drivers
- Babysitters / nannies
- Gardeners

Includes: Work permit + visa + Emirates ID processing.

Contact Amer Center for all MOHRE services via WhatsApp.`,
  },
  "dubai-business-setup-guide-2026": {
    title: "Dubai Business Setup 2026: Mainland vs Free Zone Comparison",
    titleAr: "تأسيس الشركات في دبي 2026: المقارنة بين الفري زون والمينلاند",
    category: "Business",
    date: "December 28, 2025",
    readTime: "10 min read",
    description: "Choose the best business structure for your company.",
    content: `## Dubai Business Setup 2026

Dubai remains the top destination for business setup in the Middle East. Here's a comprehensive comparison to help you choose.

## Mainland vs Free Zone

| Feature | Mainland | Free Zone |
|---------|----------|-----------|
| Trade Restriction | No restriction | Limited to Free Zone |
| Foreign Ownership | 100% | 100% |
| Corporate Tax | 9% (above AED 375K) | 0% for most |
| Setup Cost | AED 15,000-30,000 | AED 10,000-25,000 |

## Popular Free Zones

**DMCC (Dubai Multi Commodities Centre):** Best for trading companies.

**DAFZA (Dubai Airport Free Zone):** Our location! Best for import/export.

**JAFZA (Jebel Ali Free Zone):** Best for logistics and manufacturing.

**Dubai Silicon Oasis:** Best for technology companies.

## Steps to Setup a Business

1. Choose business activity
2. Select mainland or free zone
3. Choose trade name
4. Submit documents to relevant authority
5. Receive trade license
6. Open corporate bank account
7. Apply for visa quota

## Required Documents

- Passport copies (all shareholders)
- Business plan
- Proposed trade name
- MoA/AoA (for LLC)

Contact Amer Center for a free business setup consultation.`,
  },
  "attestation-services-dubai-all-embassies": {
    title: "Attestation Services Dubai: All Embassies & MOFA Guide",
    titleAr: "خدمات التصديق دبي: جميع السفارات ووزارة الخارجية",
    category: "Attestation",
    date: "December 25, 2025",
    readTime: "7 min read",
    description: "Complete guide to document attestation in Dubai.",
    content: `## Document Attestation in Dubai

Attestation verifies the authenticity of documents for use in the UAE or abroad. Amer Center handles attestation for all countries and all document types.

## Types of Attestation

**MOFA Attestation:** Ministry of Foreign Affairs UAE attestation required for most documents.

**Embassy Attestation:** Required for documents from specific countries.

**Apostille:** For documents from countries that are signatories to the Hague Convention.

## Countries We Cover

- India (Indian Embassy, Consulate)
- Pakistan (Pakistani Embassy)
- Philippines (Philippine Embassy)
- Egypt (Egyptian Embassy)
- Jordan, Lebanon, Syria
- UK, USA, Canada
- And 50+ more countries

## Documents We Attest

- Educational certificates (degrees, diplomas)
- Marriage certificates
- Birth certificates
- Police clearance certificates
- Commercial documents
- Power of Attorney
- Medical certificates

## Translation Services

We provide certified translation in:
- Arabic, English, Hindi, Urdu
- French, German, Spanish
- And 30+ other languages

Contact us via WhatsApp for attestation quotes and timelines.`,
  },
  "dha-medical-fitness-test-dubai": {
    title: "DHA Medical Fitness Test Dubai: What to Expect & How to Prepare",
    titleAr: "الفحص الطبي DHA دبي: ماذا تتوقع وكيف تستعد",
    category: "Medical",
    date: "December 20, 2025",
    readTime: "5 min read",
    description: "Everything about Dubai Health Authority medical fitness test for visa.",
    content: `## DHA Medical Fitness Test

The DHA Medical Fitness Test is required for all new visa applicants and some visa renewals in Dubai. Amer Center coordinates your medical appointment seamlessly.

## What is Tested?

- Chest X-Ray (for tuberculosis)
- Blood test (HIV, hepatitis B, hepatitis C)
- Physical examination

## How to Prepare

- Fast for 4-6 hours before blood test
- Bring original passport and Emirates ID
- Bring 1 passport photo
- Wear comfortable clothing
- Arrive 10 minutes early

## Where to Go

DHA Curative Medicine Clinics across Dubai. We can book your appointment and direct you to the nearest clinic.

## Results Timeline

Results are typically available within 3-5 working days through the MOHAP online system.

## What if You Fail?

A "FAIL" result means a detected condition that doesn't allow visa. You have the right to a second test for confirmation. We guide you through the appeals process.

## Cost

DHA medical test fees: AED 300-500 depending on test type.

Book your DHA medical via WhatsApp with Amer Center for the smoothest experience.`,
  },
  "visa-renewal-cancellation-transfer-dubai": {
    title: "UAE Visa Renewal, Cancellation & Transfer: Complete Guide",
    titleAr: "تجديد وإلغاء ونقل التأشيرة في الإمارات: دليل كامل",
    category: "Visa",
    date: "December 15, 2025",
    readTime: "6 min read",
    description: "Step-by-step process for renewing, cancelling, or transferring your UAE residence visa.",
    content: `## UAE Visa Services: Complete Guide

Your UAE residence visa is the foundation of your legal stay. Here's everything you need to know about renewing, cancelling, or transferring your visa.

## Visa Renewal

**When to Renew:** Start 30 days before expiry to avoid overstay fines.

**Documents Needed:**
- Passport (valid 6+ months)
- Current visa copy
- Emirates ID
- Medical fitness test (if required)
- Employer NOC (for employment visa)

**Processing Time:** 3-7 working days

## Visa Cancellation

Required when leaving UAE permanently or changing employer.

**Steps:**
1. Employee informs employer
2. Company cancels work permit at MOHRE
3. Visa cancellation at Immigration
4. Emirates ID cancellation at ICP
5. Final exit stamp in passport

## Visa Transfer / Change of Sponsor

**Employment Transfer:** Old employer cancels visa, new employer applies fresh.

**Family to Employment:** Can be done inside UAE. Requires medical test.

**Investor Visa:** Available when investing AED 2M+ in property.

## Overstay Fines

AED 200 per day overstay. Grace period: 30 days after visa expiry.

We handle all visa services with zero errors. Apply via WhatsApp.`,
  },
  "amer-center-services-complete-guide": {
    title: "Amer Center Dubai: All Services Under One Roof - Complete Guide",
    titleAr: "مركز آمر دبي: جميع الخدمات في مكان واحد - دليل كامل",
    category: "Guide",
    date: "December 10, 2025",
    readTime: "8 min read",
    description: "Discover all services available at Amer Center Dubai inside the Immigration Building.",
    content: `## About Amer Center Dubai

Amer Center is an official government-approved typing and visa service center located inside the Dubai Immigration Building in DAFZA Al Twar. With 8+ years of experience, we have processed over 50,000 visas and government services.

## Our Location Advantage

We are located **inside** the Dubai Immigration Building — not just near it. This means:
- Faster processing (direct submission)
- No transportation delays
- Direct access to immigration officers
- Same-day service for urgent cases

## Complete Services List

### Visa Services
- Golden Visa (10-year residency)
- Family Visa (spouse, children, parents)
- Employment Visa
- Visa Renewal, Cancellation, Transfer
- Entry Permits

### Emirates ID Services
- New Emirates ID
- Renewal, Replacement, Data Updates

### Attestation & Translation
- All embassy attestations
- MOFA attestation
- Certified translation (30+ languages)

### Business Services
- Mainland company formation
- Free zone setup
- Trade license renewal
- Business visa quota

### Medical Services
- DHA Medical Fitness coordination
- Health card services

### Government Services
- MOHRE / Tasheel services
- Dubai Municipality
- DEQ services
- Notary public

## WhatsApp-First Service

Apply for any service from anywhere in the world via WhatsApp. No office visit needed until final biometrics.

Contact: +971 50 451 2311`,
  },
};

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = blogPosts[params.slug];
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.description,
  };
}

export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({ slug }));
}

export default function BlogPostPage({ params }: PageProps) {
  const post = blogPosts[params.slug];
  if (!post) notFound();

  const lines = post.content.split("\n");

  return (
    <>
      <article className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-8">
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          <div className="mb-8">
            <Badge variant="secondary" className="mb-4">{post.category}</Badge>
            <h1 className="text-3xl md:text-4xl font-light tracking-tight text-gray-900 mb-4">{post.title}</h1>
            <p className="text-gray-500 mb-4">{post.titleAr}</p>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />{post.date}</span>
              <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{post.readTime}</span>
            </div>
          </div>

          <div className="prose max-w-none">
            {lines.map((line, idx) => {
              if (line.startsWith("## ")) {
                return <h2 key={idx} className="text-2xl font-semibold text-gray-900 mt-8 mb-4">{line.replace("## ", "")}</h2>;
              }
              if (line.startsWith("**") && line.endsWith("**")) {
                return <p key={idx} className="font-semibold text-gray-900 mt-4">{line.replace(/\*\*/g, "")}</p>;
              }
              if (line.startsWith("- ")) {
                return <li key={idx} className="text-gray-600 ml-4 mb-1">{line.replace("- ", "")}</li>;
              }
              if (line.startsWith("|")) {
                return null;
              }
              if (line.trim() === "") {
                return <br key={idx} />;
              }
              return <p key={idx} className="text-gray-600 leading-relaxed mb-2">{line}</p>;
            })}
          </div>

          <div className="mt-12 p-8 bg-[#C9A962]/5 border border-[#C9A962]/20 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Need Help?</h3>
            <p className="text-gray-600 mb-4">Contact Amer Center Dubai for personalized assistance via WhatsApp.</p>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <Button className="bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-md">
                <SiWhatsapp className="h-4 w-4 mr-2" /> WhatsApp Us
              </Button>
            </a>
          </div>
        </div>
      </article>
    </>
  );
}
