"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Pencil, Trash2, Clock, Flame, Utensils } from 'lucide-react';
import Image from "next/image";
import { EliminarReceta, IComida } from "../types/calendario.types";
import { useModoControl } from "@/context/ModoControlContext"
import { eliminarRecetaDeCalendario } from "../service/calendarioService";
import { useCalendarioContext } from "../context/CalendarioContext";
import { TIPO_COMIDA_MAP } from "../constants/calendario.constants";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { TipoNotificacion, useNotificacion } from "@/context/NotificacionContext";
import { useState } from "react";
import { EditarDialog } from "./EditarDialog";

interface IComidaCard {
    receta: IComida
    fecha: string
}

export function ComidaCard({ receta, fecha }: IComidaCard) {
    const { modoControl } = useModoControl();
    const { refrescar } = useCalendarioContext();
    const { mostrarNotificacion } = useNotificacion();
    const [openEditar, setOpenEditar] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);

    const handleEliminar = async () => {
        try {
            const tipoComidaId = TIPO_COMIDA_MAP[receta.tipoComida]
            const dtoDelete: EliminarReceta = {
                tipo_comida_id: tipoComidaId,
                fecha: fecha
            }
            await eliminarRecetaDeCalendario(dtoDelete)
            mostrarNotificacion("Receta eliminada del calendario.", TipoNotificacion.SUCCESS)
            refrescar()
        } catch {
            mostrarNotificacion("Error al eliminar la receta.", TipoNotificacion.ERROR)
        }
    }

    return (
        <Card className="w-full flex flex-col rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-0 gap-0">
            <div className="flex flex-row justify-between items-center px-3 py-2 bg-gray-50 border-b border-gray-100">
                <span className="flex flex-row items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    <span className="p-1 rounded-lg bg-green-500 text-white">
                        <Utensils className="w-3 h-3" />
                    </span>
                    {receta.tipoComida}
                </span>
                <div className="flex flex-row gap-1">
                    <Button
                        onClick={() => setOpenEditar(true)}
                        size="icon-sm"
                        className="border border-gray-200 rounded-lg bg-white text-gray-500 hover:bg-green-50 hover:text-green-600 hover:border-green-200 transition-colors shadow-none"
                    >
                        <Pencil className="w-3 h-3" />
                    </Button>
                    <Button
                        onClick={() => setOpenConfirm(true)}
                        size="icon-sm"
                        className="border border-gray-200 rounded-lg bg-white text-gray-500 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-colors shadow-none"
                    >
                        <Trash2 className="w-3 h-3" />
                    </Button>
                </div>
            </div>

            <div className="relative w-full h-[120px] shrink-0 overflow-hidden">
                <Image
                    src={receta.imagen}
                    alt={receta.titulo}
                    fill
                    className="object-cover"
                />
            </div>

            <CardContent className="px-3 py-2 flex flex-col gap-1">
                <p className="font-semibold text-sm text-gray-800 line-clamp-1">{receta.titulo}</p>
                <p className="text-xs text-gray-500 line-clamp-2">{receta.descripcion}</p>
                <div className={`flex flex-row mt-1 items-center gap-3 ${modoControl ? 'justify-between' : 'justify-end'}`}>
                    {modoControl && (
                        <span className="flex flex-row items-center gap-1 text-xs text-gray-500">
                            <Flame className="w-3 h-3 text-green-500" />
                            {receta.calorias} kcal
                        </span>
                    )}
                    <span className="flex flex-row items-center gap-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3 text-green-500" />
                        {receta.tiempoPreparacion} min
                    </span>
                </div>
            </CardContent>

            <EditarDialog
                open={openEditar}
                onOpenChange={setOpenEditar}
                fecha={fecha}
                tipoComida={receta.tipoComida}
            />

            <ConfirmDialog
                open={openConfirm}
                onOpenChange={setOpenConfirm}
                titulo="¿Eliminar receta?"
                descripcion={`Esta acción no se puede deshacer. ¿Estás seguro que querés eliminar "${receta.titulo}" del calendario?`}
                onConfirm={handleEliminar}
            />
        </Card>
    );
}