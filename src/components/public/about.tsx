import { MapPin, Phone, Mail } from "lucide-react";
import type { Profile } from "@prisma/client";

export function About({ profile }: { profile: Profile }) {
  return (
    <section id="about" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-violet-950/10 to-transparent" />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Heading */}
        <p className="text-violet-400 font-mono text-sm mb-2 tracking-widest uppercase">01. About</p>
        <h2 className="text-4xl font-bold text-white mb-3">About Me</h2>
        <div className="section-line" />

        <div className="grid md:grid-cols-5 gap-16 items-start">
          {/* Text */}
          <div className="md:col-span-3 space-y-6">
            <p className="text-slate-300 text-lg leading-relaxed">
              {profile.bio || "Add your bio in the admin dashboard."}
            </p>

            {/* Contact info */}
            <div className="space-y-3 pt-4">
              {profile.email && (
                <div className="flex items-center gap-3 text-slate-400 group">
                  <div className="p-2 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-400 group-hover:bg-violet-500/20 transition-colors">
                    <Mail size={14} />
                  </div>
                  <span className="text-sm">{profile.email}</span>
                </div>
              )}
              {profile.phone && (
                <div className="flex items-center gap-3 text-slate-400 group">
                  <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 group-hover:bg-cyan-500/20 transition-colors">
                    <Phone size={14} />
                  </div>
                  <span className="text-sm">{profile.phone}</span>
                </div>
              )}
              {profile.location && (
                <div className="flex items-center gap-3 text-slate-400 group">
                  <div className="p-2 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-400 group-hover:bg-violet-500/20 transition-colors">
                    <MapPin size={14} />
                  </div>
                  <span className="text-sm">{profile.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Avatar */}
          {profile.avatarUrl && (
            <div className="md:col-span-2 flex justify-center">
              <div className="relative float">
                {/* Glow ring */}
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-violet-600/20 to-cyan-600/20 blur-xl" />
                {/* Gradient border */}
                <div className="gradient-border p-1">
                  <img
                    src={profile.avatarUrl}
                    alt={profile.name}
                    className="w-56 h-56 md:w-64 md:h-64 object-cover rounded-2xl"
                  />
                </div>
                {/* Corner accent */}
                <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-gradient-to-br from-violet-500 to-cyan-500 rounded-xl opacity-60 blur-sm" />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
