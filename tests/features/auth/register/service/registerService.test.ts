import { registerService } from "@/features/auth/register/services/registerService";

const mockFetch = (response: object, ok: boolean = true) => {
    global.fetch = jest.fn().mockResolvedValue({
        ok,
        json: jest.fn().mockResolvedValue(response),
    });
};

const usuarioMock = {
    id: 1,
    name: "Andres test" ,
    email: "andres@email.com",
    rolId: 2,
    fechaCreacion: "2026-05-01T23:05:39.906Z",
};

describe("registerService", () => {
    afterEach(() => jest.resetAllMocks());

    it("retorna el usuario creado si el registro es exitoso", async () => {
        mockFetch(usuarioMock);

        const result = await registerService({ email: "andres@email.com", name: "Andres test", password: "12345678" });

        expect(result).toEqual(usuarioMock);
    });

    it("lanza un error con el mensaje del back si response no es ok", async () => {
        mockFetch({ statusCode: 400, message: "El email ya está registrado", error: "Bad Request" }, false);

        await expect(registerService({ email: "andres@email.com", name: "Andres test", password: "12345678" }))
            .rejects.toThrow("El email ya está registrado");
    });

    it("lanza el primer mensaje si el servidor devuelve un array de mensajes", async () => {
        mockFetch({ statusCode: 400, message: ["El email es obligatorio", "El nombre es requerido"], error: "Bad Request" }, false);

        await expect(registerService({ email: "", name: "", password: "" }))
            .rejects.toThrow("El email es obligatorio");
    });

    it("llama a fetch con el método POST y los headers correctos", async () => {
        mockFetch(usuarioMock);

        await registerService({ email: "andres@email.com", name: "Andres test", password: "12345678" });

        expect(global.fetch).toHaveBeenCalledWith(
            "http://localhost:5000/users/register",
            expect.objectContaining({
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: "andres@email.com", name: "Andres test", password: "12345678" }),
            })
        );
    });
});