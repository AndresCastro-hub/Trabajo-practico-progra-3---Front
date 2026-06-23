import { editarReceta } from "@/features/dashboard/recetario/detalle/editar/services/EditRecipe"
import { http } from "@/lib/utils/httpClient"

jest.mock("@/lib/utils/httpClient", () => ({
    http: {
        patch: jest.fn(),
    },
}))

describe("editarReceta", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it("llama a http.patch con la URL y el body correctos", () => {
        const data = {
            description: "Nueva descripción",
            prepTime: 20,
            deletedIngredientsId: [1, 2],
            addedIngredients: [{ ingrediente_id: 5, cantidad: 3 }],
            updatedIngredients: [{ ingrediente_id: 6, cantidad: 10 }],
        }

        editarReceta("1", data as any)

        expect(http.patch).toHaveBeenCalledWith("/recipes/1/editar", data)
        expect(http.patch).toHaveBeenCalledTimes(1)
    })

    it("retorna la promesa generada por http.patch", async () => {
        const mockResponse = { data: { ok: true } }
        ;(http.patch as jest.Mock).mockResolvedValueOnce(mockResponse)

        const result = await editarReceta("2", {
            description: "desc",
            prepTime: 10,
            deletedIngredientsId: [],
            addedIngredients: [],
            updatedIngredients: [],
        } as any)

        expect(result).toEqual(mockResponse)
    })

    it("propaga el error si http.patch falla", async () => {
        const error = new Error("Error de red")
        ;(http.patch as jest.Mock).mockRejectedValueOnce(error)

        await expect(
            editarReceta("3", {
                description: "desc",
                prepTime: 10,
                deletedIngredientsId: [],
                addedIngredients: [],
                updatedIngredients: [],
            } as any)
        ).rejects.toThrow("Error de red")
    })
})