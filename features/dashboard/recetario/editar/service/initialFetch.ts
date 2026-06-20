import { http } from "@/lib/utils/httpClient";
import { IForm, IngredienteRow } from "../types/editar.types";

export const initialFetch = async (id: string): Promise<IForm> => {
    const data = await http.get<IForm>(`/recipes/${id}`);

    return {
        nombre: data.nombre,
        descripcion: data.descripcion,
        tiempoPreparacion: data.tiempoPreparacion,
        imagen_url: data.imagen_url,
        ingredientes: data.ingredientes.map((i: IngredienteRow) => ({
            ingrediente: i.ingrediente ? {
                id: i.ingrediente.id,
                nombre: i.ingrediente.nombre,
                unidad: i.ingrediente.unidad
            } : null,
            cantidad: i.cantidad,
        }))
    };
}