"use client"
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Utensils } from 'lucide-react';
import { Pencil, Trash2, Clock, Flame } from 'lucide-react';
import Image from "next/image";
import { EliminarReceta, IComida } from "../types/calendario.types";
import { useModoControl } from "@/context/ModoControlContext"
import { eliminarRecetaDeCalendario } from "../service/calendarioService";
import { useCalendarioContext } from "../context/CalendarioContext";
import { TIPO_COMIDA_MAP } from "../constants/calendario.constants";
import { EditarDialog } from "./editarDialog";
import { useState } from "react";

interface IComidaCard{
    receta: IComida
    fecha: string
}
export function ComidaCard({receta, fecha}: IComidaCard) {
    const { modoControl } = useModoControl();
    const { refrescar } = useCalendarioContext();
    const [openEditar, setOpenEditar] = useState(false);
    const handleEliminar = ()=>{
        const tipoComidaId = TIPO_COMIDA_MAP[receta.tipoComida]

        const dtoDelete: EliminarReceta= {
            tipo_comida_id: tipoComidaId,
            fecha: fecha
        }

        eliminarRecetaDeCalendario(dtoDelete)
        refrescar()
    }
    
    return(
        <Card className="h-full w-full flex flex-col rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group p-0 gap-0 min-h-[33vh]">
            <CardHeader className="px-3 py-2 flex justify-between items-center bg-gray-50 shrink-0">
                <CardTitle className="flex flex-row gap-1 items-center text-lg font-semibold text-gray-600">
                    <span className="p-1.5 border border-gray-300 rounded-xl bg-green-500 text-white">
                        <Utensils className="w-3 h-3" />
                    </span>
                    {receta.tipoComida}
                </CardTitle>
                <CardAction className="flex flex-row gap-1 items-center">
                    <Button
                        onClick={() => setOpenEditar(true)}
                        size="icon-sm"
                        className="border border-gray-300 rounded-xl bg-green-500 text-white hover:bg-green-600 transition-colors"
                    >
                    <Pencil />
                    </Button>

                    <Button
                        onClick={handleEliminar}
                        size="icon-sm"
                        className="py-3 border border-gray-300 rounded-xl bg-red-500 text-white hover:bg-red-600 transition-colors"
                    >
                        <Trash2 />
                    </Button>
                </CardAction>
            </CardHeader>

            <CardContent className="p-0 flex flex-col flex-1 min-h-0">
                <div className="relative w-full aspect-[16/7] shrink-0 overflow-hidden">
                    <Image
                        src={receta.imagen}
                        alt={receta.titulo}
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="flex flex-col flex-1 min-h-0 px-3 py-2">
                    <p className="font-bold text-lg line-clamp-3">{receta.titulo}</p>
                    <p className="text-sm text-gray-600 line-clamp-4 mt-1">{receta.descripcion}</p>
                    <div className={`flex flex-row mt-auto pt-2 items-center ${modoControl ? 'justify-between' : 'justify-end'}`}>
                        {
                            modoControl && (
                                <p className="flex flex-row items-center gap-1 rounded-xl bg-gray-100 px-2 py-1 text-xs text-gray-600">
                                    <Flame className="w-3 h-3 text-green-500" />
                                    {receta.calorias} kcal
                                </p>
                            )
                        }
                        <p className="flex flex-row items-center gap-1 text-xs text-gray-600 px-2 py-1">
                            <Clock className="w-3 h-3 text-green-500" />
                            {receta.tiempoPreparacion} min
                        </p>
                    </div>
                </div>
            </CardContent>
            <EditarDialog
                open={openEditar}
                onOpenChange={setOpenEditar}
                fecha={fecha}
                tipoComida={receta.tipoComida}
            />
        </Card>
    );
}