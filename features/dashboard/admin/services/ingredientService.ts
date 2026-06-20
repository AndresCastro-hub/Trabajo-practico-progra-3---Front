import { INestError } from "@/interface/apiResponse";
import { IIngredient, IIngredientResponse, IIngredientService } from "../types/admin.types";
import { http } from "@/lib/utils/httpClient";

export const postIngredient = async ({ nombre, unidad }: IIngredientService): Promise<IIngredient> => {
    try {
        return await http.post<IIngredient>("/ingredients", { nombre, unidad });
    } catch (err) {
        const error = err as INestError;
        const message = Array.isArray(error.message) ? error.message[0] : error.message;
        throw new Error(message || "Error al registrar el ingrediente");
    }
};

export const getIngredients = async (page: number, name?: string): Promise<IIngredientResponse> => {
    try {
        const params = new URLSearchParams({ page: String(page), ...(name ? { name } : {}) });
        const data = await http.get<IIngredientResponse>(`/ingredients?${params}`);
        if (data.ingredients.length === 0) throw new Error("No se encontraron ingredientes.");
        return data;
    } catch (err) {
        const error = err as INestError;
        const message = Array.isArray(error.message) ? error.message[0] : error.message;
        throw new Error(message || "Error al obtener los ingredientes");
    }
};