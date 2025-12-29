"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

interface RegisterPayload {
  name: string
  email: string
  password: string
  role: "user" | "chef" | "protocol"
}

export async function loginUser(formData: { email: string; password: string }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
    cache: "no-store",
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Login failed");
  }

  const data = await res.json();
  const cookieStore = await cookies();

  cookieStore.set("token", data.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    path: "/",
  });

  cookieStore.set("userId", data.user._id, {
    httpOnly: false, 
    path: "/",
  });

  revalidatePath("/");

  if (data.user.role === "admin") redirect("/admin/dashboard");
  if (data.user.role === "user") redirect("/");
  if (data.user.role === "chef") redirect("/chef/profile");
  if (data.user.role === "protocol") redirect("/protocol/profile");
  redirect("/");
}

export async function registerUser(formData: RegisterPayload) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/register`, {
    method: "POST",
    headers: { "Content-Type" : "application/json" },
    body: JSON.stringify(formData),
    cache: 'no-cache'
  });

  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.message || "Login Failed!")
  }

  const data = await res.json()

   if (data.token) {
    const cookieStore = await cookies()
    cookieStore.set("token", data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    })
  }

  redirect("/auth")
}

export async function logoutUser() {
  const cookieStore = await cookies();

  cookieStore.set("token", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });

  cookieStore.set("userId", "", {
    path: "/",
    maxAge: 0,
  });

  redirect("/");
}