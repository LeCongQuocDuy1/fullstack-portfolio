"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Mail, Lock, LogIn, Eye, EyeOff } from "lucide-react";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const result = await signIn("credentials", {
      email: form.get("email"),
      password: form.get("password"),
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password.");
    } else {
      router.push("/admin/dashboard");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-slate-400 mb-2">Email</label>
        <div className="relative">
          <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            name="email"
            type="email"
            required
            placeholder="admin@portfolio.com"
            className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white placeholder-slate-600 border border-white/8 focus:outline-none focus:border-violet-500/60 focus:shadow-[0_0_0_3px_rgba(124,58,237,0.15)] transition-all"
            style={{ background: "rgba(255,255,255,0.04)" }}
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium text-slate-400 mb-2">Password</label>
        <div className="relative">
          <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            name="password"
            type={showPass ? "text" : "password"}
            required
            placeholder="••••••••"
            className="w-full pl-10 pr-12 py-3 rounded-xl text-sm text-white placeholder-slate-600 border border-white/8 focus:outline-none focus:border-violet-500/60 focus:shadow-[0_0_0_3px_rgba(124,58,237,0.15)] transition-all"
            style={{ background: "rgba(255,255,255,0.04)" }}
          />
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
          >
            {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-white transition-all duration-300 disabled:opacity-50 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(124,58,237,0.4)] glow-violet"
        style={{ background: "linear-gradient(135deg, #7c3aed, #5b21b6)" }}
      >
        <LogIn size={16} />
        {loading ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
