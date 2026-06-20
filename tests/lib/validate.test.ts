import { validate, contieneErrores, camposCompletos } from "@/lib/utils/validate";

describe("validate", () => {
    const rules = [
        { test: (v: string) => v.trim() === "", message: "Campo requerido" },
        { test: (v: string) => v.length < 3, message: "Mínimo 3 caracteres" },
    ];

    it("retorna string vacío si todas las reglas pasan", () => {
        expect(validate("hola", rules)).toBe("");
    });

    it("retorna el mensaje de la primera regla que falla", () => {
        expect(validate("", rules)).toBe("Campo requerido");
    });

    it("retorna el mensaje de la segunda regla si la primera pasa", () => {
        expect(validate("ab", rules)).toBe("Mínimo 3 caracteres");
    });
});

describe("contieneErrores", () => {
    it("retorna false si todos los errores son null", () => {
        expect(contieneErrores({ name: null, email: null })).toBe(false);
    });

    it("retorna false si todos los errores son string vacío", () => {
        expect(contieneErrores({ name: "", email: "" })).toBe(false);
    });

    it("retorna true si hay al menos un error con mensaje", () => {
        expect(contieneErrores({ name: "Campo requerido", email: null })).toBe(true);
    });

    it("retorna true si todos tienen error", () => {
        expect(contieneErrores({ name: "Error", email: "Inválido" })).toBe(true);
    });
});

describe("camposCompletos", () => {
    it("retorna true si todos los campos tienen valor", () => {
        expect(camposCompletos({ name: "Juan", email: "juan@test.com" })).toBe(true);
    });

    it("retorna false si algún campo está vacío", () => {
        expect(camposCompletos({ name: "", email: "juan@test.com" })).toBe(false);
    });

    it("retorna false si algún campo tiene solo espacios", () => {
        expect(camposCompletos({ name: "   ", email: "juan@test.com" })).toBe(false);
    });

    it("retorna false si todos los campos están vacíos", () => {
        expect(camposCompletos({ name: "", email: "" })).toBe(false);
    });
});