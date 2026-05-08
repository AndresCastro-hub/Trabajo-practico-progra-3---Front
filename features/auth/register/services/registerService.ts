import { INestError } from "@/interface/apiResponse";

interface IRegisterService {
    email: string
    name: string
    password: string
}

export interface IRegisterResponse {
    id: number;
    name: string;
    email: string;
    rolId: number;
    fechaCreacion: string;
}

export async function registerService({ email, name, password }: IRegisterService): Promise<IRegisterResponse> {
    try {
        const response = await fetch('http://localhost:5000/users/register', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, name, password })
        })

        if (!response.ok) {
            const error: INestError = await response.json();
            const message = Array.isArray(error.message) ? error.message[0] : error.message;
            throw new Error(message || "Error en registrar el usuario");
        }

        const data: IRegisterResponse = await response.json()

        return data;

    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }

        throw new Error("Error inesperado");
    }
}