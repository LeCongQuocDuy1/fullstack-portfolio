import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ExternalLink, GitFork, ArrowLeft } from "lucide-react";
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
    <div className="bg-gray-950 min-h-screen text-white">
      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Back */}
        <Link href="/#projects" className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-10 transition-colors">
          <ArrowLeft size={16} /> Back to Projects
        </Link>

        {/* Header */}
        <div className="mb-8">
          <span className="text-xs text-indigo-400 bg-indigo-400/10 px-3 py-1 rounded-full">{project.category}</span>
          <h1 className="text-4xl font-bold mt-4 mb-3">{project.title}</h1>
          {project.summary && <p className="text-gray-400 text-lg leading-relaxed">{project.summary}</p>}
        </div>

        {/* Image */}
        {project.imageUrl && (
          <div className="rounded-2xl overflow-hidden mb-8 border border-gray-800">
            <img src={project.imageUrl} alt={project.title} className="w-full object-cover" />
          </div>
        )}

        {/* Links */}
        <div className="flex gap-4 mb-8">
          {project.demoUrl && (
            <a href={project.demoUrl} target="_blank" rel="noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-sm font-medium transition-colors">
              <ExternalLink size={15} /> Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 border border-gray-700 hover:border-gray-500 rounded-lg text-sm font-medium transition-colors">
              <GitFork size={15} /> Source Code
            </a>
          )}
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mb-10">
          {project.techStack.map((tech) => (
            <span key={tech} className="text-sm text-gray-400 bg-gray-800 px-3 py-1 rounded-lg">{tech}</span>
          ))}
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed whitespace-pre-wrap border-t border-gray-800 pt-8">
          {project.content}
        </div>
      </div>
    </div>
  );
}
