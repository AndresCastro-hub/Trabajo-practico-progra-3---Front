import { useRegisterForm } from "@/features/auth/register/hooks/useRegisterForm";
import { registerService } from "@/features/auth/register/services/registerService";
import { renderHook, act } from "@testing-library/react";

jest.mock("@/features/auth/register/services/registerService");

const mockRegisterService = registerService as jest.MockedFunction<typeof registerService>;

const usuarioMock = {
    id: 1,
    name: "Andres test",
    email: "andres@email.com",
    rolId: 2,
    fechaCreacion: "2026-05-01T23:05:39.906Z",
};

describe("useRegisterForm", () => {
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

    it("setea usuarioCreado y limpia el formulario si el registro es exitoso", async () => {
        mockRegisterService.mockResolvedValue(usuarioMock);

        const { result } = renderHook(() => useRegisterForm());
        const fakeEvent = { preventDefault: jest.fn() } as unknown as React.FormEvent;

        act(() => {
            result.current.setNombre("Andres test");
            result.current.setEmail("andres@email.com");
            result.current.setPassword("12345678");
        });

        await act(async () => { await result.current.handleSubmit(fakeEvent) });

        expect(result.current.usuarioCreado).toEqual(usuarioMock);
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