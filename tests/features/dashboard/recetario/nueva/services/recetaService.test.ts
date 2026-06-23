import { crearReceta, subirImagenReceta } from "@/features/dashboard/recetario/nueva/services/recetaService";
import { http } from "@/lib/utils/httpClient";
import { getTokenFromCookie } from "@/hooks/useAuth";

jest.mock("@/lib/utils/httpClient");
jest.mock("@/hooks/useAuth");

const mockHttp = http as jest.Mocked<typeof http>;
const mockGetToken = getTokenFromCookie as jest.Mock;

describe("recetaService", () => {
    beforeEach(() => {
        mockGetToken.mockReturnValue("fake-token");
    });

    afterEach(() => jest.clearAllMocks());

    describe("crearReceta", () => {
        it("llama a http.post con la URL y datos correctos", async () => {
            mockHttp.post.mockResolvedValue({ id: 1 });

            const payload = {
                nombre: "Milanesa",
                descripcion: "Rica",
                tiempoPreparacion: 30,
                ingredientes: [{ ingrediente_id: 1, cantidad: 300 }],
            };

            await crearReceta(payload);

            expect(mockHttp.post).toHaveBeenCalledWith("/recipes", payload);
        });

        it("retorna el id de la receta creada", async () => {
            mockHttp.post.mockResolvedValue({ id: 5 });

            const result = await crearReceta({
                nombre: "Milanesa",
                descripcion: "Rica",
                tiempoPreparacion: 30,
                ingredientes: [],
            });

            expect(result).toEqual({ id: 5 });
        });

        it("lanza el error si http.post falla", async () => {
            mockHttp.post.mockRejectedValue(new Error("Error del servidor"));

            await expect(crearReceta({
                nombre: "Milanesa",
                descripcion: "Rica",
                tiempoPreparacion: 30,
                ingredientes: [],
            })).rejects.toThrow("Error del servidor");
        });
    });

    describe("subirImagenReceta", () => {
        it("hace PATCH a la URL correcta con el token", async () => {
            global.fetch = jest.fn().mockResolvedValue({
                ok: true,
                json: async () => ({ url: "https://imagen.com/milanesa.jpg" }),
            });

            const file = new File([""], "imagen.jpg", { type: "image/jpeg" });
            await subirImagenReceta(1, file);

            expect(global.fetch).toHaveBeenCalledWith(
                "http://localhost:5000/recipes/1/imagen",
                expect.objectContaining({
                    method: "PATCH",
                    headers: { "Authorization": "Bearer fake-token" },
                })
            );
        });

        it("retorna los datos si la respuesta es ok", async () => {
            const mockResponse = { url: "https://imagen.com/milanesa.jpg" };
            global.fetch = jest.fn().mockResolvedValue({
                ok: true,
                json: async () => mockResponse,
            });

            const file = new File([""], "imagen.jpg");
            const result = await subirImagenReceta(1, file);

            expect(result).toEqual(mockResponse);
        });

        it("lanza error si la respuesta no es ok", async () => {
            global.fetch = jest.fn().mockResolvedValue({
                ok: false,
                json: async () => ({}),
            });

            const file = new File([""], "imagen.jpg");
            await expect(subirImagenReceta(1, file)).rejects.toThrow("Error al subir la imagen");
        });
    });
});