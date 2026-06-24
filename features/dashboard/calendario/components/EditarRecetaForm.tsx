import { SelectorReceta } from "./SelectorReceta";
import { AsignarRecetaTabs } from "./AsignarRecetaTabs";
import { TIPO_COMIDA_MAP } from "../constants/calendario.constants"
import { useCalendarioContext } from "../context/CalendarioContext";
import { useEditarReceta } from "../hooks/useEditarReceta";
import { CheckCircle } from "lucide-react";

interface AsignarRecetaFormProps {
    fecha: string,
    tipoComida: string,
}

export function EditarRecetaForm({ fecha, tipoComida }: AsignarRecetaFormProps) {
    const { refrescar } = useCalendarioContext();
    const {
        recetas, hayMas,
        recetaSeleccionada, loading,
        activeTab, busqueda, clearFeedback,
        handleTabChange, handleBusqueda, handleCargarMas, handleEditar, setRecetaSeleccionada
    } = useEditarReceta(fecha, TIPO_COMIDA_MAP[tipoComida], refrescar);

    return (
         <div className="flex flex-col gap-4 min-h-[320px]">
            <AsignarRecetaTabs activeTab={activeTab} handleTabChange={handleTabChange} />

            <SelectorReceta
                clearFeedback={clearFeedback}
                recetas={recetas}
                seleccion={{ actual: recetaSeleccionada, set: setRecetaSeleccionada }}
                busqueda={{ texto: busqueda, onSearch: handleBusqueda }}
                paginacion={{ hayMas, loading, onCargarMas: handleCargarMas }}
            />

            <button
                disabled={!recetaSeleccionada || loading}
                onClick={handleEditar}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all bg-green-500 hover:bg-green-600 text-white disabled:opacity-50 disabled:cursor-not-allowed mt-auto"
            >
                <CheckCircle className="w-4 h-4" />
                {loading ? "Guardando..." : "Confirmar cambio"}
            </button>
        </div>
    )
}
