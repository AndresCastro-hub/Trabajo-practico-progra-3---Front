import { useState } from "react";
import { useRouter } from "next/navigation";

export function useRegisterForm() {
    const router = useRouter();
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirm) {
            setError("Las contraseñas no coinciden.");
            return;
        }
        setLoading(true);
        setError(null);
        try {
            //   await authService.register(nombre, email, password);
            router.push("/calendario");
        } catch {
            setError("Ocurrió un error al crear la cuenta.");
        } finally {
            setLoading(false);
        }
    };

    return { nombre, setNombre, email, setEmail, password, setPassword, confirm, setConfirm, error, loading, handleSubmit };
}