import { getTokenFromCookie } from "@/hooks/useAuth"
import { IForm, IngredienteRow } from "../types/editarTypes"

export const initialFetch = async (id: string): Promise<IForm> => {
    const response = await fetch(`http://localhost:5000/recipes/${id}`,{
        headers: {
            'Authorization': `Bearer ${getTokenFromCookie()}`
        }
    });

    if (!response.ok) {
        throw new Error("No se encontró la receta");
    }

    const data = await response.json();
    const recetaDetalle: IForm = {
        nombre: data.nombre,
        descripcion: data.descripcion,
        tiempoPreparacion: data.tiempoPreparacion,
        imagen_url: data.imagen_url,
        ingredientes: data.ingredientes.map((i: IngredienteRow) => ({
            ingrediente: {
                id: i.ingrediente?.id,
                nombre: i.ingrediente?.nombre,
                unidad: i.ingrediente?.unidad
            },
            cantidad: i.cantidad,
        }))
    };
    return recetaDetalle;
}