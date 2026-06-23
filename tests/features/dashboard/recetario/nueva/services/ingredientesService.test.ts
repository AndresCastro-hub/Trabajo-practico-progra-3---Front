import { obtenerTodosLosIngredientes } from "@/features/dashboard/recetario/nueva/services/ingredientesService";
import { http } from "@/lib/utils/httpClient";

jest.mock("@/lib/utils/httpClient");
const mockHttp = http as jest.Mocked<typeof http>;

const ingredientesMock = [
    { id: 1, nombre: "Carne", unidad: "g" },
    { id: 2, nombre: "Sal", unidad: "g" },
];

describe("obtenerTodosLosIngredientes", () => {
    afterEach(() => jest.clearAllMocks());

    it("llama a http.get con la URL correcta", async () => {
        mockHttp.get.mockResolvedValue(ingredientesMock);

        await obtenerTodosLosIngredientes();

        expect(mockHttp.get).toHaveBeenCalledWith("/ingredients/all");
    });

    it("retorna los ingredientes si la respuesta es ok", async () => {
        mockHttp.get.mockResolvedValue(ingredientesMock);

        const result = await obtenerTodosLosIngredientes();

        expect(result).toEqual(ingredientesMock);
    });

    it("lanza el error si http.get falla", async () => {
        mockHttp.get.mockRejectedValue(new Error("Error de red"));

        await expect(obtenerTodosLosIngredientes()).rejects.toThrow("Error de red");
    });
});