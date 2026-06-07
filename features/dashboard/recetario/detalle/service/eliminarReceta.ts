import { getTokenFromCookie } from "@/hooks/useAuth"

export async function eliminarReceta(id: string): Promise<void>{
    await fetch(`http://localhost:5000/recipes/${id}`,{
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${getTokenFromCookie()}`
        }
    })
}