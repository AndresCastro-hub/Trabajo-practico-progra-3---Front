import IngredientesTable from "./IngredientesTable";
import IngredientesHeader from "./IngredientesHeader";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useIngredientsSearch } from "../../hooks/useIngredientsSearch";

export default function IngredientesTab() {
    const { busqueda, setBusqueda, pagina, setPagina, resultados, error } = useIngredientsSearch();
    return (
        <>
            <IngredientesHeader  busqueda={busqueda} setBusqueda={setBusqueda} />
            <IngredientesTable ingredientes={resultados} pagina={pagina} setPagina={setPagina} />
            {error && (
                <Alert variant="destructive">
                    <AlertCircle size={16} />
                    <AlertDescription>Error al cargar los ingredientes: {error}</AlertDescription>
                </Alert>
            )} 
        </>
    )
}