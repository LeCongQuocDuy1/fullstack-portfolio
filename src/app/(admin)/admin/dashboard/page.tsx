import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { Briefcase, GraduationCap, Zap, FolderKanban, User, ArrowRight, TrendingUp, Eye } from "lucide-react";

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
    { label: "Experience", value: expCount, icon: Briefcase, href: "/admin/dashboard/experience", gradient: "from-blue-600 to-cyan-500", glow: "rgba(59,130,246,0.3)" },
    { label: "Education",  value: eduCount,  icon: GraduationCap, href: "/admin/dashboard/education",  gradient: "from-emerald-600 to-teal-500", glow: "rgba(16,185,129,0.3)" },
    { label: "Skills",     value: skillCount, icon: Zap,           href: "/admin/dashboard/skills",     gradient: "from-amber-600 to-yellow-500", glow: "rgba(245,158,11,0.3)" },
    { label: "Projects",   value: projectCount, icon: FolderKanban, href: "/admin/dashboard/projects",  gradient: "from-violet-600 to-purple-500", glow: "rgba(124,58,237,0.3)" },
  ];

  const profileComplete = profile?.name && profile?.bio && profile?.email;
  const publishRatio = projectCount > 0 ? (publishedCount / projectCount) * 100 : 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-white mb-1">Dashboard</h1>
        <p className="text-slate-500">Welcome back, <span className="text-violet-400">{session?.user?.name ?? "Admin"}</span>.</p>
      </div>

      {/* Profile warning */}
      {!profileComplete && (
        <Link href="/admin/dashboard/profile"
          className="flex items-center justify-between p-5 rounded-2xl border border-amber-500/20 bg-amber-500/5 hover:border-amber-500/40 hover:bg-amber-500/8 transition-all group">
          <div className="flex items-center gap-4">
            <div className="p-2.5 rounded-xl bg-amber-500/15 text-amber-400">
              <User size={18} />
            </div>
            <div>
              <p className="text-amber-300 font-semibold text-sm">Profile incomplete</p>
              <p className="text-amber-600 text-xs mt-0.5">Fill in your name, bio and contact info to complete your portfolio</p>
            </div>
          </div>
          <ArrowRight size={16} className="text-amber-500 group-hover:translate-x-1 transition-transform" />
        </Link>
      )}

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, href, gradient, glow }) => (
          <Link key={label} href={href}
            className="glass glass-hover rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 group"
            style={{ ["--hover-glow" as string]: glow }}
          >
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 bg-gradient-to-br ${gradient}`}>
              <Icon size={18} className="text-white" />
            </div>
            <p className="text-4xl font-black text-white mb-1">{value}</p>
            <p className="text-sm text-slate-500 group-hover:text-slate-400 transition-colors">{label}</p>
          </Link>
        ))}
      </div>

      {/* Bottom row */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Projects publish ratio */}
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-violet-500/10 text-violet-400">
                <TrendingUp size={16} />
              </div>
              <h2 className="font-semibold text-white">Projects Status</h2>
            </div>
            <Link href="/admin/dashboard/projects" className="text-xs text-violet-400 hover:text-violet-300 transition-colors">
              Manage →
            </Link>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">{publishedCount} published</span>
              <span className="text-slate-600">{projectCount} total</span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-violet-600 to-cyan-500 rounded-full transition-all duration-1000"
                style={{ width: `${publishRatio}%` }}
              />
            </div>
            <p className="text-xs text-slate-600">{Math.round(publishRatio)}% of projects are live</p>
          </div>
        </div>

        {/* Quick links */}
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
              <Eye size={16} />
            </div>
            <h2 className="font-semibold text-white">Quick Actions</h2>
          </div>
          <div className="space-y-2">
            <Link href="/" target="_blank"
              className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-all group">
              <span className="text-sm">View Public Portfolio</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/admin/dashboard/profile"
              className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-all group">
              <span className="text-sm">Edit Profile</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/admin/dashboard/projects/new"
              className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-all group">
              <span className="text-sm">Add New Project</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
