import { useState, useEffect } from "react";
import { getIngredients, IIngredientResponse } from "../services/ingredientService";

export const LIMITE_POR_PAGINA = 10;

export function useIngredientsSearch() {
    const [busqueda, setBusqueda] = useState<string>("");
    const [pagina, setPagina] = useState<number>(0);
    const [resultados, setResultados] = useState<IIngredientResponse[]>([]);

    useEffect(() => {
        const timer = setTimeout(async () => {
            const offset = pagina * LIMITE_POR_PAGINA;
            const data = await getIngredients(LIMITE_POR_PAGINA, offset);
            setResultados(data);
        }, 300);

        return () => clearTimeout(timer);
    }, [busqueda, pagina]);

    return { busqueda, setBusqueda, pagina, setPagina, resultados };
}