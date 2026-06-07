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
    tiempoDePreparacion: number
    descripcion: string
    ingredientes: IngredienteRow[]
    imagen: File | null
}

export interface IFormEdicion {
    tiempoDePreparacion: number
    descripcion: string
    ingredientes: IngredienteRow[]
}

export interface IngredienteEditRow {
    ingrediente_id: number
    cantidad: string
}