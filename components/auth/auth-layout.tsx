'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { useState } from "react"
import LoginForm from "./login-form"
import RegisterForm from "./register-form"


const AuthLayout = () => {
    const [ active, setActive ] = useState("login") 
  return (
    <div className="flex justify-center items-center min-h-[80vh]">
        <div className="w-full max-w-md p-5 bg-card rounded-lg shadow-sm border">
                <h1 className="text-2xl font-bold text-center mb-6">Welcome!</h1>
                <Tabs value={active} onValueChange={setActive} className="w-full">
                    <TabsList className="grid grid-cols-2 w-full">
                        <TabsTrigger value="login">Login</TabsTrigger>
                        <TabsTrigger value="register">Register</TabsTrigger>
                    </TabsList>
                    <TabsContent value="login">
                        <LoginForm/>
                    </TabsContent>
                    <TabsContent value="register">
                        <RegisterForm/>
                    </TabsContent>
                </Tabs>
            </div>
    </div>
  )
}

export default AuthLayout