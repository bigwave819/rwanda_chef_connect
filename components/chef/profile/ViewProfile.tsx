"use client";

import Image from "next/image";
import { User, Mail, Phone } from "lucide-react";
import { useProfile } from "@/hooks/useProfile";
import AddProfile from "./AddProfile";

export default function ProfileView() {
  const { data: profile, isLoading, isError } = useProfile();

  if (isLoading) {
    return (
      <div className="animate-pulse rounded-3xl border bg-white p-10 text-center text-gray-400">
        Loading your profile...
      </div>
    );
  }

  if (isError || !profile) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed bg-gray-50 p-20">
        <div className="mb-4 rounded-full bg-gray-100 p-4">
          <User size={40} className="text-gray-400" />
        </div>

        <p className="mb-4 font-medium text-gray-600">
          You haven&apos;t created a profile yet.
        </p>

        <AddProfile />
      </div>
    );
  }

  /* ---------------- Profile Data ---------------- */
  const avatar =
    profile.image?.[0] ||
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUOUxlqDV43cjHokDQRxAK1nxRF_tl8YtIcg&s";

  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm">
      <div className="flex flex-col gap-8 md:flex-row md:items-center">
        {/* Avatar */}
        <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-[2.5rem] border-[6px] border-white bg-white shadow-xl md:h-40 md:w-40">
          <Image
            src={avatar}
            alt="Profile avatar"
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Profile Info */}
        <div className="flex-1 space-y-3">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              {profile.username || "Unnamed User"}
            </h2>
            <p className="text-sm text-gray-500">Chef Profile</p>
          </div>

          {profile.bio && (
            <p className="max-w-xl text-sm text-gray-600">
              {profile.bio}
            </p>
          )}

          <div className="flex flex-wrap gap-6 pt-2 text-sm text-gray-600">
            {profile.email && (
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <span>{profile.email}</span>
              </div>
            )}

            {profile.phone && (
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <span>{profile.phone}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
