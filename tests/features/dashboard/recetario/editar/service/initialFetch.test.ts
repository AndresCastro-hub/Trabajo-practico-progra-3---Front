import { initialFetch } from "@/features/dashboard/recetario/editar/service/initialFetch";
import { http } from "@/lib/utils/httpClient";

jest.mock("@/lib/utils/httpClient");
const mockHttp = http as jest.Mocked<typeof http>;

const mockApiResponse = {
    nombre: "Milanesa",
    descripcion: "Clásica milanesa",
    tiempoPreparacion: 30,
    imagen_url: "https:test",
    ingredientes: [
        { ingrediente: { id: 1, nombre: "Carne", unidad: "g" }, cantidad: "300" }
    ]
};

describe("initialFetch", () => {
    afterEach(() => jest.clearAllMocks());

    it("llama a http.get con la URL correcta", async () => {
        mockHttp.get.mockResolvedValue(mockApiResponse);

        await initialFetch("1");

        expect(mockHttp.get).toHaveBeenCalledWith("/recipes/1");
    });

    it("mapea correctamente la respuesta al tipo IForm", async () => {
        mockHttp.get.mockResolvedValue(mockApiResponse);

        const result = await initialFetch("1");

        expect(result).toEqual({
            nombre: "Milanesa",
            descripcion: "Clásica milanesa",
            tiempoPreparacion: 30,
            imagen_url: "https:test",
            ingredientes: [
                { ingrediente: { id: 1, nombre: "Carne", unidad: "g" }, cantidad: "300" }
            ]
        });
    });

    it("lanza error si http.get falla", async () => {
        mockHttp.get.mockRejectedValue(new Error("No se encontró la receta"));

        await expect(initialFetch("1")).rejects.toThrow("No se encontró la receta");
    });
});