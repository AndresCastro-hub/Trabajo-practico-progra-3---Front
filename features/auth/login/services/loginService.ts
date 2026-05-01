interface ILoginCredenciales {
    email: string
    password: string
}

interface LoginResponse {
    access_token: string
}

export async function loginService({ email, password }: ILoginCredenciales): Promise<LoginResponse> {
    try {
        const response = await fetch("http://localhost:5000/users/login", {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.message || "Error en login");
        }

        return data;

    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }

        throw new Error("Error inesperado");
    }
}

