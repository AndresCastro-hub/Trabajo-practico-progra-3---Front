import { http } from "@/lib/utils/httpClient";
import { Ingrediente } from "../types/receta.types";

export const obtenerTodosLosIngredientes = () => http.get<Ingrediente[]>("/ingredients/all");
import { IngredientResponseDto } from "../types/ingredientes.dto";

export const obtenerTodosLosIngredientes = (): Promise<IngredientResponseDto[]> => http.get("/ingredients/all");
