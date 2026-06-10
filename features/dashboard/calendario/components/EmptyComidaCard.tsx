"use client";
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from 'lucide-react';

export function EmptyComidaCard({ tipoComida }: { tipoComida: string }) {
    return(
        <div className="w-full h-full min-h-[33vh]">
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" className="border-2 border-dashed rounded-2xl w-full h-full flex flex-col gap-2">
                        <Plus size={500} className="text-gray-600" />
                        <span className="text-xl font-semibold text-gray-600">{` Agregar ${tipoComida}`}</span>
                    </Button>
                </DialogTrigger>

                <DialogContent className="bg-white border border-border rounded-xl">
                    <DialogHeader>
                        <DialogTitle>ASIGNAR RECETA</DialogTitle>
                    </DialogHeader>
                
                    <p>FORM ASIGNAR RECETA</p>
                </DialogContent>
            </Dialog>
        </div>
    );
}   