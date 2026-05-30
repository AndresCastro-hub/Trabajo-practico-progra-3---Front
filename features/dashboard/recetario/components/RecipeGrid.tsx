import RecipeCard from "./RecipeCard"
import { IReceta } from "../types/recetario.types"

interface RecipeGridProps {
    recetas: IReceta[]
    loading: boolean
}

export default function RecipeGrid({ recetas, loading }: RecipeGridProps) {
    if (loading) return (
        <div className="flex justify-center items-center py-24">
            <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
        </div>
    )

    if (recetas.length === 0) return (
        <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="text-2xl font-semibold text-gray-700">No hay recetas</p>
            <p className="text-gray-400 mt-2">No se encontraron resultados para esta página.</p>
        </div>
    )

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recetas.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
            </div>
        </>
    )
}