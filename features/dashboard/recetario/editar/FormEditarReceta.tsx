"use client"
import { useParams, useRouter } from "next/navigation"
import { ChefHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/LoadingSpinner";
import TiempoDePreparacion from "../nueva/components/Form/TiempoDePreparacion";
import Descripcion from "../nueva/components/Form/Descripcion";
import IngredientesForm from "../nueva/components/Ingredientes/IngredientesForm";
import useFormEditarReceta from "./hooks/useFormEditarReceta";
import Imagen from "./components/form/Imagen";
import Nombre from "../nueva/components/Form/Nombre";

export default function FormEditarReceta() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const {
        nombre,
        tiempoPreparacion,
        descripcion,
        ingredientes,
        imagen_url,
        loading,
        puedeEditarReceta,
        agregarIngrediente,
        setDescripcion,
        setTiempoDePreparacion,
        eliminarIngrediente,
        actualizarIngrediente,
        handleSubmit
    } = useFormEditarReceta(id);

  
    return (
        <div className="min-h-screen bg-slate-50">

            {loading && <LoadingSpinner />}

            <div className="max-w-6xl mx-auto px-4 py-8 md:px-8">

                <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">
                        <ChefHat className="text-green-600" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Editar receta</h1>
                        <p className="text-slate-500 mt-1">Modificá los detalles de tu receta.</p>
                    </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-5 md:p-8">
                    <div className="flex flex-col gap-8">

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                            <div className="lg:col-span-2 flex flex-col gap-2">
                                <Nombre value={nombre} isDisabled={true} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <TiempoDePreparacion
                                    value={tiempoPreparacion}
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

                        <div>
                            {imagen_url && <Imagen value={imagen_url} />}
                        </div>
                    </div>

                    <div className="bg-white pt-6 mt-8 border-t border-slate-100 flex flex-col-reverse md:flex-row justify-end gap-3">
                        <Button onClick={() => router.back()} variant="outline" className="rounded-xl h-11 w-full md:w-auto">Cancelar</Button>
                        <Button disabled={!puedeEditarReceta() || loading} onClick={handleSubmit} className="rounded-xl h-11 bg-green-600 hover:bg-green-700 w-full md:w-auto">
                            Guardar cambios
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}