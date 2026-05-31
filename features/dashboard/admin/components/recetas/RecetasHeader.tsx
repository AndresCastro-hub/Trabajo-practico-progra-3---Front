"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation"

export default function RecetasHeader({onSearch }: { onSearch: (busqueda: string) => void }) {
    const router = useRouter();
    return(
        <div className="flex flex-row justify-between items-end gap-4 px-4">
            <div className="relative w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                    type="text"
                    placeholder="Buscar por nombre..."
                    className="w-full pl-9 pr-4 py-5 bg-background rounded-xl border border-gray-200 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
                    onKeyDown={(e) => {
                        if (e.key === "Enter") onSearch(e.currentTarget.value)
                    }}
                />
            </div>

            <Button
                className="h-[50px] px-6"
                onClick={ () => router.push("/recetario/nueva") }
            >
                + Nueva Receta Global
            </Button>
        </div>
    )
}