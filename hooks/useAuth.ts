import { IRole } from "@/components/navigation/SideBarNav/sideBarNavItems"
import { jwtDecode } from "jwt-decode"

interface JwtPayload {
  id: number
  email: string
  rolId: number  
  iat: number
  exp: number
}

const roleMap: Record<number, IRole> = {
    1: "admin",
  2: "usuario",
}

function getTokenFromCookie(): string | null {
  return document?.cookie
    .split("; ")
    .find(row => row.startsWith("token="))
    ?.split("=")[1] ?? null
}

export function useAuth() {
  const token = getTokenFromCookie()

  if (!token) return { role: null, user: null }

  try {
    const decoded = jwtDecode<JwtPayload>(token)
    const role = roleMap[decoded.rolId] ?? null  
    return { role, user: decoded }
  } catch {
    return { role: null, user: null }
  }
}