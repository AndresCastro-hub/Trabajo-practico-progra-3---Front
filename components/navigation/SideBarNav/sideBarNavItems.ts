import { BookOpen, CalendarDays, LucideIcon, Shield, ShoppingCart } from "lucide-react"

export type IRole = "usuario" | "admin"

interface ISideBarNavItems {
  href: string
  label: string
  icon: LucideIcon
  roles: IRole[]
}

export const sideBarNavItems: ISideBarNavItems[] = [
  { href: "/calendario", label: "Plan Semanal", icon: CalendarDays, roles: ["usuario"] },
  { href: "/recetario", label: "Recetario", icon: BookOpen, roles: ["usuario"] },
  { href: "/compras", label: "Compras", icon: ShoppingCart, roles: ["usuario"] },
  { href: "/admin", label: "Admin", icon: Shield, roles: ["admin"] },
]