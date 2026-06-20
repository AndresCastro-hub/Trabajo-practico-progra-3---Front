import { SelectorReceta } from "./SelectorReceta";
import { useAsignarReceta } from "../hooks/useAsignarReceta";
import { AsignarRecetaTabs } from "./AsignarRecetaTabs";
import { TIPO_COMIDA_MAP } from "../constants/calendario.constants"
import { useCalendarioContext } from "../context/CalendarioContext";
import { CheckCircle } from "lucide-react";

interface AsignarRecetaFormProps {
    fecha: string,
    tipoComida: string,
}

export function AsignarRecetaForm({ fecha, tipoComida }: AsignarRecetaFormProps) {
    const { refrescar } = useCalendarioContext();
    const {
        recetas, hayMas,
        recetaSeleccionada, loading,
        activeTab, busqueda,
        handleTabChange, handleBusqueda, handleCargarMas, handleAsignar, setRecetaSeleccionada,
        clearFeedback,
    } = useAsignarReceta(fecha, TIPO_COMIDA_MAP[tipoComida], refrescar);

    return (
        <div className="flex flex-col gap-4 min-h-[320px]">
            <AsignarRecetaTabs activeTab={activeTab} handleTabChange={handleTabChange} />

            <SelectorReceta
                recetas={recetas}
                seleccion={{ actual: recetaSeleccionada, set: setRecetaSeleccionada }}
                busqueda={{ texto: busqueda, onSearch: handleBusqueda }}
                paginacion={{ hayMas, loading, onCargarMas: handleCargarMas }}
                clearFeedback={clearFeedback}
            />

            <button
                disabled={!recetaSeleccionada || loading}
                onClick={handleAsignar}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all bg-green-500 hover:bg-green-600 text-white disabled:opacity-50 disabled:cursor-not-allowed mt-auto"
            >
                <CheckCircle className="w-4 h-4" />
                {loading ? "Asignando..." : "Confirmar asignación"}
            </button>
        </div>
    )
}