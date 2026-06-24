import { renderHook, waitFor } from "@testing-library/react";
import { useAuth, getTokenFromCookie } from "@/hooks/useAuth";
import { jwtDecode } from "jwt-decode";

jest.mock("jwt-decode");
const mockJwtDecode = jwtDecode as jest.Mock;

const mockPayload = {
    id: 1,
    email: "test@test.com",
    name: "Test User",
    rol: "usuario",
    iat: 1000,
    exp: 9999999999,
};

describe("getTokenFromCookie", () => {
    afterEach(() => {
        Object.defineProperty(document, "cookie", {
            writable: true,
            value: "",
        });
    });

    it("retorna el token si existe en las cookies", () => {
        Object.defineProperty(document, "cookie", {
            writable: true,
            value: "token=fake-token; other=value",
        });

        expect(getTokenFromCookie()).toBe("fake-token");
    });

    it("retorna null si no hay token en las cookies", () => {
        Object.defineProperty(document, "cookie", {
            writable: true,
            value: "other=value",
        });

        expect(getTokenFromCookie()).toBeNull();
    });

    it("retorna null si las cookies están vacías", () => {
        Object.defineProperty(document, "cookie", {
            writable: true,
            value: "",
        });

        expect(getTokenFromCookie()).toBeNull();
    });
});

describe("useAuth", () => {
    afterEach(() => {
        Object.defineProperty(document, "cookie", {
            writable: true,
            value: "",
        });
        jest.clearAllMocks();
    });

    it("retorna user y role null si no hay token", async () => {
        Object.defineProperty(document, "cookie", {
            writable: true,
            value: "",
        });

        const { result } = renderHook(() => useAuth());

        await waitFor(() => {
            expect(result.current.user).toBeNull();
            expect(result.current.role).toBeNull();
        });
    });

    it("decodifica el token y setea user y role", async () => {
        Object.defineProperty(document, "cookie", {
            writable: true,
            value: "token=fake-token",
        });

        mockJwtDecode.mockReturnValue(mockPayload);

        const { result } = renderHook(() => useAuth());

        await waitFor(() => {
            expect(result.current.user).toEqual(mockPayload);
            expect(result.current.role).toBe("usuario");
        });
    });

    it("setea user y role null si jwtDecode lanza error", async () => {
        Object.defineProperty(document, "cookie", {
            writable: true,
            value: "token=invalid-token",
        });

        mockJwtDecode.mockImplementation(() => { throw new Error("Invalid token") });

        const { result } = renderHook(() => useAuth());

        await waitFor(() => {
            expect(result.current.user).toBeNull();
            expect(result.current.role).toBeNull();
        });
    });
});