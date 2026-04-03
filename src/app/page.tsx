import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/public/navbar";
import { Hero } from "@/components/public/hero";
import { About } from "@/components/public/about";
import { ExperienceSection } from "@/components/public/experience";
import { EducationSection } from "@/components/public/education";
import { SkillsSection } from "@/components/public/skills";
import { ProjectsSection } from "@/components/public/projects";
import { Contact } from "@/components/public/contact";
import type { Metadata } from "next";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const profile = await prisma.profile.findUnique({ where: { id: 1 } });
  const name = profile?.name || "Portfolio";
  const tagline = profile?.tagline || "Fullstack Developer";
  const bio = profile?.bio || "";

  return {
    title: { default: `${name} — ${tagline}`, template: `%s | ${name}` },
    description: bio.slice(0, 160),
    openGraph: {
      title: `${name} — ${tagline}`,
      description: bio.slice(0, 160),
      type: "website",
      images: profile?.avatarUrl ? [profile.avatarUrl] : [],
    },
  };
}

export default async function HomePage() {
  const [profile, experiences, education, skills, projects] = await Promise.all([
    prisma.profile.findUnique({ where: { id: 1 } }),
    prisma.experience.findMany({ orderBy: { order: "asc" } }),
    prisma.education.findMany({ orderBy: { order: "asc" } }),
    prisma.skill.findMany({ orderBy: [{ category: "asc" }, { order: "asc" }] }),
    prisma.project.findMany({
      where: { published: true },
      orderBy: [{ featured: "desc" }, { order: "asc" }],
    }),
  ]);

  const safeProfile = profile ?? {
    id: 1,
    name: "",
    tagline: "",
    bio: "",
    email: "",
    phone: null,
    location: null,
    github: null,
    linkedin: null,
    twitter: null,
    website: null,
    avatarUrl: null,
    resumeUrl: null,
    updatedAt: new Date(0),
  };

  return (
    <div className="bg-gray-950 text-white min-h-screen">
      <Navbar name={safeProfile.name || "Portfolio"} />
      <Hero profile={safeProfile} />
      <About profile={safeProfile} />
      <ExperienceSection experiences={experiences} />
      <EducationSection education={education} />
      <SkillsSection skills={skills} />
      <ProjectsSection projects={projects} />
      <Contact profile={safeProfile} />
    </div>
  );
}
