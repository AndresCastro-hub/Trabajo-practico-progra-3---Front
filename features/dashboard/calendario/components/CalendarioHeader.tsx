import { ChevronLeft, ChevronRight } from "lucide-react";
import moment from 'moment';

interface CalendarioHeaderProps {
    fechaActual: string;
    setFechaActual: (fecha: string) => void;
}

export function CalendarioHeader({fechaActual, setFechaActual}: CalendarioHeaderProps) {

    const rangoSemana = (moment(fechaActual).format('MM') === moment(fechaActual).add(6, 'days').format('MM'))          ?
        `${moment(fechaActual).format('DD')} al ${moment(fechaActual).add(6, 'days').format('D [de] MMMM')}`            :
        `${moment(fechaActual).format('D [de] MMMM')} al ${moment(fechaActual).add(6, 'days').format('D [de] MMMM')}`;

    return (
        <div className="flex flex-row justify-between items-center p-4">
            <div>
                <h1 className="text-lg font-bold text-green-500">Vista semanal</h1>
                <h2 className="text-xl font-bold">Semana del {rangoSemana}</h2>
            </div>
            <div className="flex gap-2">
                <button
                    className="bg-grey-300 text-black font-bold px-2 py-2 rounded-full border border-gray-300 hover:bg-green-500 hover:text-white transition-colors"
                    onClick={() => setFechaActual(moment(fechaActual).subtract(7, 'days').format('YYYY-MM-DD'))}   
                >
                    <ChevronLeft />
                </button>

                <button
                    className="bg-grey-300 text-black font-bold px-4 py-2 rounded-xl border border-gray-300 hover:bg-green-500 hover:text-white transition-colors"
                    onClick={() => setFechaActual(moment().format('YYYY-MM-DD'))}    
                >
                    {`Semana Actual`}
                </button>
                
                <button
                    className="bg-grey-300 text-black font-bold px-2 py-2 rounded-full border border-gray-300 hover:bg-green-500 hover:text-white transition-colors"
                    onClick={() => setFechaActual(moment(fechaActual).add(7, 'days').format('YYYY-MM-DD'))}
                >
                    <ChevronRight />
                </button>
            </div>
        </div>
    )
}