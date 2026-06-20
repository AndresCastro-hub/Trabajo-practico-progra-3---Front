import { http } from "@/lib/utils/httpClient";
import { IEditarRecetaDTO } from "../types/editar.types";

export const editarReceta = (data: IEditarRecetaDTO, id: string) => {
    return http.patch(`/recipes/${id}/editar`, data);
}
    