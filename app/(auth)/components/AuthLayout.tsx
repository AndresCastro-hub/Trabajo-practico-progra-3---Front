import Logo from "@/components/Logo";
import AuthImagePanel from "./AuthImagenPanel";

interface Props {
  children: React.ReactNode;
  imageSrc: string;
  imageAlt: string;
  badge: string;
  heading: React.ReactNode;
}

export default function AuthLayout({ children, imageSrc, imageAlt, badge, heading }: Props) {
  return (
    <div className="min-h-screen flex font-sans">

      <div className="w-full lg:w-1/2 flex flex-col justify-between px-10 py-8 bg-background">

        <header className="flex items-center gap-2" >
          <Logo />
        </header>

        <main className="max-w-md w-full mx-auto">
          {children}
        </main>

        <footer>
          <p className="text-xs text-muted-foreground text-center">
            © 2026 Vitalis. Todos los derechos reservados.
          </p>
        </footer>
      </div>

      <AuthImagePanel src={imageSrc} alt={imageAlt} badge={badge} heading={heading} />
    </div>
  );
}