import { getTokenFromCookie } from "@/hooks/useAuth";
import { IEditarRecetaDTO } from "../types/editarTypes";
import { INestError } from "@/interface/apiResponse";

export const editarReceta = async (data: IEditarRecetaDTO, id: string) => {
    const response = await fetch(`http://localhost:5000/recipes/${id}/editar`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getTokenFromCookie()}`
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        const error: INestError = await response.json();
        throw error;
    }

    return response.json();
}