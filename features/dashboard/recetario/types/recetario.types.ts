export type ActiveTab = "plataforma" | "mis-recetas"

export interface IReceta {
    id: number
    calorias: number
    descripcion: string
    idUsuario: number
    imagen_url: string
    nombre: string
    tiempoPreparacion: number
}

export interface IRecetasParams {
    page: number
    nombre?: string
    recetasPlataforma: boolean
}

export interface IRecetasResponse {
    recipeDto: IReceta[]
    totalPages: number
    totalRecords: number
}

export interface IIngredienteDetalle {
    id: number
    cantidad: string
    ingrediente: {
        id: number
        nombre: string
        unidad: string
    }
}

export interface IRecetaDetalle extends IReceta {
    ingredientes: IIngredienteDetalle[]
}