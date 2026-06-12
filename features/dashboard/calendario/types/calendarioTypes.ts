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

/*
Semana{ 
    dia1:[ comida1: { ... }, comida2: { ... } ],
    dia2:[ comida1: { ... }, comida2: { ... } ],
    dia3:[ comida1: { ... }, comida2: { ... } ],
    ...
    7 dias
}
*/