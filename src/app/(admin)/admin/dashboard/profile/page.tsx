import { prisma } from "@/lib/prisma";
import { ProfileForm } from "@/components/admin/forms/profile-form";

export const revalidate = 0;
export const metadata = { title: "Edit Profile" };

export default async function ProfilePage() {
  const profile = await prisma.profile.findUnique({ where: { id: 1 } });
  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>
      <ProfileForm profile={profile} />
    </div>
  );
}
