import { INestError } from "@/interface/apiResponse";
import { getTokenFromCookie } from "@/hooks/useAuth";

export const obtenerTodosLosIngredientes = async () => {

    const response = await fetch('http://localhost:5000/ingredients/all', {
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
