import { SelectorReceta } from "./SelectorReceta";
import { Button } from "@/components/ui/button";
import { useAsignarReceta } from "../hooks/useAsignarReceta";
import { useRouter } from "next/navigation";
import ErrorState from "@/components/ErrorState";
import { AsignarRecetaTabs } from "./AsignarRecetaTabs";

interface AsignarRecetaFormProps {
    fecha: string;
    tipoComida: string;
}

const mapTipoComidaToId: Record<string, number> = {
    "Almuerzo": 1,
    "Cena": 2,
}

export function AsignarRecetaForm({ fecha, tipoComida } : AsignarRecetaFormProps) {
    const router = useRouter();
    const {
        recetas, hayMas, loading, error,
        recetaSeleccionada,
        activeTab,
        busqueda,
        handleTabChange, handleBusqueda, handleCargarMas, handleAsignar, setRecetaSeleccionada
    } = useAsignarReceta(fecha, mapTipoComidaToId[tipoComida]);

    if (error) return ( <ErrorState message={error} onBack={() => router.refresh()} /> );

    return(
        <>
            <div className="bg-white border-b border-gray-100 flex flex-col items-center gap-15">
                <AsignarRecetaTabs activeTab={activeTab} handleTabChange={handleTabChange} />

                <SelectorReceta recetas={recetas} recetaSeleccionada={recetaSeleccionada} setRecetaSeleccionada={setRecetaSeleccionada} onSearch={handleBusqueda} busqueda={busqueda} hayMas={hayMas} loading={loading} handleCargarMas={handleCargarMas} />
            
            
                <Button className="w-50 self-center mb-4" disabled={!recetaSeleccionada || loading} onClick={handleAsignar}>
                    Asignar
                </Button>
            </div>
        </>
    )
}