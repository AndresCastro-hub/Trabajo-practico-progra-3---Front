import { renderHook, waitFor } from "@testing-library/react";
import { useIngredientes } from "@/features/dashboard/recetario/nueva/hooks/useIngredientes";
import { obtenerTodosLosIngredientes } from "@/features/dashboard/recetario/nueva/services/ingredientesService";

jest.mock("@/features/dashboard/recetario/nueva/services/ingredientesService");
const mockObtener = obtenerTodosLosIngredientes as jest.Mock;

const ingredientesMock = [
    { id: 1, nombre: "Carne", unidad: "g" },
    { id: 2, nombre: "Sal", unidad: "g" },
];

describe("useIngredientes", () => {
    afterEach(() => jest.clearAllMocks());

    it("inicia con loading true y lista vacía", () => {
        mockObtener.mockResolvedValue(ingredientesMock);
        const { result } = renderHook(() => useIngredientes());

        expect(result.current.loading).toBe(true);
        expect(result.current.ingredientes).toEqual([]);
        expect(result.current.error).toBeNull();
    });

    it("carga los ingredientes correctamente", async () => {
        mockObtener.mockResolvedValue(ingredientesMock);
        const { result } = renderHook(() => useIngredientes());

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.ingredientes).toEqual(ingredientesMock);
        expect(result.current.error).toBeNull();
    });

    it("setea error si el fetch falla", async () => {
        mockObtener.mockRejectedValue(new Error("Error"));
        const { result } = renderHook(() => useIngredientes());

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.error).toBe("Error al cargar los ingredientes");
        expect(result.current.ingredientes).toEqual([]);
    });
});