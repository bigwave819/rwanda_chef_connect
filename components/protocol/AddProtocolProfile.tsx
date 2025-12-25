'use client'

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAddProfile } from "@/hooks/useProfile";

const AddProtocolProfile = () => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    bio: "",
    email: "",
  });

  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const { mutate, isPending } = useAddProfile();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages(files);
    setPreviews(files.map(f => URL.createObjectURL(f)));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (images.length === 0) {
      setError("At least one image is required");
      return;
    }
    if (images.length > 2) {
      setError("Maximum 2 images allowed");
      return;
    }

    const fd = new FormData();
    fd.append("username", formData.username);
    fd.append("phone", formData.phone);
    fd.append("bio", formData.bio);
    fd.append("email", formData.email);
    images.forEach(img => fd.append("image", img));

    mutate(fd, {
      onSuccess: () => {
        setOpen(false);
        setFormData({ username: "", phone: "", bio: "", email: "" });
        setImages([]);
        setPreviews([]);
      },
      onError: (err: any) => {
        setError(err?.response?.data?.message || "Failed to create profile");
      },
    });
  };

  // Revoke object URLs on unmount
  useEffect(() => {
    return () => previews.forEach(url => URL.revokeObjectURL(url));
  }, [previews]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">Add Protocol Profile</Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg p-6 rounded-xl bg-white shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800">Add Protocol Profile</DialogTitle>
        </DialogHeader>

        {error && <p className="text-red-500 mt-2">{error}</p>}

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <input
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <textarea
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 resize-none"
            name="bio"
            placeholder="Bio"
            value={formData.bio}
            onChange={handleChange}
            rows={3}
            required
          />
          <input
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <input
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-lg file:text-sm file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
          />

          {/* Image previews */}
          {previews.length > 0 && (
            <div className="flex gap-3 mt-2">
              {previews.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`Preview ${i + 1}`}
                  className="w-24 h-24 object-cover rounded-lg border shadow-sm"
                />
              ))}
            </div>
          )}

          <Button
            type="submit"
            disabled={isPending}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-4"
          >
            {isPending ? "Uploading..." : "Create Profile"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProtocolProfile;
