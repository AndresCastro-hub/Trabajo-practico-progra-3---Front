export interface Ingrediente {
    id: number
    nombre: string
    unidad: string
}

export interface IngredienteRow {
    ingrediente: Ingrediente | null
    cantidad: string
}

export interface IForm {
    nombre: string
    tiempoPreparacion: number
    descripcion: string
    ingredientes: IngredienteRow[]
    imagen_url: string
}

export interface IngredientDto {
    ingrediente_id: number
    cantidad: number
}

export interface IEditarRecetaDTO {
    description: string;
    prepTime: number;
    deletedIngredientsId: number[];
    addedIngredients: IngredientDto[];
    updatedIngredients: IngredientDto[];
}