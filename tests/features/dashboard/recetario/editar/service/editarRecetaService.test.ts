import { editarReceta } from "@/features/dashboard/recetario/editar/service/editarRecetaService";
import { getTokenFromCookie } from "@/hooks/useAuth";

jest.mock("@/hooks/useAuth");
const mockGetToken = getTokenFromCookie as jest.Mock;

const mockPayload = {
    description: "Clásica milanesa",
    prepTime: 30,
    addedIngredients: [{ ingrediente_id: 1, cantidad: 300 }]
};

describe("editarReceta", () => {
    beforeEach(() => {
        mockGetToken.mockReturnValue("fake-token");
    });

    afterEach(() => jest.clearAllMocks());

    it("hace PATCH a la URL correcta con los datos y headers correctos", async () => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: async () => ({ id: "1" })
        });

        await editarReceta(mockPayload, "1");

        expect(global.fetch).toHaveBeenCalledWith(
            "http://localhost:5000/recipes/1/editar",
            expect.objectContaining({
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer fake-token"
                },
                body: JSON.stringify(mockPayload)
            })
        );
    });

    it("devuelve los datos si la respuesta es ok", async () => {
        const mockResponse = { id: "1", nombre: "Milanesa" };
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: async () => mockResponse
        });

        const result = await editarReceta(mockPayload, "1");
        expect(result).toEqual(mockResponse);
    });

    it("lanza el error de la API si la respuesta no es ok", async () => {
        const mockError = { statusCode: 400, message: "Error al editar", error: "Bad Request" };
        global.fetch = jest.fn().mockResolvedValue({
            ok: false,
            json: async () => mockError
        });

        await expect(editarReceta(mockPayload, "1")).rejects.toEqual(mockError);
    });
});