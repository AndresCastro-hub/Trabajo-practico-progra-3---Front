import RegisterForm from "@/features/auth/register/components/RegisterForm";
import AuthLayout    from "../../../features/auth/components/AuthLayout";

export default function RegisterPage() {
  return (
    <AuthLayout
      imageSrc="/images/fondoRegister.jpg"
      imageAlt="Comida saludable"
      badge="Planificación inteligente"
      heading={<>Tu semana organizada.<br />Tu cocina, sin estrés.</>}
    >
      <RegisterForm />
    </AuthLayout>
  );
}