import "dotenv/config";
import express from "express";
import cors from "cors";
import inquiriesRouter from "./routes/inquiries";
import guestBlogPostsRouter from "./routes/guestBlogPosts";
import authRouter from "./routes/auth";

const app = express();

// CORS - allow frontend
app.use(
  cors({
    origin: [
      "https://amer.center",
      "https://www.amer.center",
      process.env.FRONTEND_URL || "http://localhost:3000",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logger
app.use((req, _res, next) => {
  if (req.path.startsWith("/api")) {
    console.log(`${new Date().toISOString()} ${req.method} ${req.path}`);
  }
  next();
});

// 301 Redirects for legacy URLs
const oldUrlRedirects: Record<string, string> = {
  "/index.html": "/",
  "/index.php": "/",
  "/home": "/",
  "/about": "/",
  "/about-us": "/",
  "/golden-visa-dubai": "/golden-visa",
  "/uae-golden-visa": "/golden-visa",
  "/family-visa-dubai": "/family-visa",
  "/spouse-visa": "/family-visa",
  "/dependent-visa": "/family-visa",
  "/emirates-id-renewal": "/emirates-id",
  "/emirates-id-application": "/emirates-id",
  "/visa-renewal": "/visa-services",
  "/visa-cancellation": "/visa-services",
  "/visa-transfer": "/visa-services",
  "/company-formation": "/business-setup",
  "/business-license": "/business-setup",
  "/free-zone": "/business-setup",
  "/mainland": "/business-setup",
  "/our-services": "/services",
  "/all-services": "/services",
  "/location": "/amer-center-dubai",
  "/locations": "/amer-center-dubai",
  "/find-us": "/amer-center-dubai",
  "/contact-us": "/contact",
  "/get-in-touch": "/contact",
  "/enquiry": "/contact",
  "/inquiry": "/contact",
  "/faqs": "/faq",
  "/questions": "/faq",
  "/help": "/faq",
  "/calculator": "/tools",
  "/gratuity-calculator": "/tools",
  "/eos-calculator": "/tools",
  "/news": "/blog",
  "/articles": "/blog",
  "/updates": "/blog",
};

app.use((req, res, next) => {
  const redirectTo = oldUrlRedirects[req.path.toLowerCase()];
  if (redirectTo) {
    return res.redirect(301, redirectTo);
  }
  next();
});

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Routes
app.use("/api/inquiries", inquiriesRouter);
app.use("/api/guest-blog-posts", guestBlogPostsRouter);
app.use("/api/blog-portal", authRouter);

// robots.txt
app.get("/robots.txt", (_req, res) => {
  res.type("text/plain").send("User-agent: *\nAllow: /\nSitemap: https://amer.center/sitemap.xml\n");
});

// Sitemap
app.get("/sitemap.xml", (req, res) => {
  const base = `${req.protocol}://${req.get("host")}`;
  const pages = [
    "/", "/services", "/contact", "/golden-visa", "/family-visa",
    "/emirates-id", "/visa-services", "/business-setup", "/faq", "/tools",
    "/amer-center-dubai", "/amer-center-al-twar", "/amer-center-deira",
    "/amer-center-nahda", "/amer-center-mirdif", "/amer-center-karama",
    "/amer-center-sharjah", "/blog",
    "/blog/golden-visa-dubai-complete-guide-2026",
    "/blog/how-to-apply-golden-visa-whatsapp",
    "/blog/family-visa-dubai-requirements-2026",
    "/blog/emirates-id-renewal-replacement-guide",
    "/blog/mohre-services-dubai-explained",
    "/blog/dubai-business-setup-guide-2026",
    "/blog/attestation-services-dubai-all-embassies",
    "/blog/dha-medical-fitness-test-dubai",
    "/blog/visa-renewal-cancellation-transfer-dubai",
    "/blog/amer-center-services-complete-guide",
  ];
  const body = pages
    .map(
      (p) =>
        `<url><loc>${base}${p}</loc><changefreq>weekly</changefreq><priority>${
          p === "/" ? "1.0" : p.startsWith("/blog") ? "0.7" : "0.8"
        }</priority></url>`
    )
    .join("");
  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</urlset>`;
  res.type("application/xml").send(xml);
});

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ message: "Not found" });
});

// Error handler
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

export default app;
