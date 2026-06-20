import { http } from "@/lib/utils/httpClient";

export const eliminarReceta = (id: string): Promise<void> => {
    return http.delete(`/recipes/${id}`);
}
