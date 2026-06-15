import { renderHook, act, waitFor } from "@testing-library/react";
import { useNewIngredient } from "@/features/dashboard/admin/hooks/useNewIngredient";
import { postIngredient } from "@/features/dashboard/admin/services/ingredientService";

jest.mock("@/features/dashboard/admin/services/ingredientService");
const mockPostIngredient = postIngredient as jest.Mock;

describe("useNewIngredient", () => {
    afterEach(() => jest.clearAllMocks());

    it("en éxito: setea isIngredientCreated y limpia los campos", async () => {
        const ingredienteCreado = { id: 1, nombre: "Tomate", unidad: "u" };
        mockPostIngredient.mockResolvedValue(ingredienteCreado);

        const { result } = renderHook(() => useNewIngredient());

        act(() => {
            result.current.setNuevoIngrediente("Tomate");
            result.current.setNuevaUnidad("u");
        });

        await act(async () => {
            await result.current.handleNewIngrediente({
                preventDefault: () => {},
            } as React.FormEvent);
        });

        await waitFor(() => {
            expect(result.current.isIngredientCreated).toEqual(ingredienteCreado);
            expect(result.current.nuevoIngrediente).toBe("");
            expect(result.current.nuevaUnidad).toBe("");
            expect(result.current.serverError).toBeNull();
        });
    });

    it("en error: setea serverError", async () => {
        mockPostIngredient.mockRejectedValue(new Error("Ya existe ese ingrediente"));

        const { result } = renderHook(() => useNewIngredient());

        await act(async () => {
            await result.current.handleNewIngrediente({
                preventDefault: () => {},
            } as React.FormEvent);
        });

        await waitFor(() => {
            expect(result.current.serverError).toBe("Ya existe ese ingrediente");
            expect(result.current.isIngredientCreated).toBeNull();
        });
    });

    it("llama a postIngredient con los valores correctos", async () => {
        mockPostIngredient.mockResolvedValue({ id: 2, nombre: "Leche", unidad: "ml" });

        const { result } = renderHook(() => useNewIngredient());

        act(() => {
            result.current.setNuevoIngrediente("Leche");
            result.current.setNuevaUnidad("ml");
        });

        await act(async () => {
            await result.current.handleNewIngrediente({
                preventDefault: () => {},
            } as React.FormEvent);
        });

        expect(mockPostIngredient).toHaveBeenCalledWith({ nombre: "Leche", unidad: "ml" });
    });
});