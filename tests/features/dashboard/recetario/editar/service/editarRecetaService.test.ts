import { editarReceta } from "@/features/dashboard/recetario/editar/service/editarRecetaService";
import { IEditarRecetaDTO } from "@/features/dashboard/recetario/editar/types/editar.types";
import { http } from "@/lib/utils/httpClient";

jest.mock("@/lib/utils/httpClient");
const mockHttp = http as jest.Mocked<typeof http>;

const mockPayload: IEditarRecetaDTO = {
    description: "Clásica milanesa",
    prepTime: 30,
    addedIngredients: [{ ingrediente_id: 1, cantidad: 300 }],
    deletedIngredientsId: [],
    updatedIngredients: []
};

describe("editarReceta", () => {
    afterEach(() => jest.clearAllMocks());

    it("devuelve los datos si la respuesta es ok", async () => {
        const mockResponse = { id: "1", nombre: "Milanesa" };
        mockHttp.patch.mockResolvedValue(mockResponse);

        const result = await editarReceta(mockPayload, "1");
        expect(result).toEqual(mockResponse);
    });

    it("llama a http.patch con la URL y datos correctos", async () => {
        mockHttp.patch.mockResolvedValue({ id: "1" });

        await editarReceta(mockPayload, "1");

        expect(mockHttp.patch).toHaveBeenCalledWith("/recipes/1/editar", mockPayload);
    });

    it("lanza el error si http.patch falla", async () => {
        const mockError = { statusCode: 400, message: "Error al editar" };
        mockHttp.patch.mockRejectedValue(mockError);

        await expect(editarReceta(mockPayload, "1")).rejects.toEqual(mockError);
    });
});