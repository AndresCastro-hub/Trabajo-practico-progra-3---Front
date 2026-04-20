"use client";
import { Mail, Lock } from "lucide-react";
import InputField from "../../components/InputField";
import { useLoginForm } from "../hooks/useLoginForms";
import Link from "next/link";

export default function LoginForm() {
  const { email, setEmail, password, setPassword, error, loading, handleSubmit } = useLoginForm();

  return (
    <section>

      <h1 className="text-2xl font-bold text-foreground mb-2 leading-tight">
        Bienvenida de nuevo
      </h1>

      <p className="text-muted-foreground text-sm mb-8">
        Iniciá sesión para continuar planificando tus comidas.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">

        <InputField
          label="Email"
          type="email"
          placeholder="elena@ejemplo.com"
          value={email}
          onChange={setEmail}
          icon={<Mail size={16} />}
          required
        />

        <InputField
          label="Contraseña"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={setPassword}
          icon={<Lock size={16} />}
          required
        />

        {error && (
          <p className="text-destructive text-xs">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-foreground text-primary-foreground py-3.5 rounded-xl font-semibold text-sm tracking-wide hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-60"
        >
          {loading ? "Ingresando..." : "Iniciar sesión →"}
        </button>

      </form>

      <p className="text-center text-sm text-muted-foreground mt-8">
        ¿No tenés cuenta?{" "}
        <Link href="/register" className="text-primary font-semibold hover:underline">
          Registrate gratis
        </Link>
      </p>

    </section>
  );
}