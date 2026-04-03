"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  User,
  Briefcase,
  GraduationCap,
  Zap,
  FolderKanban,
  LayoutDashboard,
  LogOut,
} from "lucide-react";

const nav = [
  { href: "/admin/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/dashboard/profile", label: "Profile", icon: User },
  { href: "/admin/dashboard/experience", label: "Experience", icon: Briefcase },
  { href: "/admin/dashboard/education", label: "Education", icon: GraduationCap },
  { href: "/admin/dashboard/skills", label: "Skills", icon: Zap },
  { href: "/admin/dashboard/projects", label: "Projects", icon: FolderKanban },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 flex flex-col bg-gray-900 border-r border-gray-800 px-4 py-6">
      <p className="text-indigo-400 font-bold text-lg mb-8 px-2">Portfolio CMS</p>
      <nav className="flex-1 space-y-1">
        {nav.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                active
                  ? "bg-indigo-600 text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <Icon size={16} />
              {label}
            </Link>
          );
        })}
      </nav>
      <button
        onClick={() => signOut({ callbackUrl: "/admin/login" })}
        className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
      >
        <LogOut size={16} />
        Sign out
      </button>
    </aside>
  );
}
