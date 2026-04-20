import { BookOpen, CalendarDays, LucideIcon, Shield, ShoppingCart } from "lucide-react"

interface ISideBarNavItems {
    href: string
    label: string
    icon: LucideIcon
}

export const sideBarNavItems: ISideBarNavItems[] = [
  { href: "/calendario",  label: "Plan Semanal", icon: CalendarDays },
  { href: "/recetario",   label: "Recetario",    icon: BookOpen },
  { href: "/compras",     label: "Compras",       icon: ShoppingCart },
  { href: "/admin",       label: "Admin",         icon: Shield },
]