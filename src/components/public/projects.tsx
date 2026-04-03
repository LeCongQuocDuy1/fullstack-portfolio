import { GitFork, ExternalLink, ArrowRight, Star } from "lucide-react";
import Link from "next/link";
import type { Project } from "@prisma/client";

export function ProjectsSection({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/10 to-transparent" />

      <div className="relative max-w-6xl mx-auto px-6">
        <p className="text-cyan-400 font-mono text-sm mb-2 tracking-widest uppercase">05. Projects</p>
        <h2 className="text-4xl font-bold text-white mb-3">Projects</h2>
        <div className="section-line" />

        {projects.length === 0 ? (
          <p className="text-slate-500">No projects yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group flex flex-col glass rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_30px_80px_rgba(124,58,237,0.2)] hover:border-violet-500/30"
              >
                {/* Image */}
                {project.imageUrl ? (
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] via-transparent to-transparent" />
                  </div>
                ) : (
                  <div className="h-32 bg-gradient-to-br from-violet-900/30 to-cyan-900/20 flex items-center justify-center">
                    <div className="text-4xl font-black gradient-text opacity-30">{project.title[0]}</div>
                  </div>
                )}

                <div className="flex flex-col flex-1 p-6">
                  {/* Badges */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs text-violet-300 bg-violet-500/10 border border-violet-500/20 px-2.5 py-1 rounded-full">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="flex items-center gap-1 text-xs text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full">
                        <Star size={10} fill="currentColor" /> Featured
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:gradient-text transition-all">{project.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed flex-1 mb-4">
                    {project.summary || project.content.slice(0, 120) + "…"}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <span key={tech} className="text-xs text-slate-500 bg-white/5 px-2 py-0.5 rounded">
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="text-xs text-slate-600 px-2 py-0.5">+{project.techStack.length - 4}</span>
                    )}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noreferrer"
                        className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors">
                        <GitFork size={13} /> Code
                      </a>
                    )}
                    {project.demoUrl && (
                      <a href={project.demoUrl} target="_blank" rel="noreferrer"
                        className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 transition-colors">
                        <ExternalLink size={13} /> Demo
                      </a>
                    )}
                    <Link
                      href={`/projects/${project.slug}`}
                      className="flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300 ml-auto transition-colors font-medium"
                    >
                      Details <ArrowRight size={12} />
                    </Link>
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
