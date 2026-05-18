"use client";
import InputField  from "@/components/InputField";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import IngredientesForm from "./IngredientesForm";

export default function IngredientesHeader({ busqueda, setBusqueda }: { busqueda: string, setBusqueda: (busqueda: string) => void }) {
    return(
        <div className="flex flex-row justify-between items-end gap-4 px-4">
            <InputField
                autoComplete="búsqueda"
                id="buscadorIngredientes"
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
                        + Nuevo Ingrediente
                    </Button>
                </DialogTrigger>
                <DialogContent className="bg-white border border-border rounded-xl">
                    <DialogHeader>
                        <DialogTitle>Nuevo Ingrediente</DialogTitle>
                    </DialogHeader>
                    <IngredientesForm />
                </DialogContent>
            </Dialog>
        </div>
    )
}