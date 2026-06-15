import { getTokenFromCookie } from "@/hooks/useAuth"
import { IRecetaDetalle } from "../../types/recetario.types"

export const getRecetaById = async (id: string): Promise<IRecetaDetalle> => {
    const response = await fetch(`http://localhost:5000/recipes/${id}`,{
        headers: {
            'Authorization': `Bearer ${getTokenFromCookie()}`
        }
    })

    return response.json()
}