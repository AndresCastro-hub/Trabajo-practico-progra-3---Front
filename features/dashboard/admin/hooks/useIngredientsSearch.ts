import { useState, useEffect, useCallback } from "react";
import { getIngredients, IIngredientResponse } from "../services/ingredientService";

export const LIMITE_POR_PAGINA = 10;

export function useIngredientsSearch() {
    const [busqueda, setBusqueda] = useState<string>("");
    const [busquedaConfirmada, setBusquedaConfirmada] = useState("")
    const [pagina, setPagina] = useState<number>(0);
    const [resultados, setResultados] = useState<IIngredientResponse[]>([]);
    const [error, setError] = useState<string | null>(null);

    const fetchIngredients = useCallback(async () => {
        try {
            const offset = pagina * LIMITE_POR_PAGINA
            const data = await getIngredients(LIMITE_POR_PAGINA, offset, busquedaConfirmada)
            setResultados(data)
            setError(null)
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Error inesperado");
            }
        }
    }, [busquedaConfirmada, pagina]);

    useEffect(() => {
        fetchIngredients()
    }, [fetchIngredients])

    const handleSearch = (busqueda: string) => {
        setPagina(0)
        setBusquedaConfirmada(busqueda)
    }

    return { busqueda, setBusqueda, pagina, setPagina, resultados, error, handleSearch };
}