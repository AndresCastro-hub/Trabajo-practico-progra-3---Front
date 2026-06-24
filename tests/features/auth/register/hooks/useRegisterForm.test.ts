import { useRegisterForm } from "@/features/auth/register/hooks/useRegisterForm";
import { registerService } from "@/features/auth/register/services/registerService";
import { loginService } from "@/features/auth/login/services/loginService";
import { renderHook, act } from "@testing-library/react";

jest.mock("@/features/auth/register/services/registerService");
jest.mock("@/features/auth/login/services/loginService");
jest.mock("next/navigation", () => ({
    useRouter: () => ({ push: jest.fn() })
}));

const mockRegisterService = registerService as jest.MockedFunction<typeof registerService>;
const mockLoginService = loginService as jest.MockedFunction<typeof loginService>;

const usuarioMock = {
    id: 1,
    name: "Andres test",
    email: "andres@email.com",
    rolId: 2,
    fechaCreacion: "2026-05-01T23:05:39.906Z",
};

describe("useRegisterForm", () => {
    beforeEach(() => {
        mockLoginService.mockResolvedValue({ accessToken: "fake-token" });
    });

    afterEach(() => jest.resetAllMocks());

    it("inicia con todos los campos vacíos", () => {
        const { result } = renderHook(() => useRegisterForm());

        expect(result.current.name).toBe("");
        expect(result.current.email).toBe("");
        expect(result.current.password).toBe("");
        expect(result.current.confirmPassword).toBe("");
    });

    it("actualiza el nombre correctamente", () => {
        const { result } = renderHook(() => useRegisterForm());
        act(() => { result.current.setNombre("Andres test") });
        expect(result.current.name).toBe("Andres test");
    });

    it("actualiza el email correctamente", () => {
        const { result } = renderHook(() => useRegisterForm());
        act(() => { result.current.setEmail("andres@email.com") });
        expect(result.current.email).toBe("andres@email.com");
    });

    it("actualiza la password correctamente", () => {
        const { result } = renderHook(() => useRegisterForm());
        act(() => { result.current.setPassword("12345678") });
        expect(result.current.password).toBe("12345678");
    });

    it("actualiza la confirmación de password correctamente", () => {
        const { result } = renderHook(() => useRegisterForm());
        act(() => { result.current.setConfirmPassword("12345678") });
        expect(result.current.confirmPassword).toBe("12345678");
    });

    it("limpia el formulario y redirige si el registro es exitoso", async () => {
        mockRegisterService.mockResolvedValue(usuarioMock);

        const { result } = renderHook(() => useRegisterForm());
        const fakeEvent = { preventDefault: jest.fn() } as unknown as React.FormEvent;

        act(() => {
            result.current.setNombre("Andres test");
            result.current.setEmail("andres@email.com");
            result.current.setPassword("12345678");
        });

        await act(async () => { await result.current.handleSubmit(fakeEvent) });

        expect(result.current.name).toBe("");
        expect(result.current.email).toBe("");
        expect(result.current.password).toBe("");
    });

    it("setea serverError si el email ya esta registrado", async () => {
        mockRegisterService.mockRejectedValue(new Error("El email ya está registrado"));

        const { result } = renderHook(() => useRegisterForm());
        const fakeEvent = { preventDefault: jest.fn() } as unknown as React.FormEvent;

        await act(async () => { await result.current.handleSubmit(fakeEvent) });

        expect(result.current.serverError).toBe("El email ya está registrado");
    });
});