"use client"
import PantallaNotificacion from "@/components/Notificaciones/PantallaNotificacion"
import { TipoNotificacion, useNotificacion } from "@/context/NotificacionContext"

export function NotificacionGlobal() {
    const { notificacion, limpiarNotificacion } = useNotificacion()

    return (
        <PantallaNotificacion
            success={notificacion?.tipo === TipoNotificacion.SUCCESS}
            successMessage={notificacion?.mensaje ?? ""}
            error={notificacion?.tipo === TipoNotificacion.ERROR ? notificacion.mensaje : null}
            clearFeedback={limpiarNotificacion}
        />
    )
}