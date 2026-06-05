import AdminContentHeader from "../AdminContentHeader";
import AdminContentTable, { IColumn } from "../AdminContentTable";
import { IUser } from "../../types/adminTypes";
import Pagination from "@/components/Pagination";
import { useUsersSearch } from "../../hooks/useUsersSearch";

const columnas: IColumn<IUser>[] = [
    { header: "Nombre", render: (usuario) => <span className="font-small ">{usuario.name}</span> },
    { header: "Email", render: (usuario) => <span>{usuario.email}</span>, className: "text-center" },
    { header: "Rol", render: (usuario) => <span>{usuario.rolName}</span>, className: "text-center" },
];

export default function UsuariosTab() {
    const { usuarios, totalPages, actualPage, loading, handlePageChange, handleSearch } = useUsersSearch();
    
    return (
        <>
            <AdminContentHeader onSearch={handleSearch} />
            <AdminContentTable
                tableContent={usuarios}
                columns={columnas}
                getKey={(usuario) => usuario.id}
            />
            {!loading && usuarios.length > 0 && (
                <Pagination current={actualPage+1} lastPage={Math.ceil(totalPages)} onPageChange={handlePageChange} />
            )}
        </>
    )
}