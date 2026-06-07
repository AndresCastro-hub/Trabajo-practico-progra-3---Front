import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Utensils } from 'lucide-react';
import { Pencil, Trash2, Clock, Flame } from 'lucide-react';
import Image from "next/image";

export function ComidaCard() {
    return(
        <Card className="w-full p-0 m-0 flex flex-col gap-0 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
            <CardHeader className="px-2 py-3 flex justify-between items-center bg-gray-50">
                <CardTitle className="flex flex-row gap-1 items-center">
                    <span className="p-1.5 border border-gray-300 rounded-xl bg-green-500 text-white"><Utensils className="w-4 h-4" /></span>
                    Almuerzo
                </CardTitle>
                
                <CardAction className="flex flex-row gap-1 items-center">
                    <span className="p-1 border border-gray-300 rounded-xl bg-green-500 text-white"><Pencil className="w-4 h-4" /></span>
                    <span className="p-1 border border-gray-300 rounded-xl bg-red-500 text-white"><Trash2 className="w-4 h-4 " /></span>
                </CardAction>
            </CardHeader>
            <CardContent className="p-0 m-0">
                <Image
                    src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg"
                    alt="Imagen de la comida"
                    width={300}
                    height={200}
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <p className="font-bold text-lg pl-4">Titulo</p>
                <p className="text-muted-foreground text-md pl-4">Descripcion</p>
            
                <div className="flex flex-row justify-between gap-4 items-center bg-white-1000 px-4 py-3">
                    <p className="flex flex-row items-center gap-1 rounded-xl bg-gray-100 px-2 py-1 text-gray-600">
                        <Flame className="w-4 h-4 text-green-500" />
                        500 kcal
                    </p>
                    <p className="flex flex-row items-center gap-1 rounded-xl px-2 py-1 text-gray-600">
                        <Clock className="w-4 h-4 text-green-500" />
                        30 min
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}