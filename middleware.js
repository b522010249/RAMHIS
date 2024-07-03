import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const token = request.cookies.get("token");

  const url = request.nextUrl.clone();

  if (!token && url.pathname.startsWith("/")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (token && url.pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    // Match all routes except the ones that start with /login and api and the static folder
    "/((?!api|_next/static|_next/image|favicon.ico|login).*)",
  ],
};
