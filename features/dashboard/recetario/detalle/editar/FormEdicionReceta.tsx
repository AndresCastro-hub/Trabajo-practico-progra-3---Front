"use client";
import { Button } from "@/components/ui/button";
import {  PencilIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Descripcion from "../../nueva/components/Form/Descripcion";
import useFormEdicionReceta from "./hooks/useFormEdicionReceta";
import { useParams } from "next/navigation";
import TiempoDePreparacion from "../../nueva/components/Form/TiempoDePreparacion";
import IngredientesForm from "../../nueva/components/Ingredientes/IngredientesForm";

export default function FormEdicionReceta(){
    const router = useRouter();
    const params = useParams();
    const handleEdicion = () =>{

    }

    const id = params.id as string
    const {
        descripcion,
        setDescripcion,
        tiempoDePreparacion,
        setTiempoDePreparacion,
        agregarIngrediente,
        eliminarIngrediente,
        actualizarIngrediente,
        ingredientes
    } = useFormEdicionReceta(id)
    return(
        <div className="min-h-screen bg-slate-50">

            <div className="max-w-6xl mx-auto px-4 py-8 md:px-8" >

                <div className="flex items-center gap-4 mb-8">
                        <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">
                            <PencilIcon className="text-green-600" />
                        </div>

                        <div>
                            <h1 className="text-3xl font-bold text-slate-900">Editar receta</h1>
                            <p className="text-slate-500 mt-1">Edita una de tus recetas</p>
                        </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-5 md:p-8">
                    <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-5 md:p-8">

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

                            <div className="lg:col-span-2 flex flex-col gap-2">
                                <Descripcion 
                                value={descripcion} 
                                setValue={setDescripcion}/>
                            </div>

                            <div className="flex flex-col gap-2">
                                <TiempoDePreparacion
                                    value={tiempoDePreparacion}
                                    setValue={setTiempoDePreparacion}/>
                            </div>

                            <div className="lg:col-span-3 flex flex-col gap-5">
                                <IngredientesForm
                                    agregarIngrediente={agregarIngrediente}
                                    ingredientes={ingredientes}
                                    eliminarIngrediente={eliminarIngrediente}
                                    actualizarIngrediente={actualizarIngrediente}
                                />
                            </div>
                        </div>

                    </div>

                    <div className="bg-white pt-6 mt-8 border-t border-slate-100 flex flex-col-reverse md:flex-row justify-end gap-3">
                        <Button onClick={() => router.back()} variant="outline" className="rounded-xl h-11 w-full md:w-auto">Cancelar</Button>
                        <Button onClick={handleEdicion} className="rounded-xl h-11 bg-green-600 hover:bg-green-700 w-full md:w-auto">
                            Editar receta
                        </Button>
                    </div>  
                </div>
            </div>
        </div>
    )
}