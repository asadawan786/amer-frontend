import mongoose, { Document, Schema } from "mongoose";

export interface IService extends Document {
  title: string;
  slug: string;
  category: "visa-services" | "attestation-translation" | "dha-medical-typing" | "emirates-id-government" | "business-setup" | "mohre-employment";
  subcategory?: string;
  content: string;
  excerpt?: string;
  icon?: string;
  coverImage?: string;
  thumbnailImage?: string;
  status: "draft" | "published";
  isBuiltIn: boolean;
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
  // UAE Local / Geo
  geoRegion?: string;
  geoPlacename?: string;
  schemaType?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<IService>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    category: {
      type: String,
      required: true,
      enum: ["visa-services", "attestation-translation", "dha-medical-typing", "emirates-id-government", "business-setup", "mohre-employment"],
    },
    subcategory: { type: String, trim: true },
    content: { type: String, required: true },
    excerpt: { type: String, trim: true },
    icon: { type: String, trim: true },
    coverImage: { type: String, trim: true },
    thumbnailImage: { type: String, trim: true },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    isBuiltIn: { type: Boolean, default: false },
    metaTitle: { type: String, trim: true },
    metaDescription: { type: String, trim: true },
    metaKeywords: { type: String, trim: true },
    focusKeyword: { type: String, trim: true },
    canonicalUrl: { type: String, trim: true },
    robots: { type: String, trim: true, default: "index,follow" },
    ogTitle: { type: String, trim: true },
    ogDescription: { type: String, trim: true },
    ogImage: { type: String, trim: true },
    geoRegion: { type: String, trim: true, default: "AE-DU" },
    geoPlacename: { type: String, trim: true, default: "Dubai, UAE" },
    schemaType: { type: String, trim: true, default: "Service" },
  },
  { timestamps: true }
);

export const Service = mongoose.model<IService>("Service", ServiceSchema);
