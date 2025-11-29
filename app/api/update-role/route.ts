import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, role } = body;

    // Validate role
    if (!["CUSTOMER", "CHEF"].includes(role)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Update user role
    await prisma.user.update({
      where: { email },
      data: { role },
    });

    return NextResponse.json({ message: `Role updated to ${role}` });
  } catch (err: any) {
    console.error("Update role error:", err);
    return NextResponse.json({ error: err?.message || "Something went wrong" }, { status: 500 });
  }
}
