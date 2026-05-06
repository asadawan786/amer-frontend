"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Plus, Edit, Trash2, LogOut, FileText, Eye, Globe,
  CheckCircle2, Clock, AlertCircle, ChevronRight, Inbox,
  Image as ImageIcon, Share2, MapPin, Search,
} from "lucide-react";
import { apiRequest } from "@/lib/api";

const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] border border-gray-200 rounded-lg bg-gray-50 flex items-center justify-center">
      <span className="text-gray-400 text-sm">Loading editor…</span>
    </div>
  ),
});

interface GuestBlogPost {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  category: string;
  authorName: string;
  status: string;
  readTime?: string;
  coverImage?: string;
  thumbnailImage?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  focusKeyword?: string;
  canonicalUrl?: string;
  robots?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  geoRegion?: string;
  geoPlacename?: string;
  schemaType?: string;
  createdAt: string;
}

const CATEGORIES = [
  { value: "golden-visa", label: "Golden Visa" },
  { value: "family-visa", label: "Family Visa" },
  { value: "emirates-id", label: "Emirates ID" },
  { value: "business-setup", label: "Business Setup" },
  { value: "attestation", label: "Attestation" },
  { value: "general", label: "General" },
];

const ROBOTS_OPTIONS = [
  { value: "index,follow", label: "Index, Follow (default)" },
  { value: "noindex,follow", label: "No Index, Follow" },
  { value: "index,nofollow", label: "Index, No Follow" },
  { value: "noindex,nofollow", label: "No Index, No Follow" },
];

const SCHEMA_TYPES = [
  { value: "BlogPosting", label: "Blog Posting" },
  { value: "Article", label: "Article" },
  { value: "NewsArticle", label: "News Article" },
  { value: "HowTo", label: "How-To Guide" },
];

const DEFAULT_FORM = {
  title: "",
  slug: "",
  content: "",
  excerpt: "",
  category: "general",
  authorName: "Amer Center Admin",
  status: "draft",
  readTime: "",
  coverImage: "",
  thumbnailImage: "",
  metaTitle: "",
  metaDescription: "",
  metaKeywords: "",
  focusKeyword: "",
  canonicalUrl: "",
  robots: "index,follow",
  ogTitle: "",
  ogDescription: "",
  ogImage: "",
  twitterTitle: "",
  twitterDescription: "",
  geoRegion: "AE-DU",
  geoPlacename: "Dubai, UAE",
  schemaType: "BlogPosting",
};

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function wordCount(html: string): number {
  const text = stripHtml(html);
  return text ? text.split(/\s+/).length : 0;
}

