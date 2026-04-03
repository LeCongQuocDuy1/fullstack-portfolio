"use client";

import { useActionState } from "react";
import { updateProfile } from "@/lib/actions/profile";
import { SubmitButton } from "@/components/admin/submit-button";
import { FormToast } from "@/components/admin/form-toast";
import type { Profile } from "@prisma/client";

const inputCls = "w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-indigo-500";
const labelCls = "block text-sm text-gray-400 mb-1";

export function ProfileForm({ profile }: { profile: Profile | null }) {
  const [result, action] = useActionState(updateProfile, null);

  return (
    <>
      <FormToast result={result} successMessage="Profile saved!" />
      <form action={action} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Full Name *</label>
            <input name="name" required defaultValue={profile?.name} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Tagline *</label>
            <input name="tagline" required defaultValue={profile?.tagline} className={inputCls} placeholder="Fullstack Developer" />
          </div>
        </div>
        <div>
          <label className={labelCls}>Bio *</label>
          <textarea name="bio" required rows={4} defaultValue={profile?.bio} className={inputCls} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Email *</label>
            <input name="email" type="email" required defaultValue={profile?.email} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Phone</label>
            <input name="phone" defaultValue={profile?.phone ?? ""} className={inputCls} />
          </div>
        </div>
        <div>
          <label className={labelCls}>Location</label>
          <input name="location" defaultValue={profile?.location ?? ""} className={inputCls} placeholder="Ho Chi Minh City, Vietnam" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>GitHub URL</label>
            <input name="github" defaultValue={profile?.github ?? ""} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>LinkedIn URL</label>
            <input name="linkedin" defaultValue={profile?.linkedin ?? ""} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Twitter URL</label>
            <input name="twitter" defaultValue={profile?.twitter ?? ""} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Website URL</label>
            <input name="website" defaultValue={profile?.website ?? ""} className={inputCls} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Avatar URL</label>
            <input name="avatarUrl" defaultValue={profile?.avatarUrl ?? ""} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Resume URL</label>
            <input name="resumeUrl" defaultValue={profile?.resumeUrl ?? ""} className={inputCls} />
          </div>
        </div>
        <SubmitButton label="Save Profile" />
      </form>
    </>
  );
}
