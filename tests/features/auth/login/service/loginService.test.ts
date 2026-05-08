import { loginService } from "@/features/auth/login/services/loginService";

const mockFetch = (response: object, ok: boolean = true) => {
    global.fetch = jest.fn().mockResolvedValue({
        ok,
        json: jest.fn().mockResolvedValue(response),
    });
};

describe("loginService", () => {
    afterEach(() => jest.resetAllMocks());

    it("retorna el access_token si el request es correcto", async () => {
        mockFetch({ accessToken: "token123" });

        const result = await loginService({ email: "test@email.com", password: "12345678" });

        expect(result.accessToken).toBe("token123");
    });

    it("lanza error con el mensaje del servidor si response no es ok", async () => {
        mockFetch({ statusCode: 401, message: "Credenciales inválidas", error: "Unauthorized" }, false);

        await expect(loginService({ email: "test@email.com", password: "12345678" }))
            .rejects.toThrow("Credenciales inválidas");
    });

    it("lanza el primer mensaje si el servidor devuelve un array de mensajes", async () => {
        mockFetch({ statusCode: 400, message: ["El email es obligatorio", "La contraseña es requerida"], error: "Bad Request" }, false);

        await expect(loginService({ email: "", password: "" }))
            .rejects.toThrow("El email es obligatorio");
    });

    it("hace un fetch con el método POST y los headers correctos", async () => {
        mockFetch({ accessToken: "token123" });

        await loginService({ email: "test@email.com", password: "12345678" });

        expect(global.fetch).toHaveBeenCalledWith(
            "http://localhost:5000/users/login",
            expect.objectContaining({
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: "test@email.com", password: "12345678" }),
            })
        );
    });
});