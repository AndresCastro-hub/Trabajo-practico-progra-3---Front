import { http } from "@/lib/utils/httpClient";
import { IRecetaDetalle } from "../../types/recetario.types";

export const getRecetaById = (id: string): Promise<IRecetaDetalle> => {
    return http.get<IRecetaDetalle>(`/recipes/${id}`);
}