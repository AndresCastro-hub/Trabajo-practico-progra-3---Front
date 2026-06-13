import { INestError } from "@/interface/apiResponse";
import { getTokenFromCookie } from "@/hooks/useAuth";
import { AsignarRecetaDTO } from "../types/calendario.types";

export const obtenerCalendarioSemanal = async (fecha: string) => {

    const response = await fetch(`http://localhost:5000/Calendar/week?fecha=${fecha}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getTokenFromCookie()}`
        },
    });

    if (!response.ok) {
        const error: INestError = await response.json();
        throw error;
    }

    return response.json();
}

export const asignarRecetaACalendario = async (data: AsignarRecetaDTO) => {

    const response = await fetch(`http://localhost:5000/Calendar`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getTokenFromCookie()}`
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const error: INestError = await response.json();
        throw error;
    }

    return response.json();
}