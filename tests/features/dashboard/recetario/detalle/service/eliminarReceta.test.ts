import { eliminarReceta } from "@/features/dashboard/recetario/detalle/service/eliminarReceta"
import { http } from "@/lib/utils/httpClient"

jest.mock("@/lib/utils/httpClient", () => ({
    http: {
        delete: jest.fn(),
    },
}))

describe("eliminarReceta", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it("llama a http.delete con la URL correcta", () => {
        ;(http.delete as jest.Mock).mockResolvedValueOnce(undefined)

        eliminarReceta("1")

        expect(http.delete).toHaveBeenCalledWith("/recipes/1")
        expect(http.delete).toHaveBeenCalledTimes(1)
    })

    it("resuelve sin valor cuando la eliminación es exitosa", async () => {
        ;(http.delete as jest.Mock).mockResolvedValueOnce(undefined)

        const result = await eliminarReceta("1")

        expect(result).toBeUndefined()
    })

    it("propaga el error si http.delete falla", async () => {
        const error = new Error("No se pudo eliminar la receta")
        ;(http.delete as jest.Mock).mockRejectedValueOnce(error)

        await expect(eliminarReceta("1")).rejects.toThrow("No se pudo eliminar la receta")
    })
})