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

    updatedIngredients?: IngredientDto[]
}

export class RecipeResponseDto {
    id!: number;
    nombre!: string;
    descripcion?: string;
    calorias!: number;
    tiempoPreparacion!: number;
    imagen_url!: string;
    ingredientes!: Ingredients[];
}

export class Ingredients {
    id!: number;
    cantidad!: number;
    ingrediente!: {
        id: number;
        nombre: string;
        unidad: string;
    };
}