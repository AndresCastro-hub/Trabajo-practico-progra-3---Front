import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { sideBarNavItems } from "./sideBarNavItems"

export default function SideBarNav() {
    const pathname = usePathname()

    return (
          <nav className="flex-1 px-3 py-4">
            <p className="text-[10px] font-medium text-muted-foreground tracking-widest px-3 mb-2">
                ESPACIO
            </p>

            {sideBarNavItems.map(({ href, label, icon: Icon }) => {
                const active = pathname.startsWith(href)

                return (
                    <Link
                        key={href}
                        href={href}
                        className={cn(
                            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm mb-0.5 transition-colors relative",
                            active
                                ? "bg-primary/10 text-primary font-medium"
                                : "text-muted-foreground hover:bg-accent hover:text-foreground"
                        )}
                    >
                        <Icon size={16} />

                        {label}

                        {active && (
                            <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                        )}
                    </Link>
                )
            })}
        </nav>
    )
}