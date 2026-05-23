import IngredientesTable from "./IngredientesTable";
import IngredientesHeader from "./IngredientesHeader";
import { IIngredientResponse } from "../../services/ingredientService";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface IIngredientesTabProps {
    busqueda: string;
    setBusqueda: (v: string) => void;
    pagina: number;
    setPagina: (v: number) => void;
    resultados: IIngredientResponse[];
    error: string | null;
}

export default function IngredientesTab({ busqueda, setBusqueda, pagina, setPagina, resultados, error }: IIngredientesTabProps) {
    return (
        <>
            <IngredientesHeader  busqueda={busqueda} setBusqueda={setBusqueda} />
            <IngredientesTable resultados={resultados} pagina={pagina} setPagina={setPagina} />
            {error && (
                <Alert variant="destructive">
                    <AlertCircle size={16} />
                    <AlertDescription>Error al cargar los ingredientes: {error}</AlertDescription>
                </Alert>
            )} 
        </>
    )
}