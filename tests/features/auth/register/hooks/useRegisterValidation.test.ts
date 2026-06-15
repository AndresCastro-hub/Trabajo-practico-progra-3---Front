import { useRegisterValidation } from "@/features/auth/register/hooks/useRegisterValidation";
import { renderHook, act } from "@testing-library/react";

describe("useRegisterValidation", () => {
    
    describe("validateNombre", () => {
        it("setea un error si el nombre está vacío", () => {
            const { result } = renderHook(() => useRegisterValidation("", "", "", ""));

            act(() => { result.current.validateNombre("") });

            expect(result.current.errors.name).toBe("El nombre es requerido");
        });
    });

    describe("validateEmail", () => {
        it("setea un error si el email está vacío", () => {
            const { result } = renderHook(() => useRegisterValidation("", "", "", ""));

            act(() => { result.current.validateEmail("") });

            expect(result.current.errors.email).toBe("El email es requerido");
        });

        it("setea un error si el formato de email es inválido", () => {
            const { result } = renderHook(() => useRegisterValidation("", "", "", ""));

            act(() => { result.current.validateEmail("emailinvalido") });

            expect(result.current.errors.email).toBe("El formato de email es inválido");
        });
    });

    describe("validatePassword", () => {
        it("setea un error si la contraseña está vacía", () => {
            const { result } = renderHook(() => useRegisterValidation("", "", "", ""));

            act(() => { result.current.validatePassword("") });

            expect(result.current.errors.password).toBe("La contraseña es requerida");
        });

        it("setea un error si la contraseña tiene menos de 8 caracteres", () => {
            const { result } = renderHook(() => useRegisterValidation("", "", "", ""));

            act(() => { result.current.validatePassword("1234567") });

            expect(result.current.errors.password).toBe("La contraseña debe tener al menos 8 caracteres");
        });

    });

    describe("validateConfirmPassword", () => {
        it("setea un error si la confirmación no coincide con la contraseña", () => {
            const { result } = renderHook(() => useRegisterValidation("", "12345678", "", ""));

            act(() => { result.current.validateConfirmPassword("87654321") });

            expect(result.current.errors.confirmPassword).toBe("El valor ingresado no coincide con la contraseña");
        });
    });
});