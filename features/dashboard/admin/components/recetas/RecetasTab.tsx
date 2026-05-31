import RecetasTable from "./RecetasTable"
import RecetasHeader from "./RecetasHeader"
import useRecetario from "@/features/dashboard/recetario/hooks/useRecetario"
import Pagination from "@/features/dashboard/recetario/components/Pagination"

export default function RecetasTab() {
    /*const recetasMock=[
        {
            nombre: "Pollo al horno",
            calorias: 300,
            tiempo: 120,
            ingredientes: [
                {
                    nombre:"pollo",
                    unidad:"g"
                },
                {
                    nombre: "papas",
                    unidad: "g"
                }
            ]
        },
        {
            nombre: "Milanesa",
            calorias: 500,
            tiempo: 60,
            ingredientes: [
                {
                    nombre:"carne",
                    unidad:"g"
                },
                {
                    nombre: "pan",
                    unidad: "g"
                }
            ]
        }
    ]*/

    const { recetas, actualPage, totalPages, handlePageChange, handleSearch } = useRecetario()
    
    return (
        <>
            <RecetasHeader onSearch={handleSearch} />
            <RecetasTable recetas={recetas} />
            {recetas.length > 0 && (
                <Pagination current={actualPage} lastPage={Math.ceil(totalPages)} onPageChange={handlePageChange} />
            )}
        </>
    )
}