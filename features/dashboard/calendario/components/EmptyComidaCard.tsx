"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from 'lucide-react';
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

            <DialogContent className="bg-white border border-border rounded-xl flex flex-col">
                <DialogHeader>
                    <DialogTitle className="text-center text-gray-600 text-lg">Asignar Receta</DialogTitle>
                    <hr />
                </DialogHeader>
                <AsignarRecetaForm fecha={fecha} tipoComida={tipoComida} />
            </DialogContent>
        </Dialog>
    );
}