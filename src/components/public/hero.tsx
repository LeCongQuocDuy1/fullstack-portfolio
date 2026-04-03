import { GitFork, Link, Share2, Globe, Mail, Download } from "lucide-react";
import type { Profile } from "@prisma/client";

export function Hero({ profile }: { profile: Profile }) {
  return (
    <section id="hero" className="min-h-screen flex items-center pt-16">
      <div className="max-w-6xl mx-auto px-6 py-24">
        <p className="text-indigo-400 font-mono text-sm mb-4">Hi, my name is</p>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
          {profile.name || "Your Name"}
        </h1>
        <h2 className="text-3xl md:text-5xl font-bold text-gray-400 mb-6">
          {profile.tagline || "Fullstack Developer"}
        </h2>
        <p className="max-w-xl text-gray-400 text-lg leading-relaxed mb-10">
          {profile.bio || "Add your bio in the admin dashboard."}
        </p>

        <div className="flex flex-wrap items-center gap-4">
          {profile.resumeUrl && (
            <a href={profile.resumeUrl} target="_blank" rel="noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors">
              <Download size={16} /> Download CV
            </a>
          )}
          <a href="#contact"
            className="flex items-center gap-2 px-6 py-3 border border-indigo-500 text-indigo-400 hover:bg-indigo-500/10 rounded-lg font-medium transition-colors">
            <Mail size={16} /> Contact Me
          </a>
        </div>

        <div className="flex items-center gap-5 mt-10">
          {profile.github && (
            <a href={profile.github} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-colors">
              <GitFork size={22} />
            </a>
          )}
          {profile.linkedin && (
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-colors">
              <Link size={22} />
            </a>
          )}
          {profile.twitter && (
            <a href={profile.twitter} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-colors">
              <Share2 size={22} />
            </a>
          )}
          {profile.website && (
            <a href={profile.website} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-colors">
              <Globe size={22} />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
