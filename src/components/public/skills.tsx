import type { Skill } from "@prisma/client";

const categoryLabels: Record<string, string> = {
  FRONTEND: "Frontend",
  BACKEND: "Backend",
  DATABASE: "Database",
  DEVOPS: "DevOps",
  OTHER: "Other",
};

const categoryColors: Record<string, string> = {
  FRONTEND: "text-blue-400",
  BACKEND: "text-green-400",
  DATABASE: "text-yellow-400",
  DEVOPS: "text-orange-400",
  OTHER: "text-gray-400",
};

const barColors: Record<string, string> = {
  FRONTEND: "bg-blue-500",
  BACKEND: "bg-green-500",
  DATABASE: "bg-yellow-500",
  DEVOPS: "bg-orange-500",
  OTHER: "bg-gray-500",
};

export function SkillsSection({ skills }: { skills: Skill[] }) {
  const grouped = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    const cat = skill.category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {});

  return (
    <section id="skills" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-white mb-2">Skills</h2>
        <div className="w-12 h-1 bg-indigo-500 mb-12 rounded-full" />

        {skills.length === 0 ? (
          <p className="text-gray-500">No skills yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(grouped).map(([category, items]) => (
              <div key={category}>
                <h3 className={`text-sm font-semibold uppercase tracking-widest mb-4 ${categoryColors[category]}`}>
                  {categoryLabels[category]}
                </h3>
                <div className="space-y-4">
                  {items.map((skill) => (
                    <div key={skill.id}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-300">{skill.name}</span>
                        <span className="text-xs text-gray-500">{skill.level}%</span>
                      </div>
                      <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${barColors[skill.category]}`}
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
