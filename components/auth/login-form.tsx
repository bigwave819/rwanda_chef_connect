import { z } from "zod"
import { useState } from "react"
import { Button } from "../ui/button"
import { Spinner } from "../ui/spinner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FcGoogle } from "react-icons/fc"

// ZOD SCHEMA
const loginSchema = z.object({
    email: z.string().email("Enter a valid email address"),
    password: z.string()
        .min(8, "Minimum 8 characters")
        .max(12, "Maximum 12 characters")
})

type LoginFormProps = z.infer<typeof loginSchema>

const LoginForm = () => {
    const [loading, setLoading] = useState(false)

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormProps>({
        resolver: zodResolver(loginSchema)
    })

    const onSubmit = async (data: LoginFormProps) => {
        setLoading(true)
        console.log("Form Submitted:", data)
        setLoading(false)
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                
                {/* Email */}
                <div className="flex flex-col mb-3">
                    <label className="label">Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="input"
                        {...register("email")}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email.message}</p>
                    )}
                </div>

                {/* Password */}
                <div className="flex flex-col mb-3">
                    <label className="label">Password</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        className="input"
                        {...register("password")}
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm">{errors.password.message}</p>
                    )}
                </div>

                <Button className="btn w-full mt-4">
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
    )
}

export default LoginForm
