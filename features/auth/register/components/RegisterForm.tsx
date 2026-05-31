"use client";

import { Mail, Lock, User, AlertCircle } from "lucide-react";
import { useRegisterForm } from "../hooks/useRegisterForm";
import InputField from "../../components/InputField";
import Link from "next/link";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRegisterValidation } from "../hooks/useRegisterValidation";
import { camposCompletos, contieneErrores } from "@/lib/utils/validate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RegisterForm() {
  const { name, email, password, confirmPassword, serverError, usuarioCreado, setNombre, setEmail, setPassword, setConfirmPassword, handleSubmit } = useRegisterForm();
  const { errors, validateEmail, validatePassword, validateConfirmPassword, validateNombre } = useRegisterValidation(email, password, name, confirmPassword);

  return (
    <section className="pt-6">

      <h1 className="text-2xl font-bold text-foreground mb-4  leading-tight">
        Creá tu cuenta
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">

        <InputField
          autoComplete="name"
          id="nombre"
          label="Nombre completo"
          type="text"
          placeholder="Elena Martín"
          value={name}
          onChange={setNombre}
          validate={validateNombre}
          error={errors.name}
          icon={<User size={16} />}
        />

        <InputField
          autoComplete="email"
          id="email"
          label="Email"
          type="email"
          placeholder="elena@ejemplo.com"
          value={email}
          onChange={setEmail}
          icon={<Mail size={16} />}
          error={errors.email}
          validate={validateEmail}
        />

        <InputField
          autoComplete="new-password"
          id="contraseña"
          label="Contraseña"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={setPassword}
          icon={<Lock size={16} />}
          error={errors.password}
          validate={validatePassword}
        />

        <InputField
          autoComplete="new-password"
          id="confirmarContraseña"
          label="Confirmar contraseña"
          type="password"
          placeholder="••••••••"
          value={confirmPassword}
          onChange={setConfirmPassword}
          icon={<Lock size={16} />}
          error={errors.confirmPassword}
          validate={validateConfirmPassword}
        />

        {serverError && (
          <Alert variant="destructive">
            <AlertCircle size={16} />
            <AlertDescription>{serverError}</AlertDescription>
          </Alert>
        )} 

        {
          usuarioCreado && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">¡Cuenta creada exitosamente!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p><span className="font-medium">Nombre:</span> {usuarioCreado.name}</p>
              <p><span className="font-medium">Email:</span> {usuarioCreado.email}</p>
              <Link href="/login" className="block mt-4 text-primary font-semibold hover:underline">
                Iniciá sesión
              </Link>
            </CardContent>
          </Card>
          )
        }

        <button
          aria-label="crear cuenta"
          type="submit"
          disabled={contieneErrores(errors) || !camposCompletos({ name, email, password, confirmPassword })}
          className="w-full bg-foreground text-primary-foreground py-3.5 rounded-xl font-semibold text-sm tracking-wide hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-60"
        >
          Crear cuenta
        </button>

      </form>

      <p className="text-center text-sm text-muted-foreground mt-8 mb-4">
        ¿Ya tenés cuenta?
        <Link
          href="/login"
          className="text-primary font-semibold hover:underline ml-1"
        >
          Iniciá sesión
        </Link>
      </p>

    </section>
  );
}