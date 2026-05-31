import AdminContentHeader from "../AdminContentHeader";
import AdminContentTable, { IColumn } from "../AdminContentTable";
import { IReceta } from "@/features/dashboard/recetario/types/recetario.types";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import useRecetario from "@/features/dashboard/recetario/hooks/useRecetario";
import Pagination from "@/features/dashboard/recetario/components/Pagination";

const columnas: IColumn<IReceta>[] = [
    { header: "Nombre", render: (receta) => <span className="font-small">{receta.nombre}</span> },
    { header: "Calorías", render: (receta) => <span>{receta.calorias} kcal</span>, className: "text-center" },
    { header: "Tiempo de Preparación", render: (receta) => <span>{receta.tiempoPreparacion} min</span>, className: "text-center" },
];

export default function RecetasTab() {
    const router = useRouter();
    const { recetas, actualPage, totalPages, handlePageChange, handleSearch } = useRecetario();
    

    const actionButton = (
        <Button className="h-[50px] px-6" onClick={() => router.push("/recetario/nueva")}>
            + Nueva Receta Global
        </Button>
    );

    const columnaIngredientes: IColumn<IReceta> = { header: "Ingredientes", render: () => <span>{8/*recetas.ingredientes.length*/}</span>, className: "text-center" };
    if (!columnas.some(col => col.header === "Ingredientes")){
        columnas.push(columnaIngredientes);
    } else {
        columnas.splice(columnas.findIndex(col => col.header === "Ingredientes"), 1);
        columnas.push(columnaIngredientes);
    }
    
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