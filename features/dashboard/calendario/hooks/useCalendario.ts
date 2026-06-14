import { useState, useEffect, useCallback } from "react"
import { obtenerCalendarioSemanal } from "../service/calendarioService"
import { semanaVacia, mapperResponseDTOToSemana } from "../utils/calendario.utils"
import { IDia } from "../types/calendario.types";
import moment from 'moment';

const useCalendario = () => {
    const [fechaActual, setFechaActual] = useState<string>(moment().format('YYYY-MM-DD'));
    const [semana, setSemana] = useState<IDia[]>(semanaVacia(moment().format('YYYY-MM-DD')));
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchWeek = useCallback(async () => {
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
    }, [fechaActual]);

    useEffect(() => {
        fetchWeek();
    }, [fetchWeek]);

    const refrescar = () => {
        fetchWeek();
    }

    return {
        fechaActual,
        setFechaActual,
        refrescar,
        semana,
        loading,
        error,
    }
}

export default useCalendario