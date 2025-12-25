'use client'

import { useViewProfiles } from "@/hooks/useProfile";
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, User } from "lucide-react";
import { useBooking } from "@/hooks/useBooking";

function ChefsView() {
  const { data: profiles, isLoading, isError } = useViewProfiles();
  

  if (isLoading) {
    return (
      <div className="text-center py-10 text-gray-500 animate-pulse">
        Loading chefs...
      </div>
    );
  }

  if (isError || !profiles) {
    return (
      <div className="text-center py-10 text-red-500">
        Failed to load chefs
      </div>
    );
  }

  // Filter profiles whose user role is 'chef'
  const chefProfiles = profiles.filter(profile => profile.user?.role === "chef");

  if (chefProfiles.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        No chefs found
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {chefProfiles.map((profile) => (
        <Link
          key={profile._id}
          href={`/chefs/${profile._id}`}
          className="block bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden group"
        >
          {/* Image */}
          <div className="relative w-full h-80">
            <Image
              src={profile.image?.[0] || '/default-avatar.png'}
              alt={profile.username || "Chef"}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Info */}
          <div className="p-5 flex flex-col gap-3">
            <h2 className="text-lg font-semibold text-gray-800">
              {profile.username || "Unnamed Chef"}
            </h2>

            {profile.bio && (
              <p className="text-sm text-gray-600 flex items-center gap-2">
                <User size={16} className="text-pink-500" /> {profile.bio}
              </p>
            )}

            {profile.phone && (
              <p className="text-sm text-gray-500 flex items-center gap-2">
                <Phone size={16} className="text-green-500" /> {profile.phone}
              </p>
            )}

            {profile.email && (
              <p className="text-sm text-gray-500 flex items-center gap-2">
                <Mail size={16} className="text-blue-500" /> {profile.email}
              </p>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}

export default ChefsView;
