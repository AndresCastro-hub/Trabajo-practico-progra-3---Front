import { useState, useEffect } from "react"
import { IUser } from "../types/adminTypes"
import { getUsuarios } from "../services/usuariosService"

export const useUsersSearch = () => {
    const [filters, setFilters] = useState({
        page: 0,
        search: "",
    })
    const [usuarios, setUsuarios] = useState<IUser[]>([])
    const [totalPages, setTotalPages] = useState<number>(1)
    const [totalUsers, setTotalUsers] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetch = async () => {
            setLoading(true)
            setError(null)
            try {
                const result = await getUsuarios(filters.page, filters.search);
                setUsuarios(result.users)
                setTotalUsers(result.totalUsers)
                setTotalPages(Math.ceil(result.totalPages))
            } catch (err: unknown) {
                setUsuarios([])
                setTotalPages(0)
                setError(err instanceof Error ? err.message : "Error al cargar los usuarios")
            } finally {
                setLoading(false)
            }
        }

        fetch()
    }, [filters])

    const handleSearch = (value: string) =>
        setFilters(prev => ({ ...prev, search: value, page: 0 }));

    const handlePageChange = (page: number) =>
        setFilters(prev => ({ ...prev, page }));

    return {
        usuarios,
        totalUsers,
        totalPages,
        actualPage: filters.page,
        loading,
        error,
        handleSearch,
        handlePageChange,
    }
}