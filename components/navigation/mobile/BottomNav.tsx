"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils/utils"
import { sideBarNavItems } from "../SideBarNav/sideBarNavItems"
import { useAuth } from "@/hooks/useAuth"

export default function BottomNav() {
  const pathname = usePathname()
  const { role } = useAuth()

  const navItems = sideBarNavItems.filter(item =>
    item.roles.includes(role!)
  )


  return (
    <nav className="md:hidden flex border-t border-gray-100 bg-white">
      {navItems.map(({ href, label, icon: Icon }) => {
        const active = pathname.startsWith(href)
        return (
          <Link
            key={href}
            href={href}
            className="flex-1 flex flex-col items-center gap-1 py-2.5"
          >
            <Icon size={20} className={active ? "text-green-500" : "text-gray-400"} />
            {active && <span className="w-1 h-1 rounded-full bg-green-500" />}
            <span className={cn(
              "text-[10px]",
              active ? "text-green-700 font-medium" : "text-gray-400"
            )}>
              {label}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}