import { GitFork, Link, Share2, Globe, Mail, Download, ArrowDown } from "lucide-react";
import type { Profile } from "@prisma/client";

export function Hero({ profile }: { profile: Profile }) {
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(124,58,237,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.8) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 py-32 w-full">
        <div className="max-w-3xl">
          {/* Tag line */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm font-mono mb-8">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            Available for opportunities
          </div>

          {/* Name */}
          <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-none mb-4">
            <span className="text-white">{profile.name?.split(" ")[0] || "Your"}</span>
            <br />
            <span className="gradient-text">{profile.name?.split(" ").slice(1).join(" ") || "Name"}</span>
          </h1>

          {/* Tagline */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-gradient-to-r from-violet-500 to-cyan-500" />
            <h2 className="text-xl md:text-2xl text-slate-300 font-medium">
              {profile.tagline || "Fullstack Developer"}
            </h2>
          </div>

          {/* Bio */}
          <p className="text-slate-400 text-lg leading-relaxed mb-10 max-w-xl">
            {profile.bio || "Add your bio in the admin dashboard."}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-12">
            {profile.resumeUrl && (
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white glow-violet transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(124,58,237,0.5)]"
                style={{ background: "linear-gradient(135deg, #7c3aed, #5b21b6)" }}
              >
                <Download size={16} /> Download CV
              </a>
            )}
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-slate-300 border border-white/10 hover:border-violet-500/50 hover:text-white hover:bg-violet-500/10 transition-all duration-300"
            >
              <Mail size={16} /> Contact Me
            </a>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-5">
            {profile.github && (
              <a href={profile.github} target="_blank" rel="noreferrer"
                className="p-2.5 rounded-xl border border-white/5 text-slate-400 hover:text-white hover:border-violet-500/40 hover:bg-violet-500/10 transition-all duration-200">
                <GitFork size={18} />
              </a>
            )}
            {profile.linkedin && (
              <a href={profile.linkedin} target="_blank" rel="noreferrer"
                className="p-2.5 rounded-xl border border-white/5 text-slate-400 hover:text-white hover:border-cyan-500/40 hover:bg-cyan-500/10 transition-all duration-200">
                <Link size={18} />
              </a>
            )}
            {profile.twitter && (
              <a href={profile.twitter} target="_blank" rel="noreferrer"
                className="p-2.5 rounded-xl border border-white/5 text-slate-400 hover:text-white hover:border-violet-500/40 hover:bg-violet-500/10 transition-all duration-200">
                <Share2 size={18} />
              </a>
            )}
            {profile.website && (
              <a href={profile.website} target="_blank" rel="noreferrer"
                className="p-2.5 rounded-xl border border-white/5 text-slate-400 hover:text-white hover:border-cyan-500/40 hover:bg-cyan-500/10 transition-all duration-200">
                <Globe size={18} />
              </a>
            )}
          </div>
        </div>

        {/* Scroll indicator */}
        <a href="#about" className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600 hover:text-slate-400 transition-colors">
          <span className="text-xs tracking-widest uppercase font-mono">Scroll</span>
          <ArrowDown size={16} className="animate-bounce" />
        </a>
      </div>
    </section>
  );
}
