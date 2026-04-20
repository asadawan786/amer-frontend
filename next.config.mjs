/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Core page aliases
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/about", destination: "/", permanent: true },
      { source: "/about-us", destination: "/", permanent: true },

      // Service page aliases
      { source: "/golden-visa-dubai", destination: "/golden-visa", permanent: true },
      { source: "/uae-golden-visa", destination: "/golden-visa", permanent: true },
      { source: "/family-visa-dubai", destination: "/family-visa", permanent: true },
      { source: "/spouse-visa", destination: "/family-visa", permanent: true },
      { source: "/emirates-id-renewal", destination: "/emirates-id", permanent: true },
      { source: "/emiratesid", destination: "/emirates-id", permanent: true },
      { source: "/visa-renewal", destination: "/visa-services", permanent: true },
      { source: "/visa-cancellation", destination: "/visa-services", permanent: true },
      { source: "/company-formation", destination: "/business-setup", permanent: true },
      { source: "/free-zone", destination: "/business-setup", permanent: true },
      { source: "/our-services", destination: "/services", permanent: true },
      { source: "/pro-services", destination: "/services", permanent: true },

      // Location aliases
      { source: "/location", destination: "/amer-center-dubai", permanent: true },
      { source: "/locations", destination: "/amer-center-dubai", permanent: true },
      { source: "/mirdif", destination: "/amer-center-mirdif", permanent: true },
      { source: "/deira", destination: "/amer-center-deira", permanent: true },
      { source: "/karama", destination: "/amer-center-karama", permanent: true },
      { source: "/sharjah", destination: "/amer-center-sharjah", permanent: true },
      { source: "/al-twar", destination: "/amer-center-al-twar", permanent: true },
      { source: "/nahda", destination: "/amer-center-nahda", permanent: true },

      // Contact & utility page aliases
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/enquiry", destination: "/contact", permanent: true },
      { source: "/faqs", destination: "/faq", permanent: true },
      { source: "/calculator", destination: "/tools", permanent: true },
      { source: "/gratuity-calculator", destination: "/tools", permanent: true },
      { source: "/news", destination: "/blog", permanent: true },
      { source: "/articles", destination: "/blog", permanent: true },
    ];
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
