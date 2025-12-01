"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";

export async function getCurrentUserRole() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  try {
    if (!session?.user.email) return null;

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { role: true },
  });

  return user?.role || null;
  } catch (error: any) {
    return {
      success: false,
      error: error.message
    }
  }
}
