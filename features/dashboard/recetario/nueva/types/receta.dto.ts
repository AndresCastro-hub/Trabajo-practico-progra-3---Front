import { IngredientDto } from "./receta.types"

export interface CrearRecetaDTO{
    nombre: string
    descripcion: string
    tiempoPreparacion: number
    ingredientes: {
        ingrediente_id: number
        cantidad: number
    }[]
}

export interface EditarRecetaDto{
    
    description?: string;

    prepTime?: number;

    deletedIngredientsId?: number[];

    addedIngredients?: IngredientDto[];

}