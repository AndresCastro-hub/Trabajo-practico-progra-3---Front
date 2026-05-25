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
        jest.useFakeTimers();
        mockGetIngredients.mockResolvedValue(mockIngredientes);
    });

    afterEach(() => {
        jest.useRealTimers();
        jest.clearAllMocks();
    });

    it("hace fetch inicial al montar y carga resultados", async () => {
        const { result } = renderHook(() => useIngredientsSearch());

        act(() => jest.advanceTimersByTime(300));

        await waitFor(() => {
            expect(result.current.resultados).toEqual(mockIngredientes);
        });

        expect(mockGetIngredients).toHaveBeenCalledWith(10, 0);
    });

    it("no hace fetch antes de que pasen 300ms", () => {
        renderHook(() => useIngredientsSearch());

        act(() => jest.advanceTimersByTime(299));

        expect(mockGetIngredients).not.toHaveBeenCalled();
    });

    it("resetea el timer si busqueda cambia antes de 300ms", async () => {
        const { result } = renderHook(() => useIngredientsSearch());

        act(() => {jest.advanceTimersByTime(200);});

        act(() => result.current.setBusqueda("Tom"));

        act(() => {jest.advanceTimersByTime(200);});

        expect(mockGetIngredients).not.toHaveBeenCalled();

        act(() => jest.advanceTimersByTime(100));

        await waitFor(() => {
            expect(mockGetIngredients).toHaveBeenCalledTimes(1);
        });
    });

    it("calcula el offset correcto según la página", async () => {
        const { result } = renderHook(() => useIngredientsSearch());

        act(() => {
            result.current.setPagina(2);
            jest.advanceTimersByTime(300);
        });

        await waitFor(() => {
            expect(mockGetIngredients).toHaveBeenCalledWith(10, 20);
        });
    });

    it("setea error si el fetch falla", async () => {
        mockGetIngredients.mockRejectedValue(new Error("Error de red"));

        const { result } = renderHook(() => useIngredientsSearch());

        act(() => jest.advanceTimersByTime(300));

        await waitFor(() => {
            expect(result.current.error).toBe("Error de red");
            expect(result.current.resultados).toEqual([]);
        });
    });
});