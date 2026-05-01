import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginService } from "../services/loginService";

export function useLoginForm() {
    const router = useRouter();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errors, setErrors] = useState<{ email: string | null, password: string | null }>({ email: null, password: null });
    const [serverError, setServerError] = useState<string | null>(null);



    const validateEmail = (currentValue?: string) => {
        const value = currentValue ?? email;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let messageError = '';
        if (!value) {
            messageError = 'El email es obligatorio';
        } else if (!emailRegex.test(value)) {
            messageError = 'El formato de email es invalido';
        }
        setErrors((prev) => ({ ...prev, email: messageError }));

    }

    const validatePassword = (currentValue?: string) => {
        const value = currentValue ?? password;
        let messageError = ''
        if (!value) {
            messageError = 'La contraseña es requerida'
        } else if (value.length <= 3) {
            messageError = 'La contraseña debe tener mas de 3 caracteres'
        }
        setErrors((prev) => ({ ...prev, password: messageError }));

    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const data = await loginService({ email, password });
            document.cookie = `token=${data.access_token}; path=/; SameSite=Strict`
            router.push("/calendario");

        } catch (error) {
            if (error instanceof Error) {
                setServerError(error.message);
            } else {
                setServerError("Error inesperado");
            }
        }
    };

    return { email, password, errors, serverError, setEmail, setPassword, validateEmail, handleSubmit, validatePassword };
}