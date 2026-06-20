import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import IngredienteActionButton from "@/features/dashboard/admin/components/ingredientes/IngredienteActionButton";

jest.mock("@/features/dashboard/admin/components/ingredientes/IngredientesForm", () => {
    function MockIngredientesForm() { return <div>Formulario de ingrediente</div>; }
    return MockIngredientesForm;
});

describe("IngredienteActionButton", () => {
    it("renderiza el botón", () => {
        render(<IngredienteActionButton />);
        expect(screen.getByRole("button", { name: /nuevo ingrediente/i })).toBeInTheDocument();
    });

    it("no muestra el formulario por defecto", () => {
        render(<IngredienteActionButton />);
        expect(screen.queryByText("Formulario de ingrediente")).not.toBeInTheDocument();
    });

    it("abre el dialog y muestra el form al hacer click", async () => {
        const user = userEvent.setup();
        render(<IngredienteActionButton />);

        await user.click(screen.getByRole("button", { name: /nuevo ingrediente/i }));

        expect(screen.getByRole("dialog")).toBeInTheDocument();
        expect(screen.getByText("Formulario de ingrediente")).toBeInTheDocument();
    });
});