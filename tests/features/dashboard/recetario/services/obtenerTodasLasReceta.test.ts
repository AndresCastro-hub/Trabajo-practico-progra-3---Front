import { obtenerTodasLasRecetas } from "@/features/dashboard/recetario/services/obtenerTodasLasRecetas";
import { http } from "@/lib/utils/httpClient";

jest.mock("@/lib/utils/httpClient");
const mockHttp = http as jest.Mocked<typeof http>;

const mockResponse = {
    recipeDto: [{ id: 1, nombre: "Milanesa" }],
    totalRecords: 1,
    totalPages: 1,
};

describe("obtenerTodasLasRecetas", () => {
    afterEach(() => jest.clearAllMocks());

    it("llama a http.get con los params correctos", async () => {
        mockHttp.get.mockResolvedValue(mockResponse);

        await obtenerTodasLasRecetas({ page: 0, recetasPlataforma: true });

        expect(mockHttp.get).toHaveBeenCalledWith(
            "/recipes?page=0&recetasPlataforma=true"
        );
    });

    it("incluye nombre en los params si se pasa", async () => {
        mockHttp.get.mockResolvedValue(mockResponse);

        await obtenerTodasLasRecetas({ page: 0, recetasPlataforma: false, nombre: "Milanesa" });

        expect(mockHttp.get).toHaveBeenCalledWith(
            "/recipes?page=0&recetasPlataforma=false&nombre=Milanesa"
        );
    });

    it("retorna los datos si la respuesta es ok", async () => {
        mockHttp.get.mockResolvedValue(mockResponse);

        const result = await obtenerTodasLasRecetas({ page: 0, recetasPlataforma: true });

        expect(result).toEqual(mockResponse);
    });

    it("lanza error si recipeDto está vacío", async () => {
        mockHttp.get.mockResolvedValue({ recipeDto: [], totalRecords: 0, totalPages: 0 });

        await expect(obtenerTodasLasRecetas({ page: 0, recetasPlataforma: true }))
            .rejects.toThrow("No se encontraron recetas.");
    });

    it("lanza error con mensaje string si http.get falla", async () => {
        mockHttp.get.mockRejectedValue({ message: "Error del servidor" });

        await expect(obtenerTodasLasRecetas({ page: 0, recetasPlataforma: true }))
            .rejects.toThrow("Error del servidor");
    });

    it("lanza error con primer mensaje si message es array", async () => {
        mockHttp.get.mockRejectedValue({ message: ["Error A", "Error B"] });

        await expect(obtenerTodasLasRecetas({ page: 0, recetasPlataforma: true }))
            .rejects.toThrow("Error A");
    });

    it("lanza error genérico si no hay mensaje", async () => {
        mockHttp.get.mockRejectedValue({});

        await expect(obtenerTodasLasRecetas({ page: 0, recetasPlataforma: true }))
            .rejects.toThrow("Error al obtener recetas");
    });
});