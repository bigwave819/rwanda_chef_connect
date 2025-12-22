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

const registerSchema = z.object({
  names: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email address"),
  password: z
    .string()
    .min(8, "Minimum 8 characters")
    .max(12, "Maximum 12 characters"),
  role: z
    .string()
    .refine(
      (val) => ["user", "chef", "protocol"].includes(val),
      "Please select an account type"
    ),
});

type RegisterFormProps = z.infer<typeof registerSchema>;

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    formState: { errors },
  } = useForm<RegisterFormProps>({
    resolver: zodResolver(registerSchema),
  });

  return (
    <div className="max-w-md mx-auto p-6 space-y-4">
      <form
        action={async (formData: FormData) => {
          setLoading(true);
          setServerError(null);

          const payload = {
            name: formData.get("names") as string,
            email: formData.get("email") as string,
            password: formData.get("password") as string,
            role: formData.get("role") as "user" | "chef" | "protocol",
          };

          try {
            await registerUser(payload);
            toast.success("Account created successfully");
          } catch (err: any) {
            setServerError(err.message);
            toast.error(err.message);
          } finally {
            setLoading(false);
          }
        }}
      >
        {/* SERVER ERROR */}
        {serverError && (
          <div className="bg-red-50 border border-red-300 text-red-600 text-sm p-2 rounded">
            {serverError}
          </div>
        )}

        {/* Names */}
        <div>
          <label className="label">Names</label>
          <div className="relative">
            <FiUser className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              className="pl-10 w-full border rounded-md p-2"
              placeholder="e.g: Hirwa Tresor"
              {...register("names")}
              required
            />
          </div>
          {errors.names && (
            <p className="text-red-500 text-sm">{errors.names.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="label">Email</label>
          <div className="relative">
            <FiMail className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              className="pl-10 w-full border rounded-md p-2"
              placeholder="e.g: inzozi@gmail.com"
              {...register("email")}
              required
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Role */}
        <div>
          <label className="label">Account Type</label>
          <select
            className="w-full border rounded-md p-2"
            {...register("role")}
            required
          >
            <option value="">Select role</option>
            <option value="user">Customer</option>
            <option value="chef">Chef</option>
            <option value="protocol">Protocol</option>
          </select>
          {errors.role && (
            <p className="text-red-500 text-sm">{errors.role.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="label">Password</label>
          <div className="relative">
            <FiLock className="absolute left-3 top-3 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              className="pl-10 w-full border rounded-md p-2"
              placeholder="*******"
              {...register("password")}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-3"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <div className="mt-3">
          <Button className="btn w-full" disabled={loading}>
          {loading ? <Spinner /> : "Register"}
        </Button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
