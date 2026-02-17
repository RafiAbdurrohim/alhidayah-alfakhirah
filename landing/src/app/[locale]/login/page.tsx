"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";

// ── Config ──────────────────────────────────────────────────
// Change this URL to your actual dashboard domain when deploying
const DASHBOARD_LOGIN_URL = process.env.NEXT_PUBLIC_DASHBOARD_URL ? `${process.env.NEXT_PUBLIC_DASHBOARD_URL}/login` : "/dashboard/login"; // fallback for same-domain deployment
// ────────────────────────────────────────────────────────────

export default function LoginPage() {
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) ?? "en";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const GATE_EMAIL = "admin@alhidayahalfakhirah.com";
  const GATE_PASSWORD = "admin123"; // ganti sesuai keinginan

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    await new Promise((r) => setTimeout(r, 600));

    if (email !== GATE_EMAIL || password !== GATE_PASSWORD) {
      setError("Invalid credentials. Access denied.");
      setLoading(false);
      return;
    }

    // Credentials benar → redirect ke dashboard login
    const dashboardUrl = process.env.NEXT_PUBLIC_DASHBOARD_URL || "http://localhost:3001";
    window.location.href = `${dashboardUrl}/login?email=${encodeURIComponent(email)}`;
  };

  return (
    <main className="min-h-screen bg-dark flex items-center justify-center relative overflow-hidden px-4">
      {/* ── Background glows ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_80%_50%,rgba(14,165,164,0.06)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_50%_at_20%_50%,rgba(201,168,76,0.06)_0%,transparent_50%)]" />
      </div>

      {/* ── Corner ornament ── */}
      <div className="absolute top-[-80px] right-[-80px] w-[400px] h-[400px] rounded-full border border-gold/6 pointer-events-none" />
      <div className="absolute bottom-[-60px] left-[-60px] w-[300px] h-[300px] rounded-full border border-teal/5 pointer-events-none" />

      {/* ── Card ── */}
      <div className="relative z-10 w-full max-w-[420px]">
        {/* Back link */}
        <Link href={`/${locale}`} className="inline-flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-muted hover:text-gold-light transition-colors mb-8 group">
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        <div className="bg-dark-3 border border-gold/15 p-10 sm:p-12">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10">
            <div className="relative w-9 h-9 border border-gold flex items-center justify-center flex-shrink-0">
              <div className="absolute inset-[5px] border border-gold/25" />
              <span className="font-arabic text-gold text-lg leading-none">ه</span>
            </div>
            <span className="font-display text-[18px] font-light tracking-wide text-cream">
              Alhidayah <em className="italic text-gold-light not-italic">Alfakhirah</em>
            </span>
          </div>

          {/* Title */}
          <h1 className="font-display text-[32px] font-light text-cream mb-2">Welcome Back</h1>
          <p className="text-[13px] text-muted mb-8">Sign in to access your account</p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-[11px] tracking-[0.12em] uppercase text-muted mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full bg-dark-4/60 border border-gold/12 text-cream text-[14px] font-light placeholder:text-muted/50 px-5 py-4 outline-none focus:border-teal/40 transition-colors duration-200"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-[11px] tracking-[0.12em] uppercase text-muted mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-dark-4/60 border border-gold/12 text-cream text-[14px] font-light placeholder:text-muted/50 px-5 py-4 pr-12 outline-none focus:border-teal/40 transition-colors duration-200"
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-cream transition-colors">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && <p className="text-[13px] text-red-400 border border-red-400/20 bg-red-400/5 px-4 py-3">{error}</p>}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal text-dark text-[11px] tracking-[0.2em] uppercase font-medium py-[18px] hover:bg-teal-light transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed mt-2 teal-glow"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Subtle security note — makes it feel "official" to casual users */}
          <div className="mt-6 pt-6 border-t border-gold/8">
            <div className="flex items-start gap-3">
              <div className="w-1 h-8 bg-gold/30 flex-shrink-0 mt-0.5" />
              <p className="text-[11px] text-muted/60 leading-[1.6]">This portal is for authorized personnel only. Unauthorized access attempts are logged and monitored.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
