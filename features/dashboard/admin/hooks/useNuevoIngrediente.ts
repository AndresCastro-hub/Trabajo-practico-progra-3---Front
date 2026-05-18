import { useState } from "react";

export function useNuevoIngrediente() {
    const [nuevoIngrediente, setNuevoIngrediente] = useState<string>("");
    const [nuevaUnidad, setNuevaUnidad] = useState<string>("");

    const handleNewIngrediente = (e: React.FormEvent) => {
        e.preventDefault();
        // Aquí iría la lógica para agregar un nuevo ingrediente
    }

    return { nuevoIngrediente, setNuevoIngrediente, nuevaUnidad, setNuevaUnidad, handleNewIngrediente };
}