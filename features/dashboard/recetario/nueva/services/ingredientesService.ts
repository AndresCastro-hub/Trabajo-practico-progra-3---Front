import { http } from "@/lib/utils/httpClient";

export const obtenerTodosLosIngredientes = () => http.get("/ingredients/all");