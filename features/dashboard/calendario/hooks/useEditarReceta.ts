import { useState, useEffect } from "react";
import { ActiveTab, IReceta } from "@/features/dashboard/recetario/types/recetario.types";
import { obtenerTodasLasRecetas } from "@/features/dashboard/recetario/services/obtenerTodasLasRecetas";
import { EditarRecetaDelCalendario } from "../service/calendarioService";

export function useEditarReceta(fecha: string, tipoComida: number, onAsignado: () => void) {
    const [filters, setFilters] = useState({
        tab: "plataforma" as ActiveTab,
        busqueda: "",
        page: 1,
    });
    const [recetas, setRecetas] = useState<IReceta[]>([]);
    const [hayMas, setHayMas] = useState(false);
    const [loading, setLoading] = useState(false);
    const [recetaSeleccionada, setRecetaSeleccionada] = useState<IReceta | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [recetaEditada, setRecetaEditada] = useState<IReceta | null>(null);

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            setError(null);
            try {
                const result = await obtenerTodasLasRecetas({
                    page: filters.page - 1,
                    nombre: filters.busqueda || undefined,
                    recetasPlataforma: filters.tab === "plataforma",
                });

                setRecetas(prev =>
                    filters.page === 1
                    ? result.recipeDto
                    : [...prev, ...result.recipeDto]
                );
                setHayMas(filters.page < result.totalPages);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Error al cargar las recetas")
            } finally {
                setLoading(false);
            }
        }
        fetch();

    },[filters]);

    const handleTabChange = (tab: ActiveTab) => {
        setFilters({ tab, busqueda: "", page: 1 });
        setRecetaSeleccionada(null);
    }

    const handleBusqueda = (busqueda: string) =>
        setFilters(prev => ({ ...prev, busqueda, page: 1 }));

    const handleCargarMas = () =>
        setFilters(prev => ({ ...prev, page: prev.page + 1 }));

    const handleEditar = async () => {
        if (!recetaSeleccionada) return;
        try{
            await EditarRecetaDelCalendario({
                fecha,
                tipo_comida_id: tipoComida,
                receta_id: recetaSeleccionada.id,
            });
            setRecetaEditada(recetaSeleccionada);
            onAsignado();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error al cargar las recetas")
        }
    };

    return {
        recetas, hayMas, loading, error,
        recetaSeleccionada, setRecetaSeleccionada,
        activeTab: filters.tab,
        busqueda: filters.busqueda,
        recetaEditada,
        handleTabChange, handleBusqueda, handleCargarMas, handleEditar,
    };
}
