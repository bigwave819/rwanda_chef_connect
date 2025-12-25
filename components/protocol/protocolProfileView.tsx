'use client'

import Image from "next/image";
import { User, Mail, Phone } from "lucide-react";
import { useProfile } from "@/hooks/useProfile";
import AddProfile from "./AddProtocolProfile";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const ProtocolPageView = () => {
  const { data: profile, isLoading, isError, deleteProfile, isDeletingProfile } =
    useProfile();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  /* Prevent hydration mismatch */
  if (!mounted) {
    return (
      <div className="rounded-3xl border bg-white p-10 text-center text-gray-300">
        Loading...
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="animate-pulse rounded-3xl border bg-white p-10 text-center text-gray-400">
        Loading protocol profile...
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
          This protocol hasn&apos;t created a profile yet.
        </p>

        <AddProfile />
      </div>
    );
  }

  const avatar =
    profile.image?.[0] ||
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUOUxlqDV43cjHokDQRxAK1nxRF_tl8YtIcg&s";

  return (
    <div className="mt-10 rounded-3xl p-8 shadow-xl bg-white">
      <div className="flex flex-col gap-8 md:flex-row md:items-center">
        {/* Avatar */}
        <div className="relative h-72 w-72 rounded-xl overflow-hidden">
          <Image
            src={avatar}
            alt="Protocol profile avatar"
            fill
            sizes="(max-width: 768px) 100vw, 288px"
            priority
            className="object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex-1 space-y-3">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              {profile.username || "Unnamed Protocol"}
            </h2>
            <p className="text-sm text-gray-500">Protocol Profile</p>
          </div>

          {profile.bio && (
            <p className="max-w-xl text-sm text-gray-600">{profile.bio}</p>
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

          <Button
            variant="destructive"
            onClick={() => deleteProfile(profile._id)}
            disabled={isDeletingProfile}
          >
            {isDeletingProfile ? "Deleting..." : "Delete Profile"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProtocolPageView;
