export type ActiveTab = "plataforma" | "mis-recetas"

export interface IReceta {
    id: number
    calorias: number
    descripcion: string
    idUsuario: number
    imagen_url: string
    nombre: string
    tiempoPreparacion: number
    estaAsignada: boolean
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

export interface IJwtPayload {
  id: number;
  email: string;
  rol: string;
  name: string
}