import { renderHook, act, waitFor } from "@testing-library/react";
import { useEditarReceta } from "@/features/dashboard/calendario/hooks/useEditarReceta";
import { obtenerTodasLasRecetas } from "@/features/dashboard/recetario/services/obtenerTodasLasRecetas";
import { EditarRecetaDelCalendario } from "@/features/dashboard/calendario/service/calendarioService";
import { useNotificacion } from "@/context/NotificacionContext";

jest.mock("@/features/dashboard/recetario/services/obtenerTodasLasRecetas");
jest.mock("@/features/dashboard/calendario/service/calendarioService");
jest.mock("@/context/NotificacionContext", () => ({
    useNotificacion: jest.fn(),
    TipoNotificacion: { SUCCESS: "success", ERROR: "error" },
}));

const mockObtenerRecetas = obtenerTodasLasRecetas as jest.Mock;
const mockEditar = EditarRecetaDelCalendario as jest.Mock;
const mockUseNotificacion = useNotificacion as jest.Mock;
const mockMostrarNotificacion = jest.fn();

const receta1 = { id: 1, nombre: "Milanesa", calorias: 500, descripcion: "", idUsuario: 1, imagen_url: "", tiempoPreparacion: 30 };
const receta2 = { id: 2, nombre: "Ensalada", calorias: 200, descripcion: "", idUsuario: 1, imagen_url: "", tiempoPreparacion: 10 };

describe("useEditarReceta", () => {
    beforeEach(() => {
        mockObtenerRecetas.mockResolvedValue({ recipeDto: [receta1], totalPages: 1, totalRecords: 1 });
        mockEditar.mockResolvedValue({});
        mockUseNotificacion.mockReturnValue({ mostrarNotificacion: mockMostrarNotificacion });
    });
    afterEach(() => jest.clearAllMocks());

    describe("carga inicial", () => {
        it("hace fetch inicial con tab plataforma y página 1", async () => {
            const { result } = renderHook(() => useEditarReceta("2026-01-01", 1, jest.fn()));
            await waitFor(() => {
                expect(mockObtenerRecetas).toHaveBeenCalledWith({
                    page: 0, nombre: undefined, recetasPlataforma: true,
                });
                expect(result.current.recetas).toEqual([receta1]);
            });
        });

        it("setea error si el fetch falla", async () => {
            mockObtenerRecetas.mockRejectedValue(new Error("Error de red"));
            const { result } = renderHook(() => useEditarReceta("2026-01-01", 1, jest.fn()));
            await waitFor(() => expect(result.current.error).toBe("Error de red"));
        });
    });

    describe("paginación acumulativa", () => {
        it("acumula recetas al cargar más cuando hay más páginas", async () => {
            const { result } = renderHook(() => useEditarReceta("2026-01-01", 1, jest.fn()));
            await waitFor(() => expect(result.current.recetas).toEqual([receta1]));

            mockObtenerRecetas.mockResolvedValue({ recipeDto: [receta2], totalPages: 2, totalRecords: 2 });
            act(() => result.current.handleCargarMas());

            await waitFor(() => expect(result.current.recetas).toEqual([receta1, receta2]));
        });

        it("hayMas es true si la página actual es menor al total de páginas", async () => {
            mockObtenerRecetas.mockResolvedValue({ recipeDto: [receta1], totalPages: 3, totalRecords: 3 });
            const { result } = renderHook(() => useEditarReceta("2026-01-01", 1, jest.fn()));
            await waitFor(() => expect(result.current.hayMas).toBe(true));
        });

        it("hayMas es false en la última página", async () => {
            const { result } = renderHook(() => useEditarReceta("2026-01-01", 1, jest.fn()));
            await waitFor(() => expect(result.current.hayMas).toBe(false));
        });
    });

    describe("handleTabChange", () => {
        it("cambia el tab, resetea búsqueda/página y deselecciona la receta", async () => {
            const { result } = renderHook(() => useEditarReceta("2026-01-01", 1, jest.fn()));
            await waitFor(() => expect(result.current.recetas).toEqual([receta1]));

            act(() => result.current.setRecetaSeleccionada(receta1));
            act(() => result.current.handleTabChange("mis-recetas"));

            expect(result.current.activeTab).toBe("mis-recetas");
            expect(result.current.busqueda).toBe("");
            expect(result.current.recetaSeleccionada).toBeNull();

            await waitFor(() => expect(mockObtenerRecetas).toHaveBeenCalledWith({
                page: 0, nombre: undefined, recetasPlataforma: false,
            }));
        });
    });

    describe("handleBusqueda", () => {
        it("actualiza la búsqueda y resetea la página", async () => {
            const { result } = renderHook(() => useEditarReceta("2026-01-01", 1, jest.fn()));
            await waitFor(() => expect(result.current.recetas).toEqual([receta1]));

            act(() => result.current.handleBusqueda("Mila"));

            await waitFor(() => expect(mockObtenerRecetas).toHaveBeenCalledWith({
                page: 0, nombre: "Mila", recetasPlataforma: true,
            }));
        });
    });

    describe("handleEditar", () => {
        it("no hace nada si no hay receta seleccionada", async () => {
            const onAsignado = jest.fn();
            const { result } = renderHook(() => useEditarReceta("2026-01-01", 1, onAsignado));
            await waitFor(() => expect(result.current.recetas).toEqual([receta1]));

            await act(async () => { await result.current.handleEditar(); });

            expect(mockEditar).not.toHaveBeenCalled();
            expect(mockMostrarNotificacion).not.toHaveBeenCalled();
            expect(onAsignado).not.toHaveBeenCalled();
        });

        it("edita la receta, notifica éxito y llama a onAsignado", async () => {
            const onAsignado = jest.fn();
            const { result } = renderHook(() => useEditarReceta("2026-01-01", 1, onAsignado));
            await waitFor(() => expect(result.current.recetas).toEqual([receta1]));

            act(() => result.current.setRecetaSeleccionada(receta2));
            await act(async () => { await result.current.handleEditar(); });

            expect(mockEditar).toHaveBeenCalledWith({ fecha: "2026-01-01", tipo_comida_id: 1, receta_id: 2 });
            expect(mockMostrarNotificacion).toHaveBeenCalledWith('Receta "Ensalada" editada correctamente.', "success");
            expect(onAsignado).toHaveBeenCalled();
        });

        it("notifica error y no llama a onAsignado si falla la edición", async () => {
            mockEditar.mockRejectedValue(new Error("No se pudo editar"));
            const onAsignado = jest.fn();
            const { result } = renderHook(() => useEditarReceta("2026-01-01", 1, onAsignado));
            await waitFor(() => expect(result.current.recetas).toEqual([receta1]));

            act(() => result.current.setRecetaSeleccionada(receta1));
            await act(async () => { await result.current.handleEditar(); });

            expect(mockMostrarNotificacion).toHaveBeenCalledWith("Error al editar la receta.", "error");
            expect(onAsignado).not.toHaveBeenCalled();
        });
    });

    describe("clearFeedback", () => {
        it("limpia error, deselecciona receta y resetea búsqueda", async () => {
            const { result } = renderHook(() => useEditarReceta("2026-01-01", 1, jest.fn()));
            await waitFor(() => expect(result.current.recetas).toEqual([receta1]));

            act(() => result.current.setRecetaSeleccionada(receta1));
            act(() => result.current.clearFeedback());

            expect(result.current.recetaSeleccionada).toBeNull();
            await waitFor(() => expect(result.current.busqueda).toBe(""));
        });
    });
});