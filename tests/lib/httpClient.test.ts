import { http } from "@/lib/utils/httpClient";
import { getTokenFromCookie } from "@/hooks/useAuth";

jest.mock("@/hooks/useAuth");
const mockGetToken = getTokenFromCookie as jest.Mock;

const mockFetchOk = (body: unknown) =>
    jest.fn().mockResolvedValue({
        ok: true,
        json: async () => body,
    });

const mockFetchError = (errorBody: unknown) =>
    jest.fn().mockResolvedValue({
        ok: false,
        json: async () => errorBody,
    });

const getBaseUrl = () => process.env.NEXT_PUBLIC_API_URL ?? "";

describe("httpClient", () => {
    beforeEach(() => {
        mockGetToken.mockReturnValue("fake-token");
    });

    afterEach(() => jest.clearAllMocks());

    const expectHeaders = () => ({
        "Content-Type": "application/json",
        "Authorization": "Bearer fake-token",
    });

    describe("http.get", () => {
        it("hace GET a la URL correcta con headers", async () => {
            global.fetch = mockFetchOk({ data: "ok" });

            await http.get("/test");

            expect(global.fetch).toHaveBeenCalledWith(
                `${getBaseUrl()}/test`,
                expect.objectContaining({
                    method: "GET",
                    headers: expectHeaders(),
                })
            );
        });

        it("retorna los datos si la respuesta es ok", async () => {
            global.fetch = mockFetchOk({ id: 1 });

            const result = await http.get("/test");
            expect(result).toEqual({ id: 1 });
        });

        it("lanza el error si la respuesta no es ok", async () => {
            const mockError = { message: "No encontrado", statusCode: 404 };
            global.fetch = mockFetchError(mockError);

            await expect(http.get("/test")).rejects.toEqual(mockError);
        });
    });

    describe("http.post", () => {
        it("hace POST con body serializado", async () => {
            global.fetch = mockFetchOk({ id: 1 });

            await http.post("/test", { nombre: "test" });

            expect(global.fetch).toHaveBeenCalledWith(
                `${getBaseUrl()}/test`,
                expect.objectContaining({
                    method: "POST",
                    body: JSON.stringify({ nombre: "test" }),
                    headers: expectHeaders(),
                })
            );
        });

        it("retorna los datos si la respuesta es ok", async () => {
            global.fetch = mockFetchOk({ id: 2 });

            const result = await http.post("/test", {});
            expect(result).toEqual({ id: 2 });
        });

        it("lanza el error si la respuesta no es ok", async () => {
            const mockError = { message: "Error", statusCode: 400 };
            global.fetch = mockFetchError(mockError);

            await expect(http.post("/test", {})).rejects.toEqual(mockError);
        });
    });

    describe("http.put", () => {
        it("hace PUT con body serializado", async () => {
            global.fetch = mockFetchOk({ id: 1 });

            await http.put("/test", { nombre: "editado" });

            expect(global.fetch).toHaveBeenCalledWith(
                `${getBaseUrl()}/test`,
                expect.objectContaining({
                    method: "PUT",
                    body: JSON.stringify({ nombre: "editado" }),
                })
            );
        });

        it("retorna los datos si la respuesta es ok", async () => {
            global.fetch = mockFetchOk({ updated: true });

            const result = await http.put("/test", {});
            expect(result).toEqual({ updated: true });
        });
    });

    describe("http.patch", () => {
        it("hace PATCH con body serializado", async () => {
            global.fetch = mockFetchOk({ id: 1 });

            await http.patch("/test", { campo: "valor" });

            expect(global.fetch).toHaveBeenCalledWith(
                `${getBaseUrl()}/test`,
                expect.objectContaining({
                    method: "PATCH",
                    body: JSON.stringify({ campo: "valor" }),
                })
            );
        });

        it("retorna los datos si la respuesta es ok", async () => {
            global.fetch = mockFetchOk({ patched: true });

            const result = await http.patch("/test", {});
            expect(result).toEqual({ patched: true });
        });
    });

    describe("http.delete", () => {
        it("hace DELETE sin body si no se pasa", async () => {
            global.fetch = mockFetchOk({});

            await http.delete("/test");

            expect(global.fetch).toHaveBeenCalledWith(
                `${getBaseUrl()}/test`,
                expect.objectContaining({
                    method: "DELETE",
                })
            );
        });

        it("hace DELETE con body si se pasa", async () => {
            global.fetch = mockFetchOk({});

            await http.delete("/test", { id: 1 });

            expect(global.fetch).toHaveBeenCalledWith(
                `${getBaseUrl()}/test`,
                expect.objectContaining({
                    method: "DELETE",
                    body: JSON.stringify({ id: 1 }),
                })
            );
        });

        it("lanza el error si la respuesta no es ok", async () => {
            const mockError = { message: "Error", statusCode: 400 };
            global.fetch = mockFetchError(mockError);

            await expect(http.delete("/test")).rejects.toEqual(mockError);
        });
    });
});