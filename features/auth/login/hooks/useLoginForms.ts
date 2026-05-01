import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginService } from "../services/loginService";
import { validate, ValidationRule } from "@/lib/utils/validate";

export function useLoginForm() {
    const router = useRouter();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errors, setErrors] = useState<{ email: string | null, password: string | null }>({ email: null, password: null });
    const [serverError, setServerError] = useState<string | null>(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const emailRules = [
        {
            test: (value: string) => !value,
            message: "El email es obligatorio",
        },
        {
            test: (value: string) => !emailRegex.test(value),
            message: "El formato de email es inválido",
        }
    ]

    const passwordRules = [
        {
            test: (value: string) => !value,
            message: "La contraseña es requerida",
        },
        {
            test: (value: string) => value.length <= 3,
            message: "La contraseña debe tener más de 3 caracteres",
        },
    ];

    const validateEmail = (currentValue?: string) => {
        const value = currentValue ?? email;
        const messageError = validate(value, emailRules);
        setErrors((prev) => ({ ...prev, email: messageError }));
    };

    const validatePassword = (currentValue?: string) => {
        const value = currentValue ?? password;
        const messageError = validate(value, passwordRules);
        setErrors((prev) => ({ ...prev, password: messageError }));
    };

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