import { AsignarRecetaDTO, EliminarReceta, ICalendarWeekItemDto } from "../types/calendario.types";
import { http } from "@/lib/utils/httpClient";

export const obtenerCalendarioSemanal = async (fecha: string) => {
     return http.get<ICalendarWeekItemDto[]>(`/Calendar/week?fecha=${fecha}`);
}

export const asignarRecetaACalendario = (data: AsignarRecetaDTO) => {
    return http.post("/Calendar", data);
}

export const EditarRecetaDelCalendario = (dto: AsignarRecetaDTO) => {
    return http.put("/Calendar", dto);
}

export const eliminarRecetaDeCalendario = (dto: EliminarReceta) => {
    return http.delete("/Calendar", dto);
}