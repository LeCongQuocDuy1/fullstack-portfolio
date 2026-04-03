import type { Skill } from "@prisma/client";

const categoryConfig: Record<string, { label: string; color: string; bar: string; glow: string }> = {
  FRONTEND: { label: "Frontend", color: "text-blue-400 bg-blue-400/10 border-blue-400/20", bar: "from-blue-500 to-cyan-400", glow: "shadow-[0_0_12px_rgba(59,130,246,0.4)]" },
  BACKEND:  { label: "Backend",  color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20", bar: "from-emerald-500 to-teal-400", glow: "shadow-[0_0_12px_rgba(16,185,129,0.4)]" },
  DATABASE: { label: "Database", color: "text-amber-400 bg-amber-400/10 border-amber-400/20", bar: "from-amber-500 to-yellow-400", glow: "shadow-[0_0_12px_rgba(245,158,11,0.4)]" },
  DEVOPS:   { label: "DevOps",   color: "text-orange-400 bg-orange-400/10 border-orange-400/20", bar: "from-orange-500 to-red-400", glow: "shadow-[0_0_12px_rgba(249,115,22,0.4)]" },
  OTHER:    { label: "Other",    color: "text-violet-400 bg-violet-400/10 border-violet-400/20", bar: "from-violet-500 to-purple-400", glow: "shadow-[0_0_12px_rgba(124,58,237,0.4)]" },
};

export function SkillsSection({ skills }: { skills: Skill[] }) {
  const grouped = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <section id="skills" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/5 to-transparent" />

      <div className="relative max-w-6xl mx-auto px-6">
        <p className="text-violet-400 font-mono text-sm mb-2 tracking-widest uppercase">04. Skills</p>
        <h2 className="text-4xl font-bold text-white mb-3">Skills</h2>
        <div className="section-line" />

        {skills.length === 0 ? (
          <p className="text-slate-500">No skills yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(grouped).map(([category, items]) => {
              const cfg = categoryConfig[category] ?? categoryConfig.OTHER;
              return (
                <div key={category} className="glass rounded-2xl p-6">
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold uppercase tracking-wider mb-6 ${cfg.color}`}>
                    {cfg.label}
                  </div>
                  <div className="space-y-5">
                    {items.map((skill) => (
                      <div key={skill.id}>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium text-slate-200">{skill.name}</span>
                          <span className="text-xs text-slate-500 font-mono">{skill.level}%</span>
                        </div>
                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full bg-gradient-to-r ${cfg.bar} ${cfg.glow} transition-all duration-1000`}
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
