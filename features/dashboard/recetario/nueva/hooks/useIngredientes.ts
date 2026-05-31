import { useState, useEffect } from "react"
import { obtenerTodosLosIngredientes } from "../services/ingredientesService"

interface Ingrediente {
    id: number
    nombre: string
    unidad: string
}

export function useIngredientes() {
    const [ingredientes, setIngredientes] = useState<Ingrediente[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchIngredientes = async () => {
            try {
                const data = await obtenerTodosLosIngredientes()
                setIngredientes(data)
            } catch{
                setError('Error al cargar los ingredientes')
            } finally {
                setLoading(false)
            }
        }

        fetchIngredientes()
    }, [])

    return { ingredientes, loading, error }
}