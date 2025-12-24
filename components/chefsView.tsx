'use client'

import { useViewProfiles } from "@/hooks/useProfile";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

function ChefsView() {
  const { data: profiles, isLoading, isError } = useViewProfiles();

  if (isLoading) {
    return (
      <div className="text-center py-10 text-gray-500">
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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {profiles.map((profile) => (
        <div
          key={profile._id}
          className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden"
        >
          {/* Image */}
          <div className="relative w-full h-64">
            <Image
              src={profile.image[0]}
              alt={profile.username}
              fill
              className="object-cover"
            />
          </div>

          {/* Info */}
          <div className="p-5 flex flex-col gap-2">
            <h2 className="text-lg font-semibold text-gray-800">
              {profile.username}
            </h2>

            <p className="text-sm text-gray-500">
              📞 {profile.phone}
            </p>
                <Link href={`/chefs/${profile._id}`} className="btn px-3 py-2 rounded-md">
              <p className="text-center">View Profile</p>
            </Link>

          </div>
        </div>
      ))}
    </div>
  );
}

export default ChefsView;
