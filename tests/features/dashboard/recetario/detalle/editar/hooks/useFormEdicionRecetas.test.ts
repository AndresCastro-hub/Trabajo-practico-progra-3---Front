import { renderHook, act, waitFor } from "@testing-library/react"
import useFormEdicionReceta from "@/features/dashboard/recetario/detalle/editar/hooks/useFormEdicionReceta"
import { editarReceta } from "@/features/dashboard/recetario/detalle/editar/services/EditRecipe"

const mockPush = jest.fn()
const mockBack = jest.fn()
jest.mock("next/navigation", () => ({
    useRouter: () => ({
        push: mockPush,
        back: mockBack,
    }),
}))

const mockUseRecetaDetail = jest.fn()
jest.mock("@/features/dashboard/recetario/detalle/hooks/useRecetaDetail", () => ({
    __esModule: true,
    default: (id: string) => mockUseRecetaDetail(id),
}))

jest.mock("@/features/dashboard/recetario/detalle/editar/services/EditRecipe", () => ({
    editarReceta: jest.fn(),
}))

const mockMostrarNotificacion = jest.fn()
jest.mock("@/context/NotificacionContext", () => ({
    useNotificacion: () => ({
        mostrarNotificacion: mockMostrarNotificacion,
    }),
    TipoNotificacion: {
        SUCCESS: "success",
        ERROR: "error",
    },
}))

const recetaMock = {
    id: 1,
    idUsuario: 2,
    nombre: "Ensalada César",
    descripcion: "Una ensalada fresca",
    imagen_url: "/img.jpg",
    calorias: 350,
    tiempoPreparacion: 15,
    ingredientes: [
        { id: 1, cantidad: "200", ingrediente: { id: 10, nombre: "Lechuga", unidad: "g" } },
        { id: 2, cantidad: "2", ingrediente: { id: 11, nombre: "Tomate", unidad: "unidades" } },
    ],
}

