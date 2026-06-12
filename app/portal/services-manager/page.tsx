"use client";

import { useState, useMemo, useEffect } from "react";
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
  Plus, Edit, Trash2, LogOut, FileText, Globe, CheckCircle2,
  AlertCircle, ChevronRight, Inbox, Copy, Layers, Search,
  Image as ImageIcon, Share2, MapPin, Settings, Sprout,
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

interface Service {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  category: string;
  subcategory?: string;
  icon?: string;
  status: string;
  isBuiltIn?: boolean;
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
  geoRegion?: string;
  geoPlacename?: string;
  schemaType?: string;
  createdAt: string;
}

const CATEGORIES = [
  { value: "visa-services", label: "Visa Services" },
  { value: "attestation-translation", label: "Attestation & Translation" },
  { value: "dha-medical-typing", label: "DHA Medical & Typing" },
  { value: "emirates-id-government", label: "Emirates ID & Government" },
  { value: "business-setup", label: "Business Setup" },
  { value: "mohre-employment", label: "MOHRE & Employment" },
];

const SUBCATEGORIES: Record<string, { value: string; label: string }[]> = {
  "visa-services": [
    { value: "golden-visa", label: "Golden Visa" },
    { value: "family-visa", label: "Family Visa" },
    { value: "visa-renewal", label: "Visa Renewal" },
    { value: "visa-cancellation", label: "Visa Cancellation" },
    { value: "entry-permits", label: "Entry Permits" },
    { value: "status-change", label: "Status Change" },
    { value: "visit-visa", label: "Visit Visa" },
    { value: "tourist-visa", label: "Tourist Visa" },
  ],
  "attestation-translation": [
    { value: "document-attestation", label: "Document Attestation" },
    { value: "certificate-attestation", label: "Certificate Attestation" },
    { value: "translation", label: "Translation Services" },
    { value: "mofa-attestation", label: "MOFA Attestation" },
    { value: "embassy-attestation", label: "Embassy Attestation" },
    { value: "notarization", label: "Notarization" },
  ],
  "dha-medical-typing": [
    { value: "medical-fitness", label: "Medical Fitness Test" },
    { value: "health-insurance", label: "Health Insurance Typing" },
    { value: "medical-certificate", label: "Medical Certificate" },
    { value: "typing-services", label: "Typing Services" },
    { value: "insurance-card", label: "Insurance Cards" },
  ],
  "emirates-id-government": [
    { value: "emirates-id-new", label: "Emirates ID New" },
    { value: "emirates-id-renewal", label: "Emirates ID Renewal" },
    { value: "emirates-id-replacement", label: "Emirates ID Replacement" },
    { value: "ica-services", label: "ICA Services" },
    { value: "government-services", label: "Government Services" },
  ],
  "business-setup": [
    { value: "mainland-company", label: "Mainland Company" },
    { value: "free-zone", label: "Free Zone Company" },
    { value: "offshore", label: "Offshore Company" },
    { value: "trade-license", label: "Trade License" },
    { value: "business-modification", label: "Business Modification" },
    { value: "pro-services", label: "PRO Services" },
  ],
  "mohre-employment": [
    { value: "work-permit", label: "Work Permit" },
    { value: "employment-contract", label: "Employment Contract" },
    { value: "labor-card", label: "Labor Card" },
    { value: "mohre-services", label: "MOHRE Services" },
    { value: "salary-protection", label: "Salary Protection" },
  ],
};

const ROBOTS_OPTIONS = [
  { value: "index,follow", label: "Index, Follow (default)" },
  { value: "noindex,follow", label: "No Index, Follow" },
  { value: "index,nofollow", label: "Index, No Follow" },
  { value: "noindex,nofollow", label: "No Index, No Follow" },
];

const SCHEMA_TYPES = [
  { value: "Service", label: "Service" },
  { value: "LocalBusiness", label: "Local Business" },
  { value: "GovernmentService", label: "Government Service" },
  { value: "FinancialService", label: "Financial Service" },
];

