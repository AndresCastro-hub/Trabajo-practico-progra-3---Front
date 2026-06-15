import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginService } from "../services/loginService";
import { jwtDecode } from "jwt-decode";

interface FormStateLogin {
    email: string
    password: string
}

export function useLoginForm() {
    const router = useRouter();
    const [formStateLogin, setFormStateLogin] = useState<FormStateLogin>({ email: '', password: '' })
    const [serverError, setServerError] = useState<string | null>(null);

    const { email, password } = formStateLogin

    const setEmail = (value: string) => {
        setFormStateLogin((prev) => ({ ...prev, email: value }))
    }

    const setPassword = (value: string) => {
        setFormStateLogin((prev) => ({ ...prev, password: value }));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const data = await loginService({ email, password });
            document.cookie = `token=${data.accessToken}; path=/; SameSite=Strict`
            const decoded = jwtDecode<{ rol: string }>(data.accessToken);

            if (decoded.rol === "administrador") {
                router.push("/admin");
            } else {
                router.push("/calendario");
            }
        } catch (error) {
            if (error instanceof Error) {
                setServerError(error.message);
            } else {
                setServerError("Error inesperado");
            }
        }
    };

    return { email, password, serverError, setEmail, setPassword, handleSubmit };
}