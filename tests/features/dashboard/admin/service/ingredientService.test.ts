import { postIngredient, getIngredients } from "@/features/dashboard/admin/services/ingredientService";
import { http } from "@/lib/utils/httpClient";
import { INestError } from "@/interface/apiResponse";

jest.mock("@/lib/utils/httpClient");
const mockHttp = http as jest.Mocked<typeof http>;

describe("ingredientService", () => {
    afterEach(() => jest.clearAllMocks());

    describe("postIngredient", () => {
        it("llama a http.post con la URL y body correctos", async () => {
            mockHttp.post.mockResolvedValue({ id: 1, nombre: "Tomate", unidad: "u" });

            await postIngredient({ nombre: "Tomate", unidad: "u" });

            expect(mockHttp.post).toHaveBeenCalledWith("/ingredients", { nombre: "Tomate", unidad: "u" });
        });

        it("devuelve el ingrediente creado si la respuesta es ok", async () => {
            const mockIngrediente = { id: 1, nombre: "Tomate", unidad: "u" };
            mockHttp.post.mockResolvedValue(mockIngrediente);

            const result = await postIngredient({ nombre: "Tomate", unidad: "u" });
            expect(result).toEqual(mockIngrediente);
        });

        it("lanza error con el primer mensaje si message es array", async () => {
            const mockError: INestError = { message: ["Error A", "Error B"], error: "Bad Request", statusCode: 400 };
            mockHttp.post.mockRejectedValue(mockError);

            await expect(postIngredient({ nombre: "", unidad: "" })).rejects.toThrow("Error A");
        });

        it("lanza error con el mensaje si message es string", async () => {
            const mockError: INestError = { message: "Ya existe", error: "Conflict", statusCode: 409 };
            mockHttp.post.mockRejectedValue(mockError);

            await expect(postIngredient({ nombre: "Tomate", unidad: "u" })).rejects.toThrow("Ya existe");
        });
    });

    describe("getIngredients", () => {
        const mockResponse = {
            ingredients: [{ id: 1, nombre: "Tomate", unidad: "u" }],
            totalRecords: 1,
            totalPages: 1,
        };

        it("llama a http.get con page y sin name si no se pasa", async () => {
            mockHttp.get.mockResolvedValue(mockResponse);

            await getIngredients(1);

            expect(mockHttp.get).toHaveBeenCalledWith("/ingredients?page=1");
        });

        it("llama a http.get con page y name si se pasa", async () => {
            mockHttp.get.mockResolvedValue(mockResponse);

            await getIngredients(2, "Tomate");

            expect(mockHttp.get).toHaveBeenCalledWith("/ingredients?page=2&name=Tomate");
        });

        it("devuelve IIngredientResponse si la respuesta es ok", async () => {
            mockHttp.get.mockResolvedValue(mockResponse);

            const result = await getIngredients(1);
            expect(result).toEqual(mockResponse);
        });

        it("lanza error con el mensaje si message es string", async () => {
            const mockError: INestError = { message: "No autorizado", error: "Unauthorized", statusCode: 401 };
            mockHttp.get.mockRejectedValue(mockError);

            await expect(getIngredients(1)).rejects.toThrow("No autorizado");
        });
    });
});