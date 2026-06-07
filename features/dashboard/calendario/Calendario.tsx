import { CarouselCalendario } from "./components/CarouselCalendario";
import { ChevronLeft, ChevronRight  } from 'lucide-react';

export default function Calendario (){
    const hoy = new Date().toLocaleDateString('es-ES', { day: '2-digit'});
    const fin = new Date();
    fin.setDate(fin.getDate() + 6);
    const finSemana = fin.toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' });
    return (
        <>
            <div className="flex flex-row justify-between items-center p-4">
                <div>
                    <h1 className="text-lg font-bold text-green-500">Vista semanal</h1>
                    <h2 className="text-xl font-bold">Semana del {hoy} al {finSemana}</h2>
                </div>
                <div className="flex gap-2">
                    <button className="bg-grey-300 text-black font-bold px-2 py-2 rounded-full border border-gray-300">
                        <ChevronLeft />
                    </button>
                    <button className="bg-grey-300 text-black font-bold px-4 py-2 rounded-xl border border-gray-300">{`Hoy`}</button>
                    <button className="bg-grey-300 text-black font-bold px-2 py-2 rounded-full border border-gray-300">
                        <ChevronRight />
                    </button>
                </div>
            </div>
            <hr className="border-gray-300 mb-4" />
            <div className="flex flex-col gap-4 items-center">
                <CarouselCalendario />
            </div>
        </>
    )
}