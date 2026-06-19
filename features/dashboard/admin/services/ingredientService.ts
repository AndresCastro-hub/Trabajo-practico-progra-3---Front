import { INestError } from "@/interface/apiResponse";
import { getTokenFromCookie } from "@/hooks/useAuth";
import { IIngredient, IIngredientResponse, IIngredientService } from "../types/admin.types";

export async function postIngredient({ nombre, unidad }: IIngredientService): Promise<IIngredient> {
    try {
        const response = await fetch('http://localhost:5000/ingredients', {
            method: 'POST',
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${getTokenFromCookie()}` },
            body: JSON.stringify({ nombre, unidad })
        })

        if (!response.ok) {
            const error: INestError = await response.json();
            const message = Array.isArray(error.message) ? error.message[0] : error.message;
            throw new Error(message || "Error en registrar el ingrediente");
        }

        const data: IIngredient = await response.json();

        return data;

    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }

        throw new Error("Error inesperado");
    }
}

export async function getIngredients(page: number, name?: string): Promise<IIngredientResponse> {
    const params = new URLSearchParams({
        page: String(page),
        ...(name ? { name } : {}),
    })

    try {
        const response = await fetch(`http://localhost:5000/ingredients?${params.toString()}`, {
            method: 'GET',
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${getTokenFromCookie()}` },
        })

        if (!response.ok) {
            const error: INestError = await response.json();
            const message = Array.isArray(error.message) ? error.message[0] : error.message;
            throw new Error(message || "Error en registrar el ingrediente");
        }

        const data: IIngredientResponse = await response.json()

        if(data.ingredients.length === 0 ) throw new Error("No se encontraron ingredientes.");

        return data;

    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }

        throw new Error("Error inesperado");
    }
}