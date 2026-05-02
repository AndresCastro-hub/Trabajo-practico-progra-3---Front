import { confirmPasswordRules } from "@/features/auth/register/validations/confirmPasswordRules";
import { validate } from "@/lib/utils/validate";

describe("confirmPasswordRules", () => {
    it("retorna error si la confirmación no coincide con la contraseña", () => {
        const rules = confirmPasswordRules("12345678");
        expect(validate("87654321", rules)).toBe("El valor ingresado no coincide con la contraseña");
    });

    it("retorna string vacío si la confirmación coincide con la contraseña", () => {
        const rules = confirmPasswordRules("12345678");
        expect(validate("12345678", rules)).toBe("");
    });

    it("retorna error si la confirmación está vacía", () => {
        const rules = confirmPasswordRules("12345678");
        expect(validate("", rules)).toBe("El valor ingresado no coincide con la contraseña");
    });
});