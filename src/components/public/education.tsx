import { GraduationCap } from "lucide-react";
import type { Education } from "@prisma/client";

export function EducationSection({ education }: { education: Education[] }) {
  return (
    <section id="education" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/10 to-transparent" />

      <div className="relative max-w-6xl mx-auto px-6">
        <p className="text-cyan-400 font-mono text-sm mb-2 tracking-widest uppercase">03. Education</p>
        <h2 className="text-4xl font-bold text-white mb-3">Education</h2>
        <div className="section-line" />

        {education.length === 0 ? (
          <p className="text-slate-500">No education entries yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {education.map((edu) => (
              <div
                key={edu.id}
                className="glass glass-hover rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(6,182,212,0.1)] group"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 group-hover:bg-cyan-500/20 transition-colors shrink-0">
                    <GraduationCap size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="text-lg font-bold text-white leading-tight">{edu.school}</h3>
                      <span className="text-xs text-slate-500 font-mono whitespace-nowrap px-2 py-1 rounded-lg bg-white/5">
                        {edu.startDate.getUTCFullYear()} – {edu.endDate ? edu.endDate.getUTCFullYear() : "Present"}
                      </span>
                    </div>
                    <p className="gradient-text font-semibold text-sm mb-1">{edu.degree}</p>
                    <p className="text-slate-500 text-sm mb-3">{edu.field}</p>
                    {edu.description && (
                      <p className="text-slate-400 text-sm leading-relaxed">{edu.description}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
