import IngredientesTable from "./IngredientesTable";
import IngredientesHeader from "./IngredientesHeader";
import { useSearch } from "../../hooks/useSearch";

export default function IngredientesTab() {
    const { busqueda, setBusqueda, resultados } = useSearch();
    return (
        <>
            <IngredientesHeader  busqueda={busqueda} setBusqueda={setBusqueda} />
            <IngredientesTable resultados={resultados}/>
        </>
    )
}