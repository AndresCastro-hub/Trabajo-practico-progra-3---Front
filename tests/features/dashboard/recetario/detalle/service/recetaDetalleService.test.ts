import { getRecetaById } from "@/features/dashboard/recetario/detalle/service/recetaDetalleService"
import { http } from "@/lib/utils/httpClient"

jest.mock("@/lib/utils/httpClient", () => ({
    http: {
        get: jest.fn(),
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
    ],
}

describe("getRecetaById", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it("llama a http.get con la URL correcta", () => {
        ;(http.get as jest.Mock).mockResolvedValueOnce(recetaMock)

        getRecetaById("1")

        expect(http.get).toHaveBeenCalledWith("/recipes/1")
        expect(http.get).toHaveBeenCalledTimes(1)
    })

    it("retorna la receta obtenida por http.get", async () => {
        ;(http.get as jest.Mock).mockResolvedValueOnce(recetaMock)

        const result = await getRecetaById("1")

        expect(result).toEqual(recetaMock)
    })

    it("propaga el error si http.get falla", async () => {
        const error = new Error("Receta no encontrada")
        ;(http.get as jest.Mock).mockRejectedValueOnce(error)

        await expect(getRecetaById("999")).rejects.toThrow("Receta no encontrada")
    })
})