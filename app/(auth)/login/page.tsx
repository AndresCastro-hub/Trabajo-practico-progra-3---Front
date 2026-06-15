import LoginForm from "@/features/auth/login/components/LoginForm";
import AuthLayout from "../../../features/auth/components/AuthLayout";

export default function LoginPage() {
  return (
    <AuthLayout
      imageSrc="/images/fondoLogin.jpg"
      imageAlt="Comida"
      badge="Modo control con calorías"
      heading={<>Planificá la semana en minutos.<br />Cociná con calma.</>}
    >
      <LoginForm />
    </AuthLayout>
  );
}