import { useState, useEffect } from "react"
import { obtenerTodasLasRecetas } from "../services/obtenerTodasLasRecetas"
import { ActiveTab, IReceta } from "../types/recetario.types"

const useRecetario = () => {
    const [filters, setFilters] = useState({
        page: 1,
        search: "",
        activeTab: "plataforma" as ActiveTab,
    })
    const [recetas, setRecetas] = useState<IReceta[]>([])
    const [totalPages, setTotalPages] = useState<number>(1)
    const [total, setTotal] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetch = async () => {
            setLoading(true)
            setError(null)
            try {
                const result = await obtenerTodasLasRecetas({
                    page: filters.page - 1,
                    nombre: filters.search || undefined,
                    recetasPlataforma: filters.activeTab === "plataforma",
                })
                setRecetas(result.recipeDto)
                setTotal(result.totalRecords)
                setTotalPages(Math.ceil(result.totalPages))
            } catch (err: unknown) {
                setRecetas([])
                setTotalPages(0)
                setError(err instanceof Error ? err.message : "Error al cargar las recetas")
            } finally {
                setLoading(false)
            }
        }

        fetch()
    }, [filters])

    const handleTabChange = (tab: ActiveTab) =>
        setFilters(prev => ({ ...prev, activeTab: tab, page: 1 }))

    const handleSearch = (value: string) =>
        setFilters(prev => ({ ...prev, search: value, page: 1 }))

    const handlePageChange = (page: number) =>
        setFilters(prev => ({ ...prev, page }))

    return {
        recetas,
        total,
        totalPages,
        actualPage: filters.page,
        activeTab: filters.activeTab,
        loading,
        error,
        handleTabChange,
        handleSearch,
        handlePageChange,
    }
}

export default useRecetario