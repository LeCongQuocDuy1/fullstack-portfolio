import { MapPin, Phone, Mail } from "lucide-react";
import type { Profile } from "@prisma/client";

export function About({ profile }: { profile: Profile }) {
  return (
    <section id="about" className="py-24 bg-gray-900/40">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-white mb-2">About Me</h2>
        <div className="w-12 h-1 bg-indigo-500 mb-12 rounded-full" />

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              {profile.bio || "Add your bio in the admin dashboard."}
            </p>
            <div className="space-y-3">
              {profile.email && (
                <div className="flex items-center gap-3 text-gray-400">
                  <Mail size={16} className="text-indigo-400" />
                  <span>{profile.email}</span>
                </div>
              )}
              {profile.phone && (
                <div className="flex items-center gap-3 text-gray-400">
                  <Phone size={16} className="text-indigo-400" />
                  <span>{profile.phone}</span>
                </div>
              )}
              {profile.location && (
                <div className="flex items-center gap-3 text-gray-400">
                  <MapPin size={16} className="text-indigo-400" />
                  <span>{profile.location}</span>
                </div>
              )}
            </div>
          </div>

          {profile.avatarUrl && (
            <div className="flex justify-center">
              <div className="relative w-64 h-64">
                <div className="absolute inset-0 bg-indigo-500 rounded-2xl rotate-3" />
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  className="relative w-full h-full object-cover rounded-2xl"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
