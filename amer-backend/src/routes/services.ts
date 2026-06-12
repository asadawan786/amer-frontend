import { Router, Request, Response } from "express";
import { z } from "zod";
import { Service } from "../models/Service";
import { requireAuth } from "../middleware/requireAuth";

const router = Router();

const serviceSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  content: z.string().min(1, "Content is required"),
  category: z.enum(["visa-services", "attestation-translation", "dha-medical-typing", "emirates-id-government", "business-setup", "mohre-employment"]),
  subcategory: z.string().optional(),
  excerpt: z.string().optional(),
  icon: z.string().optional(),
  coverImage: z.string().optional(),
  thumbnailImage: z.string().optional(),
  status: z.enum(["draft", "published"]).optional(),
  isBuiltIn: z.boolean().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  metaKeywords: z.string().optional(),
  focusKeyword: z.string().optional(),
  canonicalUrl: z.string().optional(),
  robots: z.string().optional(),
  ogTitle: z.string().optional(),
  ogDescription: z.string().optional(),
  ogImage: z.string().optional(),
  geoRegion: z.string().optional(),
  geoPlacename: z.string().optional(),
  schemaType: z.string().optional(),
});

const SEED_SERVICES = [
  // ─────────────────────────── VISA SERVICES ───────────────────────────
  {
    title: "Golden Visa Dubai",
    slug: "golden-visa-dubai",
    category: "visa-services",
    subcategory: "golden-visa",
    icon: "🏆",
    excerpt: "10-year UAE residency for investors, entrepreneurs, talented professionals and outstanding students. Apply via WhatsApp.",
    metaTitle: "Golden Visa Dubai 2026 | 10-Year UAE Residency | Amer Center",
    metaDescription: "Apply for Dubai Golden Visa in 3-7 days. 10-year residency for investors, entrepreneurs, scientists, and talented professionals. WhatsApp application available.",
    metaKeywords: "golden visa dubai, UAE golden visa 2026, 10 year visa UAE, investor visa Dubai",
    focusKeyword: "Golden Visa Dubai",
    robots: "index,follow",
    geoRegion: "AE-DU",
    geoPlacename: "Dubai, UAE",
    schemaType: "Service",
    content: `<h2>UAE Golden Visa Dubai</h2>
<p>Secure your future in the UAE with the prestigious Golden Visa — a 10-year renewable residency visa for investors, entrepreneurs, scientists, and exceptional talents. Apply from anywhere via WhatsApp with zero office visits required.</p>

<h3>Key Benefits</h3>
<ul>
  <li>10-year renewable residency visa</li>
  <li>100% business ownership allowed</li>
  <li>Sponsor family members for the same 10-year duration</li>
  <li>No need for a UAE employer sponsor</li>
  <li>Multiple entries and flexible stay periods</li>
  <li>Work permit included</li>
</ul>

<h3>Eligibility Categories</h3>

<h4>🏠 Investors</h4>
<p>Property investors with AED 2 million or more in UAE real estate, or public investment fund depositors qualify for the Golden Visa.</p>
<ul>
  <li>Property worth AED 2 million or more</li>
  <li>Investment fund deposit confirmation</li>
  <li>Valid passport (6+ months validity)</li>
  <li>Emirates ID (if already resident)</li>
</ul>

<h4>💼 Entrepreneurs</h4>
<p>Business owners with approved projects or existing companies with minimum capital of AED 500,000 qualify.</p>
<ul>
  <li>Approved startup from an accredited UAE incubator</li>
  <li>Minimum capital requirements met</li>
  <li>Valid business license</li>
  <li>Business plan approval documentation</li>
</ul>

<h4>🎓 Talented Professionals</h4>
<p>Scientists, doctors, engineers, artists, and specialists in priority fields recognized by UAE authorities.</p>
<ul>
  <li>Valid employment contract in a qualifying field</li>
  <li>Salary threshold met (varies by category)</li>
  <li>Attested educational credentials</li>
  <li>Recommendation from a relevant authority or employer</li>
</ul>

<h4>🎓 Outstanding Students</h4>
<p>Top graduates from UAE universities or internationally recognized institutions with GPA 3.75 or higher.</p>
<ul>
  <li>GPA of 3.75 or higher</li>
  <li>Graduation from a top-100 ranked university</li>
  <li>Recent graduation (within 2 years)</li>
  <li>No prior UAE employment required</li>
</ul>

<h3>Processing Time</h3>
<p>3–7 business days after all documents are submitted and verified.</p>

<h3>How to Apply</h3>
<ol>
  <li>Send a WhatsApp message to check your eligibility (free consultation)</li>
  <li>Submit required documents via WhatsApp or in person</li>
  <li>Medical fitness test at an approved DHA center</li>
  <li>Biometric enrollment at ICP</li>
  <li>Receive your Golden Visa within 3–7 working days</li>
</ol>`,
    status: "published",
    isBuiltIn: true,
  },

  {
    title: "Family Visa Dubai",
    slug: "family-visa-dubai",
    category: "visa-services",
    subcategory: "family-visa",
    icon: "👨‍👩‍👧‍👦",
    excerpt: "Sponsor your spouse, children and parents to live with you in UAE. Complete requirements and fast processing via WhatsApp.",
    metaTitle: "Family Visa Dubai 2026 | Sponsor Spouse & Children | Amer Center",
    metaDescription: "Sponsor your spouse, children, and parents in UAE. Complete requirements for family visa Dubai. Fast processing via WhatsApp.",
    metaKeywords: "family visa dubai, spouse visa UAE, child visa Dubai, dependent visa UAE, parent visa Dubai",
    focusKeyword: "Family Visa Dubai",
    robots: "index,follow",
    geoRegion: "AE-DU",
    geoPlacename: "Dubai, UAE",
    schemaType: "Service",
    content: `<h2>Family Visa Dubai</h2>
<p>Bring your loved ones to the UAE. We process spouse, child, and parent residency visas quickly and efficiently — apply via WhatsApp from anywhere in the world with no office visit required.</p>

<h3>Why Apply with Amer Center</h3>
<ul>
  <li>Located inside the Dubai Immigration Building (DAFZA Al Twar)</li>
  <li>3–7 working days processing time</li>
  <li>100% document accuracy guarantee</li>
  <li>WhatsApp application — no office visit needed</li>
  <li>Expert guidance throughout the process</li>
</ul>

<h3>Visa Types</h3>

<h4>💑 Spouse Visa</h4>
<p>Sponsor your husband or wife to live with you in the UAE on a long-term residence visa.</p>
<p><strong>Requirements:</strong></p>
<ul>
  <li>Attested marriage certificate (MOFA-attested)</li>
  <li>Sponsor's salary minimum AED 4,000/month</li>
  <li>Tenancy contract or proof of accommodation</li>
  <li>Spouse's passport and passport photos</li>
  <li>Medical fitness test</li>
  <li>Sponsor's Emirates ID and residence visa</li>
</ul>

<h4>👶 Child Visa</h4>
<p>Sponsor your children under 18 years old (up to age 22 for students) for UAE residence.</p>
<p><strong>Requirements:</strong></p>
<ul>
  <li>Attested birth certificate</li>
  <li>Child's passport and passport photos</li>
  <li>Sponsor's Emirates ID</li>
  <li>School enrollment proof (for children above 18)</li>
  <li>Medical fitness test</li>
</ul>

<h4>👴 Parent Visa</h4>
<p>Sponsor your parents on a 1-year renewable residence visa.</p>
<p><strong>Requirements:</strong></p>
<ul>
  <li>Proof of relationship (birth certificate)</li>
  <li>Sponsor's salary minimum AED 20,000/month</li>
  <li>Valid medical insurance for parents</li>
  <li>Parents' passports and photos</li>
  <li>Medical fitness test</li>
</ul>

<h3>Processing Time</h3>
<p>3–7 working days after complete document submission.</p>

<h3>How to Apply</h3>
<ol>
  <li>WhatsApp us with your sponsor details and family member information</li>
  <li>Receive a document checklist specific to your case</li>
  <li>Submit documents (in person or via WhatsApp)</li>
  <li>Medical fitness test coordination</li>
  <li>Visa stamping and Emirates ID enrollment</li>
</ol>`,
    status: "published",
    isBuiltIn: true,
  },

  {
    title: "Visa Renewal Dubai",
    slug: "visa-renewal-dubai",
    category: "visa-services",
    subcategory: "visa-renewal",
    icon: "🔄",
    excerpt: "UAE residence visa renewal — all types. Start 30 days before expiry to avoid fines. Same-day service available inside Immigration Building.",
    metaTitle: "Visa Renewal Dubai | UAE Residence Visa | Amer Center",
    metaDescription: "UAE residence visa renewal services. All visa types — employment, family, investor. Fast processing at Amer Center inside Dubai Immigration Building.",
    metaKeywords: "visa renewal dubai, UAE residence visa renewal, residence visa renewal, expiry visa UAE",
    focusKeyword: "Visa Renewal Dubai",
    robots: "index,follow",
    geoRegion: "AE-DU",
    geoPlacename: "Dubai, UAE",
    schemaType: "Service",
    content: `<h2>Visa Renewal Dubai</h2>
<p>Renew your UAE residence visa quickly and accurately at Amer Center, located inside the Dubai Immigration Building. Avoid overstay fines of AED 200/day by renewing early.</p>

<h3>Why Renew at Amer Center</h3>
<ul>
  <li>Inside Dubai Immigration Building — direct submission</li>
  <li>Same-day service available</li>
  <li>All visa types processed</li>
  <li>Grace period assistance (overstay cases handled)</li>
  <li>WhatsApp status updates throughout</li>
</ul>

<h3>Visa Types We Renew</h3>
<ul>
  <li>Employment residence visa</li>
  <li>Family/dependent residence visa</li>
  <li>Investor residence visa</li>
  <li>Student residence visa</li>
  <li>Golden Visa renewal</li>
  <li>Domestic worker visa</li>
</ul>

<h3>Required Documents</h3>
<ul>
  <li>Current passport (valid for at least 6 months)</li>
  <li>Current or expired Emirates ID</li>
  <li>Current or expired residence visa</li>
  <li>Medical fitness test clearance (for new applicants)</li>
  <li>Sponsor's documents (for family visas)</li>
  <li>Employment contract or salary certificate (for employment visas)</li>
</ul>

<h3>Processing Time</h3>
<p>3–7 working days. Same-day processing available for urgent cases.</p>

<h3>Important Notes</h3>
<ul>
  <li>Start renewal 30 days before expiry to avoid overstay fines</li>
  <li>Overstay fine: AED 200 per day after grace period</li>
  <li>Grace period: 30 days after visa expiry</li>
  <li>Medical fitness test required for renewals after long absences</li>
</ul>`,
    status: "published",
    isBuiltIn: true,
  },

  {
    title: "Entry Permits UAE",
    slug: "entry-permits-uae",
    category: "visa-services",
    subcategory: "entry-permits",
    icon: "🛂",
    excerpt: "Tourist, visit, and transit entry permits for UAE. 30, 60, and 90-day durations available. Multiple entry options.",
    metaTitle: "UAE Entry Permits | Tourist & Visit Visa Dubai | Amer Center",
    metaDescription: "Tourist, visit, and transit visa entry permits for UAE. Multiple durations available. Apply via WhatsApp at Amer Center Dubai.",
    metaKeywords: "UAE entry permit, tourist visa dubai, visit visa UAE, transit visa Dubai",
    focusKeyword: "UAE Entry Permit",
    robots: "index,follow",
    geoRegion: "AE-DU",
    geoPlacename: "Dubai, UAE",
    schemaType: "Service",
    content: `<h2>UAE Entry Permits</h2>
<p>We process tourist, visit, and transit entry permits for the UAE. Available in multiple durations with single and multiple entry options. Apply via WhatsApp for fast processing.</p>

<h3>Types of Entry Permits</h3>

<h4>Tourist Visa</h4>
<ul>
  <li>30-day single entry: AED 250</li>
  <li>60-day single entry: AED 450</li>
  <li>90-day single entry: AED 650</li>
  <li>30-day multiple entry: AED 650</li>
</ul>

<h4>Visit Visa</h4>
<ul>
  <li>30-day visit visa for family visits</li>
  <li>Extendable inside UAE</li>
  <li>Quick processing via email/WhatsApp</li>
</ul>

<h4>Transit Visa</h4>
<ul>
  <li>48-hour transit for stopover in Dubai</li>
  <li>96-hour transit for longer stopovers</li>
</ul>

<h3>Required Documents</h3>
<ul>
  <li>Valid passport (minimum 6 months validity)</li>
  <li>Passport-size photo (white background)</li>
  <li>Return flight ticket</li>
  <li>Hotel booking or host's Emirates ID</li>
  <li>Bank statement (3 months)</li>
</ul>

<h3>Processing Time</h3>
<p>24–48 hours. Delivered via email. No collection required.</p>`,
    status: "published",
    isBuiltIn: true,
  },

  {
    title: "Visa Cancellation Dubai",
    slug: "visa-cancellation-dubai",
    category: "visa-services",
    subcategory: "visa-cancellation",
    icon: "❌",
    excerpt: "Proper UAE residence visa cancellation when leaving UAE or changing employer. Includes MOHRE and Emirates ID deactivation.",
    metaTitle: "Visa Cancellation Dubai | UAE Residence Visa | Amer Center",
    metaDescription: "UAE residence visa cancellation services. Includes MOHRE work permit cancellation and ICA Emirates ID deactivation. Fast processing at Amer Center.",
    metaKeywords: "visa cancellation dubai, UAE visa cancel, residence visa cancellation, MOHRE cancellation",
    focusKeyword: "Visa Cancellation Dubai",
    robots: "index,follow",
    geoRegion: "AE-DU",
    geoPlacename: "Dubai, UAE",
    schemaType: "Service",
    content: `<h2>Visa Cancellation Dubai</h2>
<p>Proper visa cancellation is required when leaving the UAE permanently, changing employers, or transitioning to a different visa category. We handle the complete cancellation process including all linked services.</p>

<h3>What We Cancel</h3>
<ul>
  <li>UAE residence visa (ICP/GDRFA)</li>
  <li>MOHRE work permit / Labour card</li>
  <li>Emirates ID deactivation</li>
  <li>Health insurance deregistration (if applicable)</li>
</ul>

<h3>When You Need Visa Cancellation</h3>
<ul>
  <li>Leaving UAE permanently</li>
  <li>Changing employer (work visa transfer)</li>
  <li>Transitioning from employment to family visa</li>
  <li>End of contract or resignation</li>
</ul>

<h3>Required Documents</h3>
<ul>
  <li>Original passport</li>
  <li>Emirates ID (original)</li>
  <li>Employer NOC letter (for employment visa)</li>
  <li>Last salary certificate or settlement letter</li>
</ul>

<h3>Processing Time</h3>
<p>1–3 working days. Exit permit arranged concurrently if needed.</p>

<h3>Important Notes</h3>
<ul>
  <li>Do NOT travel without proper visa cancellation — you may be blacklisted</li>
  <li>Final settlement from employer must be arranged before cancellation</li>
  <li>Out-of-status cases handled with expertise — no fines for proper process</li>
</ul>`,
    status: "published",
    isBuiltIn: true,
  },

  {
    title: "Visa Status Change",
    slug: "visa-status-change",
    category: "visa-services",
    subcategory: "status-change",
    icon: "🔃",
    excerpt: "Change your UAE visa type or sponsor inside UAE without exit. Family to employment, free zone to mainland and more.",
    metaTitle: "Visa Status Change UAE | Change Visa Type Inside UAE | Amer Center",
    metaDescription: "Change UAE visa type or sponsor inside UAE without exiting. Employment, family, student, investor visa status changes. Fast processing at Amer Center.",
    metaKeywords: "visa status change UAE, change visa sponsor Dubai, visa transfer UAE, change visa type",
    focusKeyword: "Visa Status Change UAE",
    robots: "index,follow",
    geoRegion: "AE-DU",
    geoPlacename: "Dubai, UAE",
    schemaType: "Service",
    content: `<h2>Visa Status Change UAE</h2>
<p>Change your visa category or sponsor inside the UAE without the need to exit and re-enter the country. We handle all types of visa status changes efficiently.</p>

<h3>Status Changes We Process</h3>
<ul>
  <li>Family visa → Employment visa</li>
  <li>Employment visa → Family visa (dependant)</li>
  <li>Free zone visa → Mainland visa</li>
  <li>Employer to employer transfer (same or different visa type)</li>
  <li>Student visa → Employment visa</li>
  <li>Visit/Tourist visa → Residence visa (inside country)</li>
</ul>

<h3>Required Documents</h3>
<ul>
  <li>Valid passport (6+ months validity)</li>
  <li>Current visa and Emirates ID</li>
  <li>New employment contract or sponsorship documents</li>
  <li>Salary certificate or bank statement</li>
  <li>Medical fitness test clearance</li>
  <li>NOC from current sponsor (where applicable)</li>
</ul>

<h3>Processing Time</h3>
<p>5–10 working days for most status changes.</p>

<h3>Medical Test Requirement</h3>
<p>A DHA medical fitness test (chest X-ray + blood test) is required for all status changes. We coordinate the test appointment and submission.</p>`,
    status: "published",
    isBuiltIn: true,
  },

  {
    title: "Visa Stamping Dubai",
    slug: "visa-stamping-dubai",
    category: "visa-services",
    subcategory: "visa-renewal",
    icon: "📋",
    excerpt: "Visa stamping in passport at Amer Center inside Immigration Building. Same-day stamping available for all nationalities.",
    metaTitle: "Visa Stamping Dubai | Same-Day Service | Amer Center",
    metaDescription: "UAE visa stamping service at Amer Center inside Dubai Immigration Building. Same-day processing. All nationalities. WhatsApp for slot booking.",
    metaKeywords: "visa stamping dubai, passport stamping UAE, visa sticker UAE, residence visa stamping",
    focusKeyword: "Visa Stamping Dubai",
    robots: "index,follow",
    geoRegion: "AE-DU",
    geoPlacename: "Dubai, UAE",
    schemaType: "Service",
    content: `<h2>Visa Stamping Dubai</h2>
<p>Get your UAE residence visa stamped in your passport at Amer Center, located inside the Dubai Immigration Building. We offer same-day stamping for all nationalities with zero waiting.</p>

<h3>Stamping Services</h3>
<ul>
  <li>New visa stamping (first-time issuance)</li>
  <li>Renewal visa stamping</li>
  <li>Status change visa stamping</li>
  <li>Transfer visa stamping</li>
</ul>

<h3>Why Stamp at Amer Center</h3>
<ul>
  <li>Inside the Immigration Building — fastest processing in Dubai</li>
  <li>Same-day stamping service</li>
  <li>All nationality passports accepted</li>
  <li>Medical coordination available concurrently</li>
  <li>Emirates ID enrollment arranged at same visit</li>
</ul>

<h3>Required Documents</h3>
<ul>
  <li>Original passport</li>
  <li>Entry permit / e-visa approval</li>
  <li>Medical fitness test result (where required)</li>
  <li>Emirates ID application receipt (for new applicants)</li>
  <li>2 passport photos (white background)</li>
</ul>

<h3>Processing Time</h3>
<p>Same-day service (within 4–6 hours) for most cases.</p>`,
    status: "published",
    isBuiltIn: true,
  },

  // ─────────────────────── ATTESTATION & TRANSLATION ───────────────────────
  {
    title: "Embassy Attestation Dubai",
    slug: "embassy-attestation-dubai",
    category: "attestation-translation",
    subcategory: "embassy-attestation",
    icon: "🌐",
    excerpt: "Document attestation for all embassies worldwide. Indian, Pakistani, Filipino, Egyptian, British, American and 50+ other embassies covered.",
    metaTitle: "Embassy Attestation Dubai | All Embassies | Amer Center",
    metaDescription: "Document attestation for all embassies in Dubai. Indian, Pakistani, Filipino, Egyptian, British, American and 50+ embassies. Fast and accurate service.",
    metaKeywords: "embassy attestation dubai, document attestation UAE, Indian embassy attestation, Pakistani embassy Dubai",
    focusKeyword: "Embassy Attestation Dubai",
    robots: "index,follow",
    geoRegion: "AE-DU",
    geoPlacename: "Dubai, UAE",
    schemaType: "Service",
    content: `<h2>Embassy Attestation Dubai</h2>
<p>We handle document attestation for all embassies and consulates in Dubai. Whether you need your documents attested for India, Pakistan, Philippines, Egypt, UK, USA, or any other country — we manage the complete process.</p>

<h3>Embassies We Cover</h3>
<ul>
  <li>Indian Embassy / Consulate Dubai</li>
  <li>Pakistani Consulate Dubai</li>
  <li>Philippines Consulate General Dubai</li>
  <li>Egyptian Embassy Dubai</li>
  <li>British Embassy UAE</li>
  <li>American Consulate Dubai</li>
  <li>Jordanian Embassy Dubai</li>
  <li>Sri Lankan Embassy</li>
  <li>Bangladeshi Embassy</li>
  <li>50+ other embassies and consulates</li>
</ul>

<h3>Documents We Attest</h3>
<ul>
  <li>Educational certificates (degree, diploma, HSC, SSC)</li>
  <li>Marriage certificates</li>
  <li>Birth certificates</li>
  <li>Death certificates</li>
  <li>Medical certificates</li>
  <li>Police clearance certificates</li>
  <li>Commercial documents (company documents, trade license)</li>
  <li>Power of Attorney</li>
</ul>

<h3>Attestation Process</h3>
<ol>
  <li>Home country notarization / state-level attestation</li>
  <li>Ministry of Foreign Affairs (home country) attestation</li>
  <li>UAE Embassy attestation in home country</li>
  <li>UAE MOFA attestation (final UAE step)</li>
  <li>Embassy in Dubai attestation (where required)</li>
</ol>

<h3>Processing Time</h3>
<p>Varies by embassy: 3–15 working days. Express options available for most embassies.</p>`,
    status: "published",
    isBuiltIn: true,
  },

  {
    title: "MOFA Attestation Dubai",
    slug: "mofa-attestation-dubai",
    category: "attestation-translation",
    subcategory: "mofa-attestation",
    icon: "📜",
    excerpt: "Ministry of Foreign Affairs attestation for UAE documents — mandatory step for all officially used documents in UAE or abroad.",
    metaTitle: "MOFA Attestation Dubai | Ministry of Foreign Affairs | Amer Center",
    metaDescription: "Ministry of Foreign Affairs (MOFA) attestation for all documents in Dubai. Fast processing. Required for legal, business, and personal documents.",
    metaKeywords: "MOFA attestation dubai, ministry foreign affairs UAE attestation, MOFA UAE, document MOFA",
    focusKeyword: "MOFA Attestation Dubai",
    robots: "index,follow",
    geoRegion: "AE-DU",
    geoPlacename: "Dubai, UAE",
    schemaType: "Service",
    content: `<h2>MOFA Attestation Dubai</h2>
<p>Ministry of Foreign Affairs (MOFA) attestation is the mandatory final step for most official documents used in the UAE or sent abroad. We handle same-day MOFA attestation for all document types at our Amer Center location.</p>

<h3>When You Need MOFA Attestation</h3>
<ul>
  <li>Getting documents legalized for use in UAE courts</li>
  <li>Business document authentication</li>
  <li>Educational certificates for job applications</li>
  <li>Personal documents (marriage, birth, death certificates)</li>
  <li>Power of Attorney</li>
  <li>Before sending documents to embassies</li>
</ul>

<h3>Types of Documents</h3>
<ul>
  <li>Personal documents: marriage, birth, divorce, death certificates</li>
  <li>Educational certificates: degree, diploma, transcripts</li>
  <li>Commercial documents: trade license, MOA, company registration</li>
  <li>Legal documents: court orders, judgments, Power of Attorney</li>
  <li>Medical certificates and reports</li>
</ul>

<h3>Processing Time</h3>
<p>Same-day or next-day processing for most documents.</p>

<h3>MOFA Attestation Steps</h3>
<ol>
  <li>Document notarization (if required)</li>
  <li>Ministry of Justice attestation (for UAE-issued legal docs)</li>
  <li>MOFA stamping and authentication</li>
  <li>Document ready for use or further attestation</li>
</ol>`,
    status: "published",
    isBuiltIn: true,
  },

  {
    title: "Translation Services Dubai",
    slug: "translation-services-dubai",
    category: "attestation-translation",
    subcategory: "translation",
    icon: "🌍",
    excerpt: "Certified translation in 30+ languages including Arabic, English, Hindi, Urdu, French, Spanish. Legal and official translations accepted by UAE authorities.",
    metaTitle: "Certified Translation Services Dubai | 30+ Languages | Amer Center",
    metaDescription: "Professional certified translation in Arabic, English, Hindi, Urdu, French, and 30+ languages. Official translations accepted by UAE government authorities.",
    metaKeywords: "translation services dubai, Arabic translation UAE, certified translation, legal translation Dubai",
    focusKeyword: "Translation Services Dubai",
    robots: "index,follow",
    geoRegion: "AE-DU",
    geoPlacename: "Dubai, UAE",
    schemaType: "Service",
    content: `<h2>Certified Translation Services Dubai</h2>
<p>Professional certified translation services for legal, official, and personal documents. Our translations are accepted by UAE government authorities, courts, embassies, and immigration departments.</p>

<h3>Languages We Translate</h3>
<ul>
  <li>Arabic ↔ English (most requested)</li>
  <li>Hindi, Urdu, Tagalog</li>
  <li>French, German, Spanish</li>
  <li>Russian, Chinese, Japanese</li>
  <li>30+ other languages on request</li>
</ul>

<h3>Documents We Translate</h3>
<ul>
  <li>Marriage and birth certificates</li>
  <li>Educational certificates and transcripts</li>
  <li>Legal contracts and agreements</li>
  <li>Business documents and MOA</li>
  <li>Medical records and reports</li>
  <li>Court orders and judgments</li>
  <li>Passports and Emirates ID</li>
  <li>Power of Attorney</li>
</ul>

<h3>Our Translators</h3>
<p>All translations are performed by certified and experienced translators specializing in legal and official document translation. UAE Ministry of Justice recognized where required.</p>

<h3>Processing Time</h3>
<p>Standard: 24–48 hours | Express: same-day (for Arabic/English)</p>

<h3>Accepted By</h3>
<ul>
  <li>Dubai Courts</li>
  <li>GDRFA (Immigration)</li>
  <li>MOHRE (Labour)</li>
  <li>Embassies and consulates</li>
  <li>UAE universities and schools</li>
</ul>`,
    status: "published",
    isBuiltIn: true,
  },

  {
    title: "Notary Public Services Dubai",
    slug: "notary-public-dubai",
    category: "attestation-translation",
    subcategory: "notarization",
    icon: "⚖️",
    excerpt: "Official document notarization in Dubai — Power of Attorney, contracts, wills and commercial documents. Legally recognized across UAE.",
    metaTitle: "Notary Public Dubai | Document Notarization | Amer Center",
    metaDescription: "Document notarization in Dubai — Power of Attorney, contracts, wills, and commercial documents. Legally recognized across UAE. Fast service at Amer Center.",
    metaKeywords: "notary public dubai, document notarization UAE, power of attorney dubai, notary services",
    focusKeyword: "Notary Public Dubai",
    robots: "index,follow",
    geoRegion: "AE-DU",
    geoPlacename: "Dubai, UAE",
    schemaType: "Service",
    content: `<h2>Notary Public Services Dubai</h2>
<p>Official notarization of legal documents in Dubai. Our notarized documents are legally recognized across the UAE and internationally where UAE notarization is accepted.</p>

<h3>Documents We Notarize</h3>
<ul>
  <li>Power of Attorney (personal and commercial)</li>
  <li>Business contracts and agreements</li>
  <li>Wills and inheritance documents</li>
  <li>Corporate resolutions and board minutes</li>
  <li>Statutory declarations</li>
  <li>Affidavits</li>
  <li>Real estate documents</li>
  <li>Loan and financial agreements</li>
</ul>

<h3>Power of Attorney Services</h3>
<p>We specialize in Power of Attorney (POA) preparation and notarization — the most frequently requested notary service. Your POA can be prepared and notarized within the same day.</p>
<ul>
  <li>Property POA</li>
  <li>Banking POA</li>
  <li>General POA</li>
  <li>Special/Limited POA</li>
</ul>

<h3>Processing Time</h3>
<p>Same-day notarization for most documents. Complex documents: 24 hours.</p>

<h3>After Notarization</h3>
<p>For international use, your document may also require MOFA attestation and embassy authentication — we handle the full chain.</p>`,
    status: "published",
    isBuiltIn: true,
  },

  // ─────────────────────── DHA MEDICAL & TYPING ───────────────────────
  {
    title: "DHA Medical Fitness Test Dubai",
    slug: "dha-medical-fitness-dubai",
    category: "dha-medical-typing",
    subcategory: "medical-fitness",
    icon: "🏥",
    excerpt: "Medical fitness tests required for UAE visa and Emirates ID applications. Chest X-ray, blood tests. Results in 3–5 working days.",
    metaTitle: "DHA Medical Fitness Test Dubai | Visa Medical | Amer Center",
    metaDescription: "DHA medical fitness test for UAE visa and Emirates ID. Includes chest X-ray, blood test for HIV and Hepatitis. Results in 3-5 working days. Fast appointment booking.",
    metaKeywords: "DHA medical test dubai, medical fitness test UAE, visa medical dubai, health test UAE",
    focusKeyword: "DHA Medical Fitness Test Dubai",
    robots: "index,follow",
    geoRegion: "AE-DU",
    geoPlacename: "Dubai, UAE",
    schemaType: "Service",
    content: `<h2>DHA Medical Fitness Test Dubai</h2>
<p>The DHA Medical Fitness Test is mandatory for all new visa applicants in Dubai. We coordinate fast appointments at approved medical centers with results in 3–5 working days.</p>

<h3>What the Test Includes</h3>
<ul>
  <li>Chest X-ray (screening for tuberculosis/TB)</li>
  <li>Blood test — HIV/AIDS screening</li>
  <li>Blood test — Hepatitis B and C</li>
  <li>Physical examination by licensed physician</li>
  <li>Blood test — syphilis and other communicable diseases</li>
</ul>

<h3>Who Needs the Medical Test</h3>
<ul>
  <li>All new residence visa applicants</li>
  <li>Visa renewals (after certain absences from UAE)</li>
  <li>Visa status change applicants</li>
  <li>Golden Visa applicants</li>
</ul>

<h3>How We Help</h3>
<ul>
  <li>Fast appointment booking at nearest DHA-approved center</li>
  <li>Document preparation and submission</li>
  <li>Result tracking and collection</li>
  <li>Direct integration with visa application process</li>
</ul>

<h3>Required Documents for Medical Test</h3>
<ul>
  <li>Valid passport</li>
  <li>Entry permit or current visa copy</li>
  <li>Passport-size photo</li>
  <li>Application form (we fill it for you)</li>
</ul>

<h3>Results Timeline</h3>
<p>Standard: 3–5 working days | Express: 24–48 hours (at select centers)</p>`,
    status: "published",
    isBuiltIn: true,
  },

  {
    title: "Typing Services Dubai",
    slug: "typing-services-dubai",
    category: "dha-medical-typing",
    subcategory: "typing-services",
    icon: "⌨️",
    excerpt: "Government forms and application typing services at Amer Center inside the Immigration Building. Fast, accurate, first-time approved.",
    metaTitle: "Typing Services Dubai | Government Forms | Amer Center",
    metaDescription: "Government form typing and application submission services at Amer Center inside Dubai Immigration Building. All government departments covered.",
    metaKeywords: "typing services dubai, government form typing, immigration typing center, GDRFA typing",
    focusKeyword: "Typing Services Dubai",
    robots: "index,follow",
    geoRegion: "AE-DU",
    geoPlacename: "Dubai, UAE",
    schemaType: "Service",
    content: `<h2>Typing Services Dubai</h2>
<p>Professional typing of all government forms and applications at Amer Center, located inside the Dubai Immigration Building. Our typing center is directly authorized for GDRFA, ICP, and MOHRE form submission.</p>

<h3>Forms We Type</h3>
<ul>
  <li>Visa applications (all categories)</li>
  <li>Emirates ID applications (new, renewal, replacement)</li>
  <li>GDRFA immigration applications</li>
  <li>ICP (Federal Authority for Identity) forms</li>
  <li>MOHRE employment forms</li>
  <li>Medical fitness application forms</li>
  <li>Business registration forms</li>
  <li>Court application forms</li>
</ul>

<h3>Advantages of Our Typing Center</h3>
<ul>
  <li>Located inside Dubai Immigration Building — fastest submission</li>
  <li>Direct access to GDRFA system</li>
  <li>100% accuracy — no rejection due to form errors</li>
  <li>Arabic and English typing</li>
  <li>Real-time status tracking</li>
  <li>Document scanning and digital submission</li>
</ul>

<h3>Processing</h3>
<p>Walk-in service. Most forms typed and submitted same-day. Express processing available for all application types.</p>`,
    status: "published",
    isBuiltIn: true,
  },

  {
    title: "Tasheel & MOHRE Services",
    slug: "tasheel-mohre-services",
    category: "dha-medical-typing",
    subcategory: "typing-services",
    icon: "📝",
    excerpt: "MOHRE Tasheel applications — work contract attestation, salary certificates, labour dispute filing, and company quota requests.",
    metaTitle: "Tasheel MOHRE Services Dubai | Labour Services | Amer Center",
    metaDescription: "Complete Tasheel (MOHRE) services in Dubai. Work contract attestation, salary certificates, labour dispute filing. Fast processing at Amer Center.",
    metaKeywords: "tasheel services dubai, MOHRE services, labour services UAE, work contract attestation dubai",
    focusKeyword: "Tasheel Services Dubai",
    robots: "index,follow",
    geoRegion: "AE-DU",
    geoPlacename: "Dubai, UAE",
    schemaType: "Service",
    content: `<h2>Tasheel & MOHRE Services Dubai</h2>
<p>Complete Tasheel (Ministry of Human Resources & Emiratisation) services at Amer Center. We process all MOHRE applications and forms quickly and accurately.</p>

<h3>Tasheel Services We Provide</h3>
<ul>
  <li>Work permit applications (new and renewal)</li>
  <li>Employment contract attestation</li>
  <li>Salary certificate issuance</li>
  <li>Labour dispute filing and assistance</li>
  <li>Company quota requests</li>
  <li>Domestic worker visa application</li>
  <li>Change of profession applications</li>
  <li>Change of employer requests</li>
</ul>

<h3>Who Needs Tasheel Services</h3>
<ul>
  <li>Employers hiring staff in UAE</li>
  <li>Employees filing disputes or complaints</li>
  <li>Companies applying for work permit quotas</li>
  <li>HR departments processing employee documents</li>
</ul>

<h3>Processing Time</h3>
<p>Most applications: 1–3 working days | Complex cases: 5–7 days</p>

<h3>Documents Required</h3>
<ul>
  <li>Trade license (employer)</li>
  <li>Employment contract</li>
  <li>Employee passport and visa copy</li>
  <li>Company signatory authorization</li>
</ul>`,
    status: "published",
    isBuiltIn: true,
  },

  {
    title: "DHA Health Card Services",
    slug: "dha-health-card-dubai",
    category: "dha-medical-typing",
    subcategory: "health-insurance",
    icon: "💊",
    excerpt: "DHA health card application and renewal for Dubai residents. Required for accessing DHA healthcare facilities.",
    metaTitle: "DHA Health Card Dubai | Health Insurance | Amer Center",
    metaDescription: "DHA health card application and renewal for Dubai residents. Quick processing at Amer Center. Required for DHA healthcare facility access.",
    metaKeywords: "DHA health card dubai, health card UAE, health insurance card, DHA card renewal",
    focusKeyword: "DHA Health Card Dubai",
    robots: "index,follow",
    geoRegion: "AE-DU",
    geoPlacename: "Dubai, UAE",
    schemaType: "Service",
    content: `<h2>DHA Health Card Services Dubai</h2>
<p>Health card services for Dubai residents through the Dubai Health Authority (DHA). Required for accessing DHA-run healthcare facilities at subsidized rates.</p>

<h3>Services We Provide</h3>
<ul>
  <li>New health card application</li>
  <li>Health card renewal (before or after expiry)</li>
  <li>Lost card replacement</li>
  <li>Health card data updates</li>
  <li>Health insurance enrollment assistance</li>
</ul>

<h3>Who Needs a DHA Health Card</h3>
<ul>
  <li>UAE residents without employer-provided health insurance</li>
  <li>Low-income residents accessing subsidized healthcare</li>
  <li>Domestic workers (required by law)</li>
  <li>Self-sponsored residents</li>
</ul>

<h3>Required Documents</h3>
<ul>
  <li>Valid UAE residence visa</li>
  <li>Emirates ID (or application receipt for new residents)</li>
  <li>Passport copy</li>
  <li>Passport-size photo</li>
  <li>Application fee (varies by category)</li>
</ul>

<h3>Processing Time</h3>
<p>Same-day card issuance in most cases. Insurance endorsement: 1–2 working days.</p>`,
    status: "published",
    isBuiltIn: true,
  },

  // ─────────────────────── EMIRATES ID & GOVERNMENT ───────────────────────
  {
    title: "Emirates ID Services Dubai",
    slug: "emirates-id-services-dubai",
    category: "emirates-id-government",
    subcategory: "emirates-id-renewal",
    icon: "🪪",
    excerpt: "New Emirates ID, renewal, replacement for lost/damaged, and data updates. Fastest processing in Dubai inside the Immigration Building.",
    metaTitle: "Emirates ID Services Dubai | New, Renewal & Replacement | Amer Center",
    metaDescription: "Emirates ID new application, renewal, replacement for lost/damaged, and data updates. Fast processing at Amer Center Dubai inside Immigration Building.",
    metaKeywords: "emirates ID dubai, emirates ID renewal, emirates ID replacement, ICP services dubai",
    focusKeyword: "Emirates ID Dubai",
    robots: "index,follow",
    geoRegion: "AE-DU",
    geoPlacename: "Dubai, UAE",
    schemaType: "Service",
    content: `<h2>Emirates ID Services Dubai</h2>
<p>Complete Emirates ID services at Amer Center — new applications, renewals, replacements, and data updates. Our location inside the Dubai Immigration Building means direct submission and the fastest processing in Dubai.</p>

<h3>Services We Provide</h3>

<h4>🆕 New Emirates ID</h4>
<p>For first-time UAE residents. Required after receiving your residence visa.</p>
<ul>
  <li>Biometric enrollment (fingerprint + photo)</li>
  <li>Application submission to ICP</li>
  <li>Delivery within 3–5 working days</li>
  <li>Express option: 24 hours</li>
</ul>

<h4>🔄 Emirates ID Renewal</h4>
<p>Renew before or after expiry — avoid AED 20/day fines for expired ID.</p>
<ul>
  <li>Current or expired Emirates ID required</li>
  <li>Valid residence visa required</li>
  <li>Processing: 3–5 working days</li>
  <li>Start renewal 30 days before expiry</li>
</ul>

<h4>🔁 Lost or Damaged Replacement</h4>
<p>Replace your lost, stolen, or physically damaged Emirates ID.</p>
<ul>
  <li>Police report required for lost/stolen ID</li>
  <li>Damaged ID physical card must be returned</li>
  <li>Replacement fee applies (varies)</li>
  <li>New card within 5–7 days</li>
</ul>

<h4>✏️ Data Updates</h4>
<p>Update your personal information on file with ICP.</p>
<ul>
  <li>Mobile number update</li>
  <li>Email address update</li>
  <li>Profession / job title change</li>
  <li>Address update</li>
  <li>Supporting documents required for each change</li>
</ul>

<h3>Processing Time</h3>
<p>Standard: 3–5 working days | Express: 24 hours (additional fee)</p>`,
    status: "published",
    isBuiltIn: true,
  },

  {
    title: "Police Clearance Certificate Dubai",
    slug: "police-clearance-dubai",
    category: "emirates-id-government",
    subcategory: "government-services",
    icon: "🛡️",
    excerpt: "Good Conduct Certificate from Dubai Police. Required for employment, visa applications, and immigration purposes.",
    metaTitle: "Police Clearance Certificate Dubai | Good Conduct | Amer Center",
    metaDescription: "Good Conduct Certificate (police clearance) from Dubai Police. Required for employment, visa, or immigration. Processing in 3-5 working days via Amer Center.",
    metaKeywords: "police clearance dubai, good conduct certificate UAE, criminal background check dubai",
    focusKeyword: "Police Clearance Certificate Dubai",
    robots: "index,follow",
    geoRegion: "AE-DU",
    geoPlacename: "Dubai, UAE",
    schemaType: "Service",
    content: `<h2>Police Clearance Certificate Dubai</h2>
<p>The Good Conduct Certificate (GCC) issued by Dubai Police is required for employment overseas, visa applications, immigration, and professional licensing. We process it quickly on your behalf.</p>

<h3>When You Need It</h3>
<ul>
  <li>Employment in foreign countries</li>
  <li>Immigration applications abroad</li>
  <li>Professional licensing (medical, legal, engineering)</li>
  <li>Visa applications requiring background check</li>
  <li>Company formation documents</li>
</ul>

<h3>Types of Police Clearance</h3>
<ul>
  <li>Dubai Police Good Conduct Certificate (for UAE residents)</li>
  <li>INTERPOL clearance (for international immigration)</li>
</ul>

<h3>Required Documents</h3>
<ul>
  <li>Valid passport</li>
  <li>UAE residence visa or Emirates ID</li>
  <li>Passport-size photo</li>
  <li>Application form (we prepare it)</li>
  <li>Purpose letter (for employer-requested certificates)</li>
</ul>

<h3>Processing Time</h3>
<p>3–5 working days. Digital certificate available via Dubai Police app for immediate use.</p>

<h3>Attestation for Overseas Use</h3>
<p>If the certificate is for use abroad, it may require MOFA attestation and embassy authentication — we handle the full chain.</p>`,
    status: "published",
    isBuiltIn: true,
  },

  {
    title: "PRO Services Dubai",
    slug: "pro-services-dubai",
    category: "emirates-id-government",
    subcategory: "government-services",
    icon: "🤝",
    excerpt: "Professional government liaison services — we handle all government transactions on your behalf across all UAE departments.",
    metaTitle: "PRO Services Dubai | Government Liaison | Amer Center",
    metaDescription: "Professional PRO (Public Relations Officer) services in Dubai. Government transactions, visa processing, trade license, Emirates ID — all handled for you.",
    metaKeywords: "PRO services dubai, government liaison UAE, public relations officer Dubai, PRO company UAE",
    focusKeyword: "PRO Services Dubai",
    robots: "index,follow",
    geoRegion: "AE-DU",
    geoPlacename: "Dubai, UAE",
    schemaType: "Service",
    content: `<h2>PRO Services Dubai</h2>
<p>Public Relations Officer (PRO) services for businesses and individuals. We handle all government transactions across multiple UAE departments on your behalf — saving you time and eliminating bureaucratic delays.</p>

<h3>Departments We Cover</h3>
<ul>
  <li>GDRFA (Immigration / Residence Visas)</li>
  <li>ICP (Emirates ID / Identity)</li>
  <li>MOHRE (Ministry of Human Resources)</li>
  <li>DED (Department of Economic Development)</li>
  <li>Dubai Courts</li>
  <li>Dubai Police</li>
  <li>MOFA (Ministry of Foreign Affairs)</li>
  <li>Ministry of Health (DHA)</li>
</ul>

<h3>Services We Handle</h3>
<ul>
  <li>Visa applications, renewals, and cancellations</li>
  <li>Emirates ID processing across all types</li>
  <li>Trade license new, renewal, and amendment</li>
  <li>Company registration and modifications</li>
  <li>Employment and work permit processing</li>
  <li>Document attestation and MOFA services</li>
  <li>Court document filing and follow-up</li>
</ul>

<h3>For Businesses</h3>
<p>Monthly PRO retainer packages available for companies with recurring government transaction needs. Includes dedicated PRO officer, guaranteed turnaround times, and monthly reporting.</p>

<h3>Processing</h3>
<p>On-demand or retainer basis. Contact us for a quote based on your transaction volume.</p>`,
    status: "published",
    isBuiltIn: true,
  },

  {
    title: "Legal Documentation Services",
    slug: "legal-documentation-dubai",
    category: "emirates-id-government",
    subcategory: "government-services",
    icon: "📋",
    excerpt: "Power of Attorney, contracts, wills and legal document preparation. Notarized and legally binding across UAE.",
    metaTitle: "Legal Documentation Dubai | Power of Attorney | Amer Center",
    metaDescription: "Legal document preparation in Dubai — Power of Attorney, contracts, wills, and affidavits. Notarized and legally binding across UAE. Same-day service.",
    metaKeywords: "legal services dubai, power of attorney UAE, legal documents Dubai, will dubai, contract drafting UAE",
    focusKeyword: "Legal Documentation Dubai",
    robots: "index,follow",
    geoRegion: "AE-DU",
    geoPlacename: "Dubai, UAE",
    schemaType: "Service",
    content: `<h2>Legal Documentation Services Dubai</h2>
<p>Professional legal document preparation and notarization in Dubai. Our legal documentation services cover personal, commercial, and real estate documents — all notarized and legally binding across the UAE.</p>

<h3>Documents We Prepare</h3>
<ul>
  <li>Power of Attorney (General, Special, Commercial)</li>
  <li>Employment contracts and agreements</li>
  <li>Tenancy agreements and addendums</li>
  <li>Wills and inheritance planning documents</li>
  <li>Affidavits and statutory declarations</li>
  <li>Memorandum of Understanding (MOU)</li>
  <li>Business partnership agreements</li>
  <li>Share transfer agreements</li>
</ul>

<h3>Power of Attorney (Most Popular)</h3>
<p>Our most requested legal service. POA allows a designated person to act on your behalf for property, banking, business, or personal matters.</p>
<ul>
  <li>General POA — covers all matters</li>
  <li>Property POA — real estate transactions</li>
  <li>Banking POA — financial transactions</li>
  <li>Special POA — specific single transaction</li>
</ul>

<h3>Processing Time</h3>
<p>Same-day preparation and notarization for most documents.</p>

<h3>For International Use</h3>
<p>Documents requiring overseas use are further attested through MOFA and relevant embassies — we manage the complete apostille/attestation chain.</p>`,
    status: "published",
    isBuiltIn: true,
  },

  // ─────────────────────── BUSINESS SETUP ───────────────────────
  {
    title: "Mainland Company Formation Dubai",
    slug: "mainland-company-formation-dubai",
    category: "business-setup",
    subcategory: "mainland-company",
    icon: "🏢",
    excerpt: "Set up a Dubai mainland company with 100% foreign ownership. Trade freely across UAE with no restrictions. DED licensed.",
    metaTitle: "Mainland Company Formation Dubai | DED License | Amer Center",
    metaDescription: "Set up your mainland company in Dubai with 100% foreign ownership. Trade freely across UAE. DED trade license. Fast registration via Amer Center.",
    metaKeywords: "mainland company dubai, DED license dubai, company formation UAE, 100% foreign ownership dubai",
    focusKeyword: "Mainland Company Formation Dubai",
    robots: "index,follow",
    geoRegion: "AE-DU",
    geoPlacename: "Dubai, UAE",
    schemaType: "Service",
    content: `<h2>Mainland Company Formation Dubai</h2>
<p>Start your mainland company in Dubai with 100% foreign ownership under the new UAE Commercial Companies Law. Trade freely across the UAE including government contracts — no free zone restrictions.</p>

<h3>Why Choose Mainland</h3>
<ul>
  <li>100% foreign ownership allowed (since 2021 law amendment)</li>
  <li>Trade anywhere in UAE without restrictions</li>
  <li>Eligible for government contracts and tenders</li>
  <li>No customs duties on Dubai trade</li>
  <li>Wide range of business activities (2,000+ activities)</li>
  <li>Access to UAE banking system easily</li>
</ul>

<h3>Company Types</h3>
<ul>
  <li>LLC (Limited Liability Company) — most common</li>
  <li>Sole Establishment (single owner)</li>
  <li>Civil Company (professionals)</li>
  <li>Branch of Foreign Company</li>
</ul>

<h3>Required Documents</h3>
<ul>
  <li>Passport copies of all shareholders</li>
  <li>Proposed company name (3 options)</li>
  <li>Business activity description</li>
  <li>Proposed office address (Ejari/tenancy contract)</li>
  <li>MOA (we prepare it)</li>
</ul>

<h3>Timeline</h3>
<p>5–7 working days from document submission to license issuance.</p>

<h3>What's Included</h3>
<ul>
  <li>Trade license (DED)</li>
  <li>Establishment card</li>
  <li>Company seal</li>
  <li>Bank account opening assistance</li>
  <li>Visa quota allocation</li>
</ul>`,
    status: "published",
    isBuiltIn: true,
  },

  {
    title: "Free Zone Company Setup Dubai",
    slug: "free-zone-company-setup-dubai",
    category: "business-setup",
    subcategory: "free-zone",
    icon: "🌐",
    excerpt: "DMCC, JAFZA, DAFZA and 40+ free zone company formation with 0% corporate tax and 100% repatriation of profits.",
    metaTitle: "Free Zone Company Dubai | DMCC, JAFZA, DAFZA | Amer Center",
    metaDescription: "Free zone company setup in DMCC, JAFZA, DAFZA, Dubai Silicon Oasis and 40+ free zones. 0% corporate tax, 100% foreign ownership. Fast processing.",
    metaKeywords: "free zone company dubai, DMCC company setup, JAFZA company, DAFZA company, free zone UAE",
    focusKeyword: "Free Zone Company Dubai",
    robots: "index,follow",
    geoRegion: "AE-DU",
    geoPlacename: "Dubai, UAE",
    schemaType: "Service",
    content: `<h2>Free Zone Company Setup Dubai</h2>
<p>Establish your company in Dubai's premier free zones with 100% foreign ownership, 0% corporate tax, and full repatriation of profits. We work with all major UAE free zones.</p>

<h3>Why Choose a Free Zone</h3>
<ul>
  <li>100% foreign ownership</li>
  <li>0% corporate and personal income tax</li>
  <li>100% repatriation of profits and capital</li>
  <li>Streamlined visa and permit processes</li>
  <li>No import or export duties</li>
  <li>Modern office and warehouse facilities</li>
</ul>

<h3>Free Zones We Cover</h3>
<ul>
  <li><strong>DMCC</strong> — World's No.1 free zone for trading companies</li>
  <li><strong>DAFZA</strong> — Dubai Airport Free Zone (our home location)</li>
  <li><strong>JAFZA</strong> — Jebel Ali Free Zone for logistics and manufacturing</li>
  <li><strong>Dubai Silicon Oasis (DSO)</strong> — Technology companies</li>
  <li><strong>DIFC</strong> — Financial and professional services</li>
  <li><strong>RAKEZ / RAK ICC</strong> — Cost-effective business setup</li>
  <li>40+ other free zones on request</li>
</ul>

<h3>Types of Companies</h3>
<ul>
  <li>Free Zone LLC (FZ-LLC)</li>
  <li>Free Zone Establishment (FZE) — single shareholder</li>
  <li>Branch of foreign company</li>
</ul>

<h3>Timeline</h3>
<p>1–3 working days for most free zones. DMCC: 3–5 days.</p>`,
    status: "published",
    isBuiltIn: true,
  },

  {
    title: "Trade License Dubai",
    slug: "trade-license-dubai",
    category: "business-setup",
    subcategory: "trade-license",
    icon: "📄",
    excerpt: "Commercial, professional, and industrial trade license issuance and renewal in Dubai. Processing in 2–5 working days.",
    metaTitle: "Trade License Dubai | New & Renewal | DED | Amer Center",
    metaDescription: "Dubai trade license new issuance, renewal, amendment, and cancellation. Commercial, professional, and industrial categories. Fast 2-5 day processing via Amer Center.",
    metaKeywords: "trade license dubai, DED license renewal, commercial license UAE, business license dubai",
    focusKeyword: "Trade License Dubai",
    robots: "index,follow",
    geoRegion: "AE-DU",
    geoPlacename: "Dubai, UAE",
    schemaType: "Service",
    content: `<h2>Trade License Dubai</h2>
<p>Dubai trade license services — new issuance, renewal, amendment, and cancellation for all license types. We work directly with DED (Dubai Economy & Tourism) for the fastest processing.</p>

<h3>License Types</h3>
<ul>
  <li><strong>Commercial License</strong> — buying and selling goods</li>
  <li><strong>Professional License</strong> — services and consultancy</li>
  <li><strong>Industrial License</strong> — manufacturing and production</li>
  <li><strong>Tourism License</strong> — travel, hospitality</li>
  <li><strong>Home Business License</strong> — SME home-based activities</li>
</ul>

<h3>Services We Provide</h3>
<ul>
  <li>New trade license application</li>
  <li>Annual trade license renewal</li>
  <li>License amendment (activity, name, partner changes)</li>
  <li>License cancellation</li>
  <li>Additional activity addition</li>
  <li>License transfer to new owner</li>
</ul>

<h3>Required Documents</h3>
<ul>
  <li>Passport copies of all owners/shareholders</li>
  <li>Emirates ID copies</li>
  <li>Tenancy contract (Ejari registered)</li>
  <li>Memorandum of Association (for LLC)</li>
  <li>Initial approval from DED</li>
  <li>NOC from relevant authority (for regulated activities)</li>
</ul>

<h3>Processing Time</h3>
<p>New license: 3–5 working days | Renewal: 1–2 working days | Amendments: 2–3 days</p>`,
    status: "published",
    isBuiltIn: true,
  },

  // ─────────────────────── MOHRE & EMPLOYMENT ───────────────────────
  {
    title: "Work Permits Dubai",
    slug: "work-permits-dubai",
    category: "mohre-employment",
    subcategory: "work-permit",
    icon: "💼",
    excerpt: "New and renewal work permits from the Ministry of Human Resources (MOHRE). Required for all employees working in UAE.",
    metaTitle: "Work Permits Dubai | MOHRE | Amer Center",
    metaDescription: "Work permit new issuance and renewal for all employment categories in UAE. Fast MOHRE processing via Amer Center. All nationalities accepted.",
    metaKeywords: "work permit dubai, MOHRE work permit UAE, employment visa UAE, labor permit dubai",
    focusKeyword: "Work Permits Dubai",
    robots: "index,follow",
    geoRegion: "AE-DU",
    geoPlacename: "Dubai, UAE",
    schemaType: "Service",
    content: `<h2>Work Permits Dubai</h2>
<p>New work permit issuance and renewal for all employment categories in the UAE. Required by MOHRE for all employees working under a UAE employment contract.</p>

<h3>Types of Work Permits</h3>
<ul>
  <li>New work permit (first-time employee)</li>
  <li>Work permit renewal</li>
  <li>Temporary work permit</li>
  <li>Domestic worker work permit</li>
  <li>GCC national work permit</li>
  <li>Part-time work permit</li>
</ul>

<h3>Process Overview</h3>
<ol>
  <li>Employer submits work permit application via MOHRE/Tasheel</li>
  <li>Approval and quota check</li>
  <li>Employee enters UAE on work permit entry permit</li>
  <li>Medical fitness test</li>
  <li>Residence visa stamping</li>
  <li>Emirates ID enrollment</li>
</ol>

<h3>Required Documents (Employer)</h3>
<ul>
  <li>Valid trade license</li>
  <li>Establishment card</li>
  <li>Signatory authorization</li>
  <li>Employee passport copy</li>
  <li>Educational certificate (if required for activity)</li>
</ul>

<h3>Processing Time</h3>
<p>2–3 working days for work permit approval. Entry permit: additional 1–2 days.</p>`,
    status: "published",
    isBuiltIn: true,
  },

  {
    title: "Labour Card Services Dubai",
    slug: "labour-card-services-dubai",
    category: "mohre-employment",
    subcategory: "labor-card",
    icon: "🪪",
    excerpt: "Labour card new issuance, renewal, change of profession, and change of employer. Mandatory for all MOHRE employees.",
    metaTitle: "Labour Card Services Dubai | MOHRE | Amer Center",
    metaDescription: "Labour card issuance, renewal, profession change, and employer transfer in Dubai. Mandatory MOHRE requirement for all employees. Fast processing.",
    metaKeywords: "labour card dubai, labor card UAE, MOHRE labour card, change profession UAE, change employer dubai",
    focusKeyword: "Labour Card Dubai",
    robots: "index,follow",
    geoRegion: "AE-DU",
    geoPlacename: "Dubai, UAE",
    schemaType: "Service",
    content: `<h2>Labour Card Services Dubai</h2>
<p>Complete Labour Card (MOHRE work card) services in Dubai. Mandatory for all private sector employees under MOHRE's jurisdiction. We handle new issuance, renewals, and all modifications.</p>

<h3>Services We Provide</h3>
<ul>
  <li>New labour card application</li>
  <li>Annual renewal</li>
  <li>Change of profession (job title update)</li>
  <li>Change of employer (transfer)</li>
  <li>Salary update on MOHRE records</li>
  <li>Labour card cancellation</li>
</ul>

<h3>Salary Protection System (SPS)</h3>
<p>We assist employers with Salary Protection System compliance — ensuring wages are paid on time and registered with MOHRE to avoid penalties.</p>

<h3>Required Documents</h3>
<ul>
  <li>Employee passport copy</li>
  <li>Current residence visa copy</li>
  <li>Employment contract (MOHRE standard form)</li>
  <li>Employer trade license and establishment card</li>
  <li>Previous labour card (for renewal/changes)</li>
</ul>

<h3>Processing Time</h3>
<p>New card: 2–3 working days | Renewal: 1–2 days | Changes: 3–5 days</p>

<h3>Fees</h3>
<p>MOHRE government fees apply and vary by company size (skilled vs. unskilled category). Contact us for a quote.</p>`,
    status: "published",
    isBuiltIn: true,
  },

  {
    title: "Domestic Worker Visa Dubai",
    slug: "domestic-worker-visa-dubai",
    category: "mohre-employment",
    subcategory: "work-permit",
    icon: "🏠",
    excerpt: "Sponsor housemaids, drivers, nannies and domestic helpers in Dubai. Complete MOHRE, residence visa and Emirates ID processing.",
    metaTitle: "Domestic Worker Visa Dubai | Maid Visa | Amer Center",
    metaDescription: "Sponsor domestic workers in Dubai — maids, drivers, babysitters, gardeners. Complete MOHRE work permit, residence visa, and Emirates ID processing.",
    metaKeywords: "domestic worker visa dubai, maid visa UAE, housemaid visa dubai, driver visa UAE",
    focusKeyword: "Domestic Worker Visa Dubai",
    robots: "index,follow",
    geoRegion: "AE-DU",
    geoPlacename: "Dubai, UAE",
    schemaType: "Service",
    content: `<h2>Domestic Worker Visa Dubai</h2>
<p>Sponsor domestic workers including housemaids, drivers, babysitters, gardeners, and personal attendants in Dubai. We process the complete package — MOHRE work permit, residence visa, and Emirates ID.</p>

<h3>Domestic Worker Categories</h3>
<ul>
  <li>Housemaid / cleaner</li>
  <li>Driver (personal)</li>
  <li>Babysitter / nanny</li>
  <li>Cook / personal chef</li>
  <li>Gardener</li>
  <li>Personal attendant / caretaker</li>
</ul>

<h3>Sponsor Requirements</h3>
<ul>
  <li>UAE resident sponsor (employment, investor, or Golden Visa holder)</li>
  <li>Minimum salary: AED 6,000/month (AED 5,000 + accommodation)</li>
  <li>Accommodation proof (tenancy contract showing room allocation)</li>
  <li>Medical insurance for worker (mandatory)</li>
</ul>

<h3>What We Process</h3>
<ol>
  <li>MOHRE domestic worker permit application</li>
  <li>Entry permit for worker to enter UAE</li>
  <li>DHA medical fitness test</li>
  <li>Residence visa stamping</li>
  <li>Emirates ID enrollment</li>
  <li>Standard employment contract (MOHRE template)</li>
</ol>

<h3>Processing Time</h3>
<p>Complete package: 10–15 working days (from entry permit to visa stamping)</p>

<h3>Important Notes</h3>
<ul>
  <li>Medical insurance is mandatory for all domestic workers</li>
  <li>Employment contract must be MOHRE-compliant</li>
  <li>Domestic workers have equal legal rights under UAE Labour Law</li>
</ul>`,
    status: "published",
    isBuiltIn: true,
  },
];

