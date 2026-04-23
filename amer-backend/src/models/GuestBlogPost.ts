import mongoose, { Document, Schema } from "mongoose";

export interface IGuestBlogPost extends Document {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  category: string;
  authorName: string;
  status: "draft" | "published";
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
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
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    metaTitle: { type: String, trim: true },
    metaDescription: { type: String, trim: true },
    metaKeywords: { type: String, trim: true },
  },
  { timestamps: true }
);

export const GuestBlogPost = mongoose.model<IGuestBlogPost>("GuestBlogPost", GuestBlogPostSchema);
