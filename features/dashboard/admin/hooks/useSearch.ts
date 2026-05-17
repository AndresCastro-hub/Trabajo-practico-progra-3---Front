import { useState } from "react";

export function useSearch() {
    const [busqueda, setBusqueda] = useState<string>("");

    return { busqueda, setBusqueda };
}