import { getTokenFromCookie } from "@/hooks/useAuth"
import { INestError } from "@/interface/apiResponse"
import { IRecetasParams, IRecetasResponse } from "../types/recetario.types"

export const obtenerTodasLasRecetas = async ({page, nombre, recetasPlataforma}: IRecetasParams): Promise<IRecetasResponse> => {

    const params = new URLSearchParams({
        page: String(page),
        recetasPlataforma: String(recetasPlataforma),
        ...(nombre ? { nombre } : {}),
    })

    const response = await fetch(`http://localhost:5000/recipes?${params.toString()}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getTokenFromCookie()}`
        },
    })

    if (!response.ok) {
        const error: INestError = await response.json()
        throw error
    }

    return response.json()
}