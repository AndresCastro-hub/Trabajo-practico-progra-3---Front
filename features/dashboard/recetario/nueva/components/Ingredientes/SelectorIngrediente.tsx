import { ChevronDown, Search } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { useIngredientes } from "../../hooks/useIngredientes"

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

    const { ingredientes, loading } = useIngredientes()

    const [open, setOpen] = useState<boolean>(false)
    const [busqueda, setBusqueda] = useState<string>("")
    const searchRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (open) {
            setTimeout(() => searchRef.current?.focus(), 50)
        }
    }, [open])

    const filtrados = ingredientes.filter(
        (ing) =>
            ing.nombre.toLowerCase().includes(busqueda.toLowerCase()) &&
            !ingredientesUsados.includes(ing.id)
    )
    
    return (
        <div className="relative">
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

            {open && (
                <div className="absolute top-[calc(100%+4px)] left-0 w-full z-50 border border-slate-200 rounded-xl bg-white shadow-lg overflow-hidden">
                    <div className="p-2 border-b border-slate-100">
                        <div className="relative">
                            <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
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
                        {loading ? (
                            <p className="text-sm text-slate-400 text-center py-4">Cargando...</p>
                        ) : filtrados.length === 0 ? (
                            <p className="text-sm text-slate-400 text-center py-4">Sin resultados</p>
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
                                    <span className="text-xs text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">{ing.unidad}</span>
                                </button>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}