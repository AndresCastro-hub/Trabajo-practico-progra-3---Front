import { nombreRules } from "@/features/dashboard/admin/validations/nombreRules";

describe("nombreRules", () => {
    const validate = (value: string) =>
        nombreRules.find(rule => rule.test(value))?.message ?? null;

    it("retorna error si el nombre está vacío", () => {
        expect(validate("")).toBe("El nombre del ingrediente es obligatorio");
    });

    it("retorna null si el nombre tiene valor", () => {
        expect(validate("Tomate")).toBeNull();
    });
});