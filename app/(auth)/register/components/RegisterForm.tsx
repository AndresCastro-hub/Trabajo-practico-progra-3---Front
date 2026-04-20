"use client";

import { Mail, Lock, User } from "lucide-react";
import { useRegisterForm } from "../hooks/useRegisterForm";
import InputField from "../../components/InputField";
import Link from "next/link";

export default function RegisterForm() {
  const {
    nombre, setNombre,
    email, setEmail,
    password, setPassword,
    confirm, setConfirm,
    error, loading, handleSubmit
  } = useRegisterForm();

  return (
    <section className="pt-6">

      <h1 className="text-2xl font-bold text-foreground mb-4  leading-tight">
        Creá tu cuenta
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">

        <InputField
          label="Nombre completo"
          type="text"
          placeholder="Elena Martín"
          value={nombre}
          onChange={setNombre}
          icon={<User size={16} />}
          required
        />

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

        <InputField
          label="Confirmar contraseña"
          type="password"
          placeholder="••••••••"
          value={confirm}
          onChange={setConfirm}
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
          {loading ? "Creando cuenta..." : "Crear cuenta →"}
        </button>

      </form>

      <p className="text-center text-sm text-muted-foreground mt-8 mb-4">
        ¿Ya tenés cuenta?
        <Link
          href="/login"
          className="text-primary font-semibold hover:underline"
        >
          Iniciá sesión
        </Link>
      </p>

    </section>
  );
}