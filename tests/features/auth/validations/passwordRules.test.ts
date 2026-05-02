import { passwordRules } from "@/features/auth/validations/passwordRules";
import { validate } from "@/lib/utils/validate";

describe("passwordRules", () => {
    it("retorna error si la contraseña está vacía", () => {
        expect(validate("", passwordRules)).toBe("La contraseña es requerida");
    });

    it("retorna error si la contraseña tiene menos de 8 caracteres", () => {
        expect(validate("1234567", passwordRules)).toBe("La contraseña debe tener al menos 8 caracteres");
    });

    it("retorna string vacío si la contraseña tiene exactamente 8 caracteres", () => {
        expect(validate("12345678", passwordRules)).toBe("");
    });

    it("retorna string vacío si la contraseña tiene más de 8 caracteres", () => {
        expect(validate("123456789", passwordRules)).toBe("");
    });
});