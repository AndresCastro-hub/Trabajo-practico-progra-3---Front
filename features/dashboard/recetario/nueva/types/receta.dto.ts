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
    tiempoDePreparacion: number,
    descripcion: string,
    ingredientes: {
        ingrediente_id: number
        cantidad: number
    }[]
}