import { useState } from "react";

export function useSearch() {
    const [busqueda, setBusqueda] = useState<string>("");

    const resultados = [
        { nombre: "Tomate", unidad: "U" },
        { nombre: "Leche", unidad: "mL" },
        { nombre: "Harina", unidad: "g" },
        { nombre: "Azúcar", unidad: "g" },
        { nombre: "Huevos", unidad: "U" },
    ];

    return { busqueda, setBusqueda, resultados };
}