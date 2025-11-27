"use client"

import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FcGoogle } from "react-icons/fc"
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi"
import { Button } from "../ui/button"
import { Spinner } from "../ui/spinner"
import { signUp } from "@/lib/auth-client"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const registerSchema = z.object({
  names: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Minimum 8 characters").max(12, "Maximum 12 characters"),
})

type RegisterFormProps = z.infer<typeof registerSchema>

const RegisterForm = () => {
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormProps>({
    resolver: zodResolver(registerSchema),
    defaultValues: { names: '', email: "", password: "" },
  })

  const onSubmit = async (data: RegisterFormProps) => {
    setLoading(true)
    try {
      const result = await signUp.email({
        name: data.names,
        email: data.email,
        password: data.password,
      })

      if (result.error) {
        toast.error(`Registration failed: ${result.error.message || result.error}`)
        return
      }

      toast.success("Registration successful! Please check your email to verify your account.", {
        className: "bg-green-600 text-white border-green-700"
      })
      router.push('/admin/dashboard')
    } catch (err: any) {
      console.error("Registration error:", err)
      toast.error(err?.message || "Something went wrong during registration", {
        className: "bg-red-600 text-white border-red-700"
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Names */}
        <div className="flex flex-col">
          <label className="label mb-1 font-medium">Names</label>
          <div className="relative">
            <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Enter your full name"
              className="input pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              {...register("names")}
            />
          </div>
          {errors.names && <p className="text-red-500 text-sm mt-1">{errors.names.message}</p>}
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label className="label mb-1 font-medium">Email</label>
          <div className="relative">
            <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              placeholder="Enter your email"
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
            <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="input pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              {...register("password")}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        <Button
          type="submit"
          className="w-full mt-4 py-2 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-lg shadow-md"
          disabled={loading}
        >
          {loading ? <Spinner /> : "Register"}
        </Button>
      </form>

      {/* Divider */}
      <div className="flex items-center my-6">
        <div className="flex-1 h-px bg-gray-300"></div>
        <span className="px-2 text-sm text-gray-500">OR</span>
        <div className="flex-1 h-px bg-gray-300"></div>
      </div>

      {/* Google Sign in */}
      <button
        type="button"
        className="w-full flex items-center justify-center gap-2 py-2 text-md bg-pink-50 rounded-lg hover:bg-pink-100 font-semibold shadow-sm border border-gray-200"
      >
        <FcGoogle size={22} />
        Sign up with Google
      </button>
    </div>
  )
}

export default RegisterForm