import { INestError } from "@/interface/apiResponse";
import { getTokenFromCookie } from "@/hooks/useAuth"
import { IUserResponse } from "../types/admin.types";

export async function getUsuarios(page: number, nombre?: string): Promise<IUserResponse> {
    const params = new URLSearchParams({
        page: String(page),
        ...(nombre ? { nombre } : {}),
    })

    try {
        const response = await fetch(`http://localhost:5000/users/all?${params.toString()}`, {
            method: 'GET',
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${getTokenFromCookie()}` },
        })

        if (!response.ok) {
            const error: INestError = await response.json();
            const message = Array.isArray(error.message) ? error.message[0] : error.message;
            throw new Error(message || "Error en registrar el ingrediente");
        }

        const data: IUserResponse = await response.json()

        return data;

    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }

        throw new Error("Error inesperado");
    }
}