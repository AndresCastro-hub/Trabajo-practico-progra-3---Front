import { emailRules } from "@/features/auth/validations/emailRules";
import { validate } from "@/lib/utils/validate";

describe("emailRules", () => {
    it("retorna error si el email está vacío", () => {
        expect(validate("", emailRules)).toBe("El email es obligatorio");
    });

    it("retorna error si el email no tiene @", () => {
        expect(validate("emailsinArroba.com", emailRules)).toBe("El formato de email es inválido");
    });

    it("retorna error si el email no tiene dominio", () => {
        expect(validate("email@", emailRules)).toBe("El formato de email es inválido");
    });

    it("retorna un string vacío si el email es válido", () => {
        expect(validate("email@dominio.com", emailRules)).toBe("");
    });
});