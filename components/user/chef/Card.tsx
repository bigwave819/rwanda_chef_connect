"use client";

import Image from "next/image";
import { ChefHat, Sparkles, BadgeCheck } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface ChefCardProps {
  name?: string;
  speciality?: string;
  phone?: string | null;
  imageUrl?: string;
  loading?: boolean;
}

const ChefCard = ({
  name,
  speciality,
  imageUrl,
  loading = false,
}: ChefCardProps) => {
  const [imgError, setImgError] = useState(false);

  if (loading) {
    return (
      <div className="rounded-2xl overflow-hidden shadow-md bg-white border border-gray-200 animate-pulse">
        <Skeleton className="h-60 w-full" />
        <div className="p-4 space-y-2">
          <Skeleton className="h-6 w-3/4 rounded-md" />
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl overflow-hidden shadow-md bg-white transition hover:shadow-2xl border border-gray-200">
      <div className="relative h-60 w-full">
        <Image
          src={imgError || !imageUrl ? "https://via.placeholder.com/300x200?text=Chef" : imageUrl}
          alt={name || "Chef"}
          fill
          className="object-cover transition duration-500"
          onError={() => setImgError(true)}
        />
        <div className="absolute top-3 left-3 bg-white/80 px-3 py-1 rounded-lg flex items-center gap-1 text-xs font-medium shadow">
          <ChefHat className="w-4 h-4 text-orange-600" /> Chef
        </div>
      </div>

      <div className="p-4 space-y-2">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          {name} <Sparkles className="w-4 h-4 text-yellow-500" />
        </h2>
        <p className="text-gray-700 text-sm flex gap-2 items-center">
          <BadgeCheck className="w-4 h-4 text-green-600" />
          <span className="font-medium">Speciality:</span> {speciality}
        </p>
        <Button className="w-full btn">View More</Button>
      </div>
    </div>
  );
};

export default ChefCard;
