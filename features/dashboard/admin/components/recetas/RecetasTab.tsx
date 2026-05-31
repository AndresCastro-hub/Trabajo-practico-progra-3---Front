import AdminContentHeader from "../AdminContentHeader";
import AdminContentTable, { IColumn } from "../AdminContentTable";
import { IReceta } from "@/features/dashboard/recetario/types/recetario.types";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import useRecetario from "@/features/dashboard/recetario/hooks/useRecetario";
import Pagination from "@/features/dashboard/recetario/components/Pagination";
import { useMemo } from "react";

export default function RecetasTab() {
    const router = useRouter();
    const { recetas, actualPage, totalPages, handlePageChange, handleSearch } = useRecetario();

    const actionButton = (
        <Button className="h-[50px] px-6" onClick={() => router.push("/recetario/nueva")}>
            + Nueva Receta Global
        </Button>
    );

    const columnas: IColumn<IReceta>[] = useMemo(() => [
        { header: "Nombre", render: (receta) => <span>{receta.nombre}</span> },
        { header: "Calorías", render: (receta) => <span>{receta.calorias} kcal</span>, className: "text-center" },
        { header: "Tiempo de Preparación", render: (receta) => <span>{receta.tiempoPreparacion} min</span>, className: "text-center" },
        { header: "Ingredientes", render: () => <span>{8/*recetas.ingredientes.length*/}</span>, className: "text-center" },
    ], []);
    
    return (
        <>
            <AdminContentHeader onSearch={handleSearch} actionButton={actionButton} />
            <AdminContentTable
                tableContent={recetas}
                columns={columnas}
                getKey={(receta) => receta.nombre}
                onEdit={() => window.alert("Próximamente")}
                onDelete={() => window.alert("Próximamente")}
            />

            {recetas.length > 0 && (
                <Pagination current={actualPage} lastPage={Math.ceil(totalPages)} onPageChange={handlePageChange} />
            )}
        </>
    )
}