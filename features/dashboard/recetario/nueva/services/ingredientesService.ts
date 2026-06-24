import { http } from "@/lib/utils/httpClient";
import { Ingrediente } from "../types/receta.types";

export const obtenerTodosLosIngredientes = () => http.get<Ingrediente[]>("/ingredients/all");

