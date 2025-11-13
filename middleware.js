import { NextResponse } from "next/server";

export function middleware(req) {
  // Check authToken from cookies
  const token = req.cookies.get("authToken");

  const protectedRoutes = ["/dashboard", "/profile", "/settings", "/products"];

  const path = req.nextUrl.pathname;

  // If route is protected and no login → redirect to login
  if (protectedRoutes.includes(path)) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

// Apply middleware only on these routes
export const config = {
  matcher: ["/dashboard", "/create-listing","/listings","/api-keys","/integrations","/settings", "/profile", "/settings", "/products"],
};
