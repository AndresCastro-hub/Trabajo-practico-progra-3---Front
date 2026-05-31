import { jwtDecode } from "jwt-decode"
import { NextRequest, NextResponse } from "next/server"

const routeRoles: Record<string, string[]> = {
  "/admin": ["administrador"],
}

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value
  const pathname = request.nextUrl.pathname
  const isLoginPage = pathname === "/login"

  if (!token && !isLoginPage) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  if (token && isLoginPage) {
    const decoded = jwtDecode<{ rol: string }>(token)
    if(decoded.rol === "administrador"){
      return NextResponse.redirect(new URL("/admin", request.url))
    }
    return NextResponse.redirect(new URL("/calendario", request.url));
  }

  if (token) {
    try {
      const decoded = jwtDecode<{ rol: string }>(token)
      const role = decoded.rol

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