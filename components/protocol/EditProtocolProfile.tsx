'use client'

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useProfile } from "@/hooks/useProfile";

type ProtocolProfileFormValues = {
  username: string;
  phone: string;
  bio: string;
  email: string;
  image: FileList;
};

const EditProtocolProfile = () => {
  const { data: profileData, isLoading, updateProfile, isUpdatingProfile } = useProfile();
  const { register, handleSubmit, reset, watch } = useForm<ProtocolProfileFormValues>();

  const [previews, setPreviews] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  // Ensure client-side only rendering
  useEffect(() => setMounted(true), []);

  // Populate form when profileData loads
  useEffect(() => {
    if (profileData) {
      reset({
        username: profileData.username ?? "",
        phone: profileData.phone ?? "",
        bio: profileData.bio ?? "",
        email: profileData.email ?? "",
      });
    }
  }, [profileData, reset]);

  const imageField = watch("image");

  // Generate image previews
  useEffect(() => {
    if (!imageField || imageField.length === 0) return;
    const files = Array.from(imageField).slice(0, 2);
    const urls = files.map(file => URL.createObjectURL(file));
    setPreviews(urls);
    return () => urls.forEach(url => URL.revokeObjectURL(url));
  }, [imageField]);

  const onSubmit = (values: ProtocolProfileFormValues) => {
    const formData = new FormData();
    formData.append("username", values.username);
    formData.append("phone", values.phone);
    formData.append("bio", values.bio);
    formData.append("email", values.email);

    if (values.image) {
      Array.from(values.image).slice(0, 2).forEach(file => formData.append("image", file));
    }

    updateProfile(formData);
  };

  if (!mounted) return <p>Loading...</p>;
  if (isLoading) return <p>Loading profile...</p>;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-5 w-full space-y-6 rounded-2xl bg-gray-50 p-10 shadow-lg"
    >
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Update Protocol Profile</h1>
        <p className="text-sm text-gray-500">
          Keep your protocol profile up-to-date
        </p>
      </div>

      {["username", "phone", "email"].map(field => (
        <div key={field} className="space-y-2">
          <label className="text-sm font-medium capitalize">{field}</label>
          <input
            {...register(field as keyof ProtocolProfileFormValues)}
            className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-400"
          />
        </div>
      ))}

      <div className="space-y-2">
        <label className="text-sm font-medium">Bio</label>
        <textarea
          {...register("bio")}
          className="h-24 w-full resize-none rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="space-y-3">
        <label className="text-sm font-medium">Profile Images (max 2)</label>

        <label className="flex cursor-pointer items-center justify-center rounded-xl border-2 border-dashed p-6 hover:bg-blue-50">
          <span className="text-sm text-gray-500">Click to upload images</span>
          <input
            type="file"
            multiple
            accept="image/*"
            {...register("image")}
            className="hidden"
          />
        </label>

        {previews.length > 0 && (
          <div className="flex gap-3">
            {previews.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`preview ${i + 1}`}
                className="h-24 w-24 rounded-xl border object-cover shadow-sm"
              />
            ))}
          </div>
        )}
      </div>

      <Button
        type="submit"
        disabled={isUpdatingProfile}
        className="bg-blue-600 hover:bg-blue-700 text-white w-full"
      >
        {isUpdatingProfile ? "Updating..." : "Update Profile"}
      </Button>
    </form>
  );
};

export default EditProtocolProfile;
