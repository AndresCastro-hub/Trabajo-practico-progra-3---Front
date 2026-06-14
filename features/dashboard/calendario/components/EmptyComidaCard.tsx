"use client";
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from 'lucide-react';
import { AsignarRecetaForm } from './AsignarRecetaForm'

interface EmptyComidaCardProps {
    tipoComida: string;
    fecha: string;
}

export function EmptyComidaCard({ tipoComida, fecha }: EmptyComidaCardProps ) {
    return(
        <div className="w-full h-full min-h-[33vh]">
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" className="border-2 border-dashed rounded-2xl w-full h-full flex flex-col gap-2">
                        <Plus size={500} className="text-gray-600" />
                        <span className="text-xl font-semibold text-gray-600">{` Agregar ${tipoComida}`}</span>
                    </Button>
                </DialogTrigger>

                <DialogContent className="bg-white border border-border rounded-xl min-h-[33vh] flex flex-col">
                    <DialogHeader>
                        <DialogTitle className='text-center text-gray-600 text-lg'>Asignar Receta</DialogTitle>
                        <hr/>
                    </DialogHeader>
                
                    <AsignarRecetaForm fecha={fecha} tipoComida={tipoComida} />
                </DialogContent>
            </Dialog>
        </div>
    );
}