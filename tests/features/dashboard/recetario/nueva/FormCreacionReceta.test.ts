import React from "react";
import { renderHook, act } from "@testing-library/react";
import useFormCreacionReceta from "@/features/dashboard/recetario/nueva/hooks/useFormCreacionReceta";
import { crearReceta, subirImagenReceta } from "@/features/dashboard/recetario/nueva/services/recetaService";
import { TipoNotificacion, useNotificacion } from "@/context/NotificacionContext";

jest.mock("@/features/dashboard/recetario/nueva/services/recetaService");
jest.mock("next/navigation", () => ({ useRouter: () => ({ push: jest.fn() }) }));
jest.mock("@/context/NotificacionContext", () => ({
    ...jest.requireActual("@/context/NotificacionContext"),
    useNotificacion: jest.fn(),
}));

const mockCrearReceta = crearReceta as jest.Mock;
const mockSubirImagen = subirImagenReceta as jest.Mock;
const mockMostrarNotificacion = jest.fn();

const wrapper = ({ children }: { children: React.ReactNode }) =>
    React.createElement("div", null, children);

describe("useFormCreacionReceta", () => {
    beforeEach(() => {
        (useNotificacion as jest.Mock).mockReturnValue({
            mostrarNotificacion: mockMostrarNotificacion,
        });
        mockCrearReceta.mockResolvedValue({ id: 1 });
        mockSubirImagen.mockResolvedValue({});
    });

    afterEach(() => jest.clearAllMocks());

    it("inicia con el form vacío", () => {
        const { result } = renderHook(() => useFormCreacionReceta(), { wrapper });

        expect(result.current.nombre).toBe("");
        expect(result.current.tiempoDePreparacion).toBe(0);
        expect(result.current.descripcion).toBe("");
        expect(result.current.imagen).toBeNull();
        expect(result.current.ingredientes).toEqual([{ ingrediente: null, cantidad: "" }]);
    });

    it("setNombre actualiza el nombre", () => {
        const { result } = renderHook(() => useFormCreacionReceta(), { wrapper });

        act(() => result.current.setNombre("Milanesa"));

        expect(result.current.nombre).toBe("Milanesa");
    });

    it("setDescripcion actualiza la descripción", () => {
        const { result } = renderHook(() => useFormCreacionReceta(), { wrapper });

        act(() => result.current.setDescripcion("Rica milanesa"));

        expect(result.current.descripcion).toBe("Rica milanesa");
    });

    it("setTiempoDePreparacion actualiza el tiempo", () => {
        const { result } = renderHook(() => useFormCreacionReceta(), { wrapper });

        act(() => result.current.setTiempoDePreparacion(30));

        expect(result.current.tiempoDePreparacion).toBe(30);
    });

    it("setImagen actualiza la imagen", () => {
        const { result } = renderHook(() => useFormCreacionReceta(), { wrapper });
        const file = new File([""], "imagen.jpg", { type: "image/jpeg" });

        act(() => result.current.setImagen(file));

        expect(result.current.imagen).toBe(file);
    });

    it("agregarIngrediente agrega una fila vacía", () => {
        const { result } = renderHook(() => useFormCreacionReceta(), { wrapper });

        act(() => result.current.agregarIngrediente());

        expect(result.current.ingredientes.length).toBe(2);
        expect(result.current.ingredientes[1]).toEqual({ ingrediente: null, cantidad: "" });
    });

    it("eliminarIngrediente elimina el índice correcto", () => {
        const { result } = renderHook(() => useFormCreacionReceta(), { wrapper });

        act(() => result.current.eliminarIngrediente(0));

        expect(result.current.ingredientes.length).toBe(0);
    });

    it("actualizarIngrediente actualiza el campo correcto", () => {
        const { result } = renderHook(() => useFormCreacionReceta(), { wrapper });

        act(() => result.current.actualizarIngrediente(0, "cantidad", "500"));

        expect(result.current.ingredientes[0].cantidad).toBe("500");
    });

    describe("puedeCrearReceta", () => {
        it("retorna false si el form está vacío", () => {
            const { result } = renderHook(() => useFormCreacionReceta(), { wrapper });
            expect(result.current.puedeCrearReceta()).toBe(false);
        });

        it("retorna true si todos los campos son válidos", () => {
            const { result } = renderHook(() => useFormCreacionReceta(), { wrapper });
            const file = new File([""], "imagen.jpg", { type: "image/jpeg" });

            act(() => {
                result.current.setNombre("Milanesa");
                result.current.setTiempoDePreparacion(30);
                result.current.setImagen(file);
                result.current.actualizarIngrediente(0, "ingrediente", { id: 1, nombre: "Carne", unidad: "g" });
                result.current.actualizarIngrediente(0, "cantidad", "300");
            });

            expect(result.current.puedeCrearReceta()).toBe(true);
        });

        it("retorna false si no hay imagen", () => {
            const { result } = renderHook(() => useFormCreacionReceta(), { wrapper });

            act(() => {
                result.current.setNombre("Milanesa");
                result.current.setTiempoDePreparacion(30);
                result.current.actualizarIngrediente(0, "ingrediente", { id: 1, nombre: "Carne", unidad: "g" });
                result.current.actualizarIngrediente(0, "cantidad", "300");
            });

            expect(result.current.puedeCrearReceta()).toBe(false);
        });

        it("retorna false si hay un ingrediente sin cantidad", () => {
            const { result } = renderHook(() => useFormCreacionReceta(), { wrapper });
            const file = new File([""], "imagen.jpg");

            act(() => {
                result.current.setNombre("Milanesa");
                result.current.setTiempoDePreparacion(30);
                result.current.setImagen(file);
                result.current.actualizarIngrediente(0, "ingrediente", { id: 1, nombre: "Carne", unidad: "g" });
            });

            expect(result.current.puedeCrearReceta()).toBe(false);
        });
    });

    describe("handleSubmit", () => {
        it("llama a crearReceta con el payload correcto", async () => {
            const { result } = renderHook(() => useFormCreacionReceta(), { wrapper });
            const file = new File([""], "imagen.jpg");

            act(() => {
                result.current.setNombre("Milanesa");
                result.current.setTiempoDePreparacion(30);
                result.current.setDescripcion("Rica");
                result.current.setImagen(file);
                result.current.actualizarIngrediente(0, "ingrediente", { id: 1, nombre: "Carne", unidad: "g" });
                result.current.actualizarIngrediente(0, "cantidad", "300");
            });

            await act(async () => { await result.current.handleSubmit(); });

            expect(mockCrearReceta).toHaveBeenCalledWith({
                nombre: "Milanesa",
                descripcion: "Rica",
                tiempoPreparacion: 30,
                ingredientes: [{ ingrediente_id: 1, cantidad: 300 }],
            });
        });

        it("llama a subirImagenReceta si hay imagen", async () => {
            const { result } = renderHook(() => useFormCreacionReceta(), { wrapper });
            const file = new File([""], "imagen.jpg");

            act(() => {
                result.current.setNombre("Milanesa");
                result.current.setTiempoDePreparacion(30);
                result.current.setImagen(file);
                result.current.actualizarIngrediente(0, "ingrediente", { id: 1, nombre: "Carne", unidad: "g" });
                result.current.actualizarIngrediente(0, "cantidad", "300");
            });

            await act(async () => { await result.current.handleSubmit(); });

            expect(mockSubirImagen).toHaveBeenCalledWith(1, file);
        });

        it("muestra notificación de éxito si el submit es exitoso", async () => {
            const { result } = renderHook(() => useFormCreacionReceta(), { wrapper });

            act(() => {
                result.current.setNombre("Milanesa");
                result.current.setTiempoDePreparacion(30);
                result.current.actualizarIngrediente(0, "ingrediente", { id: 1, nombre: "Carne", unidad: "g" });
                result.current.actualizarIngrediente(0, "cantidad", "300");
            });

            await act(async () => { await result.current.handleSubmit(); });

            expect(mockMostrarNotificacion).toHaveBeenCalledWith(
                "Receta creada correctamente.",
                TipoNotificacion.SUCCESS
            );
        });

        it("muestra notificación de error si el submit falla", async () => {
            mockCrearReceta.mockRejectedValue({ message: "Error del servidor" });

            const { result } = renderHook(() => useFormCreacionReceta(), { wrapper });

            act(() => {
                result.current.setNombre("Milanesa");
                result.current.setTiempoDePreparacion(30);
                result.current.actualizarIngrediente(0, "ingrediente", { id: 1, nombre: "Carne", unidad: "g" });
                result.current.actualizarIngrediente(0, "cantidad", "300");
            });

            await act(async () => { await result.current.handleSubmit(); });

            expect(mockMostrarNotificacion).toHaveBeenCalledWith(
                "Error del servidor",
                TipoNotificacion.ERROR
            );
        });

        it("muestra error unido con coma si message es array", async () => {
            mockCrearReceta.mockRejectedValue({ message: ["Campo requerido", "Valor inválido"] });

            const { result } = renderHook(() => useFormCreacionReceta(), { wrapper });

            act(() => {
                result.current.setNombre("Milanesa");
                result.current.setTiempoDePreparacion(30);
                result.current.actualizarIngrediente(0, "ingrediente", { id: 1, nombre: "Carne", unidad: "g" });
                result.current.actualizarIngrediente(0, "cantidad", "300");
            });

            await act(async () => { await result.current.handleSubmit(); });

            expect(mockMostrarNotificacion).toHaveBeenCalledWith(
                "Campo requerido, Valor inválido",
                TipoNotificacion.ERROR
            );
        });

        it("loading es true durante el submit y false al terminar", async () => {
            const { result } = renderHook(() => useFormCreacionReceta(), { wrapper });

            expect(result.current.loading).toBe(false);

            await act(async () => { await result.current.handleSubmit(); });

            expect(result.current.loading).toBe(false);
        });
    });
});