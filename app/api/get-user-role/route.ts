import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import prisma  from "@/lib/prisma";
import { headers } from "next/headers";

export async function GET() {
  try {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { role: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ role: user.role });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