const DEFAULT_FORM = {
  title: "",
  slug: "",
  content: "",
  excerpt: "",
  category: "visa-services",
  subcategory: "",
  icon: "",
  status: "draft",
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
  geoRegion: "AE-DU",
  geoPlacename: "Dubai, UAE",
  schemaType: "Service",
};

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim();
}

function SectionHeader({ icon: Icon, title, subtitle }: { icon: React.ElementType; title: string; subtitle?: string }) {
  return (
    <div className="flex items-center gap-2 pb-3 border-b border-gray-100 mb-4">
      <div className="h-7 w-7 rounded-md bg-[#C9A962]/10 flex items-center justify-center flex-shrink-0">
        <Icon className="h-4 w-4 text-[#C9A962]" />
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-900">{title}</p>
        {subtitle && <p className="text-xs text-gray-400">{subtitle}</p>}
      </div>
    </div>
  );
}

export default function ServicesManagerPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [view, setView] = useState<"list" | "editor">("list");
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState(DEFAULT_FORM);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [saveError, setSaveError] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [seedLoading, setSeedLoading] = useState(false);
  const [seedMessage, setSeedMessage] = useState("");

  const joditConfig = useMemo(() => ({
    readonly: false,
    placeholder: "Write service page content here…",
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

  const { data: services = [], isLoading } = useQuery<Service[]>({
    queryKey: ["/api/services"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/services");
      if (!res.ok) throw new Error("Failed to load services");
      return res.json();
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const res = await apiRequest("POST", "/api/services", data);
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error((err as { message?: string }).message || "Failed to create service");
      }
      return res.json();
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["/api/services"] }); resetEditor(); },
    onError: (err: Error) => setSaveError(err.message),
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<typeof formData> }) => {
      const res = await apiRequest("PATCH", `/api/services/${id}`, data);
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error((err as { message?: string }).message || "Failed to update service");
      }
      return res.json();
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["/api/services"] }); resetEditor(); },
    onError: (err: Error) => setSaveError(err.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiRequest("DELETE", `/api/services/${id}`);
      if (!res.ok) throw new Error("Failed to delete service");
      return res.json();
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["/api/services"] }); setDeleteConfirm(null); },
  });

  const resetEditor = () => {
    setView("list");
    setEditingService(null);
    setFormData(DEFAULT_FORM);
    setSaveError("");
  };

  const openEditor = (service?: Service) => {
    if (service) {
      setEditingService(service);
      setFormData({
        title: service.title, slug: service.slug, content: service.content,
        excerpt: service.excerpt || "", category: service.category,
        subcategory: service.subcategory || "", icon: service.icon || "",
        status: service.status, coverImage: service.coverImage || "",
        thumbnailImage: service.thumbnailImage || "",
        metaTitle: service.metaTitle || "", metaDescription: service.metaDescription || "",
        metaKeywords: service.metaKeywords || "", focusKeyword: service.focusKeyword || "",
        canonicalUrl: service.canonicalUrl || "", robots: service.robots || "index,follow",
        ogTitle: service.ogTitle || "", ogDescription: service.ogDescription || "",
        ogImage: service.ogImage || "", geoRegion: service.geoRegion || "AE-DU",
        geoPlacename: service.geoPlacename || "Dubai, UAE",
        schemaType: service.schemaType || "Service",
      });
    } else {
      setEditingService(null);
      setFormData(DEFAULT_FORM);
    }
    setSaveError("");
    setView("editor");
  };

  const openClone = (service: Service) => {
    setEditingService(null);
    setFormData({
      title: `${service.title} (Copy)`,
      slug: `${service.slug}-copy`,
      content: service.content,
      excerpt: service.excerpt || "",
      category: service.category,
      subcategory: service.subcategory || "",
      icon: service.icon || "",
      status: "draft",
      coverImage: service.coverImage || "",
      thumbnailImage: service.thumbnailImage || "",
      metaTitle: service.metaTitle ? `${service.metaTitle} - Copy` : "",
      metaDescription: service.metaDescription || "",
      metaKeywords: service.metaKeywords || "",
      focusKeyword: service.focusKeyword || "",
      canonicalUrl: "",
      robots: service.robots || "index,follow",
      ogTitle: service.ogTitle || "",
      ogDescription: service.ogDescription || "",
      ogImage: service.ogImage || "",
      geoRegion: service.geoRegion || "AE-DU",
      geoPlacename: service.geoPlacename || "Dubai, UAE",
      schemaType: service.schemaType || "Service",
    });
    setSaveError("");
    setView("editor");
  };

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev, title,
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
    if (editingService) {
      updateMutation.mutate({ id: editingService._id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleSeed = async () => {
    setSeedLoading(true);
    setSeedMessage("");
    try {
      const res = await apiRequest("POST", "/api/services/seed", {});
      const json = await res.json() as { message?: string; count?: number; skipped?: boolean };
      if (res.ok) {
        setSeedMessage(json.skipped ? "Services already seeded — no changes made." : `${json.count ?? 24} services seeded successfully!`);
        queryClient.invalidateQueries({ queryKey: ["/api/services"] });
      } else {
        setSeedMessage((json as { message?: string }).message || "Seed failed");
      }
    } catch {
      setSeedMessage("Network error during seed");
    }
    setSeedLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("portal-token");
    document.cookie = "portal_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/portal/login");
  };

  const filteredServices = filterCategory === "all"
    ? services
    : services.filter((s) => s.category === filterCategory);

  const isSaving = createMutation.isPending || updateMutation.isPending;
  const publishedCount = services.filter((s) => s.status === "published").length;
  const draftCount = services.filter((s) => s.status === "draft").length;
  const ogPreviewTitle = formData.ogTitle || formData.metaTitle || formData.title;
  const ogPreviewDesc = formData.ogDescription || formData.metaDescription || formData.excerpt;
  const ogPreviewImage = formData.ogImage || formData.coverImage;

  const checklist = [
    { label: "Title", done: !!formData.title },
    { label: "Content", done: formData.content.replace(/<[^>]*>/g, "").trim().length >= 100 },
    { label: "Excerpt", done: !!formData.excerpt },
    { label: "Cover image", done: !!formData.coverImage },
    { label: "Meta title", done: !!formData.metaTitle },
    { label: "Meta description", done: !!formData.metaDescription },
    { label: "OG image", done: !!formData.ogImage },
  ];
  const checklistDone = checklist.filter((c) => c.done).length;
  const currentSubcats = SUBCATEGORIES[formData.category] ?? [];

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
              <Layers className="h-4 w-4 text-[#C9A962]" />
              <span className="font-medium text-gray-900">Services Manager</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/portal/inquiries">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900 gap-2">
                <Inbox className="h-4 w-4" /><span className="hidden sm:inline">Inquiries</span>
              </Button>
            </Link>
            <Link href="/portal/blog-manager">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900 gap-2">
                <FileText className="h-4 w-4" /><span className="hidden sm:inline">Blog</span>
              </Button>
            </Link>
            <Link href="/" target="_blank">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900 gap-2">
                <Globe className="h-4 w-4" /><span className="hidden sm:inline">View Site</span>
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-gray-600 hover:text-red-600 gap-2">
              <LogOut className="h-4 w-4" /><span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {view === "list" ? (
          <>
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { label: "Total Services", value: services.length, icon: Layers, color: "text-[#C9A962]" },
                { label: "Published", value: publishedCount, icon: CheckCircle2, color: "text-green-600" },
                { label: "Drafts", value: draftCount, icon: Settings, color: "text-amber-500" },
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

            {/* Seed banner */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
              <div>
                <p className="text-sm font-medium text-gray-900">Pre-built Services</p>
                <p className="text-xs text-gray-500 mt-0.5">Seed all 24 existing Amer Center services into the database automatically. Only runs if no services exist yet.</p>
              </div>
              <div className="flex items-center gap-3">
                {seedMessage && (
                  <p className={`text-xs font-medium ${seedMessage.includes("fail") || seedMessage.includes("error") ? "text-red-600" : "text-green-700"}`}>
                    {seedMessage}
                  </p>
                )}
                <Button
                  onClick={handleSeed}
                  disabled={seedLoading}
                  variant="outline"
                  size="sm"
                  className="border-[#C9A962] text-[#C9A962] hover:bg-[#C9A962]/5 gap-2 whitespace-nowrap"
                >
                  <Sprout className="h-4 w-4" />
                  {seedLoading ? "Seeding…" : "Seed Services"}
                </Button>
              </div>
            </div>

            {/* Filter + New */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => setFilterCategory("all")}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${filterCategory === "all" ? "bg-[#C9A962] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                >
                  All ({services.length})
                </button>
                {CATEGORIES.map((cat) => {
                  const count = services.filter((s) => s.category === cat.value).length;
                  return (
                    <button
                      key={cat.value}
                      type="button"
                      onClick={() => setFilterCategory(cat.value)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${filterCategory === cat.value ? "bg-[#C9A962] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                    >
                      {cat.label} ({count})
                    </button>
                  );
                })}
              </div>
              <Button onClick={() => openEditor()} className="bg-[#C9A962] hover:bg-[#A88B4A] text-white rounded-md gap-2 whitespace-nowrap" size="sm">
                <Plus className="h-4 w-4" /> New Service
              </Button>
            </div>

            {isLoading ? (
              <div className="text-center py-16 text-gray-400">Loading services…</div>
            ) : filteredServices.length === 0 ? (
              <div className="text-center py-16 bg-white border border-gray-200 rounded-xl shadow-sm">
                <Layers className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 mb-1">No services found.</p>
                <p className="text-xs text-gray-400 mb-4">Use the Seed button above to add all 24 existing Amer services.</p>
                <Button onClick={() => openEditor()} className="bg-[#C9A962] hover:bg-[#A88B4A] text-white rounded-md gap-2" size="sm">
                  <Plus className="h-4 w-4" /> Create service
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                {filteredServices.map((service) => (
                  <div key={service._id} className="bg-white border border-gray-200 rounded-xl px-5 py-4 flex items-center justify-between hover:border-[#C9A962]/30 hover:shadow-sm transition-all">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      {service.icon ? (
                        <span className="text-2xl flex-shrink-0">{service.icon}</span>
                      ) : service.thumbnailImage ? (
                        <div className="relative h-10 w-16 rounded overflow-hidden flex-shrink-0">
                          <Image src={service.thumbnailImage} alt="" fill className="object-cover" />
                        </div>
                      ) : (
                        <div className="h-10 w-10 rounded-lg bg-[#C9A962]/10 flex items-center justify-center flex-shrink-0">
                          <Layers className="h-5 w-5 text-[#C9A962]" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                          <span className="font-medium text-gray-900 truncate">{service.title}</span>
                          {service.isBuiltIn && <Badge className="bg-blue-50 text-blue-700 border-blue-200 text-[10px]" variant="outline">Built-in</Badge>}
                          <Badge className={service.status === "published" ? "bg-green-50 text-green-700 border-green-200" : "bg-amber-50 text-amber-700 border-amber-200"} variant="outline">
                            {service.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-500 truncate">
                          {CATEGORIES.find((c) => c.value === service.category)?.label ?? service.category}
                          {service.subcategory && ` · ${SUBCATEGORIES[service.category]?.find((s) => s.value === service.subcategory)?.label ?? service.subcategory}`}
                          {" · "}<span className="font-mono text-gray-400">/services/{service.slug}</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 ml-4">
                      {service.status === "published" && (
                        <Link href={`/services/${service.slug}`} target="_blank">
                          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-[#C9A962] h-8 w-8">
                            <Globe className="h-4 w-4" />
                          </Button>
                        </Link>
                      )}
                      <Button variant="ghost" size="icon" className="text-gray-400 hover:text-[#C9A962] h-8 w-8" title="Clone" onClick={() => openClone(service)}>
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-700 h-8 w-8" onClick={() => openEditor(service)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      {deleteConfirm === service._id ? (
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 text-xs h-8 px-2" onClick={() => deleteMutation.mutate(service._id)} disabled={deleteMutation.isPending}>Confirm</Button>
                          <Button variant="ghost" size="sm" className="text-gray-500 text-xs h-8 px-2" onClick={() => setDeleteConfirm(null)}>Cancel</Button>
                        </div>
                      ) : (
                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-600 h-8 w-8" onClick={() => setDeleteConfirm(service._id)}>
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
                <button type="button" onClick={resetEditor} className="text-gray-500 hover:text-gray-900 transition-colors">← Services</button>
                <ChevronRight className="h-3 w-3 text-gray-400" />
                <span className="text-gray-900 font-medium">{editingService ? "Edit Service" : "New Service"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Button type="button" variant="outline" size="sm" className="text-gray-600" onClick={resetEditor}>Cancel</Button>
                <Button type="submit" size="sm" className="bg-[#C9A962] hover:bg-[#A88B4A] text-white rounded-md gap-2" disabled={isSaving}>
                  {isSaving ? "Saving…" : editingService ? "Save Changes" : "Create Service"}
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
              <div className="space-y-6">

                {/* ── CONTENT ── */}
                <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-5">
                  <SectionHeader icon={FileText} title="Content" subtitle="Title, body, and description" />

                  <div className="space-y-2">
                    <Label className="text-gray-700 text-xs uppercase tracking-wider font-medium">Service Title *</Label>
                    <Input
                      value={formData.title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      placeholder="e.g. Golden Visa Dubai Application"
                      className="text-lg h-12 focus:border-[#C9A962]/50"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-700 text-xs uppercase tracking-wider font-medium">Page Content *</Label>
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <JoditEditor
                        key={`svc-editor-${editingService?._id ?? "new"}`}
                        value={formData.content}
                        config={joditConfig}
                        onBlur={(content) => setFormData((prev) => ({ ...prev, content }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-700 text-xs uppercase tracking-wider font-medium">Short Description / Excerpt</Label>
                    <Textarea
                      value={formData.excerpt}
                      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                      placeholder="1–2 sentences describing this service — shown in service listing cards"
                      rows={3}
                      className="text-sm resize-none focus:border-[#C9A962]/50"
                    />
                  </div>
                </div>

                {/* ── IMAGES ── */}
                <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-5">
                  <SectionHeader icon={ImageIcon} title="Images" subtitle="Cover photo and thumbnail" />

                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-gray-800">Cover Image</p>
                      <p className="text-xs text-gray-500 mt-0.5">Hero image at the top of the service page. Recommended: 1200×630px</p>
                    </div>
                    <Input
                      value={formData.coverImage}
                      onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                      placeholder="https://example.com/images/cover.jpg"
                      className="text-sm focus:border-[#C9A962]/50"
                    />
                    {formData.coverImage && (
                      <div className="relative w-full h-52 rounded-lg overflow-hidden border border-gray-100">
                        <Image src={formData.coverImage} alt="Cover preview" fill className="object-cover" onError={() => setFormData((p) => ({ ...p, coverImage: "" }))} />
                        <span className="absolute bottom-2 left-3 text-white text-xs font-medium bg-black/40 px-2 py-0.5 rounded">Cover</span>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-gray-100 pt-5 space-y-3">
                    <div>
                      <p className="text-sm font-medium text-gray-800">Thumbnail Image</p>
                      <p className="text-xs text-gray-500 mt-0.5">Preview image shown in service listing cards. Recommended: 800×450px</p>
                    </div>
                    <Input
                      value={formData.thumbnailImage}
                      onChange={(e) => setFormData({ ...formData, thumbnailImage: e.target.value })}
                      placeholder="https://example.com/images/thumbnail.jpg"
                      className="text-sm focus:border-[#C9A962]/50"
                    />
                    {formData.thumbnailImage && (
                      <div className="relative w-56 h-32 rounded-lg overflow-hidden border border-gray-100">
                        <Image src={formData.thumbnailImage} alt="Thumbnail preview" fill className="object-cover" onError={() => setFormData((p) => ({ ...p, thumbnailImage: "" }))} />
                        <span className="absolute bottom-2 left-2 text-white text-xs font-medium bg-black/40 px-2 py-0.5 rounded">Thumbnail</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* ── BASIC SEO ── */}
                <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-4">
                  <SectionHeader icon={Search} title="Basic SEO" subtitle="Title, description, and keywords for search engines" />

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-gray-700 text-xs font-medium">
                        Meta Title <span className="text-gray-400 font-normal">({formData.metaTitle.length}/60)</span>
                      </Label>
                      <Input value={formData.metaTitle} onChange={(e) => set("metaTitle")(e.target.value)} placeholder="Service title for search engines" maxLength={60} className="text-sm focus:border-[#C9A962]/50" />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-gray-700 text-xs font-medium">Focus Keyword</Label>
                      <Input value={formData.focusKeyword} onChange={(e) => set("focusKeyword")(e.target.value)} placeholder="e.g. Golden Visa Dubai 2026" className="text-sm focus:border-[#C9A962]/50" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-gray-700 text-xs font-medium">
                      Meta Description <span className="text-gray-400 font-normal">({formData.metaDescription.length}/160)</span>
                    </Label>
                    <Textarea value={formData.metaDescription} onChange={(e) => set("metaDescription")(e.target.value)} placeholder="Description shown in Google search results" maxLength={160} rows={3} className="text-sm resize-none focus:border-[#C9A962]/50" />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-gray-700 text-xs font-medium">Meta Keywords</Label>
                      <Input value={formData.metaKeywords} onChange={(e) => set("metaKeywords")(e.target.value)} placeholder="visa Dubai, golden visa, UAE" className="text-sm focus:border-[#C9A962]/50" />
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
                    <Input value={formData.canonicalUrl} onChange={(e) => set("canonicalUrl")(e.target.value)} placeholder="https://www.amer.center/services/slug (leave blank for default)" className="text-sm focus:border-[#C9A962]/50" />
                  </div>

                  {(formData.metaTitle || formData.title) && (
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                      <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Google Preview</p>
                      <p className="text-xs text-gray-400">www.amer.center › services › {formData.slug || "service-slug"}</p>
                      <p className="text-[#1a0dab] text-[17px] mt-0.5 hover:underline cursor-pointer leading-tight">{formData.metaTitle || formData.title}</p>
                      <p className="text-sm text-[#545454] mt-1 leading-snug">{formData.metaDescription || formData.excerpt || "No description set."}</p>
                    </div>
                  )}
                </div>

                {/* ── SOCIAL / OG ── */}
                <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-4">
                  <SectionHeader icon={Share2} title="Social & WhatsApp Preview" subtitle="Open Graph settings for link previews" />

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-gray-700 text-xs font-medium">OG Title</Label>
                      <Input value={formData.ogTitle} onChange={(e) => set("ogTitle")(e.target.value)} placeholder={formData.metaTitle || formData.title || "Defaults to Meta Title"} className="text-sm focus:border-[#C9A962]/50" />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-gray-700 text-xs font-medium">OG Image URL <span className="text-gray-400 font-normal">(1200×630px)</span></Label>
                      <Input value={formData.ogImage} onChange={(e) => set("ogImage")(e.target.value)} placeholder="https://…/og-image.jpg" className="text-sm focus:border-[#C9A962]/50" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-gray-700 text-xs font-medium">OG Description</Label>
                    <Textarea value={formData.ogDescription} onChange={(e) => set("ogDescription")(e.target.value)} placeholder={formData.metaDescription || "Defaults to meta description"} rows={2} className="text-sm resize-none focus:border-[#C9A962]/50" />
                  </div>

                  {ogPreviewTitle && (
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Link Preview (Facebook / WhatsApp)</p>
                      <div className="border border-gray-200 rounded-xl overflow-hidden max-w-sm shadow-sm">
                        {ogPreviewImage ? (
                          <div className="relative h-44 w-full bg-gray-100">
                            <Image src={ogPreviewImage} alt="OG preview" fill className="object-cover" onError={() => {}} />
                          </div>
                        ) : (
                          <div className="h-44 bg-gradient-to-br from-[#C9A962]/20 to-[#C9A962]/5 flex items-center justify-center">
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

                {/* ── GEO SEO ── */}
                <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-4">
                  <SectionHeader icon={MapPin} title="UAE Local & Geo SEO" subtitle="Geo targeting and structured data schema" />

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-gray-700 text-xs font-medium">Geo Region</Label>
                      <Input value={formData.geoRegion} onChange={(e) => set("geoRegion")(e.target.value)} placeholder="AE-DU" className="text-sm focus:border-[#C9A962]/50 font-mono" />
                      <p className="text-xs text-gray-400">e.g. AE-DU (Dubai), AE-SH (Sharjah)</p>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-gray-700 text-xs font-medium">Geo Placename</Label>
                      <Input value={formData.geoPlacename} onChange={(e) => set("geoPlacename")(e.target.value)} placeholder="Dubai, UAE" className="text-sm focus:border-[#C9A962]/50" />
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
                  </div>
                </div>
              </div>

              {/* ── SIDEBAR ── */}
              <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
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
                    <Select value={formData.category} onValueChange={(v) => setFormData((p) => ({ ...p, category: v, subcategory: "" }))}>
                      <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map((cat) => <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>

                  {currentSubcats.length > 0 && (
                    <div className="space-y-1.5">
                      <Label className="text-gray-700 text-xs font-medium">Subcategory</Label>
                      <Select value={formData.subcategory || "__none"} onValueChange={(v) => set("subcategory")(v === "__none" ? "" : v)}>
                        <SelectTrigger className="h-9"><SelectValue placeholder="None" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="__none">None</SelectItem>
                          {currentSubcats.map((s) => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <Label className="text-gray-700 text-xs font-medium">Icon (emoji)</Label>
                    <Input value={formData.icon} onChange={(e) => set("icon")(e.target.value)} placeholder="🏆" className="h-9 text-xl focus:border-[#C9A962]/50" />
                    <p className="text-xs text-gray-400">Paste any emoji — shown in service list card</p>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-gray-700 text-xs font-medium">URL Slug</Label>
                    <Input value={formData.slug} onChange={(e) => set("slug")(e.target.value)} placeholder="auto-generated" className="h-9 text-sm font-mono focus:border-[#C9A962]/50" />
                    {formData.slug && <p className="text-xs text-gray-400 font-mono">/services/{formData.slug}</p>}
                  </div>
                </div>

                {/* Checklist */}
                <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-3">SEO Checklist</p>
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
                      <span className="font-medium text-gray-700">{checklistDone}/{checklist.length}</span>
                    </div>
                    <div className="mt-1.5 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full transition-all" style={{ width: `${(checklistDone / checklist.length) * 100}%` }} />
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full bg-[#C9A962] hover:bg-[#A88B4A] text-white rounded-md" disabled={isSaving}>
                  {isSaving ? "Saving…" : editingService ? "Save Changes" : "Create Service"}
                </Button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
