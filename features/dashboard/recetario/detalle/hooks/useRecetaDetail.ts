import { useState, useEffect, useCallback } from "react"
import { IRecetaDetalle } from "../../types/recetario.types"
import { getRecetaById } from "../service/recetaDetalleService"

const useRecetaDetail = (id: string) => {
    const [receta, setReceta] = useState<IRecetaDetalle | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    const fetchReceta = useCallback(async () => {
        setLoading(true)
        setError(null)
        try {
            const data = await getRecetaById(id)
            setReceta(data)
        } catch (err: unknown) {
              setError(err instanceof Error ? err.message : "Error al cargar la receta")
        } finally {
            setLoading(false)
        }
    }, [id])

    useEffect(() => {
        fetchReceta()
    }, [fetchReceta])

    return { receta, loading, error }
}

export default useRecetaDetail