import { renderHook, act, waitFor } from "@testing-library/react";
import useFormEditarReceta from "@/features/dashboard/recetario/editar/hooks/useFormEditarReceta";
import { initialFetch } from "@/features/dashboard/recetario/editar/service/initialFetch";
import { editarReceta } from "@/features/dashboard/recetario/editar/service/editarRecetaService";

jest.mock("@/features/dashboard/recetario/editar/service/initialFetch");
jest.mock("@/features/dashboard/recetario/editar/service/editarRecetaService");

const mockInitialFetch = initialFetch as jest.Mock;
const mockEditarReceta = editarReceta as jest.Mock;

const mockForm = {
    nombre: "Milanesa",
    tiempoPreparacion: 30,
    descripcion: "Clásica milanesa",
    imagen_url: "https://www.josimar.com.ar/milanesa-pollo-frita-kg-2/p?srsltid=AfmBOooW7HI4bBryV28HxICIjREUF7qQZ7Gpyq5Cz_Xa2J70gz3kPIR9",
    ingredientes: [
        { ingrediente: { id: 1, nombre: "Carne", unidad: "g" }, cantidad: "300" }
    ]
};

describe("useFormEditarReceta", () => {
    beforeEach(() => {
        mockInitialFetch.mockResolvedValue(mockForm);
        mockEditarReceta.mockResolvedValue({ id: "1" });
    });

    afterEach(() => jest.clearAllMocks());

    describe("carga inicial", () => {
        it("carga los datos del form", async () => {
            const { result } = renderHook(() => useFormEditarReceta("1"));

            await waitFor(() => {
                expect(result.current.nombre).toBe("Milanesa");
                expect(result.current.tiempoPreparacion).toBe(30);
                expect(result.current.descripcion).toBe("Clásica milanesa");
            });
        });

        it("loading es true al iniciar y false al terminar", async () => {
            const { result } = renderHook(() => useFormEditarReceta("1"));

            expect(result.current.loading).toBe(true);

            await waitFor(() => expect(result.current.loading).toBe(false));
        });

        it("setea error si el fetch inicial falla", async () => {
            mockInitialFetch.mockRejectedValue(new Error("No se encontró la receta"));

            const { result } = renderHook(() => useFormEditarReceta("1"));

            await waitFor(() => {
                expect(result.current.error).toBe("No se encontró la receta");
                expect(result.current.loading).toBe(false);
            });
        });
    });

    describe("setters del form", () => {
        it("setTiempoDePreparacion actualiza el tiempo", async () => {
            const { result } = renderHook(() => useFormEditarReceta("1"));
            await waitFor(() => expect(result.current.loading).toBe(false));

            act(() => result.current.setTiempoDePreparacion(60));

            expect(result.current.tiempoPreparacion).toBe(60);
        });

        it("setDescripcion actualiza la descripción", async () => {
            const { result } = renderHook(() => useFormEditarReceta("1"));
            await waitFor(() => expect(result.current.loading).toBe(false));

            act(() => result.current.setDescripcion("Nueva descripción"));

            expect(result.current.descripcion).toBe("Nueva descripción");
        });
    });

    describe("manejo de ingredientes", () => {
        it("agregarIngrediente agrega una fila vacía al principio", async () => {
            const { result } = renderHook(() => useFormEditarReceta("1"));
            await waitFor(() => expect(result.current.loading).toBe(false));

            const cantidadAnterior = result.current.ingredientes.length;
            act(() => result.current.agregarIngrediente());

            expect(result.current.ingredientes.length).toBe(cantidadAnterior + 1);
            expect(result.current.ingredientes[0]).toEqual({ ingrediente: null, cantidad: "" });
        });

        it("eliminarIngrediente elimina el índice correcto", async () => {
            const { result } = renderHook(() => useFormEditarReceta("1"));
            await waitFor(() => expect(result.current.loading).toBe(false));

            act(() => result.current.eliminarIngrediente(0));

            expect(result.current.ingredientes.length).toBe(0);
        });

        it("actualizarIngrediente actualiza el campo correcto", async () => {
            const { result } = renderHook(() => useFormEditarReceta("1"));
            await waitFor(() => expect(result.current.loading).toBe(false));

            act(() => result.current.actualizarIngrediente(0, "cantidad", "500"));

            expect(result.current.ingredientes[0].cantidad).toBe("500");
        });
    });

    describe("handleSubmit", () => {
        it("llama a editarReceta con el payload correcto", async () => {
            const { result } = renderHook(() => useFormEditarReceta("1"));
            await waitFor(() => expect(result.current.loading).toBe(false));

            await act(async () => { await result.current.handleSubmit(); });

            expect(mockEditarReceta).toHaveBeenCalledWith(
                {
                    description: "Clásica milanesa",
                    prepTime: 30,
                    addedIngredients: [{ ingrediente_id: 1, cantidad: 300 }]
                },
                "1"
            );
        });

        it("setea success en true si el submit es exitoso", async () => {
            const { result } = renderHook(() => useFormEditarReceta("1"));
            await waitFor(() => expect(result.current.loading).toBe(false));

            await act(async () => { await result.current.handleSubmit(); });

            expect(result.current.success).toBe(true);
            expect(result.current.error).toBeNull();
        });

        it("setea error si el submit falla", async () => {
            mockEditarReceta.mockRejectedValue({ message: "Error del servidor" });

            const { result } = renderHook(() => useFormEditarReceta("1"));
            await waitFor(() => expect(result.current.loading).toBe(false));

            await act(async () => { await result.current.handleSubmit(); });

            expect(result.current.error).toBe("Error del servidor");
            expect(result.current.success).toBe(false);
        });

        it("setea error como string unido si message es un array", async () => {
            mockEditarReceta.mockRejectedValue({ message: "Campo requerido, valor inválido" });

            const { result } = renderHook(() => useFormEditarReceta("1"));
            await waitFor(() => expect(result.current.loading).toBe(false));

            await act(async () => { await result.current.handleSubmit(); });

            expect(result.current.error).toBe("Campo requerido, valor inválido");
        });
    });

    describe("clearFeedback", () => {
        it("limpia error y success", async () => {
            mockEditarReceta.mockRejectedValue({ message: "Error" });

            const { result } = renderHook(() => useFormEditarReceta("1"));
            await waitFor(() => expect(result.current.loading).toBe(false));

            await act(async () => { await result.current.handleSubmit(); });
            act(() => result.current.clearFeedback());

            expect(result.current.error).toBeNull();
            expect(result.current.success).toBe(false);
        });
    });

    describe("puedeEditarReceta", () => {
        it("retorna true si todos los campos son válidos", async () => {
            const { result } = renderHook(() => useFormEditarReceta("1"));
            await waitFor(() => expect(result.current.loading).toBe(false));

            expect(result.current.puedeEditarReceta()).toBe(true);
        });

        it("retorna false si el tiempo es 0", async () => {
            mockInitialFetch.mockResolvedValue({ ...mockForm, tiempoPreparacion: 0 });

            const { result } = renderHook(() => useFormEditarReceta("1"));
            await waitFor(() => expect(result.current.loading).toBe(false));

            expect(result.current.puedeEditarReceta()).toBe(false);
        });

        it("retorna false si la imagen está vacía", async () => {
            mockInitialFetch.mockResolvedValue({ ...mockForm, imagen_url: "" });

            const { result } = renderHook(() => useFormEditarReceta("1"));
            await waitFor(() => expect(result.current.loading).toBe(false));

            expect(result.current.puedeEditarReceta()).toBe(false);
        });

        it("retorna false si hay un ingrediente sin cantidad", async () => {
            mockInitialFetch.mockResolvedValue({
                ...mockForm,
                ingredientes: [{ ingrediente: { id: 1, nombre: "Carne", unidad: "g" }, cantidad: "" }]
            });

            const { result } = renderHook(() => useFormEditarReceta("1"));
            await waitFor(() => expect(result.current.loading).toBe(false));

            expect(result.current.puedeEditarReceta()).toBe(false);
        });

        it("retorna false si hay un ingrediente null", async () => {
            mockInitialFetch.mockResolvedValue({
                ...mockForm,
                ingredientes: [{ ingrediente: null, cantidad: "300" }]
            });

            const { result } = renderHook(() => useFormEditarReceta("1"));
            await waitFor(() => expect(result.current.loading).toBe(false));

            expect(result.current.puedeEditarReceta()).toBe(false);
        });
    });
});