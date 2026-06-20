import { Activity, ChevronLeft, ChevronRight } from "lucide-react";
import { useModoControl } from "@/context/ModoControlContext"
import { rangoSemana } from "../utils/calendario.utils";
import { useCalendarioContext } from "../context/CalendarioContext";
import moment from 'moment';

export function CalendarioHeader() {
    const { modoControl, onToggleModoControl } = useModoControl();
    const { fechaActual, setFechaActual } = useCalendarioContext();
    const rangoSemanal = rangoSemana(fechaActual);

    return (
        <div className="flex flex-col gap-3 p-4 sm:flex-row sm:justify-between sm:items-center">
            <div>
                <h1 className="text-lg font-bold text-green-500 sm:text-2xl">Vista semanal</h1>
                <h2 className="text-xl font-bold text-slate-900 sm:text-3xl">Semana del {rangoSemanal}</h2>
            </div>

            <div className="flex flex-wrap items-center gap-2">
                <button
                    onClick={onToggleModoControl}
                    className={`flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full border transition-all ${
                        modoControl
                            ? "bg-green-50 border-green-200 text-green-700"
                            : "bg-gray-100 border-gray-200 text-gray-500"
                    }`}
                >
                    <Activity className={`w-4 h-4 ${modoControl ? "text-green-500" : "text-gray-400"}`} />
                    Modo control {modoControl ? "ON" : "OFF"}
                </button>

                <div className="flex items-center gap-1">
                    <button
                        className="text-black p-2 rounded-full border border-gray-300 hover:bg-green-500 hover:text-white transition-colors"
                        onClick={() => setFechaActual(moment(fechaActual).subtract(7, 'days').format('YYYY-MM-DD'))}
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>

                    <button
                        className="text-black font-bold px-3 py-2 text-xs rounded-xl border border-gray-300 hover:bg-green-500 hover:text-white transition-colors sm:text-sm sm:px-4"
                        onClick={() => setFechaActual(moment().format('YYYY-MM-DD'))}
                    >
                        Semana Actual
                    </button>

                    <button
                        className="text-black p-2 rounded-full border border-gray-300 hover:bg-green-500 hover:text-white transition-colors"
                        onClick={() => setFechaActual(moment(fechaActual).add(7, 'days').format('YYYY-MM-DD'))}
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    )
}