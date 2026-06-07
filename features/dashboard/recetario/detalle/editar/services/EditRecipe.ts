import { getTokenFromCookie } from "@/hooks/useAuth"
import { INestError } from "@/interface/apiResponse"

export const editarReceta = async (id: string) =>{
    const response = await fetch(`http://localhost:5000/recipes/${id}/editar`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${getTokenFromCookie()}`
        },
    })

    if (!response.ok) {
            const error: INestError = await response.json()
            throw error
        }
    
    return response.json()
}