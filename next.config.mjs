/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/about", destination: "/", permanent: true },
      { source: "/about-us", destination: "/", permanent: true },
      { source: "/golden-visa-dubai", destination: "/golden-visa", permanent: true },
      { source: "/uae-golden-visa", destination: "/golden-visa", permanent: true },
      { source: "/family-visa-dubai", destination: "/family-visa", permanent: true },
      { source: "/spouse-visa", destination: "/family-visa", permanent: true },
      { source: "/emirates-id-renewal", destination: "/emirates-id", permanent: true },
      { source: "/visa-renewal", destination: "/visa-services", permanent: true },
      { source: "/visa-cancellation", destination: "/visa-services", permanent: true },
      { source: "/company-formation", destination: "/business-setup", permanent: true },
      { source: "/free-zone", destination: "/business-setup", permanent: true },
      { source: "/our-services", destination: "/services", permanent: true },
      { source: "/location", destination: "/amer-center-dubai", permanent: true },
      { source: "/locations", destination: "/amer-center-dubai", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/enquiry", destination: "/contact", permanent: true },
      { source: "/faqs", destination: "/faq", permanent: true },
      { source: "/calculator", destination: "/tools", permanent: true },
      { source: "/gratuity-calculator", destination: "/tools", permanent: true },
      { source: "/news", destination: "/blog", permanent: true },
      { source: "/articles", destination: "/blog", permanent: true },
    ];
  },
};

export default nextConfig;
