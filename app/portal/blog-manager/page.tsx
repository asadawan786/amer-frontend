"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
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
} from "lucide-react";
import { apiRequest } from "@/lib/api";

interface GuestBlogPost {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  category: string;
  authorName: string;
  status: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
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

const DEFAULT_FORM = {
  title: "",
  slug: "",
  content: "",
  excerpt: "",
  category: "general",
  authorName: "Amer Center Admin",
  status: "draft",
  metaTitle: "",
  metaDescription: "",
  metaKeywords: "",
};

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function wordCount(text: string): number {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}

export default function BlogManagerPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [view, setView] = useState<"list" | "editor">("list");
  const [activeTab, setActiveTab] = useState<"content" | "seo">("content");
  const [editingPost, setEditingPost] = useState<GuestBlogPost | null>(null);
  const [formData, setFormData] = useState(DEFAULT_FORM);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [saveError, setSaveError] = useState("");

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
        title: post.title, slug: post.slug, content: post.content,
        excerpt: post.excerpt || "", category: post.category, authorName: post.authorName,
        status: post.status, metaTitle: post.metaTitle || "",
        metaDescription: post.metaDescription || "", metaKeywords: post.metaKeywords || "",
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
    }));
  };

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Image
                src="/logo-header.jpeg"
                alt="Amer Center Dubai"
                width={120}
                height={34}
                className="h-9 w-auto object-contain"
              />
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
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-gray-600 hover:text-red-600 gap-2"
            >
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

            {/* Posts list */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">All Posts</h2>
              <Button onClick={() => openEditor()} className="btn-gold rounded-md gap-2" size="sm">
                <Plus className="h-4 w-4" />
                New Post
              </Button>
            </div>

            {isLoading ? (
              <div className="text-center py-16 text-gray-400">Loading posts…</div>
            ) : posts.length === 0 ? (
              <div className="text-center py-16 bg-white border border-gray-200 rounded-xl shadow-sm">
                <FileText className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 mb-4">No blog posts yet.</p>
                <Button onClick={() => openEditor()} className="btn-gold rounded-md gap-2" size="sm">
                  <Plus className="h-4 w-4" />
                  Create first post
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                {posts.map((post) => (
                  <div
                    key={post._id}
                    className="bg-white border border-gray-200 rounded-xl px-5 py-4 flex items-center justify-between hover:border-gold/30 hover:shadow-sm transition-all"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-medium text-gray-900 truncate">{post.title}</span>
                        <Badge
                          className={
                            post.status === "published"
                              ? "bg-green-50 text-green-700 border-green-200"
                              : "bg-amber-50 text-amber-700 border-amber-200"
                          }
                          variant="outline"
                        >
                          {post.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500">
                        {CATEGORIES.find((c) => c.value === post.category)?.label ?? post.category}
                        {" · "}
                        {new Date(post.createdAt).toLocaleDateString("en-AE", {
                          day: "numeric", month: "short", year: "numeric",
                        })}
                        {" · "}
                        <span className="font-mono text-gray-400">/{post.slug}</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-1 ml-4">
                      {post.status === "published" && (
                        <Link href={`/blog/${post.slug}`} target="_blank">
                          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gold h-8 w-8">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                      )}
                      <Button
                        variant="ghost" size="icon"
                        className="text-gray-400 hover:text-gray-700 h-8 w-8"
                        onClick={() => openEditor(post)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      {deleteConfirm === post._id ? (
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost" size="sm"
                            className="text-red-600 hover:text-red-700 text-xs h-8 px-2"
                            onClick={() => deleteMutation.mutate(post._id)}
                            disabled={deleteMutation.isPending}
                          >
                            Confirm
                          </Button>
                          <Button
                            variant="ghost" size="sm"
                            className="text-gray-500 text-xs h-8 px-2"
                            onClick={() => setDeleteConfirm(null)}
                          >
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <Button
                          variant="ghost" size="icon"
                          className="text-gray-400 hover:text-red-600 h-8 w-8"
                          onClick={() => setDeleteConfirm(post._id)}
                        >
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
          /* Editor view */
          <form onSubmit={handleSubmit}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 text-sm">
                <button
                  type="button"
                  onClick={resetEditor}
                  className="text-gray-500 hover:text-gray-900 transition-colors"
                >
                  ← Posts
                </button>
                <ChevronRight className="h-3 w-3 text-gray-400" />
                <span className="text-gray-900 font-medium">
                  {editingPost ? "Edit Post" : "New Post"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Button type="button" variant="outline" size="sm" className="text-gray-600" onClick={resetEditor}>
                  Cancel
                </Button>
                <Button type="submit" size="sm" className="btn-gold rounded-md gap-2" disabled={isSaving}>
                  {isSaving ? "Saving…" : editingPost ? "Save Changes" : "Create Post"}
                </Button>
              </div>
            </div>

            {saveError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm flex items-center gap-2">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                {saveError}
              </div>
            )}

            <div className="grid lg:grid-cols-[1fr_280px] gap-6">
              {/* Main content */}
              <div className="space-y-5">
                {/* Tab switcher */}
                <div className="flex gap-1 bg-gray-100 rounded-lg p-1 w-fit border border-gray-200">
                  {(["content", "seo"] as const).map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors capitalize ${
                        activeTab === tab
                          ? "bg-white text-gray-900 shadow-sm"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      {tab === "seo" ? "SEO" : "Content"}
                    </button>
                  ))}
                </div>

                {activeTab === "content" ? (
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
                        <span className="text-xs text-gray-400">{wordCount(formData.content)} words · Markdown supported</span>
                      </div>
                      <Textarea
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        placeholder="Write your blog post content here. Markdown formatting is supported (## Headings, **bold**, *italic*, - lists)."
                        rows={18}
                        className="font-mono text-sm resize-y focus:border-gold/50"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-700 text-xs uppercase tracking-wider font-medium">Excerpt</Label>
                      <Textarea
                        value={formData.excerpt}
                        onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                        placeholder="Short summary shown in blog listing (optional)"
                        rows={3}
                        className="text-sm resize-none focus:border-gold/50"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <Label className="text-gray-700 text-xs uppercase tracking-wider font-medium">
                        Meta Title
                        <span className="ml-2 text-gray-400 normal-case font-normal">({formData.metaTitle.length}/60 chars)</span>
                      </Label>
                      <Input
                        value={formData.metaTitle}
                        onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                        placeholder="SEO title — defaults to post title"
                        maxLength={60}
                        className="focus:border-gold/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-700 text-xs uppercase tracking-wider font-medium">
                        Meta Description
                        <span className="ml-2 text-gray-400 normal-case font-normal">({formData.metaDescription.length}/160 chars)</span>
                      </Label>
                      <Textarea
                        value={formData.metaDescription}
                        onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                        placeholder="SEO description shown in search results"
                        maxLength={160}
                        rows={3}
                        className="text-sm resize-none focus:border-gold/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-700 text-xs uppercase tracking-wider font-medium">Meta Keywords</Label>
                      <Input
                        value={formData.metaKeywords}
                        onChange={(e) => setFormData({ ...formData, metaKeywords: e.target.value })}
                        placeholder="keyword1, keyword2, keyword3"
                        className="focus:border-gold/50"
                      />
                    </div>

                    {/* Google preview */}
                    {(formData.metaTitle || formData.title) && (
                      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">Google Preview</p>
                        <p className="text-xs text-gray-400">www.amer.center › blog › {formData.slug || "post-slug"}</p>
                        <p className="text-gold text-base mt-0.5 hover:underline cursor-pointer">
                          {formData.metaTitle || formData.title}
                        </p>
                        <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                          {formData.metaDescription || formData.excerpt || "No description set."}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-4">
                <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-4 shadow-sm">
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Settings</p>

                  <div className="space-y-1.5">
                    <Label className="text-gray-700 text-xs font-medium">Status</Label>
                    <Select value={formData.status} onValueChange={(v) => setFormData({ ...formData, status: v })}>
                      <SelectTrigger className="h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-gray-700 text-xs font-medium">Category</Label>
                    <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
                      <SelectTrigger className="h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-gray-700 text-xs font-medium">Author</Label>
                    <Input
                      value={formData.authorName}
                      onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                      className="h-9 text-sm focus:border-gold/50"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-gray-700 text-xs font-medium">URL Slug</Label>
                    <Input
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      placeholder="auto-generated"
                      className="h-9 text-sm font-mono focus:border-gold/50"
                    />
                    {formData.slug && (
                      <p className="text-xs text-gray-400 font-mono">/blog/{formData.slug}</p>
                    )}
                  </div>
                </div>

                {/* Checklist */}
                <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-3">Checklist</p>
                  <ul className="space-y-2">
                    {[
                      { label: "Title", done: !!formData.title },
                      { label: "Content (200+ words)", done: wordCount(formData.content) >= 200 },
                      { label: "Excerpt", done: !!formData.excerpt },
                      { label: "Meta title", done: !!formData.metaTitle },
                      { label: "Meta description", done: !!formData.metaDescription },
                    ].map(({ label, done }) => (
                      <li key={label} className="flex items-center gap-2 text-xs">
                        <CheckCircle2 className={`h-3.5 w-3.5 flex-shrink-0 ${done ? "text-green-500" : "text-gray-300"}`} />
                        <span className={done ? "text-gray-700" : "text-gray-400"}>{label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
