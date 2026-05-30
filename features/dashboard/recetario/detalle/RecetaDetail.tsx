"use client"
import { ArrowLeft, Clock, Flame, Pencil, Trash2 } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import useRecetaDetail from "./hooks/useRecetaDetail"

export default function RecetaDetail() {
    const router = useRouter()
    const params = useParams()
    const id = params.id as string

    const { receta, loading, error } = useRecetaDetail(id)

    const handleEditar = () => {
        // router.push(`/recetario/${id}/editar`)
    }

    const handleEliminar = () => {
        // eliminar
    }

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
        </div>
    )

    if (error) return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
            <p className="text-2xl font-semibold text-gray-700">Algo salió mal</p>
            <p className="text-gray-400 mt-2">{error}</p>
            <button
                onClick={() => router.back()}
                className="mt-6 flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors"
            >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-medium">Volver</span>
            </button>
        </div>
    )

    if (!receta) return null

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

                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleEditar}
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors shadow-sm"
                        >
                            <Pencil className="w-4 h-4" />
                        </button>
                        <button
                            onClick={handleEliminar}
                            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#b91c1c')}
                            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#d51010')}
                            style={{ backgroundColor: '#d51010' }}
                            className="w-10 h-10 flex items-center justify-center rounded-full transition-colors shadow-sm"
                        >
                            <Trash2 className="w-4 h-4 text-white" />
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-2xl overflow-hidden shadow-sm">

                    <div className="relative h-72 w-full">
                        <Image
                            src={receta.imagen_url}
                            alt={receta.nombre}
                            fill
                            className="object-cover"
                        />
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

                    </div>
                </div>
            </div>
        </section>
    )
}