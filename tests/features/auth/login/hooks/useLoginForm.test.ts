import { useLoginForm } from "@/features/auth/login/hooks/useLoginForms";
import { loginService } from "@/features/auth/login/services/loginService";
import { renderHook, act } from "@testing-library/react";


jest.mock("@/features/auth/login/services/loginService");
jest.mock("next/navigation", () => ({
    useRouter: () => ({ push: jest.fn() }),
}));

const mockLoginService = loginService as jest.MockedFunction<typeof loginService>;

describe("useLoginForm", () => {
    afterEach(() => jest.resetAllMocks());

    it("inicia con email y password vacios", () => {
        const { result } = renderHook(() => useLoginForm());

        expect(result.current.email).toBe("");
        expect(result.current.password).toBe("");
    });

    it("actualiza el email", () => {
        const { result } = renderHook(() => useLoginForm());

        act(() => { result.current.setEmail("test@email.com") });

        expect(result.current.email).toBe("test@email.com");
    });

    it("actualiza el password", () => {
        const { result } = renderHook(() => useLoginForm());

        act(() => { result.current.setPassword("12345678") });

        expect(result.current.password).toBe("12345678");
    });

    it("setea serverError si el servicio falla", async () => {
        mockLoginService.mockRejectedValue(new Error("Credenciales inválidas"));

        const { result } = renderHook(() => useLoginForm());
        const fakeEvent = { preventDefault: jest.fn() } as unknown as React.FormEvent;

        await act(async () => { await result.current.handleSubmit(fakeEvent) });

        expect(result.current.serverError).toBe("Credenciales inválidas");
    });

    it("no setea serverError si el servicio es exitoso", async () => {
        mockLoginService.mockResolvedValue({ access_token: "token123" });
        Object.defineProperty(document, "cookie", { writable: true, value: "" });

        const { result } = renderHook(() => useLoginForm());
        const fakeEvent = { preventDefault: jest.fn() } as unknown as React.FormEvent;

        await act(async () => { await result.current.handleSubmit(fakeEvent) });

        expect(result.current.serverError).toBeNull();
    });
});