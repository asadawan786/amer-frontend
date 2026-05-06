import mongoose, { Document, Schema } from "mongoose";

export interface IGuestBlogPost extends Document {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  category: string;
  authorName: string;
  status: "draft" | "published";
  readTime?: string;
  coverImage?: string;
  thumbnailImage?: string;
  // Basic SEO
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  focusKeyword?: string;
  canonicalUrl?: string;
  robots?: string;
  // OG / Social
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  // UAE Local / Geo
  geoRegion?: string;
  geoPlacename?: string;
  schemaType?: string;
  createdAt: Date;
  updatedAt: Date;
}

const GuestBlogPostSchema = new Schema<IGuestBlogPost>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    content: { type: String, required: true },
    excerpt: { type: String, trim: true },
    category: {
      type: String,
      enum: ["golden-visa", "family-visa", "emirates-id", "business-setup", "attestation", "general"],
      default: "general",
    },
    authorName: { type: String, default: "Guest Author", trim: true },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    readTime: { type: String, trim: true },
    coverImage: { type: String, trim: true },
    thumbnailImage: { type: String, trim: true },
    metaTitle: { type: String, trim: true },
    metaDescription: { type: String, trim: true },
    metaKeywords: { type: String, trim: true },
    focusKeyword: { type: String, trim: true },
    canonicalUrl: { type: String, trim: true },
    robots: { type: String, trim: true, default: "index,follow" },
    ogTitle: { type: String, trim: true },
    ogDescription: { type: String, trim: true },
    ogImage: { type: String, trim: true },
    twitterTitle: { type: String, trim: true },
    twitterDescription: { type: String, trim: true },
    geoRegion: { type: String, trim: true, default: "AE-DU" },
    geoPlacename: { type: String, trim: true, default: "Dubai, UAE" },
    schemaType: { type: String, trim: true, default: "BlogPosting" },
  },
  { timestamps: true }
);

export const GuestBlogPost = mongoose.model<IGuestBlogPost>("GuestBlogPost", GuestBlogPostSchema);
