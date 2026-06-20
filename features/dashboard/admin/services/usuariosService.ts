import { http } from "@/lib/utils/httpClient";
import { INestError } from "@/interface/apiResponse";
import { IUserResponse } from "../types/admin.types";

export const getUsuarios = async (page: number, nombre?: string): Promise<IUserResponse> => {
    try {
        const params = new URLSearchParams({
            page: String(page),
            ...(nombre ? { nombre } : {}),
        });

        const data = await http.get<IUserResponse>(`/users/all?${params}`);

        if (data.users.length === 0) throw new Error("No se encontraron usuarios.");

        return data;
    } catch (err) {
        const error = err as INestError;
        const message = Array.isArray(error.message) ? error.message[0] : error.message;
        throw new Error(message || "Error al obtener usuarios");
    }
};