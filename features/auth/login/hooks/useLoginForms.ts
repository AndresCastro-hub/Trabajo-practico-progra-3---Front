import { useState } from "react";
import { useRouter } from "next/navigation";

export function useLoginForm() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {

            router.push("/calendario");
        } catch {
            setError("Email o contraseña incorrectos.");
        } finally {
            setLoading(false);
        }
    };

    return { email, setEmail, password, setPassword, error, loading, handleSubmit };
}