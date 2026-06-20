import { useIngredientsSearch } from "../../hooks/useIngredientsSearch";
import AdminContentHeader from "../AdminContentHeader";
import AdminContentTable, { IColumn } from "../AdminContentTable";
import IngredienteActionButton from "./IngredienteActionButton";
import { IIngredientService } from "../../types/admin.types";
import Pagination from "@/components/Pagination";


const columnas: IColumn<IIngredientService>[] = [
    { header: "Nombre", render: (ingrediente) => <span className="font-small ">{ingrediente.nombre}</span> },
    { header: "Unidad", render: (ingrediente) => <span>{ingrediente.unidad}</span>, className: "text-center" },
];

export default function IngredientesTab() {
    const { ingredientes, totalPages, actualPage, loading, error, handleSearch, handlePageChange } = useIngredientsSearch();
    return (
        <>
            <AdminContentHeader onSearch={handleSearch} actionButton={<IngredienteActionButton />} />
            <AdminContentTable
                tableContent={ingredientes}
                columns={columnas}
                getKey={(ingrediente) => ingrediente.id}
                loading={loading}
                error={error}
            />
            {(!loading && ingredientes.length > 0) && (
                <Pagination current={actualPage} lastPage={Math.ceil(totalPages)} onPageChange={handlePageChange} />
            )}
        </>
    )
}
