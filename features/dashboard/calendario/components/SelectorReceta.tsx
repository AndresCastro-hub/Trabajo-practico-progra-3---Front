import { ChevronDown, Search } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { IReceta } from "../../recetario/types/recetario.types"

interface SelectorRecetaProps {
    recetas: IReceta[];
    seleccion: {
        actual: IReceta | null;
        set: (receta: IReceta | null) => void;
    };
    busqueda: {
        texto: string;
        onSearch: (busqueda: string) => void;
    };
    paginacion: {
        hayMas: boolean;
        loading: boolean;
        onCargarMas: () => void;
    };
    clearFeedback: () => void;
}

export function SelectorReceta({ recetas, seleccion, busqueda, paginacion, clearFeedback }: SelectorRecetaProps) {
    const [open, setOpen] = useState<boolean>(false)
    const searchRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (open) {
            setTimeout(() => searchRef.current?.focus(), 50)
        }
    }, [open])
    
    return (
        <div className="relative w-full">
            <button
                type="button"
                onClick={() => {
                    setOpen(!open);
                    clearFeedback();
                }}
                className={`w-full flex items-center justify-between px-3 h-11 rounded-xl border transition-colors text-sm
                ${open ? "border-green-500 ring-2 ring-green-500/20" : "border-slate-200 hover:border-slate-300"}
                ${seleccion.actual ? "text-slate-900" : "text-slate-400"}`}
            >
                <span>{seleccion.actual ? seleccion.actual.nombre : "Seleccionar receta"}</span>
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
                                placeholder="Buscar receta..."
                                defaultValue={busqueda.texto}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") busqueda.onSearch(e.currentTarget.value)
                                }}
                                className="w-full pl-8 pr-3 py-1.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-slate-50"
                            />
                        </div>
                    </div>

                    <div className="max-h-52 overflow-y-auto">
                        {(paginacion.loading && recetas.length === 0) ? (
                            <p className="text-sm text-slate-400 text-center py-4">Cargando...</p>
                        ) : recetas.length === 0 ? (
                            <p className="text-sm text-slate-400 text-center py-4">Sin resultados</p>
                        ) : (
                            <>
                                {recetas.map((receta) => (
                                    <button
                                        key={receta.id}
                                        type="button"
                                        onClick={() => {
                                            busqueda.onSearch(receta.nombre)
                                            seleccion.set(receta)
                                            setOpen(false)
                                        }}
                                        className="w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-slate-50 transition-colors"
                                    >
                                        <span className="text-slate-800">{receta.nombre}</span>
                                    </button>
                                ))}
                                
                                {paginacion.hayMas && ( 
                                    <button
                                        type="button"
                                        onClick={paginacion.onCargarMas}
                                        className="w-full px-3 py-2 text-xs font-medium text-green-600 hover:bg-green-50 border-t border-slate-100 transition-colors"
                                    >
                                        <span className="text-slate-800">Cargar mas...</span>
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}