export default function BlogManagerPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [view, setView] = useState<"list" | "editor">("list");
  const [activeTab, setActiveTab] = useState<"content" | "images" | "seo">("content");
  const [editingPost, setEditingPost] = useState<GuestBlogPost | null>(null);
  const [formData, setFormData] = useState(DEFAULT_FORM);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [saveError, setSaveError] = useState("");

  const joditConfig = useMemo(() => ({
    readonly: false,
    placeholder: "Write your blog content here…",
    height: 500,
    toolbarAdaptive: false,
    toolbarButtonSize: "middle" as const,
    buttons: [
      "bold", "italic", "underline", "strikethrough", "|",
      "ul", "ol", "|",
      "h1", "h2", "h3", "h4", "|",
      "blockquote", "hr", "|",
      "image", "link", "|",
      "align", "|",
      "table", "|",
      "source", "|",
      "undo", "redo", "|",
      "fullsize",
    ],
    uploader: { insertImageAsBase64URI: true },
    showCharsCounter: false,
    showWordsCounter: true,
    showXPathInStatusbar: false,
    theme: "default",
    style: { fontFamily: "Inter, ui-sans-serif, system-ui", fontSize: "15px" },
  }), []);

  useEffect(() => {
    if (!localStorage.getItem("portal-token")) {
      router.replace("/portal/login");
    }
  }, [router]);

  const { data: posts = [], isLoading } = useQuery<GuestBlogPost[]>({
    queryKey: ["/api/guest-blog-posts"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/guest-blog-posts");
      if (!res.ok) throw new Error("Failed to load posts");
      return res.json();
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const res = await apiRequest("POST", "/api/guest-blog-posts", data);
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error((err as { message?: string }).message || "Failed to create post");
      }
      return res.json();
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["/api/guest-blog-posts"] }); resetEditor(); },
    onError: (err: Error) => setSaveError(err.message),
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<typeof formData> }) => {
      const res = await apiRequest("PATCH", `/api/guest-blog-posts/${id}`, data);
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error((err as { message?: string }).message || "Failed to update post");
      }
      return res.json();
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["/api/guest-blog-posts"] }); resetEditor(); },
    onError: (err: Error) => setSaveError(err.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiRequest("DELETE", `/api/guest-blog-posts/${id}`);
      if (!res.ok) throw new Error("Failed to delete post");
      return res.json();
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["/api/guest-blog-posts"] }); setDeleteConfirm(null); },
  });

  const resetEditor = () => {
    setView("list");
    setEditingPost(null);
    setFormData(DEFAULT_FORM);
    setSaveError("");
    setActiveTab("content");
  };

  const openEditor = (post?: GuestBlogPost) => {
    if (post) {
      setEditingPost(post);
      setFormData({
        title: post.title,
        slug: post.slug,
        content: post.content,
        excerpt: post.excerpt || "",
        category: post.category,
        authorName: post.authorName,
        status: post.status,
        readTime: post.readTime || "",
        coverImage: post.coverImage || "",
        thumbnailImage: post.thumbnailImage || "",
        metaTitle: post.metaTitle || "",
        metaDescription: post.metaDescription || "",
        metaKeywords: post.metaKeywords || "",
        focusKeyword: post.focusKeyword || "",
        canonicalUrl: post.canonicalUrl || "",
        robots: post.robots || "index,follow",
        ogTitle: post.ogTitle || "",
        ogDescription: post.ogDescription || "",
        ogImage: post.ogImage || "",
        twitterTitle: post.twitterTitle || "",
        twitterDescription: post.twitterDescription || "",
        geoRegion: post.geoRegion || "AE-DU",
        geoPlacename: post.geoPlacename || "Dubai, UAE",
        schemaType: post.schemaType || "BlogPosting",
      });
    } else {
      setEditingPost(null);
      setFormData(DEFAULT_FORM);
    }
    setSaveError("");
    setActiveTab("content");
    setView("editor");
  };

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
      slug: prev.slug || slugify(title),
      metaTitle: prev.metaTitle || title,
      ogTitle: prev.ogTitle || title,
    }));
  };

  const set = (key: keyof typeof DEFAULT_FORM) => (value: string) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveError("");
    const slug = formData.slug || slugify(formData.title);
    const data = { ...formData, slug };
    if (editingPost) {
      updateMutation.mutate({ id: editingPost._id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("portal-token");
    document.cookie = "portal_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/portal/login");
  };

  const isSaving = createMutation.isPending || updateMutation.isPending;
  const publishedCount = posts.filter((p) => p.status === "published").length;
  const draftCount = posts.filter((p) => p.status === "draft").length;
  const wc = wordCount(formData.content);
  const ogPreviewTitle = formData.ogTitle || formData.metaTitle || formData.title;
  const ogPreviewDesc = formData.ogDescription || formData.metaDescription || formData.excerpt;
  const ogPreviewImage = formData.ogImage || formData.coverImage;

  const checklist = [
    { label: "Title", done: !!formData.title },
    { label: "Content (300+ words)", done: wc >= 300 },
    { label: "Excerpt", done: !!formData.excerpt },
    { label: "Cover image", done: !!formData.coverImage },
    { label: "Thumbnail image", done: !!formData.thumbnailImage },
    { label: "Meta title", done: !!formData.metaTitle },
    { label: "Meta description", done: !!formData.metaDescription },
    { label: "OG image", done: !!formData.ogImage },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Image src="/logo-header.jpeg" alt="Amer Center Dubai" width={120} height={34} className="h-9 w-auto object-contain" />
            </Link>
            <div className="h-5 w-px bg-gray-200" />
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FileText className="h-4 w-4 text-gold" />
              <span className="font-medium text-gray-900">Blog Manager</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/portal/inquiries">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900 gap-2">
                <Inbox className="h-4 w-4" />
                <span className="hidden sm:inline">Inquiries</span>
              </Button>
            </Link>
            <Link href="/" target="_blank">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900 gap-2">
                <Globe className="h-4 w-4" />
                <span className="hidden sm:inline">View Site</span>
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-gray-600 hover:text-red-600 gap-2">
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {view === "list" ? (
          <>
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { label: "Total Posts", value: posts.length, icon: FileText, color: "text-gold" },
                { label: "Published", value: publishedCount, icon: CheckCircle2, color: "text-green-600" },
                { label: "Drafts", value: draftCount, icon: Clock, color: "text-amber-500" },
              ].map(({ label, value, icon: Icon, color }) => (
                <div key={label} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className={`h-4 w-4 ${color}`} />
                    <span className="text-xs text-gray-500 uppercase tracking-wider">{label}</span>
                  </div>
                  <p className="text-2xl font-semibold text-gray-900">{value}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">All Posts</h2>
              <Button onClick={() => openEditor()} className="btn-gold rounded-md gap-2" size="sm">
                <Plus className="h-4 w-4" /> New Post
              </Button>
            </div>

            {isLoading ? (
              <div className="text-center py-16 text-gray-400">Loading posts…</div>
            ) : posts.length === 0 ? (
              <div className="text-center py-16 bg-white border border-gray-200 rounded-xl shadow-sm">
                <FileText className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 mb-4">No blog posts yet.</p>
                <Button onClick={() => openEditor()} className="btn-gold rounded-md gap-2" size="sm">
                  <Plus className="h-4 w-4" /> Create first post
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                {posts.map((post) => (
                  <div
                    key={post._id}
                    className="bg-white border border-gray-200 rounded-xl px-5 py-4 flex items-center justify-between hover:border-gold/30 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      {post.thumbnailImage && (
                        <div className="relative h-10 w-16 rounded overflow-hidden flex-shrink-0">
                          <Image src={post.thumbnailImage} alt="" fill className="object-cover" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="font-medium text-gray-900 truncate">{post.title}</span>
                          <Badge
                            className={post.status === "published" ? "bg-green-50 text-green-700 border-green-200" : "bg-amber-50 text-amber-700 border-amber-200"}
                            variant="outline"
                          >
                            {post.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-500">
                          {CATEGORIES.find((c) => c.value === post.category)?.label ?? post.category}
                          {" · "}
                          {new Date(post.createdAt).toLocaleDateString("en-AE", { day: "numeric", month: "short", year: "numeric" })}
                          {" · "}
                          <span className="font-mono text-gray-400">/{post.slug}</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 ml-4">
                      {post.status === "published" && (
                        <Link href={`/blog/${post.slug}`} target="_blank">
                          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gold h-8 w-8">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                      )}
                      <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-700 h-8 w-8" onClick={() => openEditor(post)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      {deleteConfirm === post._id ? (
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 text-xs h-8 px-2" onClick={() => deleteMutation.mutate(post._id)} disabled={deleteMutation.isPending}>
                            Confirm
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-500 text-xs h-8 px-2" onClick={() => setDeleteConfirm(null)}>
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-600 h-8 w-8" onClick={() => setDeleteConfirm(post._id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* Editor header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 text-sm">
                <button type="button" onClick={resetEditor} className="text-gray-500 hover:text-gray-900 transition-colors">← Posts</button>
                <ChevronRight className="h-3 w-3 text-gray-400" />
                <span className="text-gray-900 font-medium">{editingPost ? "Edit Post" : "New Post"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Button type="button" variant="outline" size="sm" className="text-gray-600" onClick={resetEditor}>Cancel</Button>
                <Button type="submit" size="sm" className="btn-gold rounded-md gap-2" disabled={isSaving}>
                  {isSaving ? "Saving…" : editingPost ? "Save Changes" : "Create Post"}
                </Button>
              </div>
            </div>

            {saveError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm flex items-center gap-2">
                <AlertCircle className="h-4 w-4 flex-shrink-0" /> {saveError}
              </div>
            )}

            <div className="grid lg:grid-cols-[1fr_288px] gap-6">
              {/* Main panel */}
              <div className="space-y-5">
                {/* Tabs */}
                <div className="flex gap-1 bg-gray-100 rounded-lg p-1 w-fit border border-gray-200">
                  {([
                    { id: "content", label: "Content", icon: FileText },
                    { id: "images", label: "Images", icon: ImageIcon },
                    { id: "seo", label: "SEO & Social", icon: Search },
                  ] as const).map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setActiveTab(id)}
                      className={`flex items-center gap-1.5 px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                        activeTab === id ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" /> {label}
                    </button>
                  ))}
                </div>

                {/* ── CONTENT TAB ── */}
                {activeTab === "content" && (
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <Label className="text-gray-700 text-xs uppercase tracking-wider font-medium">Title *</Label>
                      <Input
                        value={formData.title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        placeholder="Blog post title"
                        className="text-lg h-12 focus:border-gold/50"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-gray-700 text-xs uppercase tracking-wider font-medium">Content *</Label>
                        <span className="text-xs text-gray-400">{wc} words</span>
                      </div>
                      <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <JoditEditor
                          key={`editor-${editingPost?._id ?? "new"}`}
                          value={formData.content}
                          config={joditConfig}
                          onBlur={(content) => setFormData((prev) => ({ ...prev, content }))}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-700 text-xs uppercase tracking-wider font-medium">Excerpt</Label>
                      <Textarea
                        value={formData.excerpt}
                        onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                        placeholder="Short summary shown in blog listing"
                        rows={3}
                        className="text-sm resize-none focus:border-gold/50"
                      />
                    </div>
                  </div>
                )}

                {/* ── IMAGES TAB ── */}
                {activeTab === "images" && (
                  <div className="space-y-6">
                    {/* Cover Image */}
                    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-3">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">Cover Image</p>
                        <p className="text-xs text-gray-500 mt-0.5">Large hero image shown at the top of the blog post. Recommended: 1200×630px</p>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-gray-700 text-xs font-medium">Image URL</Label>
                        <Input
                          value={formData.coverImage}
                          onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                          placeholder="https://example.com/images/cover.jpg"
                          className="text-sm focus:border-gold/50"
                        />
                      </div>
                      {formData.coverImage && (
                        <div className="relative w-full h-52 rounded-lg overflow-hidden border border-gray-100">
                          <Image src={formData.coverImage} alt="Cover preview" fill className="object-cover" onError={() => setFormData((p) => ({ ...p, coverImage: "" }))} />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                          <span className="absolute bottom-2 left-3 text-white text-xs font-medium bg-black/40 px-2 py-0.5 rounded">Cover</span>
                        </div>
                      )}
                    </div>

                    {/* Thumbnail Image */}
                    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-3">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">Thumbnail Image</p>
                        <p className="text-xs text-gray-500 mt-0.5">Smaller preview image shown in blog listing cards. Recommended: 800×450px</p>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-gray-700 text-xs font-medium">Image URL</Label>
                        <Input
                          value={formData.thumbnailImage}
                          onChange={(e) => setFormData({ ...formData, thumbnailImage: e.target.value })}
                          placeholder="https://example.com/images/thumbnail.jpg"
                          className="text-sm focus:border-gold/50"
                        />
                      </div>
                      {formData.thumbnailImage && (
                        <div className="relative w-56 h-32 rounded-lg overflow-hidden border border-gray-100">
                          <Image src={formData.thumbnailImage} alt="Thumbnail preview" fill className="object-cover" onError={() => setFormData((p) => ({ ...p, thumbnailImage: "" }))} />
                          <span className="absolute bottom-2 left-2 text-white text-xs font-medium bg-black/40 px-2 py-0.5 rounded">Thumbnail</span>
                        </div>
                      )}
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                      <p className="text-xs font-medium text-amber-800 mb-1">Image hosting tip</p>
                      <p className="text-xs text-amber-700">Upload images to a CDN (Cloudinary, ImgBB, or any hosting) and paste the direct image URL here. The OG image set in SEO &amp; Social tab will be used for WhatsApp and social media link previews.</p>
                    </div>
                  </div>
                )}

                {/* ── SEO & SOCIAL TAB ── */}
                {activeTab === "seo" && (
                  <div className="space-y-6">
                    {/* Basic SEO */}
                    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-4">
                      <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                        <Search className="h-4 w-4 text-gold" />
                        <p className="text-sm font-semibold text-gray-900">Basic SEO</p>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label className="text-gray-700 text-xs font-medium">
                            Meta Title <span className="text-gray-400 font-normal">({formData.metaTitle.length}/60)</span>
                          </Label>
                          <Input value={formData.metaTitle} onChange={(e) => set("metaTitle")(e.target.value)} placeholder="Post title for search engines" maxLength={60} className="text-sm focus:border-gold/50" />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-gray-700 text-xs font-medium">Focus Keyword</Label>
                          <Input value={formData.focusKeyword} onChange={(e) => set("focusKeyword")(e.target.value)} placeholder="e.g. Golden Visa Dubai 2026" className="text-sm focus:border-gold/50" />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-gray-700 text-xs font-medium">
                          Meta Description <span className="text-gray-400 font-normal">({formData.metaDescription.length}/160)</span>
                        </Label>
                        <Textarea value={formData.metaDescription} onChange={(e) => set("metaDescription")(e.target.value)} placeholder="Description shown in Google search results" maxLength={160} rows={3} className="text-sm resize-none focus:border-gold/50" />
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label className="text-gray-700 text-xs font-medium">Meta Keywords</Label>
                          <Input value={formData.metaKeywords} onChange={(e) => set("metaKeywords")(e.target.value)} placeholder="visa Dubai, golden visa, UAE" className="text-sm focus:border-gold/50" />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-gray-700 text-xs font-medium">Robots</Label>
                          <Select value={formData.robots} onValueChange={set("robots")}>
                            <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
                            <SelectContent>
                              {ROBOTS_OPTIONS.map((o) => <SelectItem key={o.value} value={o.value} className="text-sm">{o.label}</SelectItem>)}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-gray-700 text-xs font-medium">Canonical URL</Label>
                        <Input value={formData.canonicalUrl} onChange={(e) => set("canonicalUrl")(e.target.value)} placeholder="https://www.amer.center/blog/post-slug (leave blank for default)" className="text-sm focus:border-gold/50" />
                      </div>
                      {/* Google preview */}
                      {(formData.metaTitle || formData.title) && (
                        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                          <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Google Preview</p>
                          <p className="text-xs text-gray-400">www.amer.center › blog › {formData.slug || "post-slug"}</p>
                          <p className="text-[#1a0dab] text-[17px] mt-0.5 hover:underline cursor-pointer leading-tight">
                            {formData.metaTitle || formData.title}
                          </p>
                          <p className="text-sm text-[#545454] mt-1 leading-snug">
                            {formData.metaDescription || formData.excerpt || "No description set."}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Social / OG */}
                    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-4">
                      <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                        <Share2 className="h-4 w-4 text-gold" />
                        <p className="text-sm font-semibold text-gray-900">Social & WhatsApp Preview</p>
                        <span className="text-xs text-gray-400">Open Graph + Twitter/X</span>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label className="text-gray-700 text-xs font-medium">OG Title</Label>
                          <Input value={formData.ogTitle} onChange={(e) => set("ogTitle")(e.target.value)} placeholder={formData.metaTitle || formData.title || "Defaults to Meta Title"} className="text-sm focus:border-gold/50" />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-gray-700 text-xs font-medium">OG Image URL <span className="text-gray-400 font-normal">(1200×630px)</span></Label>
                          <Input value={formData.ogImage} onChange={(e) => setFormData({ ...formData, ogImage: e.target.value, twitterTitle: formData.twitterTitle })} placeholder="https://…/og-image.jpg" className="text-sm focus:border-gold/50" />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-gray-700 text-xs font-medium">OG Description</Label>
                        <Textarea value={formData.ogDescription} onChange={(e) => set("ogDescription")(e.target.value)} placeholder={formData.metaDescription || "Defaults to meta description"} rows={2} className="text-sm resize-none focus:border-gold/50" />
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label className="text-gray-700 text-xs font-medium">Twitter/X Title</Label>
                          <Input value={formData.twitterTitle} onChange={(e) => set("twitterTitle")(e.target.value)} placeholder="Defaults to OG Title" className="text-sm focus:border-gold/50" />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-gray-700 text-xs font-medium">Twitter/X Description</Label>
                          <Input value={formData.twitterDescription} onChange={(e) => set("twitterDescription")(e.target.value)} placeholder="Defaults to OG Description" className="text-sm focus:border-gold/50" />
                        </div>
                      </div>

                      {/* Social card preview */}
                      {ogPreviewTitle && (
                        <div>
                          <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Link Preview (Facebook / WhatsApp)</p>
                          <div className="border border-gray-200 rounded-xl overflow-hidden max-w-sm shadow-sm">
                            {ogPreviewImage ? (
                              <div className="relative h-44 w-full bg-gray-100">
                                <Image src={ogPreviewImage} alt="OG preview" fill className="object-cover" onError={() => {}} />
                              </div>
                            ) : (
                              <div className="h-44 bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center">
                                <p className="text-xs text-gray-400">No OG image set</p>
                              </div>
                            )}
                            <div className="p-3 bg-gray-50 border-t border-gray-200">
                              <p className="text-xs text-gray-400 uppercase">www.amer.center</p>
                              <p className="text-sm font-semibold text-gray-900 mt-0.5 line-clamp-1">{ogPreviewTitle}</p>
                              {ogPreviewDesc && <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{ogPreviewDesc}</p>}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Local / UAE Geo SEO */}
                    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-4">
                      <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                        <MapPin className="h-4 w-4 text-gold" />
                        <p className="text-sm font-semibold text-gray-900">UAE Local & Geo SEO</p>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label className="text-gray-700 text-xs font-medium">Geo Region</Label>
                          <Input value={formData.geoRegion} onChange={(e) => set("geoRegion")(e.target.value)} placeholder="AE-DU" className="text-sm focus:border-gold/50 font-mono" />
                          <p className="text-xs text-gray-400">e.g. AE-DU (Dubai), AE-SH (Sharjah)</p>
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-gray-700 text-xs font-medium">Geo Placename</Label>
                          <Input value={formData.geoPlacename} onChange={(e) => set("geoPlacename")(e.target.value)} placeholder="Dubai, UAE" className="text-sm focus:border-gold/50" />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-gray-700 text-xs font-medium">Schema Type</Label>
                        <Select value={formData.schemaType} onValueChange={set("schemaType")}>
                          <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            {SCHEMA_TYPES.map((s) => <SelectItem key={s.value} value={s.value} className="text-sm">{s.label}</SelectItem>)}
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-gray-400">Used for JSON-LD structured data on the published post.</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-4">
                <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-4 shadow-sm">
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Settings</p>

                  <div className="space-y-1.5">
                    <Label className="text-gray-700 text-xs font-medium">Status</Label>
                    <Select value={formData.status} onValueChange={set("status")}>
                      <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-gray-700 text-xs font-medium">Category</Label>
                    <Select value={formData.category} onValueChange={set("category")}>
                      <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map((cat) => <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-gray-700 text-xs font-medium">Author</Label>
                    <Input value={formData.authorName} onChange={(e) => set("authorName")(e.target.value)} className="h-9 text-sm focus:border-gold/50" />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-gray-700 text-xs font-medium">Read Time</Label>
                    <Input value={formData.readTime} onChange={(e) => set("readTime")(e.target.value)} placeholder="5 min read" className="h-9 text-sm focus:border-gold/50" />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-gray-700 text-xs font-medium">URL Slug</Label>
                    <Input value={formData.slug} onChange={(e) => set("slug")(e.target.value)} placeholder="auto-generated" className="h-9 text-sm font-mono focus:border-gold/50" />
                    {formData.slug && <p className="text-xs text-gray-400 font-mono">/blog/{formData.slug}</p>}
                  </div>
                </div>

                {/* Checklist */}
                <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-3">Checklist</p>
                  <ul className="space-y-2">
                    {checklist.map(({ label, done }) => (
                      <li key={label} className="flex items-center gap-2 text-xs">
                        <CheckCircle2 className={`h-3.5 w-3.5 flex-shrink-0 ${done ? "text-green-500" : "text-gray-300"}`} />
                        <span className={done ? "text-gray-700" : "text-gray-400"}>{label}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>Completed</span>
                      <span className="font-medium text-gray-700">{checklist.filter((c) => c.done).length}/{checklist.length}</span>
                    </div>
                    <div className="mt-1.5 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 rounded-full transition-all"
                        style={{ width: `${(checklist.filter((c) => c.done).length / checklist.length) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
