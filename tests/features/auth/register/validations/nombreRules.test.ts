import { nombreRules } from "@/features/auth/register/validations/nombreRules";
import { validate } from "@/lib/utils/validate";

describe("nombreRules", () => {
    it("retorna error si el nombre está vacío", () => {
        expect(validate("", nombreRules)).toBe("El nombre es requerido");
    });

    it("retorna string vacío si el nombre tiene valor", () => {
        expect(validate("Juan", nombreRules)).toBe("");
    });
});