import { useState } from "react";
import { registerService } from "../services/registerService";

interface IRegisterForm {
    name: string
    email: string
    password: string
    confirmPassword: string
}

export function useRegisterForm() {
    const FORM_INICIAL: IRegisterForm = { name: "", email: "", password: "", confirmPassword: "" };
    const [registerForm, setRegisterForm] = useState<IRegisterForm>(FORM_INICIAL)
    const [serverError, setServerError] = useState<string | null>(null);
    const [usuarioCreado, setUsuarioCreado] = useState<{name: string, email: string} | null>(null);

    const { name, email, password, confirmPassword } = registerForm
    

    const setEmail = (value: string) => {
        setRegisterForm((prev) => ({ ...prev, email: value }))
    }

    const setPassword = (value: string) => {
        setRegisterForm((prev) => ({ ...prev, password: value }));
    }

    const setConfirmPassword = (value: string) => {
        setRegisterForm((prev) => ({ ...prev, confirmPassword: value }));
    }

    const setNombre = (value: string) => {
        setRegisterForm((prev) => ({ ...prev, name: value }));
    }


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const data = await registerService({email, name, password});
            setUsuarioCreado(data);
            setRegisterForm(FORM_INICIAL);
        } catch (error) {
            if (error instanceof Error) {
                setServerError(error.message);
            } else {
                setServerError("Error inesperado");
            }
        }
    };

    return { name, email, password, confirmPassword, serverError, usuarioCreado, handleSubmit, setNombre, setEmail, setPassword, confirm, setConfirmPassword };
}