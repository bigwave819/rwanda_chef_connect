"use client";

import { z } from "zod";
import { useState } from "react";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiEye, FiEyeOff, FiLock, FiMail } from "react-icons/fi";
import { toast } from "sonner";
import { loginUser } from "@/app/actions/auth";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(5, "Password too short").max(12, "Password too long"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);
    try {
      await loginUser(data);
      toast.success("Login successful");
    } catch (err: any) {
      if (err.message !== "NEXT_REDIRECT") {
        toast.error(err.message || "Login failed");
        setLoading(false);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="label">Email</label>
          <div className="relative">
            <FiMail className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              className="pl-10 w-full border rounded-md p-2"
              placeholder="e.g: inzozi@gmail.com"
              {...register("email")}
            />
          </div>
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div>
          <label className="label">Password</label>
          <div className="relative">
            <FiLock className="absolute left-3 top-3 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              className="pl-10 w-full border rounded-md p-2"
              placeholder="*******"
              {...register("password")}
            />
            <button
              type="button"
              className="absolute right-3 top-3"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        <Button type="submit" className="btn w-full" disabled={loading}>
          {loading ? <Spinner /> : "Login"}
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;