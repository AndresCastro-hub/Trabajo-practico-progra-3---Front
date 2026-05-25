import { unidadRules } from "@/features/dashboard/admin/validations/unidadRules";

describe("unidadRules", () => {
    const validate = (value: string) =>
        unidadRules.find(rule => rule.test(value))?.message ?? null;

    it("retorna error si la unidad está vacía", () => {
        expect(validate("")).toBe("La unidad es obligatoria");
    });

    it("retorna error si la unidad no es válida", () => {
        expect(validate("kg")).toBe("La unidad no es válida");
    });

    it("retorna null si la unidad es válida", () => {
        expect(validate("g")).toBeNull();
        expect(validate("ml")).toBeNull();
        expect(validate("unidades")).toBeNull();
    });
});