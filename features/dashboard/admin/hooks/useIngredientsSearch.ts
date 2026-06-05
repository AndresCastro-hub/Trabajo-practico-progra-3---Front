import { useState, useEffect, useCallback } from "react";
import { getIngredients } from "../services/ingredientService";
import { IIngredient } from "../types/adminTypes";

export function useIngredientsSearch() {
    const [filters, setFilters] = useState({
        page: 1,
        search: "",
    });
    const [ingredientes, setIngredientes] = useState<IIngredient[]>([]);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [total, setTotal] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchIngredients = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getIngredients(filters.page, filters.search);
            setIngredientes(data.ingredients);
            setTotal(data.totalRecords);
            setTotalPages(data.totalPages);
            setError(null)
        } catch (err: unknown) {
            setIngredientes([])
            setTotalPages(0)
            setError(err instanceof Error ? err.message : "Error al cargar los ingredientes")
        } finally {
            setLoading(false);
        }
    }, [filters]);

    useEffect(() => {
        fetchIngredients()
    }, [fetchIngredients])

    const handleSearch = (value: string) =>
        setFilters(prev => ({ ...prev, search: value, page: 1 }))

    const handlePageChange = (page: number) =>
        setFilters(prev => ({ ...prev, page }))

    return { ingredientes, totalPages, actualPage: filters.page, total, loading, error, handleSearch, handlePageChange };
}