import { getTokenFromCookie } from "@/hooks/useAuth";
import { INestError } from "@/interface/apiResponse";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

async function request<T>(method: string, path: string, body?: unknown): Promise<T> {
    const response = await fetch(`${BASE_URL}${path}`, {
        method,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getTokenFromCookie()}`,
        },
        ...(body ? { body: JSON.stringify(body) } : {}),
    });

    if (!response.ok) {
        const error: INestError = await response.json();
        throw error;
    }

    return response.json();
}

export const http = {
    get:    <T>(path: string)              => request<T>("GET",    path),
    post:   <T>(path: string, body: unknown) => request<T>("POST",   path, body),
    put:    <T>(path: string, body: unknown) => request<T>("PUT",    path, body),
    patch:  <T>(path: string, body: unknown) => request<T>("PATCH",  path, body),
    delete: <T>(path: string, body?: unknown) => request<T>("DELETE", path, body),
};