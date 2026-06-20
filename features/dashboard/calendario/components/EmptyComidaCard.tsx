"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Utensils } from 'lucide-react';
import { AsignarRecetaForm } from './AsignarRecetaForm'

interface EmptyComidaCardProps {
    tipoComida: string;
    fecha: string;
}

export function EmptyComidaCard({ tipoComida, fecha }: EmptyComidaCardProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="w-full border-2 border-dashed border-gray-200 rounded-2xl py-6 flex flex-col items-center justify-center gap-1.5 text-gray-400 hover:border-green-400 hover:text-green-500 hover:bg-green-50 transition-all cursor-pointer">
                    <Plus className="w-5 h-5" />
                    <span className="text-sm font-medium">+ {tipoComida}</span>
                </button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md p-0 rounded-2xl">
                <DialogHeader className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-5">
                    <div className="flex items-center gap-3">
                        <div className="bg-white/20 p-2 rounded-xl">
                            <Utensils className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <DialogTitle className="text-white text-lg font-bold">
                                Asignar receta
                            </DialogTitle>
                            <p className="text-green-100 text-xs mt-0.5">
                                {tipoComida} · {fecha}
                            </p>
                        </div>
                    </div>
                </DialogHeader>

                <div className="px-6 py-4">
                    <AsignarRecetaForm fecha={fecha} tipoComida={tipoComida} />
                </div>
            </DialogContent>
        </Dialog>
    );
}