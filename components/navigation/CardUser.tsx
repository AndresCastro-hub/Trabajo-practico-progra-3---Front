import { useModoControl } from "@/context/ModoControlContext";
import { useAuth } from "@/hooks/useAuth";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CardUser() {

    const router = useRouter()
    const {modoControl} = useModoControl()
    const { user } = useAuth()

    const handleLogout = () => {
        document.cookie = "token=; max-age=0; path=/"
        router.push("/login")
    }

    const inicialesIcon = () => {
        return user?.name
            ?.split(" ")
            .map(word => word[0])
            .join("")
            .toUpperCase()

    }

    return (
        <aside className="px-4 py-4 border-t border-border">
            <div className="flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-semibold">
                    {inicialesIcon()}
                </div>

                <div>
                    <p className="text-sm font-medium text-foreground">
                        {user?.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        Modo Control {modoControl ?  'Activo' : 'Inactivo'}
                    </p>
                </div>
            </div>

            <button onClick={handleLogout} className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
                <LogOut size={13} />
                Cerrar sesión
            </button>
        </aside>
    );
}