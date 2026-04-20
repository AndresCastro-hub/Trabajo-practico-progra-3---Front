import AuthLayout    from "../components/AuthLayout";
import RegisterForm  from "./components/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthLayout
      imageSrc="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200&q=80"
      imageAlt="Comida saludable"
      badge="Planificación inteligente"
      heading={<>Tu semana organizada.<br />Tu cocina, sin estrés.</>}
    >
      <RegisterForm />
    </AuthLayout>
  );
}