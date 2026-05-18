"use client";
import InputField  from "@/components/InputField";
import { Carrot } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useNuevoIngrediente } from "../../hooks/useNuevoIngrediente";

export default function IngredientesForm() {
    const unidades = [
        { value: "gr", label: "Gramos (gr)" },
        { value: "kg", label: "Kilogramos (kg)" },
        { value: "l", label: "Litros (L)" },
        { value: "ml", label: "Mililitros (mL)" },
        { value: "u", label: "Unidades (U)" },
        { value: "taza", label: "Tazas" },
        { value: "cdta", label: "Cucharadita (cdta)" },
    ];

    const { nuevoIngrediente, setNuevoIngrediente, nuevaUnidad, setNuevaUnidad, handleNewIngrediente } = useNuevoIngrediente();

    return (
        <form onSubmit={handleNewIngrediente} className="space-y-5">
            <InputField
                autoComplete="nuevoIngrediente"
                id="nuevoIngrediente"
                label="Ingrediente"
                type="text"
                placeholder="Ej: Tomate"
                value={nuevoIngrediente}
                onChange={setNuevoIngrediente}
                validate={() => {}}
                error={null}
                icon={<Carrot size={16} />}
            />

            <div>
                <label className="block text-xs font-semibold tracking-widest text-foreground uppercase mb-2">
                    Unidad
                </label>
                <Select value={nuevaUnidad} onValueChange={setNuevaUnidad}>
                    <SelectTrigger className="w-full rounded-xl border-border py-3 h-auto pl-4">
                        <SelectValue placeholder="Seleccioná una unidad" />
                    </SelectTrigger>
                    <SelectContent className="w-full bg-white rounded-xl border-border">
                        {
                            unidades.map((unidad)=> {
                                return <SelectItem key={unidad.value} value={unidad.value}>{unidad.label}</SelectItem>;
                            })
                        }
                    </SelectContent>
                </Select>
            </div>

            <button
                aria-label="crear ingrediente"
                type="submit"
                //disabled={contieneErrores(errors) || !camposCompletos({ name, email, password, confirmPassword })}
                className="w-full bg-foreground text-primary-foreground py-3.5 rounded-xl font-semibold text-sm tracking-wide hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-60"
            >
                Crear ingrediente
            </button>
        </form>
    )
}