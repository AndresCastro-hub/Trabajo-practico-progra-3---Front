import { http } from "@/lib/utils/httpClient";
import { IngredientResponseDto } from "../types/ingredientes.dto";

export const obtenerTodosLosIngredientes = (): Promise<IngredientResponseDto[]> => http.get("/ingredients/all");