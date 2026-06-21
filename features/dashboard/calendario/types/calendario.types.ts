export interface ICalendarWeekItemDto {
    fecha: string;
    tipo_comida: string;
    titulo: string;
    descripcion: string;
    imagen: string;
    calorias: number;
    tiempo_preparacion: number;
}

export interface IDia {
    fecha: string;
    comidas: IComida[];
}

export interface IComida {
    titulo: string;
    descripcion: string;
    imagen: string;
    calorias: number;
    tiempoPreparacion: number;
    tipoComida: string;
}

export interface AsignarRecetaDTO {
    fecha: string;
    tipo_comida_id: number;
    receta_id: number;
}

export interface EliminarReceta{
    tipo_comida_id: number;
    fecha: string;
}

export interface CalendarioDTO {
    id: number,
    usuario_id: number,
    fecha: Date,
    receta_id: number,
    tipo_comida_id: number,
}