import { getUsuarios } from "@/features/dashboard/admin/services/usuariosService";
import { getTokenFromCookie } from "@/hooks/useAuth";

jest.mock("@/hooks/useAuth");
const mockGetToken = getTokenFromCookie as jest.Mock;

const mockResponse = {
    users: [{ id: 1, name: "Elena", email: "elena@test.com", rolName: "administrador" }],
    totalUsers: 1,
    totalPages: 1,
};

describe("getUsuarios", () => {
    beforeEach(() => {
        mockGetToken.mockReturnValue("fake-token");
    });

    afterEach(() => jest.clearAllMocks());

    it("hace GET con page y sin nombre si no se pasa", async () => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: async () => mockResponse
        });

        await getUsuarios(0);

        expect(global.fetch).toHaveBeenCalledWith(
            "http://localhost:5000/users/all?page=0",
            expect.objectContaining({
                method: "GET",
                headers: expect.objectContaining({ "Authorization": "Bearer fake-token" })
            })
        );
    });

    it("hace GET con page y nombre si se pasa", async () => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: async () => mockResponse
        });

        await getUsuarios(1, "Elena");

        expect(global.fetch).toHaveBeenCalledWith(
            "http://localhost:5000/users/all?page=1&nombre=Elena",
            expect.anything()
        );
    });

    it("devuelve IUserResponse si la respuesta es ok", async () => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: async () => mockResponse
        });

        const result = await getUsuarios(0);
        expect(result).toEqual(mockResponse);
    });

    it("lanza error con el primer mensaje si message es array", async () => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: false,
            json: async () => ({ message: ["Error A", "Error B"], error: "Bad Request", statusCode: 400 })
        });

        await expect(getUsuarios(0)).rejects.toThrow("Error A");
    });

    it("lanza error con el mensaje si message es string", async () => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: false,
            json: async () => ({ message: "No autorizado", error: "Unauthorized", statusCode: 401 })
        });

        await expect(getUsuarios(0)).rejects.toThrow("No autorizado");
    });
});