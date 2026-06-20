"use client"
import { createContext, useContext, useState } from "react"

export enum TipoNotificacion {
    SUCCESS = "success",
    ERROR = "error"
}

interface Notificacion {
    mensaje: string
    tipo: TipoNotificacion
}

interface NotificacionContextType {
    notificacion: Notificacion | null
    mostrarNotificacion: (mensaje: string, tipo: TipoNotificacion) => void
    limpiarNotificacion: () => void
}

const NotificacionContext = createContext<NotificacionContextType | null>(null)

export function NotificacionProvider({ children }: { children: React.ReactNode }) {
    const [notificacion, setNotificacion] = useState<Notificacion | null>(null)

    const mostrarNotificacion = (mensaje: string, tipo:TipoNotificacion) => {
        setNotificacion({ mensaje, tipo })
    }

    const limpiarNotificacion = () => setNotificacion(null)

    return (
        <NotificacionContext.Provider value={{ notificacion, mostrarNotificacion, limpiarNotificacion }}>
            {children}
        </NotificacionContext.Provider>
    )
}

export function useNotificacion() {
    const context = useContext(NotificacionContext)
    if (!context) throw new Error("useNotificacion debe usarse dentro de NotificacionProvider")
    return context
}