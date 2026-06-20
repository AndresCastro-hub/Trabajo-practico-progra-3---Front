import { SelectorReceta } from "./SelectorReceta";
import { Button } from "@/components/ui/button";
import { useAsignarReceta } from "../hooks/useAsignarReceta";
import { AsignarRecetaTabs } from "./AsignarRecetaTabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { TIPO_COMIDA_MAP } from "../constants/calendario.constants"
import { useCalendarioContext } from "../context/CalendarioContext";

interface AsignarRecetaFormProps {
    fecha: string,
    tipoComida: string,
}

export function AsignarRecetaForm({ fecha, tipoComida }: AsignarRecetaFormProps) {
    const { refrescar } = useCalendarioContext();
    const {
        recetas, hayMas,
        recetaAsignada, recetaSeleccionada,
        loading, error,
        activeTab, busqueda,
        handleTabChange, handleBusqueda, handleCargarMas, handleAsignar, setRecetaSeleccionada,
        clearFeedback,
    } = useAsignarReceta(fecha, TIPO_COMIDA_MAP[tipoComida], refrescar);

    return(
        <>
            <div className="bg-white border-b border-gray-100 flex flex-col items-center gap-15">
                <AsignarRecetaTabs activeTab={activeTab} handleTabChange={handleTabChange} />
                
                {error && (
                    <Alert variant="destructive" className="w-full m-0">
                        <AlertCircle size={16} />
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                <SelectorReceta 
                    recetas={recetas} 
                    seleccion={{ actual: recetaSeleccionada, set: setRecetaSeleccionada }}
                    busqueda={{ texto: busqueda, onSearch: handleBusqueda }}
                    paginacion={{ hayMas, loading, onCargarMas: handleCargarMas }}
                    clearFeedback={clearFeedback}
                />
            
                <Button className="w-50 self-center mb-4" disabled={!recetaSeleccionada || loading || !!recetaAsignada} onClick={handleAsignar}>
                    Asignar
                </Button>

                {recetaAsignada && (
                <Alert variant="default">
                    <AlertCircle size={16}  color="#29c02cda" />
                    <AlertDescription>
                        <p className="text-green-600">
                            Receta asignada: {recetaAsignada.nombre}
                        </p>
                    </AlertDescription>
                </Alert>
            )}
            </div>
        </>
    )
}