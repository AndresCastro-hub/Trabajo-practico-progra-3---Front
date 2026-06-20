import { http } from "@/lib/utils/httpClient";
import { INestError } from "@/interface/apiResponse";
import { IRecetasParams, IRecetasResponse } from "../types/recetario.types";

export const obtenerTodasLasRecetas = async ({ page, nombre, recetasPlataforma }: IRecetasParams): Promise<IRecetasResponse> => {
    try {
        const params = new URLSearchParams({
            page: String(page),
            recetasPlataforma: String(recetasPlataforma),
            ...(nombre ? { nombre } : {}),
        });

        const data = await http.get<IRecetasResponse>(`/recipes?${params}`);

        if (data.recipeDto.length === 0) throw new Error("No se encontraron recetas.");

        return data;
    } catch (err) {
        const error = err as INestError;
        const message = Array.isArray(error.message) ? error.message[0] : error.message;
        throw new Error(message || "Error al obtener recetas");
    }
};