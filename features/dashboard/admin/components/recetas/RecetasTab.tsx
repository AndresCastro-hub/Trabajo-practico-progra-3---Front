import AdminContentHeader from "../AdminContentHeader";
import AdminContentTable, { IColumn } from "../AdminContentTable";
import { IReceta } from "@/features/dashboard/recetario/types/recetario.types";
import useRecetario from "@/features/dashboard/recetario/hooks/useRecetario";
import Pagination from "@/components/Pagination";
import RecetaActionButton from "./RecetaActionButton";
import { useRouter } from "next/navigation"
import Link from "next/link";
import { ReceiptText } from 'lucide-react';

const columnas: IColumn<IReceta>[] = [
    { header: "Nombre", render: (receta) => <span>{receta.nombre}</span> },
    { header: "Calorías", render: (receta) => <span>{receta.calorias} kcal</span>, className: "text-center" },
    { header: "Ver detalle", render: (receta) => (
        <Link href={`/recetario/${receta.id}`} className="text-gray-500 hover:text-gray-700 transition-colors flex justify-center">
            <ReceiptText size={22} />
        </Link>
    ), className: "text-center" },
];

export default function RecetasTab() {
    const router = useRouter();
    const { recetas, actualPage, totalPages, loading, error, handlePageChange, handleSearch } = useRecetario();
    
    return (
        <>
            <AdminContentHeader onSearch={handleSearch} actionButton={<RecetaActionButton />} />
            <AdminContentTable
                tableContent={recetas}
                columns={columnas}
                getKey={(receta) => receta.nombre}
                onEdit={(receta) => router.push(`/admin/editar/${receta.id}`)}
                onDelete={() => window.alert("Próximamente")}
                loading={loading}
                error={error}
            />

            {(!loading && recetas.length > 0) && (
                <Pagination current={actualPage} lastPage={Math.ceil(totalPages)} onPageChange={handlePageChange} />
            )}
        </>
    )
}