// GET /api/services/public — published services, no auth, for public listing
router.get("/public", async (_req: Request, res: Response) => {
  try {
    const services = await Service.find({ status: "published" })
      .sort({ category: 1, title: 1 })
      .select("title slug category subcategory excerpt icon thumbnailImage coverImage createdAt");
    res.json(services);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/services/by-slug/:slug — full published service by slug, no auth
router.get("/by-slug/:slug", async (req: Request, res: Response) => {
  try {
    const service = await Service.findOne({ slug: req.params.slug, status: "published" });
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.json(service);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/services — all services (admin)
router.get("/", requireAuth, async (_req: Request, res: Response) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json(services);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/services/:id — single service by ID (admin)
router.get("/:id", requireAuth, async (req: Request, res: Response) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.json(service);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/services — create service (admin)
router.post("/", requireAuth, async (req: Request, res: Response) => {
  try {
    const data = serviceSchema.parse(req.body);
    const service = await Service.create(data);
    res.status(201).json(service);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ message: err.errors[0]?.message ?? "Invalid request" });
    }
    if ((err as { code?: number }).code === 11000) {
      return res.status(400).json({ message: "Slug already exists" });
    }
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// PATCH /api/services/:id — update service (admin)
router.patch("/:id", requireAuth, async (req: Request, res: Response) => {
  try {
    const data = serviceSchema.partial().parse(req.body);
    const service = await Service.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.json(service);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ message: err.errors[0]?.message ?? "Invalid request" });
    }
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/services/:id — delete service (admin)
router.delete("/:id", requireAuth, async (req: Request, res: Response) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/services/seed — bulk insert pre-seeded services (admin)
router.post("/seed", requireAuth, async (_req: Request, res: Response) => {
  try {
    const count = await Service.countDocuments();
    if (count > 0) {
      return res.json({ message: "Already seeded", count, skipped: true });
    }
    const inserted = await Service.insertMany(SEED_SERVICES);
    res.status(201).json({ message: "Seeded", count: inserted.length, skipped: false });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
