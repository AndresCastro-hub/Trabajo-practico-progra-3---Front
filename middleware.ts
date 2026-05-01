import { jwtDecode } from "jwt-decode"
import { NextRequest, NextResponse } from "next/server"
import { roleMap } from "./hooks/useAuth"

const routeRoles: Record<string, string[]> = {
  "/admin": ["admin"],
}

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value
  const pathname = request.nextUrl.pathname
  const isLoginPage = pathname === "/login"

  if (!token && !isLoginPage) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  if (token && isLoginPage) {
    return NextResponse.redirect(new URL("/calendario", request.url))
  }

  if (token) {
    try {
      const decoded = jwtDecode<{ rolId: number }>(token)
      const role = roleMap[decoded.rolId]

      const matchedRoute = Object.keys(routeRoles).find(route =>
        pathname.startsWith(route)
      )

      const allowedRoles = matchedRoute ? routeRoles[matchedRoute] : null

      if (allowedRoles && !allowedRoles.includes(role)) {
        return NextResponse.redirect(new URL("/calendario", request.url))
      }
    } catch {
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/calendario", "/recetario", "/compras", "/admin/:path*"],
}