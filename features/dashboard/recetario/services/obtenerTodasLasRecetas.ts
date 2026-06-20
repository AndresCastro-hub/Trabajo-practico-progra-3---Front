import { getTokenFromCookie } from "@/hooks/useAuth"
import { INestError } from "@/interface/apiResponse"
import { IRecetasParams, IRecetasResponse } from "../types/recetario.types"

export const obtenerTodasLasRecetas = async ({page, nombre, recetasPlataforma}: IRecetasParams): Promise<IRecetasResponse> => {
    try {
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
            const error: INestError = await response.json();
            const message = Array.isArray(error.message) ? error.message[0] : error.message;
            throw new Error(message || "Error al obtener receta");
        }

        const data: IRecetasResponse = await response.json()

        if(data.recipeDto.length === 0 ) throw new Error("No se encontraron recetas.");
        
        return data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }

        throw new Error("Error inesperado");
    }
}