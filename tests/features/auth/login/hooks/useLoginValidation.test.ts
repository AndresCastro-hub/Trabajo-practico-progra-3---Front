import { useLoginValidation } from "@/features/auth/login/hooks/useLoginValidation";
import { renderHook, act } from "@testing-library/react";

describe("useLoginValidation", () => {
    describe("validateEmail", () => {
        it("setea error si el email está vacío", () => {
            const { result } = renderHook(() => useLoginValidation("", ""));

            act(() => { result.current.validateEmail("") });

            expect(result.current.errors.email).toBe("El email es obligatorio");
        });

        it("setea error si el formato de email es inválido", () => {
            const { result } = renderHook(() => useLoginValidation("", ""));

            act(() => { result.current.validateEmail("emailinvalido") });

            expect(result.current.errors.email).toBe("El formato de email es inválido");
        });
    });

    describe("validatePassword", () => {
        it("setea error si la contraseña está vacía", () => {
            const { result } = renderHook(() => useLoginValidation("", ""));

            act(() => { result.current.validatePassword("") });

            expect(result.current.errors.password).toBe("La contraseña es requerida");
        });

        it("setea error si la contraseña tiene menos de 8 caracteres", () => {
            const { result } = renderHook(() => useLoginValidation("", ""));

            act(() => { result.current.validatePassword("1234567") });

            expect(result.current.errors.password).toBe("La contraseña debe tener al menos 8 caracteres");
        });
    });
});