import { renderHook, act, waitFor } from "@testing-library/react";
import useRecetario from "@/features/dashboard/recetario/hooks/useRecetario";
import { obtenerTodasLasRecetas } from "@/features/dashboard/recetario/services/obtenerTodasLasRecetas";

jest.mock("@/features/dashboard/recetario/services/obtenerTodasLasRecetas");
const mockObtener = obtenerTodasLasRecetas as jest.Mock;

const mockResponse = {
    recipeDto: [{ id: 1, nombre: "Milanesa" }],
    totalRecords: 1,
    totalPages: 1,
};

describe("useRecetario", () => {
    beforeEach(() => {
        mockObtener.mockResolvedValue(mockResponse);
    });

    afterEach(() => jest.clearAllMocks());

    it("inicia con loading true", async () => {
        const { result } = renderHook(() => useRecetario());
        expect(result.current.loading).toBe(true);
        await waitFor(() => expect(result.current.loading).toBe(false));
    });

    it("carga las recetas correctamente", async () => {
        const { result } = renderHook(() => useRecetario());

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.recetas).toEqual(mockResponse.recipeDto);
        expect(result.current.total).toBe(1);
        expect(result.current.totalPages).toBe(1);
    });

    it("setea error si el fetch falla", async () => {
        mockObtener.mockRejectedValue(new Error("Error al cargar las recetas"));

        const { result } = renderHook(() => useRecetario());

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.error).toBe("Error al cargar las recetas");
        expect(result.current.recetas).toEqual([]);
    });

    it("handleTabChange cambia el tab y resetea la página", async () => {
        const { result } = renderHook(() => useRecetario());
        await waitFor(() => expect(result.current.loading).toBe(false));

        act(() => result.current.handleTabChange("mis-recetas"));

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.activeTab).toBe("mis-recetas");
        expect(result.current.actualPage).toBe(1);
    });

    it("handleSearch cambia el search y resetea la página", async () => {
        const { result } = renderHook(() => useRecetario());
        await waitFor(() => expect(result.current.loading).toBe(false));

        act(() => result.current.handleSearch("pasta"));

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(mockObtener).toHaveBeenCalledWith(
            expect.objectContaining({ nombre: "pasta", page: 0 })
        );
    });

    it("handlePageChange cambia la página", async () => {
        const { result } = renderHook(() => useRecetario());
        await waitFor(() => expect(result.current.loading).toBe(false));

        act(() => result.current.handlePageChange(2));

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.actualPage).toBe(2);
    });

    it("inicia en tab plataforma", async () => {
        const { result } = renderHook(() => useRecetario());
        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.activeTab).toBe("plataforma");
    });
});