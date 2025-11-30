"use client";

import { z } from "zod";
import { useState } from "react";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff, FiLock, FiMail } from "react-icons/fi";
import { toast } from "sonner";
import { signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z
    .string()
    .min(8, "Minimum 8 characters")
    .max(12, "Maximum 12 characters"),
});

type LoginFormProps = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormProps>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginFormProps) => {
    setLoading(true);
    try {
      const result = await signIn.email({
        email: data.email,
        password: data.password,
      });

      if ("error" in result && result.error) {
        toast.error(`Login Failed: ${result.error}`, {
          className: "bg-red-600 text-white border-red-700",
        });
        return;
      }

      const res = await fetch("/api/get-user-role", {
        headers: { Authorization: `Bearer ${result.data.token}` },
      });
      const roleData = await res.json();

      if (roleData.role === "CHEF") {
        window.location.href="/chef/dashboard";
      } else if(roleData.role === "CUSTOMER") {
        window.location.href = "/";
      } else {
        window.location.href="/admin/dashboard"
      }

    } catch (err: any) {
      toast.error(`Login Failed: ${err?.message || err}`, {
        className: "bg-red-600 text-white border-red-700",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg space-y-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email */}
        <div className="flex flex-col">
          <label className="label mb-1 font-medium">Email</label>
          <div className="relative">
            <FiMail className="icon-input" />
            <input
              type="email"
              placeholder="Enter Email"
              className="input pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              {...register("email")}
            />
          </div>
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div className="flex flex-col">
          <label className="label mb-1 font-medium">Password</label>
          <div className="relative">
            <FiLock className="icon-input" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              className="input pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              {...register("password")}
            />
            <button
              type="button"
              className="absolute right-3 top-[55%] transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        <Button className="w-full mt-2 py-2 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-lg shadow-md" disabled={loading}>
          {loading ? <Spinner /> : "Login"}
        </Button>
      </form>

      {/* Divider */}
      <div className="flex items-center my-4">
        <div className="flex-1 h-px bg-gray-300"></div>
        <span className="px-2 text-sm text-gray-500">OR</span>
        <div className="flex-1 h-px bg-gray-300"></div>
      </div>

      {/* Google Login */}
      <button className="w-full flex items-center justify-center gap-2 py-2 text-md bg-pink-50 rounded-full hover:bg-pink-100 font-semibold">
        <FcGoogle size={22} />
        Sign in with Google
      </button>
    </div>
  );
};

export default LoginForm;
