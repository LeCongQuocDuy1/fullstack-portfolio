"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  User, Briefcase, GraduationCap, Zap, FolderKanban,
  LayoutDashboard, LogOut, ExternalLink,
} from "lucide-react";

const nav = [
  { href: "/admin/dashboard",            label: "Overview",   icon: LayoutDashboard },
  { href: "/admin/dashboard/profile",    label: "Profile",    icon: User },
  { href: "/admin/dashboard/experience", label: "Experience", icon: Briefcase },
  { href: "/admin/dashboard/education",  label: "Education",  icon: GraduationCap },
  { href: "/admin/dashboard/skills",     label: "Skills",     icon: Zap },
  { href: "/admin/dashboard/projects",   label: "Projects",   icon: FolderKanban },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex flex-col border-r border-white/5 px-4 py-6 shrink-0" style={{ background: "#08080f" }}>
      {/* Logo */}
      <div className="px-3 mb-8">
        <p className="gradient-text font-black text-xl tracking-tight">Portfolio CMS</p>
        <p className="text-slate-600 text-xs mt-0.5">Content Management</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1">
        {nav.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== "/admin/dashboard" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                active
                  ? "text-white bg-gradient-to-r from-violet-600/30 to-cyan-600/10 border border-violet-500/30"
                  : "text-slate-500 hover:text-slate-200 hover:bg-white/5"
              }`}
            >
              <Icon size={16} className={active ? "text-violet-400" : ""} />
              {label}
              {active && <div className="ml-auto w-1.5 h-1.5 bg-violet-400 rounded-full" />}
            </Link>
          );
        })}
      </nav>

      {/* Bottom actions */}
      <div className="space-y-1 pt-4 border-t border-white/5">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-500 hover:text-slate-200 hover:bg-white/5 transition-all duration-200"
        >
          <ExternalLink size={16} />
          View Site
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-500 hover:text-red-400 hover:bg-red-500/5 transition-all duration-200"
        >
          <LogOut size={16} />
          Sign out
        </button>
      </div>
    </aside>
  );
}