describe("useFormEdicionReceta", () => {
    beforeEach(() => {
        jest.clearAllMocks()
        mockUseRecetaDetail.mockReturnValue({ receta: recetaMock })
    })

    it("inicializa el formulario con los datos de la receta cuando esta se carga", async () => {
        const { result } = renderHook(() => useFormEdicionReceta("1"))

        await waitFor(() => {
            expect(result.current.descripcion).toBe("Una ensalada fresca")
        })

        expect(result.current.tiempoDePreparacion).toBe(15)
        expect(result.current.ingredientes).toHaveLength(2)
        expect(result.current.ingredientes[0]).toEqual({
            ingrediente: { id: 10, nombre: "Lechuga", unidad: "g" },
            cantidad: "200",
        })
    })

    it("no inicializa el formulario si la receta todavía no se cargó", () => {
        mockUseRecetaDetail.mockReturnValue({ receta: null })

        const { result } = renderHook(() => useFormEdicionReceta("1"))

        expect(result.current.descripcion).toBe("")
        expect(result.current.tiempoDePreparacion).toBe(0)
        expect(result.current.ingredientes).toEqual([])
    })

    it("setDescripcion actualiza la descripción y habilita la edición", async () => {
        const { result } = renderHook(() => useFormEdicionReceta("1"))

        await waitFor(() => expect(result.current.descripcion).toBe("Una ensalada fresca"))

        act(() => {
            result.current.setDescripcion("Nueva descripción")
        })

        expect(result.current.descripcion).toBe("Nueva descripción")
        expect(result.current.puedeEditar).toBe(true)
    })

    it("setTiempoDePreparacion actualiza el tiempo y habilita la edición", async () => {
        const { result } = renderHook(() => useFormEdicionReceta("1"))

        await waitFor(() => expect(result.current.tiempoDePreparacion).toBe(15))

        act(() => {
            result.current.setTiempoDePreparacion(30)
        })

        expect(result.current.tiempoDePreparacion).toBe(30)
        expect(result.current.puedeEditar).toBe(true)
    })

    it("agregarIngrediente agrega una fila vacía a la lista de ingredientes", async () => {
        const { result } = renderHook(() => useFormEdicionReceta("1"))

        await waitFor(() => expect(result.current.ingredientes).toHaveLength(2))

        act(() => {
            result.current.agregarIngrediente()
        })

        expect(result.current.ingredientes).toHaveLength(3)
        expect(result.current.ingredientes[2]).toEqual({ ingrediente: null, cantidad: "" })
    })

    it("eliminarIngrediente quita el ingrediente y lo agrega a ingredientesEliminados si tenía id", async () => {
        const { result } = renderHook(() => useFormEdicionReceta("1"))

        await waitFor(() => expect(result.current.ingredientes).toHaveLength(2))

        act(() => {
            result.current.eliminarIngrediente(0)
        })

        expect(result.current.ingredientes).toHaveLength(1)
        expect(result.current.puedeEditar).toBe(true)
    })

    it("actualizarIngrediente modifica el campo indicado y habilita la edición", async () => {
        const { result } = renderHook(() => useFormEdicionReceta("1"))

        await waitFor(() => expect(result.current.ingredientes).toHaveLength(2))

        act(() => {
            result.current.actualizarIngrediente(0, "cantidad", "500")
        })

        expect(result.current.ingredientes[0].cantidad).toBe("500")
        expect(result.current.puedeEditar).toBe(true)
    })

    it("mapFormToRecetaEditarDto detecta ingredientes nuevos y actualizados correctamente", async () => {
        const { result } = renderHook(() => useFormEdicionReceta("1"))

        await waitFor(() => expect(result.current.ingredientes).toHaveLength(2))

        act(() => {
            // Modifica la cantidad de un ingrediente existente
            result.current.actualizarIngrediente(0, "cantidad", "999")
            // Agrega un ingrediente nuevo
            result.current.agregarIngrediente()
        })

        act(() => {
            result.current.actualizarIngrediente(2, "ingrediente", {
                id: 20,
                nombre: "Cebolla",
                unidad: "unidades",
            })
            result.current.actualizarIngrediente(2, "cantidad", "1")
        })

        const dto = result.current.mapFormToRecetaEditarDto({
            descripcion: result.current.descripcion,
            tiempoDePreparacion: result.current.tiempoDePreparacion,
            ingredientes: result.current.ingredientes,
            ingredientesAgregados: undefined,
            ingredientesEliminados: undefined,
        } as any)

        expect(dto.addedIngredients).toEqual([{ ingrediente_id: 20, cantidad: 1 }])
        expect(dto.updatedIngredients).toEqual([{ ingrediente_id: 10, cantidad: 999 }])
    })

    it("handleEdicion exitoso llama a editarReceta, notifica y vuelve atrás", async () => {
        ;(editarReceta as jest.Mock).mockResolvedValueOnce(undefined)

        const { result } = renderHook(() => useFormEdicionReceta("1"))
        await waitFor(() => expect(result.current.ingredientes).toHaveLength(2))

        await act(async () => {
            await result.current.handleEdicion()
        })

        expect(editarReceta).toHaveBeenCalledWith("1", expect.any(Object))
        expect(mockMostrarNotificacion).toHaveBeenCalledWith(
            "Receta editada correctamente.",
            "success"
        )
        expect(mockBack).toHaveBeenCalledTimes(1)
        expect(result.current.loading).toBe(false)
    })

    it("handleEdicion con error de mensaje simple notifica ese mensaje", async () => {
        ;(editarReceta as jest.Mock).mockRejectedValueOnce({ message: "No se pudo editar" })

        const { result } = renderHook(() => useFormEdicionReceta("1"))
        await waitFor(() => expect(result.current.ingredientes).toHaveLength(2))

        await act(async () => {
            await result.current.handleEdicion()
        })

        expect(mockMostrarNotificacion).toHaveBeenCalledWith("No se pudo editar", "error")
        expect(mockBack).toHaveBeenCalledTimes(1)
    })

    it("handleEdicion con error de mensajes en array los une con coma", async () => {
        ;(editarReceta as jest.Mock).mockRejectedValueOnce({
            message: ["Campo inválido", "Cantidad requerida"],
        })

        const { result } = renderHook(() => useFormEdicionReceta("1"))
        await waitFor(() => expect(result.current.ingredientes).toHaveLength(2))

        await act(async () => {
            await result.current.handleEdicion()
        })

        expect(mockMostrarNotificacion).toHaveBeenCalledWith(
            "Campo inválido, Cantidad requerida",
            "error"
        )
    })

    it("handleEdicion con error sin mensaje notifica 'Error inesperado'", async () => {
        ;(editarReceta as jest.Mock).mockRejectedValueOnce({})

        const { result } = renderHook(() => useFormEdicionReceta("1"))
        await waitFor(() => expect(result.current.ingredientes).toHaveLength(2))

        await act(async () => {
            await result.current.handleEdicion()
        })

        expect(mockMostrarNotificacion).toHaveBeenCalledWith("Error inesperado", "error")
    })
})