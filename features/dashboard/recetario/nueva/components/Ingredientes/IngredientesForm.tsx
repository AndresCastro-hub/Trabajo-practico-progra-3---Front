import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Plus, Trash2 } from "lucide-react"
import { IngredienteRow } from "../../hooks/useFormCreacionReceta"
import { Input } from "@/components/ui/input"
import { SelectorIngrediente } from "./SelectorIngrediente"

interface IIngredientesForm {
    agregarIngrediente: () => void
    ingredientes: IngredienteRow[]
    eliminarIngrediente: (e: number) => void
    actualizarIngrediente: <K extends keyof IngredienteRow>( index: number, field: K, value: IngredienteRow[K]) => void
}

export default function IngredientesForm({ agregarIngrediente, ingredientes, eliminarIngrediente, actualizarIngrediente }: IIngredientesForm) {
    return (
        <>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
                <div>
                    <Label className="text-base font-semibold text-slate-900">
                        Ingredientes <span className="text-red-500">*</span>
                    </Label>
                    <p className="text-sm text-slate-500 mt-1">Agregá los ingredientes necesarios para la receta.</p>
                </div>
                <Button
                    type="button"
                    onClick={agregarIngrediente}
                    className="rounded-xl bg-green-600 hover:bg-green-700 w-full lg:w-auto h-9"
                >
                    <Plus size={16} />
                    Agregar ingrediente
                </Button>
            </div>

            <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white">

                <div className="hidden lg:grid grid-cols-12 gap-4 bg-slate-50 border-b border-slate-200 px-5 py-3 text-sm font-medium text-slate-600">
                    <div className="col-span-8">Ingrediente *</div>
                    <div className="col-span-2">Cantidad *</div>
                    <div className="col-span-1">Unidad</div>
                    <div className="col-span-1" />
                </div>

                <div className="divide-y divide-slate-100">
                    {ingredientes.map((ing, index) => {
                        const ingredientesUsados = ingredientes
                            .filter((_, i) => i !== index)
                            .map((i) => i.ingrediente?.id)
                            .filter((id): id is number => id !== undefined)

                        return (
                            <div key={index} className="grid grid-cols-1 lg:grid-cols-12 gap-4 px-5 py-4 items-center border-b border-slate-100 last:border-b-0">

                                <div className="lg:hidden flex items-center justify-between">
                                    <span className="text-sm font-medium text-slate-700">Ingrediente {index + 1}</span>
                                    <button
                                        onClick={() => eliminarIngrediente(index)}
                                        className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>

                                <div className="lg:col-span-8 flex flex-col gap-1.5">
                                    <Label className="lg:hidden text-xs text-slate-500">Ingrediente *</Label>
                                    <SelectorIngrediente
                                        value={ing.ingrediente}
                                        onChange={(selected) => actualizarIngrediente(index, "ingrediente", selected)}
                                        ingredientesUsados={ingredientesUsados}
                                    />
                                </div>

                                <div className="lg:col-span-2 flex flex-col gap-1.5">
                                    <Label className="lg:hidden text-xs text-slate-500">Cantidad *</Label>
                                    <Input
                                        type="number"
                                        placeholder="300"
                                        value={ing.cantidad}
                                        onChange={(e) => actualizarIngrediente(index, "cantidad", e.target.value)}
                                        className="h-11 rounded-xl"
                                    />
                                </div>

                                <div className="lg:col-span-1 flex flex-col gap-1.5">
                                    <Label className="lg:hidden text-xs text-slate-500">Unidad</Label>
                                    <div className="h-11 flex items-center text-sm text-slate-500 px-2">
                                        {ing.ingrediente?.unidad || "-"}
                                    </div>
                                </div>

                                <div className="hidden lg:flex lg:col-span-1 justify-end">
                                    <button
                                        onClick={() => eliminarIngrediente(index)}
                                        className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}