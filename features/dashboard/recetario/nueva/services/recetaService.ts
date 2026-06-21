import { getTokenFromCookie } from "@/hooks/useAuth";
import { CrearRecetaDTO, RecipeResponseDto } from "../types/receta.dto";
import { http } from "@/lib/utils/httpClient";

export const crearReceta = async (data: CrearRecetaDTO): Promise<RecipeResponseDto> => {
    return http.post("/recipes", data);
}

export const subirImagenReceta = async (recetaId: number, imagen: File): Promise<RecipeResponseDto> => {
    const formData = new FormData()
    formData.append("imagen", imagen)
    const response = await fetch(`http://localhost:5000/recipes/${recetaId}/imagen`, {
        headers: { "Authorization": `Bearer ${getTokenFromCookie()}` },
        method: 'PATCH',
        body: formData
    })

    if (!response.ok) {
        throw new Error("Error al subir la imagen")
    }

    return response.json()
}