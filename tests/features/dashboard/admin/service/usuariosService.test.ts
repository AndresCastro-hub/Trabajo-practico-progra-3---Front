import { getUsuarios } from "@/features/dashboard/admin/services/usuariosService";
import { http } from "@/lib/utils/httpClient";
import { INestError } from "@/interface/apiResponse";

jest.mock("@/lib/utils/httpClient");
const mockHttp = http as jest.Mocked<typeof http>;

const mockResponse = {
    users: [{ id: 1, name: "Elena", email: "elena@test.com", rolName: "administrador" }],
    totalUsers: 1,
    totalPages: 1,
};

describe("getUsuarios", () => {
    afterEach(() => jest.clearAllMocks());

    it("llama a http.get con page y sin nombre si no se pasa", async () => {
        mockHttp.get.mockResolvedValue(mockResponse);

        await getUsuarios(0);

        expect(mockHttp.get).toHaveBeenCalledWith("/users/all?page=0");
    });

    it("llama a http.get con page y nombre si se pasa", async () => {
        mockHttp.get.mockResolvedValue(mockResponse);

        await getUsuarios(1, "Elena");

        expect(mockHttp.get).toHaveBeenCalledWith("/users/all?page=1&nombre=Elena");
    });

    it("devuelve IUserResponse si la respuesta es ok", async () => {
        mockHttp.get.mockResolvedValue(mockResponse);

        const result = await getUsuarios(0);
        expect(result).toEqual(mockResponse);
    });

    it("lanza error con el primer mensaje si message es array", async () => {
        const mockError: INestError = { message: ["Error A", "Error B"], error: "Bad Request", statusCode: 400 };
        mockHttp.get.mockRejectedValue(mockError);

        await expect(getUsuarios(0)).rejects.toThrow("Error A");
    });

    it("lanza error con el mensaje si message es string", async () => {
        const mockError: INestError = { message: "No autorizado", error: "Unauthorized", statusCode: 401 };
        mockHttp.get.mockRejectedValue(mockError);

        await expect(getUsuarios(0)).rejects.toThrow("No autorizado");
    });
});