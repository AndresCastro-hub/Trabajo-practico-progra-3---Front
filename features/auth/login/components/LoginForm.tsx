"use client";
import { Mail, Lock, AlertCircle } from "lucide-react";
import InputField from "../../../../features/auth/components/InputField";
import { useLoginForm } from "../hooks/useLoginForms";
import Link from "next/link";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useLoginValidation } from "../hooks/useLoginValidation";
import { camposCompletos, contieneErrores } from "@/lib/utils/validate";

export default function LoginForm() {
  const { email, password, serverError, setEmail, setPassword, handleSubmit } = useLoginForm();
  const { errors, validateEmail, validatePassword } = useLoginValidation(email,password);

  return (
    <section>

      <h1 className="text-2xl font-bold text-foreground mb-2 leading-tight">
        Bienvenido de nuevo
      </h1>

      <p className="text-muted-foreground text-sm mb-8">
        Iniciá sesión para continuar planificando tus comidas.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">

        <InputField
          autoComplete="email"
          id="email"
          label="Email"
          type="email"
          placeholder="elena@ejemplo.com"
          value={email}
          onChange={setEmail}
          error={errors.email}
          validate={validateEmail}
          icon={<Mail size={16} />}
        />

        <InputField
          autoComplete="current-password"
          id="contraseña"
          label="Contraseña"
          type="password"
          placeholder="••••••••"
          value={password}
          validate={validatePassword}
          error={errors.password}
          onChange={setPassword}
          icon={<Lock size={16} />}
        />

        {serverError && (
          <Alert variant="destructive">
            <AlertCircle size={16} />
            <AlertDescription>{serverError}</AlertDescription>
          </Alert>
        )}

        <button
          aria-label="Iniciar sesión"
          type="submit"
          disabled={contieneErrores(errors) || !camposCompletos({email,password}) }
          className="w-full bg-foreground text-primary-foreground py-3.5 rounded-xl font-semibold text-sm tracking-wide hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-60"
        >
          Iniciar sesión
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