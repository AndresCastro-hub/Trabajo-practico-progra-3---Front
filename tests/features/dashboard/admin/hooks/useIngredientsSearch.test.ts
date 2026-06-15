import { renderHook, act, waitFor } from "@testing-library/react";
import { useIngredientsSearch } from "@/features/dashboard/admin/hooks/useIngredientsSearch";
import { getIngredients } from "@/features/dashboard/admin/services/ingredientService";

jest.mock("@/features/dashboard/admin/services/ingredientService");
const mockGetIngredients = getIngredients as jest.Mock;

const mockResponse = {
    ingredients: [
        { id: 1, nombre: "Tomate", unidad: "u" },
        { id: 2, nombre: "Leche", unidad: "ml" },
    ],
    totalRecords: 2,
    totalPages: 1,
};

describe("useIngredientsSearch", () => {
    beforeEach(() => {
        mockGetIngredients.mockResolvedValue(mockResponse);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("hace fetch inicial y carga ingredientes", async () => {
        const { result } = renderHook(() => useIngredientsSearch());

        await waitFor(() => {
            expect(result.current.ingredientes).toEqual(mockResponse.ingredients);
        });

        expect(mockGetIngredients).toHaveBeenCalledWith(1, "");
    });

    it("loading es true al iniciar y false al terminar", async () => {
        const { result } = renderHook(() => useIngredientsSearch());

        expect(result.current.loading).toBe(true);

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });
    });

    it("hace fetch con el nombre al llamar handleSearch", async () => {
        const { result } = renderHook(() => useIngredientsSearch());

        await waitFor(() => expect(mockGetIngredients).toHaveBeenCalledTimes(1));

        act(() => result.current.handleSearch("Tomate"));

        await waitFor(() => {
            expect(mockGetIngredients).toHaveBeenCalledWith(1, "Tomate");
        });
    });

    it("resetea la página a 1 al llamar handleSearch", async () => {
        const { result } = renderHook(() => useIngredientsSearch());

        await waitFor(() => expect(mockGetIngredients).toHaveBeenCalledTimes(1));

        act(() => result.current.handlePageChange(3));
        await waitFor(() => expect(mockGetIngredients).toHaveBeenCalledTimes(2));

        act(() => result.current.handleSearch(""));

        await waitFor(() => {
            expect(result.current.actualPage).toBe(1);
        });
    });

    it("cambia de página al llamar handlePageChange", async () => {
        const { result } = renderHook(() => useIngredientsSearch());

        await waitFor(() => expect(mockGetIngredients).toHaveBeenCalledTimes(1));

        act(() => result.current.handlePageChange(3));

        await waitFor(() => {
            expect(mockGetIngredients).toHaveBeenCalledWith(3, "");
        });
    });

    it("setea error si el fetch falla", async () => {
        mockGetIngredients.mockRejectedValue(new Error("Error de red"));

        const { result } = renderHook(() => useIngredientsSearch());

        await waitFor(() => {
            expect(result.current.error).toBe("Error de red");
            expect(result.current.ingredientes).toEqual([]);
            expect(result.current.loading).toBe(false);
        });
    });

    it("carga totalPages y total correctamente", async () => {
        const { result } = renderHook(() => useIngredientsSearch());

        await waitFor(() => {
            expect(result.current.totalPages).toBe(1);
            expect(result.current.total).toBe(2);
        });
    });
});