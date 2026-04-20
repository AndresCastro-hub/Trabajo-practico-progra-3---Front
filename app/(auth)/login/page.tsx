import LoginForm from "@/features/auth/login/components/LoginForm";
import AuthLayout from "../../../features/auth/components/AuthLayout";

export default function LoginPage() {
  return (
    <AuthLayout
      imageSrc="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&q=80"
      imageAlt="Comida saludable"
      badge="Modo control con calorías"
      heading={<>Planificá la semana en minutos.<br />Cociná con calma.</>}
    >
      <LoginForm />
    </AuthLayout>
  );
}