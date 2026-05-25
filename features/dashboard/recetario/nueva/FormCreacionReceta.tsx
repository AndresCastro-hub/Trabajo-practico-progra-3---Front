"use client"
import { CheckCircle2, ChefHat, X, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Nombre from "./components/Form/Nombre"
import useFormCreacionReceta from "./hooks/useFormCreacionReceta"
import TiempoDePreparacion from "./components/Form/TiempoDePreparacion"
import Descripcion from "./components/Form/Descripcion"
import IngredientesForm from "./components/Ingredientes/IngredientesForm"
import Imagen from "./components/Form/Imagen"
import { useRouter } from "next/navigation"

export default function FormCreacionReceta() {

    const {
        nombre,
        tiempoDePreparacion,
        descripcion,
        ingredientes,
        imagen,
        error,
        success,
        loading,
        clearFeedback,
        setImagen,
        handleSubmit,
        setDescripcion,
        setTiempoDePreparacion,
        setNombre,
        agregarIngrediente,
        eliminarIngrediente,
        actualizarIngrediente,
        puedeCrearReceta
    } = useFormCreacionReceta()

    const router = useRouter()

    return (
        <div className="min-h-screen bg-slate-50">

            {/* Componetizar esto */}
            {(success || error) && (
                <div className="fixed bottom-5 left-5 z-50 animate-in slide-in-from-bottom-2 fade-in duration-300">
                    <div className={`flex items-start gap-3 px-4 py-3 rounded-2xl shadow-lg border text-sm max-w-sm
                        ${success
                            ? "bg-green-50 border-green-200 text-green-800"
                            : "bg-red-50 border-red-200 text-red-800"
                        }`}
                    >
                        {success
                            ? <CheckCircle2 size={18} className="text-green-500 mt-0.5 shrink-0" />
                            : <XCircle size={18} className="text-red-500 mt-0.5 shrink-0" />
                        }
                        <span className="flex-1">{success ? "Receta creada correctamente." : error}</span>
                        <button onClick={clearFeedback} className="text-current opacity-50 hover:opacity-100 transition-opacity">
                            <X size={14} />
                        </button>
                    </div>
                </div>
            )}

            {/* Componetizar esto */}
            {loading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
                    <div className="w-10 h-10 border-4 border-green-200 border-t-green-600 rounded-full animate-spin" />
                </div>
            )}

            <div className="max-w-6xl mx-auto px-4 py-8 md:px-8">

                <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">
                        <ChefHat className="text-green-600" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Nueva receta</h1>
                        <p className="text-slate-500 mt-1">Creá una nueva receta con sus ingredientes e imagen.</p>
                    </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-5 md:p-8">
                    <div className="flex flex-col gap-8">

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                            <div className="lg:col-span-2 flex flex-col gap-2">
                                <Nombre
                                    value={nombre}
                                    setValue={setNombre}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <TiempoDePreparacion
                                    value={tiempoDePreparacion}
                                    setValue={setTiempoDePreparacion}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Descripcion value={descripcion} setValue={setDescripcion} />
                        </div>

                        <div className="flex flex-col gap-5">
                            <IngredientesForm
                                agregarIngrediente={agregarIngrediente}
                                ingredientes={ingredientes}
                                eliminarIngrediente={eliminarIngrediente}
                                actualizarIngrediente={actualizarIngrediente}
                            />
                        </div>

                        <div className="flex flex-col gap-3">
                            <Imagen setValue={setImagen} value={imagen} />
                        </div>
                    </div>

                    <div className="bg-white pt-6 mt-8 border-t border-slate-100 flex flex-col-reverse md:flex-row justify-end gap-3">
                        <Button onClick={() => router.push('/recetario')} variant="outline" className="rounded-xl h-11 w-full md:w-auto">Cancelar</Button>
                        <Button disabled={!puedeCrearReceta() || loading} onClick={handleSubmit} className="rounded-xl h-11 bg-green-600 hover:bg-green-700 w-full md:w-auto">
                            Crear receta
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}