import { GitFork, ExternalLink, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Project } from "@prisma/client";

export function ProjectsSection({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="py-24 bg-gray-900/40">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-white mb-2">Projects</h2>
        <div className="w-12 h-1 bg-indigo-500 mb-12 rounded-full" />

        {projects.length === 0 ? (
          <p className="text-gray-500">No projects yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project.id} className="group flex flex-col bg-gray-900 rounded-2xl border border-gray-800 hover:border-indigo-500/50 overflow-hidden transition-colors">
                {project.imageUrl && (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="flex flex-col flex-1 p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-indigo-400 bg-indigo-400/10 px-2 py-1 rounded-full">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="text-xs text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded-full">
                        Featured
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed flex-1 mb-4">
                    {project.summary || project.content.slice(0, 120) + "..."}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 pt-2 border-t border-gray-800">
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noreferrer"
                        className="flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors">
                        <GitFork size={15} /> Code
                      </a>
                    )}
                    {project.demoUrl && (
                      <a href={project.demoUrl} target="_blank" rel="noreferrer"
                        className="flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors">
                        <ExternalLink size={15} /> Demo
                      </a>
                    )}
                    <Link href={`/projects/${project.slug}`}
                      className="flex items-center gap-1 text-sm text-indigo-400 hover:text-indigo-300 ml-auto transition-colors">
                      Details <ArrowRight size={13} />
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
