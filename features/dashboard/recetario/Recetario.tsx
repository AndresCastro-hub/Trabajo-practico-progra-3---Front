"use client"
import Header from "@/components/Header"
import { useRouter } from "next/navigation"
import NavBar from "./components/NavBar"
import Pagination from "./components/Pagination"
import useRecetario from "./hooks/useRecetario"
import RecipeGrid from "./components/RecipeGrid"

export default function Recetario() {
    const router = useRouter()
    const { recetas, total, actualPage, loading, totalPages, activeTab, handlePageChange, handleTabChange, handleSearch } = useRecetario()

    return (
        <section className="min-h-screen">

            <Header
                title="Recetario"
                subtitle={`${total} recetas disponibles`}
                buttons={[
                    { label: '+ Nueva receta', onClick: () => router.push("/recetario/nueva") }
                ]}
            />

            <NavBar onSearch={handleSearch} activeTab={activeTab} handleTabChange={handleTabChange} />

            <main className="max-w-6xl mx-auto px-6 py-8">
                <RecipeGrid
                    recetas={recetas}
                    loading={loading}
                />

                {!loading && recetas.length > 0 && (
                    <Pagination current={actualPage} lastPage={Math.ceil(totalPages)} onPageChange={handlePageChange} />
                )}
            </main>

        </section>

    )
}

