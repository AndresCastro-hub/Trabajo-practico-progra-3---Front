import { ChevronDown, Search } from "lucide-react"
import { useState, useRef, useEffect } from "react"

interface Ingrediente {
    id: number
    nombre: string
    unidad: string
}

export function SelectorIngrediente({
    value,
    onChange,
    ingredientesUsados,
}: {
    value: Ingrediente | null
    onChange: (ing: Ingrediente) => void
    ingredientesUsados: number[]
}) {
    const INGREDIENTES_MOCK: Ingrediente[] = [
        { id: 1, nombre: "Pollo", unidad: "g" },
        { id: 2, nombre: "Carne vacuna", unidad: "g" },
        { id: 3, nombre: "Arroz", unidad: "g" },
        { id: 4, nombre: "Papa", unidad: "g" },
        { id: 5, nombre: "Tomate", unidad: "g" },
        { id: 6, nombre: "Cebolla", unidad: "g" },
        { id: 7, nombre: "Ajo", unidad: "g" },
        { id: 8, nombre: "Huevo", unidad: "unidad" },
        { id: 9, nombre: "Leche", unidad: "ml" },
        { id: 10, nombre: "Aceite de oliva", unidad: "ml" },
        { id: 11, nombre: "Harina", unidad: "g" },
        { id: 12, nombre: "Queso mozzarella", unidad: "g" },
        { id: 13, nombre: "Jamón", unidad: "g" },
        { id: 14, nombre: "Pan rallado", unidad: "g" },
        { id: 15, nombre: "Pasta", unidad: "g" },
    ]

    const [open, setOpen] = useState(false)
    const [busqueda, setBusqueda] = useState("")
    const searchRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (open) {
            setTimeout(() => searchRef.current?.focus(), 50)
        }
    }, [open])

    const filtrados = INGREDIENTES_MOCK.filter(
        (ing) =>
            ing.nombre.toLowerCase().includes(busqueda.toLowerCase()) &&
            !ingredientesUsados.includes(ing.id)
    )

    return (
        <div>
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className={`w-full flex items-center justify-between px-3 h-11 rounded-xl border transition-colors text-sm
                    ${open ? "border-green-500 ring-2 ring-green-500/20" : "border-slate-200 hover:border-slate-300"}
                    ${value ? "text-slate-900" : "text-slate-400"}`}
            >
                <span>{value ? value.nombre : "Seleccionar ingrediente"}</span>
                <ChevronDown
                    size={14}
                    className={`text-slate-400 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                />
            </button>

            <div
                className={`overflow-hidden transition-all duration-200 ease-in-out
                    ${open ? "max-h-72 opacity-100 mt-1" : "max-h-0 opacity-0"}`}
            >
                <div className="border border-slate-200 rounded-xl bg-white shadow-sm overflow-hidden">
                    <div className="p-2 border-b border-slate-100">
                        <div className="relative">
                            <Search
                                size={13}
                                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400"
                            />
                            <input
                                ref={searchRef}
                                type="text"
                                placeholder="Buscar ingrediente..."
                                value={busqueda}
                                onChange={(e) => setBusqueda(e.target.value)}
                                className="w-full pl-8 pr-3 py-1.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-slate-50"
                            />
                        </div>
                    </div>

                    <div className="max-h-52 overflow-y-auto">
                        {filtrados.length === 0 ? (
                            <p className="text-sm text-slate-400 text-center py-4">
                                Sin resultados
                            </p>
                        ) : (
                            filtrados.map((ing) => (
                                <button
                                    key={ing.id}
                                    type="button"
                                    onClick={() => {
                                        onChange(ing)
                                        setOpen(false)
                                        setBusqueda("")
                                    }}
                                    className="w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-slate-50 transition-colors"
                                >
                                    <span className="text-slate-800">{ing.nombre}</span>
                                    <span className="text-xs text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                                        {ing.unidad}
                                    </span>
                                </button>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}