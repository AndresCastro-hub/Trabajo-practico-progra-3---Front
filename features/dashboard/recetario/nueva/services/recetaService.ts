import { INestError } from "@/interface/apiResponse";
import { CrearRecetaDTO } from "../types/receta.dto";
import { getTokenFromCookie } from "@/hooks/useAuth";

export const crearReceta = async (data: CrearRecetaDTO) => {

    const response = await fetch('http://localhost:5000/recipes', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getTokenFromCookie()}`
        },
        body: JSON.stringify(data)
    })

    if (!response.ok) {
        const error: INestError = await response.json()
        throw error
    }

    return response.json()
}

export const subirImagenReceta = async (recetaId: number, imagen: File) => {
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