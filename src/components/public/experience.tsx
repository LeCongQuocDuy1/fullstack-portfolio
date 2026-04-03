import { MapPin } from "lucide-react";
import type { Experience } from "@prisma/client";

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
function formatDate(date: Date) {
  return `${MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}

export function ExperienceSection({ experiences }: { experiences: Experience[] }) {
  return (
    <section id="experience" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-white mb-2">Work Experience</h2>
        <div className="w-12 h-1 bg-indigo-500 mb-12 rounded-full" />

        {experiences.length === 0 ? (
          <p className="text-gray-500">No experience entries yet.</p>
        ) : (
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gray-800 -translate-x-1/2 hidden md:block" />

            <div className="space-y-12">
              {experiences.map((exp, i) => (
                <div key={exp.id} className={`relative md:flex md:gap-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  {/* Dot */}
                  <div className="hidden md:block absolute left-1/2 top-6 w-3 h-3 bg-indigo-500 rounded-full -translate-x-1/2 ring-4 ring-gray-950" />

                  <div className="md:w-1/2 md:px-8">
                    <div className="p-6 bg-gray-900 rounded-2xl border border-gray-800 hover:border-indigo-500/50 transition-colors">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-white">{exp.position}</h3>
                          <p className="text-indigo-400 font-medium">{exp.company}</p>
                        </div>
                        <span className="text-xs text-gray-500 whitespace-nowrap bg-gray-800 px-3 py-1 rounded-full">
                          {formatDate(exp.startDate)} – {exp.endDate ? formatDate(exp.endDate) : "Present"}

                        </span>
                      </div>
                      {exp.location && (
                        <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
                          <MapPin size={13} /> {exp.location}
                        </div>
                      )}
                      <p className="text-gray-400 text-sm leading-relaxed">{exp.description}</p>
                    </div>
                  </div>

                  <div className="md:w-1/2" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
