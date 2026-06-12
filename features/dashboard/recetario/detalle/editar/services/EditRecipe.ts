import { getTokenFromCookie } from "@/hooks/useAuth"
import { INestError } from "@/interface/apiResponse"
import { EditarRecetaDto } from "../../../nueva/types/receta.dto"

export const editarReceta = async (id: string, data: EditarRecetaDto) =>{
    const response = await fetch(`http://localhost:5000/recipes/${id}/editar`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
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