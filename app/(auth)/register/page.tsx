"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, User, Zap } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) return; // manejá el error como prefieras
    console.log("Register:", { nombre, email, password });
    router.push("/calendario");
  };

  return (
    <div className="min-h-screen flex font-sans">

      {/* ── Panel izquierdo (formulario) ── */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between px-10 py-8 bg-[#f7f7f5]">

        {/* Logo */}
        {/* <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-[#3ecf3e] flex items-center justify-center">
            <Zap size={18} className="text-white" fill="white" />
          </div>
          <span className="font-semibold text-[#1a1a1a] text-lg tracking-tight">
            Vitalis
          </span>
        </div> */}

        {/* Formulario centrado */}
        <div className="max-w-md w-full mx-auto">
          <h1 className="text-[2rem] font-bold text-[#1a1a1a] mb-2 leading-tight">
            Creá tu cuenta
          </h1>
          <p className="text-[#6b6b6b] text-sm mb-8">
            Empezá a planificar tus comidas en minutos.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Nombre */}
            <div>
              <label className="block text-xs font-semibold tracking-widest text-[#1a1a1a] uppercase mb-2">
                Nombre completo
              </label>
              <div className="relative">
                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#aaa]" />
                <input
                  type="text"
                  placeholder="Elena Martín"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#e0e0e0] bg-white text-[#1a1a1a] placeholder-[#bbb] text-sm focus:outline-none focus:ring-2 focus:ring-[#3ecf3e] focus:border-transparent transition"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold tracking-widest text-[#1a1a1a] uppercase mb-2">
                Email
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#aaa]" />
                <input
                  type="email"
                  placeholder="elena@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#e0e0e0] bg-white text-[#1a1a1a] placeholder-[#bbb] text-sm focus:outline-none focus:ring-2 focus:ring-[#3ecf3e] focus:border-transparent transition"
                  required
                />
              </div>
            </div>

            {/* Contraseña */}
            <div>
              <label className="block text-xs font-semibold tracking-widest text-[#1a1a1a] uppercase mb-2">
                Contraseña
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#aaa]" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-11 py-3 rounded-xl border border-[#e0e0e0] bg-white text-[#1a1a1a] placeholder-[#bbb] text-sm focus:outline-none focus:ring-2 focus:ring-[#3ecf3e] focus:border-transparent transition"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#aaa] hover:text-[#1a1a1a] transition"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Confirmar contraseña */}
            <div>
              <label className="block text-xs font-semibold tracking-widest text-[#1a1a1a] uppercase mb-2">
                Confirmar contraseña
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#aaa]" />
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="w-full pl-11 pr-11 py-3 rounded-xl border border-[#e0e0e0] bg-white text-[#1a1a1a] placeholder-[#bbb] text-sm focus:outline-none focus:ring-2 focus:ring-[#3ecf3e] focus:border-transparent transition"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#aaa] hover:text-[#1a1a1a] transition"
                >
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Botón submit */}
            <button
              type="submit"
              className="w-full bg-[#1a1a1a] text-white py-3.5 rounded-xl font-semibold text-sm tracking-wide hover:bg-[#2d2d2d] active:scale-[0.98] transition-all duration-150 flex items-center justify-center gap-2 mt-2"
            >
              Crear cuenta →
            </button>
          </form>

          {/* Login */}
          <p className="text-center text-sm text-[#6b6b6b] mt-8">
            ¿Ya tenés cuenta?{" "}
            <a href="/login" className="text-[#3ecf3e] font-semibold hover:underline">
              Iniciá sesión
            </a>
          </p>
        </div>

        {/* Footer */}
        <p className="text-xs text-[#bbb] text-center">
          © 2026 Vitalis. Todos los derechos reservados.
        </p>
      </div>

      {/* ── Panel derecho (imagen) ── */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200&q=80"
          alt="Comida saludable"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute bottom-12 left-10 right-10 text-white">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#3ecf3e]" />
            <span className="text-xs font-medium tracking-wide opacity-90">
              Planificación inteligente
            </span>
          </div>
          <h2 className="text-3xl font-bold leading-tight">
            Tu semana organizada.
            <br />
            Tu cocina, sin estrés.
          </h2>
        </div>
      </div>

    </div>
  );
}