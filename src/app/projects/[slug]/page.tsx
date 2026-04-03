import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ExternalLink, GitFork, ArrowLeft, Calendar, Tag } from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await prisma.project.findUnique({ where: { slug, published: true } });
  if (!project) return { title: "Project Not Found" };
  return { title: project.title, description: project.summary };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await prisma.project.findUnique({ where: { slug, published: true } });
  if (!project) notFound();

  return (
    <div className="min-h-screen text-white relative overflow-hidden" style={{ background: "#05050f" }}>
      {/* Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-violet-600/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-3xl mx-auto px-6 py-20">
        {/* Back */}
        <Link href="/#projects"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-white text-sm mb-12 transition-all group">
          <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 text-xs text-violet-300 bg-violet-500/10 border border-violet-500/20 px-3 py-1 rounded-full">
              <Tag size={11} /> {project.category}
            </span>
            {project.featured && (
              <span className="text-xs text-amber-300 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
                ★ Featured
              </span>
            )}
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">{project.title}</h1>
          {project.summary && (
            <p className="text-slate-400 text-lg leading-relaxed">{project.summary}</p>
          )}
        </div>

        {/* Image */}
        {project.imageUrl && (
          <div className="rounded-2xl overflow-hidden mb-8 border border-white/8 shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
            <img src={project.imageUrl} alt={project.title} className="w-full object-cover" />
          </div>
        )}

        {/* Links */}
        <div className="flex flex-wrap gap-3 mb-8">
          {project.demoUrl && (
            <a href={project.demoUrl} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white glow-violet hover:scale-105 transition-all duration-300"
              style={{ background: "linear-gradient(135deg, #7c3aed, #06b6d4)" }}>
              <ExternalLink size={15} /> Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-slate-300 border border-white/10 hover:border-violet-500/40 hover:text-white hover:bg-violet-500/10 transition-all duration-300">
              <GitFork size={15} /> Source Code
            </a>
          )}
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mb-10">
          {project.techStack.map((tech) => (
            <span key={tech} className="text-sm text-slate-400 bg-white/5 border border-white/8 px-3 py-1.5 rounded-lg">
              {tech}
            </span>
          ))}
        </div>

        {/* Content */}
        <div className="glass rounded-2xl p-8">
          <div className="prose prose-invert prose-lg max-w-none text-slate-300 leading-relaxed whitespace-pre-wrap">
            {project.content}
          </div>
        </div>
      </div>
    </div>
  );
}
