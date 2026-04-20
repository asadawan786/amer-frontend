import { MetadataRoute } from "next";

const BASE_URL = "https://www.amer.center";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages: Array<{
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  }> = [
    { path: "/", priority: 1.0, changeFrequency: "daily" },
    { path: "/services", priority: 0.9, changeFrequency: "weekly" },
    { path: "/golden-visa", priority: 0.95, changeFrequency: "weekly" },
    { path: "/family-visa", priority: 0.9, changeFrequency: "weekly" },
    { path: "/emirates-id", priority: 0.9, changeFrequency: "weekly" },
    { path: "/visa-services", priority: 0.9, changeFrequency: "weekly" },
    { path: "/business-setup", priority: 0.85, changeFrequency: "weekly" },
    { path: "/amer-center-dubai", priority: 0.85, changeFrequency: "weekly" },
    { path: "/amer-center-al-twar", priority: 0.8, changeFrequency: "weekly" },
    { path: "/amer-center-deira", priority: 0.8, changeFrequency: "weekly" },
    { path: "/amer-center-nahda", priority: 0.8, changeFrequency: "weekly" },
    { path: "/amer-center-mirdif", priority: 0.8, changeFrequency: "weekly" },
    { path: "/amer-center-karama", priority: 0.8, changeFrequency: "weekly" },
    { path: "/amer-center-sharjah", priority: 0.8, changeFrequency: "weekly" },
    { path: "/tools", priority: 0.7, changeFrequency: "weekly" },
    { path: "/blog", priority: 0.85, changeFrequency: "daily" },
    { path: "/faq", priority: 0.75, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.75, changeFrequency: "monthly" },
  ];

  return pages.map(({ path, priority, changeFrequency }) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
