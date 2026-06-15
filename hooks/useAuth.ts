"use client"
import { IRole } from "@/components/navigation/SideBarNav/sideBarNavItems"
import { jwtDecode } from "jwt-decode"
import { useEffect, useState } from "react"

interface JwtPayload {
  id: number
  email: string
  name: string
  rol: string  
  iat: number
  exp: number
}

export function getTokenFromCookie(): string | null {
  return document?.cookie
    .split("; ")
    .find(row => row.startsWith("token="))
    ?.split("=")[1] ?? null
}

export function useAuth() {
  const [user, setUser] = useState<JwtPayload | null>(null)
  const [role, setRole] = useState<IRole | null>(null)

  useEffect(() => {
    const token = getTokenFromCookie()

    if (!token) return

    try {
      const decoded = jwtDecode<JwtPayload>(token)
      setUser(decoded)
      setRole(decoded.rol as IRole ?? null)
    } catch {
      setUser(null)
      setRole(null)
    }
  }, [])

  return { user, role }
}