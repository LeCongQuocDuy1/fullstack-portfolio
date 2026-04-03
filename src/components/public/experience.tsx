import { MapPin, Calendar } from "lucide-react";
import type { Experience } from "@prisma/client";

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
function formatDate(date: Date) {
  return `${MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}

export function ExperienceSection({ experiences }: { experiences: Experience[] }) {
  return (
    <section id="experience" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/5 to-transparent" />

      <div className="relative max-w-6xl mx-auto px-6">
        <p className="text-violet-400 font-mono text-sm mb-2 tracking-widest uppercase">02. Experience</p>
        <h2 className="text-4xl font-bold text-white mb-3">Work Experience</h2>
        <div className="section-line" />

        {experiences.length === 0 ? (
          <p className="text-slate-500">No experience entries yet.</p>
        ) : (
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/50 via-cyan-500/30 to-transparent hidden sm:block" style={{ transform: "translateX(-50%)" }} />

            <div className="space-y-10">
              {experiences.map((exp, i) => (
                <div key={exp.id} className={`relative sm:flex sm:gap-8 ${i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"}`}>
                  {/* Timeline dot */}
                  <div className="hidden sm:flex absolute left-1/2 top-8 -translate-x-1/2 z-10">
                    <div className="w-4 h-4 bg-gradient-to-br from-violet-500 to-cyan-500 rounded-full ring-4 ring-[#05050f]" />
                    <div className="absolute inset-0 w-4 h-4 bg-gradient-to-br from-violet-500 to-cyan-500 rounded-full pulse-ring" />
                  </div>

                  <div className="sm:w-1/2 sm:px-10">
                    <div className="glass glass-hover rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(124,58,237,0.15)]">
                      {/* Date badge */}
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-mono mb-4">
                        <Calendar size={11} />
                        {formatDate(exp.startDate)} – {exp.endDate ? formatDate(exp.endDate) : "Present"}
                      </div>

                      <h3 className="text-lg font-bold text-white mb-1">{exp.position}</h3>
                      <p className="gradient-text font-semibold text-sm mb-3">{exp.company}</p>

                      {exp.location && (
                        <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-3">
                          <MapPin size={12} /> {exp.location}
                        </div>
                      )}

                      <p className="text-slate-400 text-sm leading-relaxed">{exp.description}</p>
                    </div>
                  </div>

                  <div className="sm:w-1/2" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
