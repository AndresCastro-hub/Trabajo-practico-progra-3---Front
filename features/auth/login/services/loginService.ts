import { INestError } from "@/interface/apiResponse"

interface ILoginCredenciales {
    email: string
    password: string
}

interface LoginResponse {
    accessToken: string
}

export async function loginService({ email, password }: ILoginCredenciales): Promise<LoginResponse> {
    try {
        const response = await fetch("http://localhost:5000/users/login", {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        })

        if (!response.ok) {
            const error: INestError = await response.json();
            const message = Array.isArray(error.message) ? error.message[0] : error.message;
            throw new Error(message || "Error en login");
        }

        const data: LoginResponse = await response.json()

        return data

    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }

        throw new Error("Error inesperado");
    }
}

