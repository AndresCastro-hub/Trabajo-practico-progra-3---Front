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