import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="text-center max-w-lg">
        <div className="text-8xl font-light text-[#C9A962] mb-4">404</div>
        <h1 className="text-3xl font-light tracking-tight text-gray-900 mb-4">
          Page Not Found
        </h1>
        <p className="text-gray-600 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Please check the URL or
          navigate back to the homepage.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button size="lg" className="btn-gold rounded-md w-full sm:w-auto">
              <Home className="h-5 w-5 mr-2" />
              Back to Home
            </Button>
          </Link>
          <Link href="/contact">
            <Button size="lg" variant="outline" className="border-[#C9A962] text-[#A88B4A] hover:bg-[#C9A962]/10 rounded-md w-full sm:w-auto">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Contact Us
            </Button>
          </Link>
        </div>

        <div className="mt-12 p-6 bg-white rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500 mb-4">Looking for a specific service?</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              { label: "Golden Visa", href: "/golden-visa" },
              { label: "Family Visa", href: "/family-visa" },
              { label: "Emirates ID", href: "/emirates-id" },
              { label: "Business Setup", href: "/business-setup" },
              { label: "All Services", href: "/services" },
            ].map((item) => (
              <Link key={item.href} href={item.href}>
                <span className="inline-block px-3 py-1.5 text-sm bg-gray-100 hover:bg-[#C9A962]/10 text-gray-700 hover:text-[#A88B4A] rounded-full transition-colors cursor-pointer">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
