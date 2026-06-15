import { renderHook, act, waitFor } from "@testing-library/react";
import { useUsersSearch } from "@/features/dashboard/admin/hooks/useUsersSearch";
import { getUsuarios } from "@/features/dashboard/admin/services/usuariosService";

jest.mock("@/features/dashboard/admin/services/usuariosService");
const mockGetUsuarios = getUsuarios as jest.Mock;

const mockResponse = {
    users: [
        { id: 1, name: "Elena Martín", email: "elena@test.com", rolName: "administrador" },
        { id: 2, name: "Juan Pérez", email: "juan@test.com", rolName: "usuario" },
    ],
    totalUsers: 2,
    totalPages: 1,
};

describe("useUsersSearch", () => {
    beforeEach(() => {
        mockGetUsuarios.mockResolvedValue(mockResponse);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("hace fetch inicial al montar y carga usuarios", async () => {
        const { result } = renderHook(() => useUsersSearch());

        await waitFor(() => {
            expect(result.current.usuarios).toEqual(mockResponse.users);
        });

        expect(mockGetUsuarios).toHaveBeenCalledWith(0, "");
    });

    it("setea totalPages y totalUsers correctamente", async () => {
        const { result } = renderHook(() => useUsersSearch());

        await waitFor(() => {
            expect(result.current.totalPages).toBe(1);
            expect(result.current.totalUsers).toBe(2);
        });
    });

    it("handlePageChange actualiza la página y hace fetch con offset correcto", async () => {
        const { result } = renderHook(() => useUsersSearch());

        await waitFor(() => expect(result.current.loading).toBe(false));

        act(() => result.current.handlePageChange(2));

        await waitFor(() => {
            expect(mockGetUsuarios).toHaveBeenCalledWith(2, "");
            expect(result.current.actualPage).toBe(2);
        });
    });

    it("handleSearch resetea página a 0 y actualiza búsqueda", async () => {
        const { result } = renderHook(() => useUsersSearch());

        await waitFor(() => expect(result.current.loading).toBe(false));

        act(() => result.current.handlePageChange(3));
        await waitFor(() => expect(mockGetUsuarios).toHaveBeenCalledWith(3, ""));

        act(() => result.current.handleSearch("Elena"));

        await waitFor(() => {
            expect(mockGetUsuarios).toHaveBeenCalledWith(0, "Elena");
            expect(result.current.actualPage).toBe(0);
        });
    });

    it("setea error si el fetch falla", async () => {
        mockGetUsuarios.mockRejectedValue(new Error("Error de red"));

        const { result } = renderHook(() => useUsersSearch());

        await waitFor(() => {
            expect(result.current.error).toBe("Error de red");
            expect(result.current.usuarios).toEqual([]);
            expect(result.current.loading).toBe(false);
        });
    });

    it("setea error genérico si el error no es instancia de Error", async () => {
        mockGetUsuarios.mockRejectedValue("fallo raro");

        const { result } = renderHook(() => useUsersSearch());

        await waitFor(() => {
            expect(result.current.error).toBe("Error al cargar los usuarios");
        });
    });

    it("loading es true durante el fetch y false al terminar", async () => {
        const { result } = renderHook(() => useUsersSearch());

        expect(result.current.loading).toBe(true);

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });
    });
});