import { useState, useEffect } from "react"
import { ICalendarWeekItemDto, IDia } from "../types/calendario.types"
import { obtenerCalendarioSemanal } from "../service/calendarioService"
import moment from 'moment';

const semanaVacia = (fecha:string): IDia[] => {
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

function mapperResponseDTOToSemana(fechaInicio: string, semanaDto: ICalendarWeekItemDto[]): IDia[] {
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

const useCalendario = () => {
    const fechaReset = moment();
    const [fechaActual, setFechaActual] = useState<string>(fechaReset.format('YYYY-MM-DD'));
    const [semana, setSemana] = useState<IDia[]>(semanaVacia(fechaReset.format('YYYY-MM-DD')));
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            setError(null);
            try {
                const result = await obtenerCalendarioSemanal(fechaActual);
                const resultTransformado = mapperResponseDTOToSemana(fechaActual, result);
                setSemana(resultTransformado);
            } catch (err: unknown) {
                setError(err instanceof Error ? err.message : "Error al cargar el calendario");
            } finally {
                setLoading(false);
            }
        }

        fetch()
    }, [fechaActual]);

    return {
        fechaActual,
        setFechaActual,
        semana,
        loading,
        error,
    }
}

export default useCalendario