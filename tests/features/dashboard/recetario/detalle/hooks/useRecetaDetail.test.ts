import { renderHook, waitFor } from "@testing-library/react"
import useRecetaDetail from "@/features/dashboard/recetario/detalle/hooks/useRecetaDetail"
import { getRecetaById } from "@/features/dashboard/recetario/detalle/service/recetaDetalleService"

jest.mock("@/features/dashboard/recetario/detalle/service/recetaDetalleService", () => ({
    getRecetaById: jest.fn(),
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
    ],
}

describe("useRecetaDetail", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it("inicia con loading en true y receta/error en null", () => {
        ;(getRecetaById as jest.Mock).mockReturnValue(new Promise(() => {})) // promesa pendiente

        const { result } = renderHook(() => useRecetaDetail("1"))

        expect(result.current.loading).toBe(true)
        expect(result.current.receta).toBeNull()
        expect(result.current.error).toBeNull()
    })

    it("llama a getRecetaById con el id recibido", async () => {
        ;(getRecetaById as jest.Mock).mockResolvedValueOnce(recetaMock)

        renderHook(() => useRecetaDetail("1"))

        await waitFor(() => {
            expect(getRecetaById).toHaveBeenCalledWith("1")
        })
        expect(getRecetaById).toHaveBeenCalledTimes(1)
    })

    it("setea la receta y loading en false cuando la petición es exitosa", async () => {
        ;(getRecetaById as jest.Mock).mockResolvedValueOnce(recetaMock)

        const { result } = renderHook(() => useRecetaDetail("1"))

        await waitFor(() => expect(result.current.loading).toBe(false))

        expect(result.current.receta).toEqual(recetaMock)
        expect(result.current.error).toBeNull()
    })

    it("setea el mensaje de error cuando la petición falla con un Error", async () => {
        ;(getRecetaById as jest.Mock).mockRejectedValueOnce(new Error("Receta no encontrada"))

        const { result } = renderHook(() => useRecetaDetail("1"))

        await waitFor(() => expect(result.current.loading).toBe(false))

        expect(result.current.error).toBe("Receta no encontrada")
        expect(result.current.receta).toBeNull()
    })

    it("setea un mensaje de error genérico cuando el error no es una instancia de Error", async () => {
        ;(getRecetaById as jest.Mock).mockRejectedValueOnce("falla desconocida")

        const { result } = renderHook(() => useRecetaDetail("1"))

        await waitFor(() => expect(result.current.loading).toBe(false))

        expect(result.current.error).toBe("Error al cargar la receta")
        expect(result.current.receta).toBeNull()
    })

    it("vuelve a pedir la receta cuando cambia el id", async () => {
        ;(getRecetaById as jest.Mock)
            .mockResolvedValueOnce(recetaMock)
            .mockResolvedValueOnce({ ...recetaMock, id: 2, nombre: "Pasta Alfredo" })

        const { result, rerender } = renderHook(({ id }) => useRecetaDetail(id), {
            initialProps: { id: "1" },
        })

        await waitFor(() => expect(result.current.receta?.nombre).toBe("Ensalada César"))

        rerender({ id: "2" })

        await waitFor(() => expect(result.current.receta?.nombre).toBe("Pasta Alfredo"))

        expect(getRecetaById).toHaveBeenCalledTimes(2)
        expect(getRecetaById).toHaveBeenNthCalledWith(1, "1")
        expect(getRecetaById).toHaveBeenNthCalledWith(2, "2")
    })

    it("limpia el error previo al reintentar la carga", async () => {
        ;(getRecetaById as jest.Mock)
            .mockRejectedValueOnce(new Error("Falló la primera carga"))
            .mockResolvedValueOnce(recetaMock)

        const { result, rerender } = renderHook(({ id }) => useRecetaDetail(id), {
            initialProps: { id: "1" },
        })

        await waitFor(() => expect(result.current.error).toBe("Falló la primera carga"))

        rerender({ id: "2" })

        await waitFor(() => expect(result.current.receta).toEqual(recetaMock))
        expect(result.current.error).toBeNull()
    })
})