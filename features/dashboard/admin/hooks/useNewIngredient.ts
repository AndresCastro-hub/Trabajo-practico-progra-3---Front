import { useState } from "react";
import { postIngredient } from "../services/ingredientService";

export function useNewIngredient() {
    const [nuevoIngrediente, setNuevoIngrediente] = useState<string>("");
    const [nuevaUnidad, setNuevaUnidad] = useState<string>("");
    const [serverError, setServerError] = useState<string | null>(null);
    const [isIngredientCreated, setIngredientCreated] = useState<{nombre: string, unidad: string} | null>(null);

    const handleNewIngrediente = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            const data = await postIngredient({ nombre: nuevoIngrediente, unidad: nuevaUnidad });
            setIngredientCreated(data);
            setNuevoIngrediente('');
            setNuevaUnidad('');
            setServerError(null);
        } catch (error) {
            if (error instanceof Error) {
                setServerError(error.message);
            } else {
                setServerError("Error inesperado");
            }
        }
    }

    return { nuevoIngrediente, setNuevoIngrediente, nuevaUnidad, setNuevaUnidad, isIngredientCreated, serverError, handleNewIngrediente };
}