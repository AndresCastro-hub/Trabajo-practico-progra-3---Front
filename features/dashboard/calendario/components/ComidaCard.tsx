"use client"
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Utensils } from 'lucide-react';
import { Pencil, Trash2, Clock, Flame } from 'lucide-react';
import Image from "next/image";

export function ComidaCard({tipoComida}: {tipoComida: string}) {
    return(
        <Card className="h-full w-full flex flex-col rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group p-0 gap-0">
            <CardHeader className="px-3 py-2 flex justify-between items-center bg-gray-50 shrink-0">
                <CardTitle className="flex flex-row gap-1 items-center text-sm">
                    <span className="p-1.5 border border-gray-300 rounded-xl bg-green-500 text-white">
                        <Utensils className="w-3 h-3" />
                    </span>
                    {`${tipoComida}`}
                </CardTitle>
                
                <CardAction className="flex flex-row gap-1 items-center">
                    <Button
                        onClick={() => { /* Editar comida*/ }}
                        size="icon-sm"
                        className="border border-gray-300 rounded-xl bg-green-500 text-white hover:bg-green-600 transition-colors"
                    >
                        <Pencil />
                    </Button>
                    
                    <Button
                        onClick={() => { /* Eliminar comida*/ }}
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
                        src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg"
                        alt="Imagen de la comida"
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="flex flex-col flex-1 min-h-0 px-3 py-2">
                    <p className="font-bold text-lg line-clamp-3">Milanesa napolitana con fritas</p>
                    <div className="flex flex-row justify-between items-center mt-auto pt-2">
                        <p className="flex flex-row items-center gap-1 rounded-xl bg-gray-100 px-2 py-1 text-xs text-gray-600">
                            <Flame className="w-3 h-3 text-green-500" />
                            500 kcal
                        </p>
                        <p className="flex flex-row items-center gap-1 text-xs text-gray-600">
                            <Clock className="w-3 h-3 text-green-500" />
                            30 min
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}