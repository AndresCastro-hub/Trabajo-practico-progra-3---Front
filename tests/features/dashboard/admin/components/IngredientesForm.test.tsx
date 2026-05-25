import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import IngredientesForm from "@/features/dashboard/admin/components/ingredientes/IngredientesForm";
import * as useNewIngredientModule from "@/features/dashboard/admin/hooks/useNewIngredient";
import * as useIngredientValidationModule from "@/features/dashboard/admin/hooks/useIngredientsValidation";

const mockUseNewIngredient = {
    nuevoIngrediente: "",
    setNuevoIngrediente: jest.fn(),
    nuevaUnidad: "",
    setNuevaUnidad: jest.fn(),
    isIngredientCreated: null,
    serverError: null,
    handleNewIngrediente: jest.fn(),
};

const mockUseIngredientValidation = {
    errors: { nombre: null, unidad: null },
    validateNombre: jest.fn(),
    validateUnidad: jest.fn(),
};

beforeEach(() => {
    jest.spyOn(useNewIngredientModule, "useNewIngredient")
        .mockReturnValue(mockUseNewIngredient);
    jest.spyOn(useIngredientValidationModule, "useIngredientValidation")
        .mockReturnValue(mockUseIngredientValidation);
});

afterEach(() => jest.clearAllMocks());

describe("IngredientesForm - renderizado", () => {
    it("renderiza el campo de nombre", () => {
        render(<IngredientesForm />);
        expect(screen.getByPlaceholderText("Ej: Tomate")).toBeInTheDocument();
    });

    it("renderiza el select de unidad", () => {
        render(<IngredientesForm />);
        expect(screen.getByText("Seleccioná una unidad")).toBeInTheDocument();
    });

    it("renderiza el botón de submit", () => {
        render(<IngredientesForm />);
        expect(screen.getByRole("button", { name: /crear ingrediente/i })).toBeInTheDocument();
    });
});

describe("IngredientesForm - estado del botón", () => {
    it("el botón está deshabilitado si no hay nombre ni unidad", () => {
        render(<IngredientesForm />);
        expect(screen.getByRole("button", { name: /crear ingrediente/i })).toBeDisabled();
    });

    it("el botón está deshabilitado si hay error de validación en nombre", () => {
        jest.spyOn(useIngredientValidationModule, "useIngredientValidation")
            .mockReturnValue({ ...mockUseIngredientValidation, errors: { nombre: "El nombre es obligatorio", unidad: null } });
        jest.spyOn(useNewIngredientModule, "useNewIngredient")
            .mockReturnValue({ ...mockUseNewIngredient, nuevoIngrediente: "T", nuevaUnidad: "g" });

        render(<IngredientesForm />);
        expect(screen.getByRole("button", { name: /crear ingrediente/i })).toBeDisabled();
    });

    it("el botón está habilitado si hay nombre, unidad y sin errores", () => {
        jest.spyOn(useNewIngredientModule, "useNewIngredient")
            .mockReturnValue({ ...mockUseNewIngredient, nuevoIngrediente: "Tomate", nuevaUnidad: "g" });

        render(<IngredientesForm />);
        expect(screen.getByRole("button", { name: /crear ingrediente/i })).toBeEnabled();
    });
});

describe("IngredientesForm - renderizados condicionales", () => {
    it("no muestra el alert de éxito por defecto", () => {
        render(<IngredientesForm />);
        expect(screen.queryByText(/ingrediente creado/i)).not.toBeInTheDocument();
    });

    it("muestra el alert de éxito cuando isIngredientCreated tiene valor", () => {
        jest.spyOn(useNewIngredientModule, "useNewIngredient")
            .mockReturnValue({ ...mockUseNewIngredient, isIngredientCreated: { nombre: "Tomate", unidad: "g" } });

        render(<IngredientesForm />);
        expect(screen.getByText(/ingrediente creado/i)).toBeInTheDocument();
        expect(screen.getByText(/tomate/i)).toBeInTheDocument();
    });

    it("muestra el alert de error cuando serverError tiene valor", () => {
        jest.spyOn(useNewIngredientModule, "useNewIngredient")
            .mockReturnValue({ ...mockUseNewIngredient, serverError: "Ya existe ese ingrediente" });

        render(<IngredientesForm />);
        expect(screen.getByText("Ya existe ese ingrediente")).toBeInTheDocument();
    });
});

describe("IngredientesForm - interacciones", () => {
    it("llama a setNuevoIngrediente cuando el usuario escribe en el campo nombre", async () => {
        const user = userEvent.setup();
        render(<IngredientesForm />);

        await user.type(screen.getByPlaceholderText("Ej: Tomate"), "T");

        expect(mockUseNewIngredient.setNuevoIngrediente).toHaveBeenCalled();
    });

    it("llama a handleNewIngrediente al hacer submit", async () => {
        const user = userEvent.setup();
        jest.spyOn(useNewIngredientModule, "useNewIngredient")
            .mockReturnValue({ ...mockUseNewIngredient, nuevoIngrediente: "Tomate", nuevaUnidad: "g" });

        render(<IngredientesForm />);
        await user.click(screen.getByRole("button", { name: /crear ingrediente/i }));

        expect(mockUseNewIngredient.handleNewIngrediente).toHaveBeenCalled();
    });
});