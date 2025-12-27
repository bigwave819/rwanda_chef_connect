import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  id: string;
  role: "admin" | "chef" | "protocol" | "user";
  exp: number;
}

/**
 * Protected routes by role
 */
const roleProtectedRoutes: Record<string, string[]> = {
  admin: ["/admin"],
  chef: ["/chef"],
  protocol: ["/protocol"],
  user: ["/profile", "/bookings"],
};

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value;

  /**
   * Public routes
   */
  if (pathname === "/" || pathname.startsWith("/auth")) {
    return NextResponse.next();
  }

  /**
   * No token → redirect to login
   */
  if (!token) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  let session: JwtPayload;

  try {
    session = jwtDecode<JwtPayload>(token);
  } catch {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  /**
   * Token expired
   */
  if (session.exp * 1000 < Date.now()) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  /**
   * Role-based protection
   */
  const allowedRoutes = roleProtectedRoutes[session.role];

  const isProtectedRoute = allowedRoutes?.some(route =>
    pathname.startsWith(route)
  );

  if (!isProtectedRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  /**
   * Prevent logged-in users from accessing /auth
   */
  if (pathname === "/auth") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/chef/:path*",
    "/protocol/:path*",
    "/profile/:path*",
    "/bookings/:path*",
    "/auth",
  ],
};
