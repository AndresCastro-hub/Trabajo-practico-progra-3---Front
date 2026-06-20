import { http } from "@/lib/utils/httpClient";
import { EditarRecetaDto } from "../../../nueva/types/receta.dto";

export const editarReceta = (id: string, data: EditarRecetaDto) => {
    return     http.patch(`/recipes/${id}/editar`, data);
}
