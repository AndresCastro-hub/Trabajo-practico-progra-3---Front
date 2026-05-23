import { INestError } from "@/interface/apiResponse";

interface IIngredientService {
    nombre: string;
    unidad: string;
}

export interface IIngredientResponse {
    id: number;
    nombre: string;
    unidad: string;
}

export async function postIngredient({ nombre, unidad }: IIngredientService): Promise<IIngredientResponse> {
    const token:string | undefined = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1];

    try {
        const response = await fetch('http://localhost:5000/ingredients', {
            method: 'POST',
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
            body: JSON.stringify({ nombre, unidad })
        })

        if (!response.ok) {
            const error: INestError = await response.json();
            const message = Array.isArray(error.message) ? error.message[0] : error.message;
            throw new Error(message || "Error en registrar el ingrediente");
        }

        const data: IIngredientResponse = await response.json()

        return data;

    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }

        throw new Error("Error inesperado");
    }
}

export async function getIngredients(limit: number = 10, offset: number = 0): Promise<IIngredientResponse[]> {
    const token:string | undefined = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1];

    try {
        const response = await fetch(`http://localhost:5000/ingredients?limit=${limit}&offset=${offset}`, {
            method: 'GET',
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        })

        if (!response.ok) {
            const error: INestError = await response.json();
            const message = Array.isArray(error.message) ? error.message[0] : error.message;
            throw new Error(message || "Error en registrar el ingrediente");
        }

        const data: IIngredientResponse[] = await response.json()

        return data;

    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }

        throw new Error("Error inesperado");
    }
}