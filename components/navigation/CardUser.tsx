import { LogOut } from "lucide-react";

export default function CardUser() {
    return (
        <aside className="px-4 py-4 border-t border-border">
            <div className="flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-semibold">
                    EM
                </div>

                <div>
                    <p className="text-sm font-medium text-foreground">
                        Elena Martín
                    </p>
                    <p className="text-xs text-muted-foreground">
                        Modo control activo
                    </p>
                </div>
            </div>

            <button className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
                <LogOut size={13} />
                Cerrar sesión
            </button>
        </aside>
    );
}