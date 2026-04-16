import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog | Dubai Visa & Immigration Guides | Amer Center Dubai",
  description:
    "Expert guides on Golden Visa Dubai, Family Visa, Emirates ID, Business Setup, and all UAE immigration services. Updated 2026 information from inside Dubai Immigration Building.",
  keywords: ["Dubai visa blog", "Golden Visa guide", "Family Visa requirements", "Emirates ID renewal", "UAE immigration news"],
};

const blogPosts = [
  {
    slug: "golden-visa-dubai-complete-guide-2026",
    title: "Golden Visa Dubai 2026: Complete Guide to 10-Year Residency",
    titleAr: "الإقامة الذهبية دبي 2026: دليل كامل للإقامة 10 سنوات",
    excerpt: "Everything you need to know about UAE Golden Visa eligibility, requirements, and application process. Updated for 2026 with latest changes.",
    category: "Golden Visa",
    date: "January 15, 2026",
    readTime: "8 min read",
  },
  {
    slug: "how-to-apply-golden-visa-whatsapp",
    title: "How to Apply for Golden Visa via WhatsApp - Step by Step",
    titleAr: "كيفية التقديم على الإقامة الذهبية عبر واتساب",
    excerpt: "Apply for your UAE Golden Visa without visiting any office. Complete guide to applying via WhatsApp with Amer Center Dubai.",
    category: "Golden Visa",
    date: "January 10, 2026",
    readTime: "5 min read",
  },
  {
    slug: "family-visa-dubai-requirements-2026",
    title: "Family Visa Dubai 2026: Sponsor Your Family Complete Guide",
    titleAr: "تأشيرة العائلة دبي 2026: دليل كامل لكفالة عائلتك",
    excerpt: "Complete requirements for spouse visa, children visa, and parent visa in Dubai. Salary requirements, documents needed, and processing time.",
    category: "Family Visa",
    date: "January 8, 2026",
    readTime: "7 min read",
  },
  {
    slug: "emirates-id-renewal-replacement-guide",
    title: "Emirates ID: Complete Guide to Renewal, Replacement & Updates",
    titleAr: "الهوية الإماراتية: دليل التجديد والاستبدال والتحديثات",
    excerpt: "Step-by-step guide for Emirates ID renewal, replacement for lost/damaged cards, and updating your information.",
    category: "Emirates ID",
    date: "January 5, 2026",
    readTime: "6 min read",
  },
  {
    slug: "mohre-services-dubai-explained",
    title: "MOHRE Services Explained: Work Permits, Labour Cards & More",
    titleAr: "خدمات وزارة الموارد البشرية: تصاريح العمل وبطاقة العمل",
    excerpt: "Complete guide to Ministry of Human Resources services. Work permits, labour cards, change profession, and employment services.",
    category: "MOHRE",
    date: "January 3, 2026",
    readTime: "9 min read",
  },
  {
    slug: "dubai-business-setup-guide-2026",
    title: "Dubai Business Setup 2026: Mainland vs Free Zone Comparison",
    titleAr: "تأسيس الشركات في دبي 2026: المقارنة بين الفري زون والمينلاند",
    excerpt: "Choose the best business structure for your company. Compare Mainland, DMCC, JAFZA, DAFZA, and other free zones with costs and benefits.",
    category: "Business",
    date: "December 28, 2025",
    readTime: "10 min read",
  },
  {
    slug: "attestation-services-dubai-all-embassies",
    title: "Attestation Services Dubai: All Embassies & MOFA Guide",
    titleAr: "خدمات التصديق دبي: جميع السفارات ووزارة الخارجية",
    excerpt: "Complete guide to document attestation in Dubai. Indian, Pakistani, Filipino, Egyptian embassy attestation and MOFA procedures.",
    category: "Attestation",
    date: "December 25, 2025",
    readTime: "7 min read",
  },
  {
    slug: "dha-medical-fitness-test-dubai",
    title: "DHA Medical Fitness Test Dubai: What to Expect & How to Prepare",
    titleAr: "الفحص الطبي DHA دبي: ماذا تتوقع وكيف تستعد",
    excerpt: "Everything about Dubai Health Authority medical fitness test for visa. Locations, costs, results, and what happens if you fail.",
    category: "Medical",
    date: "December 20, 2025",
    readTime: "5 min read",
  },
  {
    slug: "visa-renewal-cancellation-transfer-dubai",
    title: "UAE Visa Renewal, Cancellation & Transfer: Complete Guide",
    titleAr: "تجديد وإلغاء ونقل التأشيرة في الإمارات: دليل كامل",
    excerpt: "Step-by-step process for renewing, cancelling, or transferring your UAE residence visa. Documents, fees, and timeline explained.",
    category: "Visa",
    date: "December 15, 2025",
    readTime: "6 min read",
  },
  {
    slug: "amer-center-services-complete-guide",
    title: "Amer Center Dubai: All Services Under One Roof - Complete Guide",
    titleAr: "مركز آمر دبي: جميع الخدمات في مكان واحد - دليل كامل",
    excerpt: "Discover all services available at Amer Center Dubai inside the Immigration Building. From visas to attestation, everything explained.",
    category: "Guide",
    date: "December 10, 2025",
    readTime: "8 min read",
  },
];

export default function BlogPage() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">Expert Guides</Badge>
          <h1 className="text-4xl md:text-5xl font-light tracking-tight text-gray-900">
            Dubai Visa & Immigration <span className="gold-gradient-text font-semibold">Blog</span>
          </h1>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
            Expert guides and latest updates on UAE visas, Emirates ID, business setup, and immigration services.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="text-xs">{post.category}</Badge>
                  </div>
                  <CardTitle className="text-lg font-medium text-gray-900 group-hover:text-[#A88B4A] transition-colors line-clamp-2">
                    {post.title}
                  </CardTitle>
                  <p className="text-sm text-gray-500 mt-1">{post.titleAr}</p>
                </CardHeader>
                <CardContent>
                  <CardDescription className="line-clamp-3 mb-4">{post.excerpt}</CardDescription>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{post.date}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{post.readTime}</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gold group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
