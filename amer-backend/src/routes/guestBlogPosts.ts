import { Router, Request, Response } from "express";
import { z } from "zod";
import { GuestBlogPost } from "../models/GuestBlogPost";
import { requireAuth } from "../middleware/requireAuth";

const router = Router();

const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  content: z.string().min(1, "Content is required"),
  excerpt: z.string().optional(),
  category: z.enum(["golden-visa", "family-visa", "emirates-id", "business-setup", "attestation", "general"]).default("general"),
  authorName: z.string().default("Admin"),
  status: z.enum(["draft", "published"]).default("draft"),
  readTime: z.string().optional(),
  coverImage: z.string().optional(),
  thumbnailImage: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  metaKeywords: z.string().optional(),
  focusKeyword: z.string().optional(),
  canonicalUrl: z.string().optional(),
  robots: z.string().optional(),
  ogTitle: z.string().optional(),
  ogDescription: z.string().optional(),
  ogImage: z.string().optional(),
  twitterTitle: z.string().optional(),
  twitterDescription: z.string().optional(),
  geoRegion: z.string().optional(),
  geoPlacename: z.string().optional(),
  schemaType: z.string().optional(),
});

// GET /api/guest-blog-posts/public — published posts only, for public blog listing
router.get("/public", async (_req: Request, res: Response) => {
  try {
    const posts = await GuestBlogPost.find({ status: "published" })
      .sort({ createdAt: -1 })
      .select("title slug excerpt category authorName readTime thumbnailImage coverImage createdAt");
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/guest-blog-posts/by-slug/:slug — full published post by slug
router.get("/by-slug/:slug", async (req: Request, res: Response) => {
  try {
    const post = await GuestBlogPost.findOne({ slug: req.params.slug, status: "published" });
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/guest-blog-posts — all posts (admin)
router.get("/", requireAuth, async (_req: Request, res: Response) => {
  try {
    const posts = await GuestBlogPost.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/guest-blog-posts/:id — single post by ID (admin)
router.get("/:id", requireAuth, async (req: Request, res: Response) => {
  try {
    const post = await GuestBlogPost.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/guest-blog-posts — create (admin)
router.post("/", requireAuth, async (req: Request, res: Response) => {
  try {
    const data = postSchema.parse(req.body);
    const post = await GuestBlogPost.create(data);
    res.status(201).json(post);
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

// PATCH /api/guest-blog-posts/:id — update (admin)
router.patch("/:id", requireAuth, async (req: Request, res: Response) => {
  try {
    const data = postSchema.partial().parse(req.body);
    const post = await GuestBlogPost.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ message: err.errors[0]?.message ?? "Invalid request" });
    }
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/guest-blog-posts/:id — delete (admin)
router.delete("/:id", requireAuth, async (req: Request, res: Response) => {
  try {
    await GuestBlogPost.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
