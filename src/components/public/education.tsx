import type { Education } from "@prisma/client";

function formatDate(date: Date) {
  return date.toISOString().slice(0, 7); // "YYYY-MM" — always consistent
}

export function EducationSection({ education }: { education: Education[] }) {
  return (
    <section id="education" className="py-24 bg-gray-900/40">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-white mb-2">Education</h2>
        <div className="w-12 h-1 bg-indigo-500 mb-12 rounded-full" />

        {education.length === 0 ? (
          <p className="text-gray-500">No education entries yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {education.map((edu) => (
              <div key={edu.id} className="p-6 bg-gray-900 rounded-2xl border border-gray-800 hover:border-indigo-500/50 transition-colors">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="text-lg font-semibold text-white">{edu.school}</h3>
                  <span className="text-xs text-gray-500 whitespace-nowrap bg-gray-800 px-3 py-1 rounded-full">
                    {edu.startDate.getUTCFullYear()} – {edu.endDate ? edu.endDate.getUTCFullYear() : "Present"}
                  </span>
                </div>
                <p className="text-indigo-400 font-medium mb-1">{edu.degree}</p>
                <p className="text-gray-500 text-sm mb-3">{edu.field}</p>
                {edu.description && (
                  <p className="text-gray-400 text-sm leading-relaxed">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
