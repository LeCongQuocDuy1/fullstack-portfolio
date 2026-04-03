import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { Briefcase, GraduationCap, Zap, FolderKanban, User, ArrowRight } from "lucide-react";

export const metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const session = await auth();

  const [profile, expCount, eduCount, skillCount, projectCount, publishedCount] =
    await Promise.all([
      prisma.profile.findUnique({ where: { id: 1 } }),
      prisma.experience.count(),
      prisma.education.count(),
      prisma.skill.count(),
      prisma.project.count(),
      prisma.project.count({ where: { published: true } }),
    ]);

  const stats = [
    { label: "Experience", value: expCount, icon: Briefcase, href: "/admin/dashboard/experience", color: "text-blue-400 bg-blue-400/10" },
    { label: "Education", value: eduCount, icon: GraduationCap, href: "/admin/dashboard/education", color: "text-green-400 bg-green-400/10" },
    { label: "Skills", value: skillCount, icon: Zap, href: "/admin/dashboard/skills", color: "text-yellow-400 bg-yellow-400/10" },
    { label: "Projects", value: projectCount, icon: FolderKanban, href: "/admin/dashboard/projects", color: "text-indigo-400 bg-indigo-400/10" },
  ];

  const profileComplete = profile && profile.name && profile.bio && profile.email;

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
      <p className="text-gray-400 mb-8">Welcome back, {session?.user?.name ?? "Admin"}.</p>

      {/* Profile warning */}
      {!profileComplete && (
        <Link href="/admin/dashboard/profile"
          className="flex items-center justify-between p-4 mb-8 bg-yellow-500/10 border border-yellow-500/30 rounded-xl hover:border-yellow-500/60 transition-colors">
          <div className="flex items-center gap-3">
            <User size={18} className="text-yellow-400" />
            <div>
              <p className="text-yellow-300 font-medium text-sm">Profile incomplete</p>
              <p className="text-yellow-500/70 text-xs">Fill in your name, bio and contact info</p>
            </div>
          </div>
          <ArrowRight size={16} className="text-yellow-400" />
        </Link>
      )}

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, icon: Icon, href, color }) => (
          <Link key={label} href={href}
            className="p-5 bg-gray-900 rounded-2xl border border-gray-800 hover:border-gray-600 transition-colors group">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${color}`}>
              <Icon size={18} />
            </div>
            <p className="text-3xl font-bold text-white mb-1">{value}</p>
            <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">{label}</p>
          </Link>
        ))}
      </div>

      {/* Projects publish status */}
      <div className="p-6 bg-gray-900 rounded-2xl border border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold">Projects Status</h2>
          <Link href="/admin/dashboard/projects" className="text-sm text-indigo-400 hover:text-indigo-300">
            Manage →
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex-1 bg-gray-800 rounded-full h-2">
            <div
              className="bg-indigo-500 h-2 rounded-full transition-all"
              style={{ width: projectCount > 0 ? `${(publishedCount / projectCount) * 100}%` : "0%" }}
            />
          </div>
          <span className="text-sm text-gray-400 whitespace-nowrap">
            {publishedCount} / {projectCount} published
          </span>
        </div>
      </div>

      {/* Quick links */}
      <div className="mt-8 grid grid-cols-2 gap-3">
        <Link href="/" target="_blank"
          className="p-4 bg-gray-900 rounded-xl border border-gray-800 hover:border-indigo-500/50 text-sm text-gray-400 hover:text-white transition-colors text-center">
          View Public Portfolio ↗
        </Link>
        <Link href="/admin/dashboard/profile"
          className="p-4 bg-gray-900 rounded-xl border border-gray-800 hover:border-indigo-500/50 text-sm text-gray-400 hover:text-white transition-colors text-center">
          Edit Profile →
        </Link>
      </div>
    </div>
  );
}
