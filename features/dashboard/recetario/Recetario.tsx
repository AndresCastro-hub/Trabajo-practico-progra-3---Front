"use client"
import Header from "@/components/Header"
import { useRouter } from "next/navigation"

export default function Recetario() {
    const router = useRouter()

    return (
        <section className="bg-gray-200">
            <Header
                title="Recetario"
                subtitle="6 recetas disponibles"
                buttons={[
                    { label: '+ Nueva receta', onClick: () => router.push("/recetario/nueva") }
                ]}
            />
        </section>

    )
}