"use client"
import { createContext, useContext, useState } from "react"

interface ModoControlContextType {
    modoControl: boolean
    onToggleModoControl: () => void
}

const ModoControlContext = createContext<ModoControlContextType | null>(null)

export function ModoControlProvider({ children }: { children: React.ReactNode }) {
    const [modoControl, setModoControl] = useState<boolean>(false)

    const onToggleModoControl = () => setModoControl(prev => !prev)

    return (
        <ModoControlContext.Provider value={{ modoControl, onToggleModoControl }}>
            {children}
        </ModoControlContext.Provider>
    )
}

export function useModoControl() {
    const context = useContext(ModoControlContext)
    if (!context) throw new Error("useModoControl debe usarse dentro de ModoControlProvider")
    return context
}