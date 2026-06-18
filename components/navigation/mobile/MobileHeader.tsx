"use client"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { Menu, Zap } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import Logo from "@/components/Logo"
import CardUser from "@/components/navigation/CardUser"
import SideBarNav from "../SideBarNav/SideBarNav"

const pageTitles: Record<string, string> = {
  "/calendario": "Plan Semanal",
  "/recetario": "Recetario",
  // "/compras": "Compras",
  "/admin": "Admin",
}

export default function MobileHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState<boolean>(false)

  const currentTitle = Object.entries(pageTitles).find(([key]) =>
    pathname.startsWith(key)
  )?.[1] ?? "Meal Prep"

  return (
    <header className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100">
      <div className="flex items-center gap-2.5">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              aria-label="Abrir menú"
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors"
            >
              <Menu size={16} />
            </button>
          </SheetTrigger>

          <SheetContent side="left" className="w-[260px] p-0 flex flex-col bg-background">

            <SheetTitle className="sr-only">
              Menú de navegación
            </SheetTitle>

            <SheetDescription className="sr-only">
              Navegación principal de la aplicación
            </SheetDescription>

            <div className="flex items-center gap-2.5 px-5 py-5 border-b border-gray-100">
              <Logo />
            </div>

            <SideBarNav />

            <CardUser />

          </SheetContent>
        </Sheet>

        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
           <Zap size={18} className="text-white" fill="white" />
        </div>

        <span className="text-sm font-semibold text-gray-900">{currentTitle}</span>
      </div>
    </header>
  )
}