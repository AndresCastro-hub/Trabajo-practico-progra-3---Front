import IngredientesTable from "./IngredientesTable";
import IngredientesHeader from "./IngredientesHeader";
import { IIngredientResponse } from "../../services/ingredientService";

interface IIngredientesTabProps {
    busqueda: string;
    setBusqueda: (v: string) => void;
    pagina: number;
    setPagina: (v: number) => void;
    resultados: IIngredientResponse[];
}

export default function IngredientesTab({ busqueda, setBusqueda, pagina, setPagina, resultados }: IIngredientesTabProps) {
    return (
        <>
            <IngredientesHeader  busqueda={busqueda} setBusqueda={setBusqueda} />
            <IngredientesTable resultados={resultados} pagina={pagina} setPagina={setPagina} />
        </>
    )
}