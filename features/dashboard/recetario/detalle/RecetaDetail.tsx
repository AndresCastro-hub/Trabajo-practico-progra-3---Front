"use client"
import { ArrowLeft, Clock, Flame } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import useRecetaDetail from "./hooks/useRecetaDetail"
import RecetaActions from "./components/RecetaActions"
import RecetaIngredients from "./components/RecetaIngredients"
import ErrorState from "@/components/ErrorState"
import LoadingSpinner from "@/components/LoadingSpinner"
import { eliminarReceta } from "./service/eliminarReceta"
import { TipoNotificacion, useNotificacion } from "@/context/NotificacionContext"
import { useState } from "react"
import { ConfirmDialog } from "@/components/ConfirmDialog"

export default function RecetaDetail() {
    const router = useRouter()
    const params = useParams()
    const id = params.id as string

    const { receta, loading, error } = useRecetaDetail(id)
    const { mostrarNotificacion } = useNotificacion()
    const [openConfirm, setOpenConfirm] = useState(false)

    const handleEditar = () => {
        router.push(`/recetario/${id}/editar`)
    }

    const esDePlataforma = () => {
        return receta?.idUsuario === 1
    }

    const handleEliminar = async () => {
        try {
            await eliminarReceta(id)
            mostrarNotificacion("Receta eliminada correctamente.", TipoNotificacion.SUCCESS)
            router.push("/recetario")
        } catch {
            mostrarNotificacion("Error al eliminar la receta.", TipoNotificacion.ERROR)
        }
    }

    if (loading) return <LoadingSpinner />
    if (error) return <ErrorState message={error} onBack={() => router.back()} />
    if (!receta) return null

    const messageEliminacion = receta.estaAsignada ? `La receta esta siendo utilizada. ¿Estás seguro que querés eliminar la receta "${receta.nombre}"? Tene en cuenta que se eliminara del calendario.`:
     `Esta acción no se puede deshacer. ¿Estás seguro que querés eliminar la receta "${receta.nombre}"?`

    return (
        <section className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-6 py-8">

                <div className="flex items-center justify-between mb-6">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-sm font-medium">Volver</span>
                    </button>

                    {!esDePlataforma() && (
                        <RecetaActions
                            onEditar={handleEditar}
                            onEliminar={() => setOpenConfirm(true)}
                        />
                    )}
                </div>

                <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
                    <div className="relative h-72 w-full">
                        <Image src={receta.imagen_url} alt={receta.nombre} fill className="object-cover" />
                    </div>

                    <div className="p-6">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">{receta.nombre}</h1>
                        <p className="text-gray-500 mb-6">{receta.descripcion}</p>

                        <div className="flex gap-4">
                            <div className="flex flex-col items-center bg-gray-50 rounded-xl p-3 gap-1 flex-1">
                                <Flame className="w-5 h-5 text-green-500" />
                                <span className="text-sm font-semibold text-gray-800">{receta.calorias} kcal</span>
                                <span className="text-xs text-gray-400">Calorías</span>
                            </div>
                            <div className="flex flex-col items-center bg-gray-50 rounded-xl p-3 gap-1 flex-1">
                                <Clock className="w-5 h-5 text-green-500" />
                                <span className="text-sm font-semibold text-gray-800">{receta.tiempoPreparacion} min</span>
                                <span className="text-xs text-gray-400">Tiempo</span>
                            </div>
                        </div>

                        <RecetaIngredients ingredientes={receta.ingredientes} />
                    </div>
                </div>
            </div>

            <ConfirmDialog
                open={openConfirm}
                onOpenChange={setOpenConfirm}
                titulo="¿Eliminar receta?"
                descripcion={messageEliminacion}
                onConfirm={handleEliminar}
            />
        </section>
    )
}