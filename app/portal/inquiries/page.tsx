"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  LogOut, Globe, Inbox, ChevronDown, ChevronUp, Phone, Mail,
  Building2, MessageSquare, Clock, CheckCircle2, AlertCircle, RefreshCw, FileText,
} from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { apiRequest } from "@/lib/api";

interface Inquiry {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  company?: string;
  service?: string;
  message?: string;
  status: "new" | "in_progress" | "resolved";
  createdAt: string;
}

const STATUS_CONFIG = {
  new: { label: "New", className: "bg-blue-50 text-blue-700 border-blue-200", icon: AlertCircle },
  in_progress: { label: "In Progress", className: "bg-amber-50 text-amber-700 border-amber-200", icon: RefreshCw },
  resolved: { label: "Resolved", className: "bg-green-50 text-green-700 border-green-200", icon: CheckCircle2 },
};

export default function InquiriesPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    if (!localStorage.getItem("portal-token")) {
      router.replace("/portal/login");
    }
  }, [router]);

  const { data: inquiries = [], isLoading } = useQuery<Inquiry[]>({
    queryKey: ["/api/inquiries"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/inquiries");
      if (!res.ok) throw new Error("Failed to load inquiries");
      return res.json();
    },
  });

  const statusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const res = await apiRequest("PATCH", `/api/inquiries/${id}/status`, { status });
      if (!res.ok) throw new Error("Failed to update status");
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/inquiries"] }),
  });

  const handleLogout = () => {
    localStorage.removeItem("portal-token");
    document.cookie = "portal_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/portal/login");
  };

  const counts = {
    total: inquiries.length,
    new: inquiries.filter((i) => i.status === "new").length,
    in_progress: inquiries.filter((i) => i.status === "in_progress").length,
    resolved: inquiries.filter((i) => i.status === "resolved").length,
  };

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
            <div className="flex items-center gap-2 text-sm">
              <Inbox className="h-4 w-4 text-gold" />
              <span className="font-medium text-gray-900">Inquiries</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/portal/blog-manager">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900 gap-2">
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">Blog Manager</span>
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
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total", value: counts.total, icon: Inbox, color: "text-gold" },
            { label: "New", value: counts.new, icon: AlertCircle, color: "text-blue-600" },
            { label: "In Progress", value: counts.in_progress, icon: RefreshCw, color: "text-amber-500" },
            { label: "Resolved", value: counts.resolved, icon: CheckCircle2, color: "text-green-600" },
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

        {/* List */}
        <h2 className="text-lg font-semibold text-gray-900 mb-4">All Inquiries</h2>

        {isLoading ? (
          <div className="text-center py-16 text-gray-400">Loading inquiries…</div>
        ) : inquiries.length === 0 ? (
          <div className="text-center py-16 bg-white border border-gray-200 rounded-xl shadow-sm">
            <Inbox className="h-10 w-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No inquiries yet. They will appear here once the contact form is submitted.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {inquiries.map((inquiry) => {
              const cfg = STATUS_CONFIG[inquiry.status];
              const isExpanded = expandedId === inquiry._id;
              return (
                <div
                  key={inquiry._id}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-gold/30 hover:shadow-sm transition-all"
                >
                  {/* Row */}
                  <div
                    className="px-5 py-4 flex items-center justify-between gap-4 cursor-pointer"
                    onClick={() => setExpandedId(isExpanded ? null : inquiry._id)}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <span className="font-medium text-gray-900 truncate">{inquiry.fullName}</span>
                        <Badge className={cfg.className} variant="outline">{cfg.label}</Badge>
                        {inquiry.service && (
                          <span className="text-xs text-gray-500 bg-gray-50 border border-gray-200 px-2 py-0.5 rounded-full">
                            {inquiry.service}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500">
                        {inquiry.email}
                        {" · "}
                        {inquiry.phone}
                        {" · "}
                        {new Date(inquiry.createdAt).toLocaleDateString("en-AE", {
                          day: "numeric", month: "short", year: "numeric",
                          hour: "2-digit", minute: "2-digit",
                        })}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                      <Select
                        value={inquiry.status}
                        onValueChange={(val) => statusMutation.mutate({ id: inquiry._id, status: val })}
                      >
                        <SelectTrigger className="h-8 w-36 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new" className="text-xs">New</SelectItem>
                          <SelectItem value="in_progress" className="text-xs">In Progress</SelectItem>
                          <SelectItem value="resolved" className="text-xs">Resolved</SelectItem>
                        </SelectContent>
                      </Select>
                      {isExpanded
                        ? <ChevronUp className="h-4 w-4 text-gray-400 flex-shrink-0" />
                        : <ChevronDown className="h-4 w-4 text-gray-400 flex-shrink-0" />
                      }
                    </div>
                  </div>

                  {/* Expanded detail */}
                  {isExpanded && (
                    <div className="border-t border-gray-100 bg-gray-50 px-5 py-4 grid sm:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-4 w-4 text-gray-400 flex-shrink-0" />
                          <a href={`mailto:${inquiry.email}`} className="text-gold hover:underline truncate">
                            {inquiry.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-4 w-4 text-gray-400 flex-shrink-0" />
                          <a href={`tel:${inquiry.phone}`} className="text-gray-700 hover:text-gray-900">
                            {inquiry.phone}
                          </a>
                          <a
                            href={`https://wa.me/${inquiry.phone.replace(/[^0-9]/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <SiWhatsapp className="h-4 w-4 text-[#25D366]" />
                          </a>
                        </div>
                        {inquiry.company && (
                          <div className="flex items-center gap-2 text-sm">
                            <Building2 className="h-4 w-4 text-gray-400 flex-shrink-0" />
                            <span className="text-gray-700">{inquiry.company}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-gray-400 flex-shrink-0" />
                          <span className="text-gray-500">
                            {new Date(inquiry.createdAt).toLocaleString("en-AE", {
                              dateStyle: "full", timeStyle: "short",
                            })}
                          </span>
                        </div>
                      </div>
                      {inquiry.message && (
                        <div className="flex gap-2 text-sm">
                          <MessageSquare className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" />
                          <p className="text-gray-600 leading-relaxed">{inquiry.message}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
