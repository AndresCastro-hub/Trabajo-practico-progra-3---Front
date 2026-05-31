"use client";
import InputField  from "@/features/auth/components/InputField";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function RecetasHeader({ busqueda, setBusqueda }: { busqueda: string, setBusqueda: (busqueda: string) => void }) {
    return(
        <div className="flex flex-row justify-between items-end gap-4 px-4">
            <InputField
                autoComplete="búsqueda"
                id="buscadorRecetas"
                label=""
                type="text"
                placeholder="Buscar por nombre"
                value={busqueda}
                onChange={setBusqueda}
                validate={() => {
                    return null;
                }}
                error={null}
                icon={<Search size={16} />}
            />

            <Dialog>
                <DialogTrigger asChild>
                    <Button className="h-[50px] px-6 shrink-0">
                        + Nueva Receta Global
                    </Button>
                </DialogTrigger>
                <DialogContent className="bg-white border border-border rounded-xl">
                    <DialogHeader>
                        <DialogTitle>Nueva Receta Global</DialogTitle>
                    </DialogHeader>
                    <span><p>FORM</p></span>
                </DialogContent>
            </Dialog>
        </div>
    )
}