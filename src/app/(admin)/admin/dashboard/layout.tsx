import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/sidebar";
import { AdminSessionProvider } from "@/components/admin/session-provider";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) redirect("/admin/login");

  return (
    <AdminSessionProvider>
      <div className="flex min-h-screen bg-gray-950 text-white">
        <AdminSidebar />
        <main className="flex-1 p-8 overflow-y-auto">{children}</main>
      </div>
    </AdminSessionProvider>
  );
}
