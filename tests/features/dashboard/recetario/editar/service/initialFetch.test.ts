import { initialFetch } from "@/features/dashboard/recetario/editar/service/initialFetch";
import { getTokenFromCookie } from "@/hooks/useAuth";

jest.mock("@/hooks/useAuth");
const mockGetToken = getTokenFromCookie as jest.Mock;

const mockApiResponse = {
    nombre: "Milanesa",
    descripcion: "Clásica milanesa",
    tiempoPreparacion: 30,
    imagen_url: "https://www.josimar.com.ar/milanesa-pollo-frita-kg-2/p?srsltid=AfmBOooW7HI4bBryV28HxICIjREUF7qQZ7Gpyq5Cz_Xa2J70gz3kPIR9",
    ingredientes: [
        { ingrediente: { id: 1, nombre: "Carne", unidad: "g" }, cantidad: "300" }
    ]
};

describe("initialFetch", () => {
    beforeEach(() => {
        mockGetToken.mockReturnValue("fake-token");
    });

    afterEach(() => jest.clearAllMocks());

    it("hace GET a la URL correcta con el header de autorización", async () => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: async () => mockApiResponse
        });

        await initialFetch("1");

        expect(global.fetch).toHaveBeenCalledWith(
            "http://localhost:5000/recipes/1",
            expect.objectContaining({
                headers: { Authorization: "Bearer fake-token" }
            })
        );
    });

    it("mapea correctamente la respuesta al tipo IForm", async () => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: async () => mockApiResponse
        });

        const result = await initialFetch("1");

        expect(result).toEqual({
            nombre: "Milanesa",
            descripcion: "Clásica milanesa",
            tiempoPreparacion: 30,
            imagen_url: "https://www.josimar.com.ar/milanesa-pollo-frita-kg-2/p?srsltid=AfmBOooW7HI4bBryV28HxICIjREUF7qQZ7Gpyq5Cz_Xa2J70gz3kPIR9",
            ingredientes: [
                { ingrediente: { id: 1, nombre: "Carne", unidad: "g" }, cantidad: "300" }
            ]
        });
    });

    it("lanza error si la respuesta no es ok", async () => {
        global.fetch = jest.fn().mockResolvedValue({ ok: false, json: async () => ({}) });

        await expect(initialFetch("1")).rejects.toThrow("No se encontró la receta");
    });
});