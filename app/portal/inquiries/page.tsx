"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  LogOut, Globe, Inbox, ChevronRight, Phone, Mail, Building2,
  MessageSquare, Clock, CheckCircle2, AlertCircle, RefreshCw,
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
  new: { label: "New", color: "bg-blue-500/10 text-blue-400 border-blue-500/20", icon: AlertCircle },
  in_progress: { label: "In Progress", color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20", icon: RefreshCw },
  resolved: { label: "Resolved", color: "bg-green-500/10 text-green-400 border-green-500/20", icon: CheckCircle2 },
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/inquiries"] });
    },
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
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <header className="border-b border-white/10 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Inbox className="h-5 w-5 text-[#C9A962]" />
            <span className="font-semibold text-white">Inquiries</span>
            <ChevronRight className="h-3 w-3 text-gray-600" />
            <span className="text-sm text-gray-400">Contact Form Submissions</span>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/portal/blog-manager">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white gap-2">
                <span className="hidden sm:inline">Blog Manager</span>
              </Button>
            </Link>
            <Link href="/" target="_blank">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white gap-2">
                <Globe className="h-4 w-4" />
                <span className="hidden sm:inline">View Site</span>
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-gray-400 hover:text-red-400 gap-2"
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
            { label: "Total", value: counts.total, icon: Inbox, color: "text-[#C9A962]" },
            { label: "New", value: counts.new, icon: AlertCircle, color: "text-blue-400" },
            { label: "In Progress", value: counts.in_progress, icon: RefreshCw, color: "text-yellow-400" },
            { label: "Resolved", value: counts.resolved, icon: CheckCircle2, color: "text-green-400" },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <Icon className={`h-4 w-4 ${color}`} />
                <span className="text-xs text-gray-500 uppercase tracking-wider">{label}</span>
              </div>
              <p className="text-2xl font-semibold text-white">{value}</p>
            </div>
          ))}
        </div>

        {/* List */}
        <h2 className="text-lg font-medium text-white mb-4">All Inquiries</h2>

        {isLoading ? (
          <div className="text-center py-16 text-gray-600">Loading inquiries…</div>
        ) : inquiries.length === 0 ? (
          <div className="text-center py-16 bg-white/5 border border-white/10 rounded-xl">
            <Inbox className="h-10 w-10 text-gray-700 mx-auto mb-3" />
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
                  className="bg-white/5 border border-white/10 rounded-xl overflow-hidden"
                >
                  {/* Row */}
                  <div
                    className="px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/[0.07] transition-colors cursor-pointer"
                    onClick={() => setExpandedId(isExpanded ? null : inquiry._id)}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <span className="font-medium text-white truncate">{inquiry.fullName}</span>
                        <Badge className={cfg.color} variant="outline">{cfg.label}</Badge>
                        {inquiry.service && (
                          <span className="text-xs text-gray-500 bg-white/5 px-2 py-0.5 rounded-full">
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
                          day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
                        })}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                      <Select
                        value={inquiry.status}
                        onValueChange={(val) => statusMutation.mutate({ id: inquiry._id, status: val })}
                      >
                        <SelectTrigger className="bg-white/5 border-white/10 text-white h-8 w-36 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-white/10">
                          <SelectItem value="new" className="text-blue-400 focus:bg-white/10 text-xs">New</SelectItem>
                          <SelectItem value="in_progress" className="text-yellow-400 focus:bg-white/10 text-xs">In Progress</SelectItem>
                          <SelectItem value="resolved" className="text-green-400 focus:bg-white/10 text-xs">Resolved</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Expanded detail */}
                  {isExpanded && (
                    <div className="border-t border-white/10 px-5 py-4 grid sm:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-4 w-4 text-gray-500 flex-shrink-0" />
                          <a href={`mailto:${inquiry.email}`} className="text-[#C9A962] hover:underline truncate">
                            {inquiry.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-4 w-4 text-gray-500 flex-shrink-0" />
                          <a href={`tel:${inquiry.phone}`} className="text-gray-300 hover:text-white">
                            {inquiry.phone}
                          </a>
                          <a
                            href={`https://wa.me/${inquiry.phone.replace(/[^0-9]/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-1"
                          >
                            <SiWhatsapp className="h-4 w-4 text-[#25D366]" />
                          </a>
                        </div>
                        {inquiry.company && (
                          <div className="flex items-center gap-2 text-sm">
                            <Building2 className="h-4 w-4 text-gray-500 flex-shrink-0" />
                            <span className="text-gray-300">{inquiry.company}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-gray-500 flex-shrink-0" />
                          <span className="text-gray-500">
                            {new Date(inquiry.createdAt).toLocaleString("en-AE", {
                              dateStyle: "full", timeStyle: "short",
                            })}
                          </span>
                        </div>
                      </div>
                      {inquiry.message && (
                        <div className="flex gap-2 text-sm">
                          <MessageSquare className="h-4 w-4 text-gray-500 flex-shrink-0 mt-0.5" />
                          <p className="text-gray-400 leading-relaxed">{inquiry.message}</p>
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
