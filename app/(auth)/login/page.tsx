"use client";
import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";

export default function LoginPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Tu lógica de login acá
        console.log("Login con:", email, password);
        router.push("/calendario");
    };

    return (
        <div className="min-h-screen flex font-sans">
            
            <div className="w-full lg:w-1/2 flex flex-col justify-between px-10 py-8 bg-[#f7f7f5]">
            
                <div className="flex items-center gap-2">
                    <Logo/>
                </div>

                {/* Formulario centrado */}
                <div className="max-w-md w-full mx-auto">
                    <h1 className="text-[2rem] font-bold text-[#1a1a1a] mb-2 leading-tight">
                        Bienvenida de nuevo
                    </h1>
                    <p className="text-[#6b6b6b] text-sm mb-8">
                        Iniciá sesión para continuar planificando tus comidas.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email */}
                        <div>
                            <label className="block text-xs font-semibold tracking-widest text-[#1a1a1a] uppercase mb-2">
                                Email
                            </label>
                            <div className="relative">
                                <Mail
                                    size={16}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#aaa]"
                                />
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
                            <div className="flex items-center justify-between mb-2">
                                <label className="block text-xs font-semibold tracking-widest text-[#1a1a1a] uppercase">
                                    Contraseña
                                </label>
                                <a
                                    href="/forgot-password"
                                    className="text-xs text-[#3ecf3e] font-medium hover:underline"
                                >
                                    Olvidé mi contraseña
                                </a>
                            </div>
                            <div className="relative">
                                <Lock
                                    size={16}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#aaa]"
                                />
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

                        {/* Botón submit */}
                        <button
                            type="submit"
                            className="w-full bg-[#1a1a1a] text-white py-3.5 rounded-xl font-semibold text-sm tracking-wide hover:bg-[#2d2d2d] active:scale-[0.98] transition-all duration-150 flex items-center justify-center gap-2 mt-2"
                        >
                            Iniciar sesión →
                        </button>
                    </form>

                    {/* Registro */}
                    <p className="text-center text-sm text-[#6b6b6b] mt-8">
                        ¿No tenés cuenta?{" "}
                        <a
                            href="/register"
                            className="text-[#3ecf3e] font-semibold hover:underline"
                        >
                            Registrate gratis
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
                {/*
          Reemplazá el src por tu imagen real.
          Podés usar: import image from "@/assets/food-bg.jpg"
          o una URL pública, o next/image con fill.
        */}
                <img
                    src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&q=80"
                    alt="Comida saludable"
                    className="w-full h-full object-cover"
                />

                {/* Overlay degradado para legibilidad del texto */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                {/* Badge + copy */}
                <div className="absolute bottom-12 left-10 right-10 text-white">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="w-2 h-2 rounded-full bg-[#3ecf3e]" />
                        <span className="text-xs font-medium tracking-wide opacity-90">
                            Modo control con calorías
                        </span>
                    </div>
                    <h2 className="text-3xl font-bold leading-tight">
                        Planificá la semana en minutos.
                        <br />
                        Cociná con calma.
                    </h2>
                </div>
            </div>
        </div>
    );
}