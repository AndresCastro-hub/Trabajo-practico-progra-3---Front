"use client";
import InputField  from "@/components/InputField";
import { AlertCircle, Carrot } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useNuevoIngrediente } from "../../hooks/useNuevoIngrediente";
import { useIngredientValidation } from "../../hooks/useIngredientsValidation";

export default function IngredientesForm() {
    const unidades = [
        { value: "g", label: "Gramos (G)" },
        { value: "ml", label: "Mililitros (ml)" },
        { value: "u", label: "Unidades (U)" },
    ];

    const { nuevoIngrediente, setNuevoIngrediente, nuevaUnidad, setNuevaUnidad, isIngredientCreated, serverError, handleNewIngrediente } = useNuevoIngrediente();
    const { errors, validateNombre } = useIngredientValidation(nuevoIngrediente, nuevaUnidad);

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
                validate={validateNombre}
                error={errors.nombre}
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

            {serverError && (
                <Alert variant="destructive">
                    <AlertCircle size={16} />
                    <AlertDescription>{serverError}</AlertDescription>
                </Alert>
            )} 

            {isIngredientCreated && (
                <Alert variant="default">
                    <AlertCircle size={16}  color="#29c02cda" />
                    <AlertDescription>
                        <p className="text-green-600">
                            Ingrediente creado: Nombre: {isIngredientCreated.nombre}, Unidad: {isIngredientCreated.unidad}
                        </p>
                    </AlertDescription>
                </Alert>
            )}

            <button
                aria-label="crear ingrediente"
                type="submit"
                disabled={!!errors.nombre || !nuevoIngrediente || !nuevaUnidad}
                className="w-full bg-foreground text-primary-foreground py-3.5 rounded-xl font-semibold text-sm tracking-wide hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-60"
            >
                Crear ingrediente
            </button>
        </form>
    )
}