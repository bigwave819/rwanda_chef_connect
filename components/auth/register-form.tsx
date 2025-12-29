"use client";

import { z } from "zod";
import { useState } from "react";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiEye, FiEyeOff, FiLock, FiMail, FiUser } from "react-icons/fi";
import { toast } from "sonner";
import { registerUser } from "@/app/actions/auth";

// 1. Use z.enum so TypeScript knows exactly which strings are allowed
const registerSchema = z.object({
  name: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email address"),
  password: z
    .string()
    .min(8, "Minimum 8 characters")
    .max(12, "Maximum 12 characters"),
  role: z.enum(["user", "chef", "protocol"], {
    message: "Please select an account type",
  }),
});

type RegisterFormProps = z.infer<typeof registerSchema>;

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormProps>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormProps) => {
    setLoading(true);
    setServerError(null);
    try {
      // data.role is now correctly typed as "user" | "chef" | "protocol"
      await registerUser(data);
      toast.success("Account created successfully!");
    } catch (err: any) {
      // Next.js redirects throw an error to cancel execution; we don't want to reset loading then
      if (err.message !== "NEXT_REDIRECT") {
        setServerError(err.message || "Registration failed");
        toast.error(err.message || "Registration failed");
        setLoading(false);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* SERVER ERROR DISPLAY */}
        {serverError && (
          <div className="bg-red-50 border border-red-300 text-red-600 text-sm p-2 rounded">
            {serverError}
          </div>
        )}

        {/* Name Input */}
        <div>
          <label className="block text-sm font-medium mb-1">Names</label>
          <div className="relative">
            <FiUser className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              className="pl-10 w-full border rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g: Hirwa Tresor"
              {...register("name")}
            />
          </div>
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email Input */}
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <div className="relative">
            <FiMail className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              className="pl-10 w-full border rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g: inzozi@gmail.com"
              {...register("email")}
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Role Select */}
        <div>
          <label className="block text-sm font-medium mb-1">Account Type</label>
          <select
            className="w-full border rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            {...register("role")}
          >
            <option value="">Select role</option>
            <option value="user">Customer</option>
            <option value="chef">Chef</option>
            <option value="protocol">Protocol</option>
          </select>
          {errors.role && (
            <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
          )}
        </div>

        {/* Password Input */}
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <div className="relative">
            <FiLock className="absolute left-3 top-3 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              className="pl-10 w-full border rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="*******"
              {...register("password")}
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        <div className="mt-3">
          <Button type="submit" className="w-full btn" disabled={loading}>
            {loading ? <Spinner /> : "Register"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;