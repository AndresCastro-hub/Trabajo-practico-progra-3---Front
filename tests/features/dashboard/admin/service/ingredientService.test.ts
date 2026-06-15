import { postIngredient, getIngredients } from "@/features/dashboard/admin/services/ingredientService";
import { getTokenFromCookie } from "@/hooks/useAuth";

jest.mock("@/hooks/useAuth");
const mockGetToken = getTokenFromCookie as jest.Mock;

describe("ingredientService", () => {
    beforeEach(() => {
        mockGetToken.mockReturnValue("fake-token");
    });

    afterEach(() => jest.clearAllMocks());

    describe("postIngredient", () => {
        it("hace POST a la URL correcta con headers y body correctos", async () => {
            global.fetch = jest.fn().mockResolvedValue({
                ok: true,
                json: async () => ({ id: 1, nombre: "Tomate", unidad: "u" })
            });

            await postIngredient({ nombre: "Tomate", unidad: "u" });

            expect(global.fetch).toHaveBeenCalledWith(
                "http://localhost:5000/ingredients",
                expect.objectContaining({
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer fake-token"
                    },
                    body: JSON.stringify({ nombre: "Tomate", unidad: "u" })
                })
            );
        });

        it("devuelve el ingrediente creado si la respuesta es ok", async () => {
            const mockIngrediente = { id: 1, nombre: "Tomate", unidad: "u" };
            global.fetch = jest.fn().mockResolvedValue({
                ok: true,
                json: async () => mockIngrediente
            });

            const result = await postIngredient({ nombre: "Tomate", unidad: "u" });
            expect(result).toEqual(mockIngrediente);
        });

        it("lanza error con el primer mensaje si message es array", async () => {
            global.fetch = jest.fn().mockResolvedValue({
                ok: false,
                json: async () => ({ message: ["Error A", "Error B"], error: "Bad Request", statusCode: 400 })
            });

            await expect(postIngredient({ nombre: "", unidad: "" })).rejects.toThrow("Error A");
        });

        it("lanza error con el mensaje si message es string", async () => {
            global.fetch = jest.fn().mockResolvedValue({
                ok: false,
                json: async () => ({ message: "Ya existe", error: "Conflict", statusCode: 409 })
            });

            await expect(postIngredient({ nombre: "Tomate", unidad: "u" })).rejects.toThrow("Ya existe");
        });
    });

    describe("getIngredients", () => {
        const mockResponse = {
            ingredients: [{ id: 1, nombre: "Tomate", unidad: "u" }],
            totalRecords: 1,
            totalPages: 1,
        };

        it("hace GET con page y sin name si no se pasa", async () => {
            global.fetch = jest.fn().mockResolvedValue({
                ok: true,
                json: async () => mockResponse
            });

            await getIngredients(1);

            expect(global.fetch).toHaveBeenCalledWith(
                "http://localhost:5000/ingredients?page=1",
                expect.objectContaining({ method: "GET" })
            );
        });

        it("hace GET con page y name si se pasa", async () => {
            global.fetch = jest.fn().mockResolvedValue({
                ok: true,
                json: async () => mockResponse
            });

            await getIngredients(2, "Tomate");

            expect(global.fetch).toHaveBeenCalledWith(
                "http://localhost:5000/ingredients?page=2&name=Tomate",
                expect.anything()
            );
        });

        it("devuelve IIngredientResponse si la respuesta es ok", async () => {
            global.fetch = jest.fn().mockResolvedValue({
                ok: true,
                json: async () => mockResponse
            });

            const result = await getIngredients(1);
            expect(result).toEqual(mockResponse);
        });

        it("lanza error si la respuesta no es ok", async () => {
            global.fetch = jest.fn().mockResolvedValue({
                ok: false,
                json: async () => ({ message: "No autorizado", error: "Unauthorized", statusCode: 401 })
            });

            await expect(getIngredients(1)).rejects.toThrow("No autorizado");
        });
    });
});