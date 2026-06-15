import { ICalendarWeekItemDto, IDia } from "../types/calendario.types"
import moment from 'moment';

export const semanaVacia = (fecha:string): IDia[] => {
    const semana: IDia[] = [];
    const fechaInicial = moment(fecha);

    for(let i=0; i<=6; i++){
        const fechaIterada = moment(fechaInicial).add(i, 'days').format('YYYY-MM-DD');
        semana.push({
            fecha: fechaIterada,
            comidas: [{
                tipoComida: 'Almuerzo',
                titulo: '',
                descripcion: '',
                imagen: '',
                calorias: 0,
                tiempoPreparacion: 0,
                },
                {
                    tipoComida: 'Cena',
                    titulo: '',
                    descripcion: '',
                    imagen: '',
                    calorias: 0,
                    tiempoPreparacion: 0,
                },
            ]
        });
    }
    return semana;
}

export const mapperResponseDTOToSemana = (fechaInicio: string, semanaDto: ICalendarWeekItemDto[]): IDia[] => {
    const plantilla = semanaVacia(fechaInicio);

    return plantilla.map(dia => {
        const datosDelDia = semanaDto.filter(item => item.fecha === dia.fecha);
        
        if (datosDelDia.length === 0) return dia;

        return {
            ...dia,
            comidas: dia.comidas.map(comidaBase => {
                const datosComida = datosDelDia.find(d => d.tipo_comida === comidaBase.tipoComida);
                return (datosComida) ? {
                    ...comidaBase,
                    titulo: datosComida.titulo,
                    descripcion: datosComida.descripcion,
                    imagen: datosComida.imagen,
                    calorias: datosComida.calorias,
                    tiempoPreparacion: datosComida.tiempo_preparacion,
                    tipoComida: datosComida.tipo_comida,
                } : comidaBase;
            })
        };
    });
}

export const rangoSemana = (fechaActual: string): string => {
    const inicioSemana = moment(fechaActual);
    const finSemana = inicioSemana.clone().add(6, 'days');

    const mismoMes = inicioSemana.month() === finSemana.month();

    return mismoMes 
        ? `${inicioSemana.format('DD')} al ${finSemana.format('D [de] MMMM')}` 
        : `${inicioSemana.format('D [de] MMMM')} al ${finSemana.format('D [de] MMMM')}`;
}

export const isSemanaVacia = (semana: IDia[]): boolean => {
    return (semana.filter(dia => (dia.comidas.filter(comida => comida.titulo !== ''))).length === 0)
}