"use client";

import { useAuthUser } from "@/hooks/useAuthUser";

const ProfileView = () => {
  const { user, role, isLoading, isError } = useAuthUser();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-red-500">Failed to load profile</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-md p-6">
        {/* Header */}
        <div className="flex items-center gap-4 border-b pb-4">
          <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-600">
            {user.name?.charAt(0)}
          </div>

          <div>
            <h1 className="text-2xl font-semibold">{user.name}</h1>
            <p className="text-gray-500">{user.email}</p>
            <span className="inline-block mt-1 px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-600 capitalize">
              {role}
            </span>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoItem label="Role" value={role} />
          <InfoItem
            label="Joined"
            value={new Date(user.createdAt).toLocaleDateString()}
          />
          <InfoItem label="Status" value="Active" />
        </div>

        {/* Actions */}
        <div className="mt-8 flex gap-4">

          <button className="px-5 py-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <div className="border rounded-lg p-4">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="font-medium break-all">{value}</p>
  </div>
);

export default ProfileView;
