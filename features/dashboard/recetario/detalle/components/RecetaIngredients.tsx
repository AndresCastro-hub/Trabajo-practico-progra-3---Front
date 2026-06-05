import { IIngredienteDetalle } from "../../types/recetario.types";

export default function RecetaIngredients({ ingredientes }: { ingredientes: IIngredienteDetalle[] }) {
    return (
        <div className="mt-6">
            <h2 className="text-base font-bold text-gray-900 mb-3">Ingredientes</h2>
            <ul className="space-y-2">
                {ingredientes.map((ing) => (
                    <li key={ing.id} className="flex items-center justify-between px-4 py-3 rounded-xl bg-gray-50 transition-colors">
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-gray-800 capitalize">{ing.ingrediente.nombre}</span>
                        </div>
                        <span className="text-sm text-gray-400 bg-gray-100 rounded-lg px-3 py-1">
                            {ing.cantidad} {ing.ingrediente.unidad}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    )
}