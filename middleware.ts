import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const userId = request.cookies.get("userId")?.value;

  const { pathname } = request.nextUrl;

  // Routes that require authentication
  const protectedRoutes = [
    "/chef/dashboard",
    "/chef/profile",
    "/chef/bookings",
    "/admin/dashboard",
    "/admin/bookigs",
    "/admin/users",
    "/profile",
  ];

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // If user is not logged in and tries to access protected route
  if (!userId && isProtectedRoute) {
    const loginUrl = new URL("/auth", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
