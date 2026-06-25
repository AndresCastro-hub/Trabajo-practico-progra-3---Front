import { Clock, Flame } from "lucide-react"
import Image from "next/image"
import { IReceta } from "../types/recetario.types"
import { useModoControl } from "@/context/ModoControlContext"
import { useRouter } from "next/navigation"

export default function RecipeCard({ recipe, priority = false }: { recipe: IReceta, priority?: boolean }) {

    const { modoControl } = useModoControl()
    const router = useRouter()

    const redirigirAlDetalle = () => {
        router.push(`/recetario/${recipe.id}`)
    }

    return (
        <article onClick={redirigirAlDetalle} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
            <div className="relative h-48 overflow-hidden">
                <Image
                    src={recipe.imagen_url}
                    alt={recipe.nombre}
                    fill
                    priority={priority}
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {
                    modoControl && (
                        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-semibold text-gray-800">
                            <Flame className="w-3.5 h-3.5 text-green-500" />
                            {recipe.calorias} kcal
                        </div>
                    )
                }

            </div>

            <div className="p-4">
                <h3 className="font-bold text-gray-900 text-base mb-1">{recipe.nombre}</h3>
                <p className="text-gray-500 text-sm leading-snug mb-3">{recipe.descripcion}</p>
                <div className="flex items-center gap-1.5 text-gray-400 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>{recipe.tiempoPreparacion} min</span>
                </div>
            </div>
        </article>
    )
}