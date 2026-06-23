import { AsignarRecetaDTO, CalendarioDTO, EliminarReceta, ICalendarWeekItemDto } from "../types/calendario.types";
import { http } from "@/lib/utils/httpClient";

export const obtenerCalendarioSemanal = async (fecha: string) => {
     return http.get<ICalendarWeekItemDto[]>(`/calendar/week?fecha=${fecha}`);
}

export const asignarRecetaACalendario = (data: AsignarRecetaDTO): Promise<CalendarioDTO> => {
    return http.post("/calendar", data);
}

export const EditarRecetaDelCalendario = (dto: AsignarRecetaDTO): Promise<CalendarioDTO> => {
    return http.put("/calendar", dto);
}

export const eliminarRecetaDeCalendario = (dto: EliminarReceta): Promise<CalendarioDTO> => {
    return http.delete("/calendar", dto);
}