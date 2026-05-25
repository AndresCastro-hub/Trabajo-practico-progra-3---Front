import { renderHook, act } from "@testing-library/react";
import { useIngredientValidation } from "@/features/dashboard/admin/hooks/useIngredientsValidation";

describe("useIngredientValidation", () => {
    it("setea error si el nombre está vacío", () => {
        const { result } = renderHook(() => useIngredientValidation("", ""));

        act(() => result.current.validateNombre(""));

        expect(result.current.errors.nombre).toBe("El nombre del ingrediente es obligatorio");
    });

    it("limpia el error si el nombre es válido", () => {
        const { result } = renderHook(() => useIngredientValidation("Tomate", "g"));

        act(() => result.current.validateNombre("Tomate"));

        expect(result.current.errors.nombre).toEqual("");
    });

    it("setea error si la unidad no es válida", () => {
        const { result } = renderHook(() => useIngredientValidation("Tomate", "kg"));

        act(() => result.current.validateUnidad("kg"));

        expect(result.current.errors.unidad).toBe("La unidad no es válida");
    });

    it("limpia el error si la unidad es válida", () => {
        const { result } = renderHook(() => useIngredientValidation("Tomate", "ml"));

        act(() => result.current.validateUnidad("ml"));

        expect(result.current.errors.unidad).toEqual("");
    });
});