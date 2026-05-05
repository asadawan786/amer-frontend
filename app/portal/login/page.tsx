"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, User, Shield } from "lucide-react";
import { apiRequest } from "@/lib/api";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("portal-token")) {
      router.replace("/portal/blog-manager");
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await apiRequest("POST", "/api/blog-portal/login", { username, password });
      const data = await response.json();
      if (data.success && data.token) {
        localStorage.setItem("portal-token", data.token);
        const maxAge = 8 * 60 * 60;
        document.cookie = `portal_auth=1; path=/; SameSite=Strict; Max-Age=${maxAge}`;
        const redirect = searchParams.get("from") || "/portal/blog-manager";
        router.push(redirect);
      } else {
        setError(data.message || "Invalid username or password");
      }
    } catch {
      setError("Login failed. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Card */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
          {/* Logo + badge */}
          <div className="flex flex-col items-center mb-8">
            <Image
              src="/logo-header.jpeg"
              alt="Amer Center Dubai"
              width={160}
              height={45}
              className="h-12 w-auto object-contain mb-5"
            />
            <div className="flex items-center gap-1.5 px-3 py-1 bg-gold/10 border border-gold/20 rounded-full text-xs text-gold-dark mb-4">
              <Shield className="h-3 w-3 text-gold" />
              Secure Admin Portal
            </div>
            <h1 className="text-2xl font-semibold text-gray-900">Sign in</h1>
            <p className="text-sm text-gray-500 mt-1">Amer Center Admin Panel</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm text-center">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-700 text-sm font-medium">Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Admin username"
                  className="pl-10 focus:border-gold/50 focus:ring-gold/20"
                  required
                  autoComplete="username"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 text-sm font-medium">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10 focus:border-gold/50 focus:ring-gold/20"
                  required
                  autoComplete="current-password"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full btn-gold rounded-md mt-2"
            >
              {loading ? "Signing in…" : "Sign in"}
            </Button>
          </form>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          &copy; {new Date().getFullYear()} Amer Center Dubai. Restricted access.
        </p>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
      <LoginForm />
    </Suspense>
  );
}
