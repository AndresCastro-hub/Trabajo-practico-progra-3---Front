import { jwtDecode } from "jwt-decode"
import { NextRequest, NextResponse } from "next/server"

const routeRoles: Record<string, string[]> = {
  "/admin": ["admin"],  
}
export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value
  const isLoginPage = request.nextUrl.pathname === "/login"

  if (!token && !isLoginPage) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  if (token) {
    try {
      const decoded = jwtDecode<{ role: string }>(token)
      const pathname = request.nextUrl.pathname
      const allowedRoles = routeRoles[pathname]

      if (allowedRoles && !allowedRoles.includes(decoded.role)) {
        //En el futuro podemos redirign a una pantalla de unauthorized pero por ahora va a calendario
        return NextResponse.redirect(new URL("/calendario", request.url))
      }
    } catch {
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/calendario", "/recetario", "/compras", "/admin"],
}