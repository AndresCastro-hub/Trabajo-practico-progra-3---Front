export interface CrearRecetaDTO{
    nombre: string
    descripcion: string
    tiempoPreparacion: number
    ingredientes: {
        ingredient_id: number
        cantidad: number
    }[]
}