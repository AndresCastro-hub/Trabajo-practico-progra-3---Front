import { renderHook, act, waitFor } from "@testing-library/react";
import { useIngredientsSearch } from "@/features/dashboard/admin/hooks/useIngredientsSearch";
import { getIngredients } from "@/features/dashboard/admin/services/ingredientService";

jest.mock("@/features/dashboard/admin/services/ingredientService");
const mockGetIngredients = getIngredients as jest.Mock;

const mockIngredientes = [
    { id: 1, nombre: "Tomate", unidad: "u" },
    { id: 2, nombre: "Leche", unidad: "ml" },
];

describe("useIngredientsSearch", () => {
    beforeEach(() => {
        mockGetIngredients.mockResolvedValue(mockIngredientes);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("hace fetch inicial al montar y carga resultados", async () => {
        const { result } = renderHook(() => useIngredientsSearch());

        await waitFor(() => {
            expect(result.current.resultados).toEqual(mockIngredientes);
        });

        expect(mockGetIngredients).toHaveBeenCalledWith(10, 0, "");
    });

    it("hace fetch con busquedaConfirmada al llamar handleSearch", async () => {
        const { result } = renderHook(() => useIngredientsSearch());

        await waitFor(() => expect(mockGetIngredients).toHaveBeenCalledTimes(1));

        act(() => result.current.handleSearch("Tomate"));

        await waitFor(() => {
            expect(mockGetIngredients).toHaveBeenCalledWith(10, 0, "Tomate");
        });
    });

    it("resetea la página a 0 al llamar handleSearch", async () => {
        const { result } = renderHook(() => useIngredientsSearch());

        await waitFor(() => expect(mockGetIngredients).toHaveBeenCalledTimes(1));

        act(() => result.current.setPagina(3));
        await waitFor(() => expect(mockGetIngredients).toHaveBeenCalledTimes(2));

        act(() => result.current.handleSearch(""));

        await waitFor(() => {
            expect(result.current.pagina).toBe(0);
        });
    });

    it("calcula el offset correcto según la página", async () => {
        const { result } = renderHook(() => useIngredientsSearch());

        await waitFor(() => expect(mockGetIngredients).toHaveBeenCalledTimes(1));

        act(() => result.current.setPagina(2));

        await waitFor(() => {
            expect(mockGetIngredients).toHaveBeenCalledWith(10, 20, "");
        });
    });

    it("setea error si el fetch falla", async () => {
        mockGetIngredients.mockRejectedValue(new Error("Error de red"));

        const { result } = renderHook(() => useIngredientsSearch());

        await waitFor(() => {
            expect(result.current.error).toBe("Error de red");
            expect(result.current.resultados).toEqual([]);
        });
    });
});