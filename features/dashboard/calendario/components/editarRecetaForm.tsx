import { SelectorReceta } from "./SelectorReceta";
import { Button } from "@/components/ui/button";
import { AsignarRecetaTabs } from "./AsignarRecetaTabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { TIPO_COMIDA_MAP } from "../constants/calendario.constants"
import { useCalendarioContext } from "../context/CalendarioContext";
import { useEditarReceta } from "../hooks/useEditarReceta";

interface AsignarRecetaFormProps {
    fecha: string,
    tipoComida: string,
}

export function EditarRecetaForm({ fecha, tipoComida }: AsignarRecetaFormProps) {
    const { refrescar } = useCalendarioContext();
    const {
        recetas, hayMas,
        recetaEditada, recetaSeleccionada,
        loading, error,
        activeTab, busqueda, clearFeedback,
        handleTabChange, handleBusqueda, handleCargarMas, handleEditar, setRecetaSeleccionada
    } = useEditarReceta(fecha, TIPO_COMIDA_MAP[tipoComida], refrescar);

    return (
        <>
            <div className="flex flex-col items-center gap-15">
                <AsignarRecetaTabs activeTab={activeTab} handleTabChange={handleTabChange} />

                <SelectorReceta
                    clearFeedback={clearFeedback}
                    recetas={recetas}
                    seleccion={{ actual: recetaSeleccionada, set: setRecetaSeleccionada }}
                    busqueda={{ texto: busqueda, onSearch: handleBusqueda }}
                    paginacion={{ hayMas, loading, onCargarMas: handleCargarMas }}
                />

                <Button className="w-50 self-center mb-4" disabled={!recetaSeleccionada || loading || !!recetaEditada} onClick={handleEditar}>
                    Editar
                </Button>

                {error && (
                    <Alert variant="destructive">
                        <AlertCircle size={16} />
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                {recetaEditada && (
                    <Alert variant="default">
                        <AlertCircle size={16} color="#29c02cda" />
                        <AlertDescription>
                            <p className="text-green-600">
                                Receta editada: {recetaEditada.nombre}
                            </p>
                        </AlertDescription>
                    </Alert>
                )}
            </div>
        </>
    )
}