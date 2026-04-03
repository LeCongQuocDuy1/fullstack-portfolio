import { Mail, GitFork, Link, Share2, Globe, Phone } from "lucide-react";
import type { Profile } from "@prisma/client";

export function Contact({ profile }: { profile: Profile }) {
  return (
    <section id="contact" className="py-24">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Get In Touch</h2>
        <div className="w-12 h-1 bg-indigo-500 mb-6 rounded-full mx-auto" />
        <p className="text-gray-400 max-w-lg mx-auto mb-12">
          I'm currently open to new opportunities. Whether you have a question or just want to say hi, feel free to reach out!
        </p>

        <a href={`mailto:${profile.email}`}
          className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium text-lg transition-colors mb-12">
          <Mail size={20} /> Say Hello
        </a>

        <div className="flex justify-center items-center gap-6">
          {profile.github && (
            <a href={profile.github} target="_blank" rel="noreferrer"
              className="flex flex-col items-center gap-2 text-gray-500 hover:text-white transition-colors group">
              <GitFork size={24} />
              <span className="text-xs">GitHub</span>
            </a>
          )}
          {profile.linkedin && (
            <a href={profile.linkedin} target="_blank" rel="noreferrer"
              className="flex flex-col items-center gap-2 text-gray-500 hover:text-white transition-colors">
              <Link size={24} />
              <span className="text-xs">LinkedIn</span>
            </a>
          )}
          {profile.twitter && (
            <a href={profile.twitter} target="_blank" rel="noreferrer"
              className="flex flex-col items-center gap-2 text-gray-500 hover:text-white transition-colors">
              <Share2 size={24} />
              <span className="text-xs">Twitter</span>
            </a>
          )}
          {profile.website && (
            <a href={profile.website} target="_blank" rel="noreferrer"
              className="flex flex-col items-center gap-2 text-gray-500 hover:text-white transition-colors">
              <Globe size={24} />
              <span className="text-xs">Website</span>
            </a>
          )}
          {profile.phone && (
            <a href={`tel:${profile.phone}`}
              className="flex flex-col items-center gap-2 text-gray-500 hover:text-white transition-colors">
              <Phone size={24} />
              <span className="text-xs">Phone</span>
            </a>
          )}
        </div>

        <p className="text-gray-700 text-sm mt-16">
          Built with Next.js · Designed & developed by {profile.name}
        </p>
      </div>
    </section>
  );
}
