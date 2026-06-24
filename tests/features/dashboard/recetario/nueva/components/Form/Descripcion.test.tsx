import { render, screen, fireEvent } from "@testing-library/react";
import Descripcion from "@/features/dashboard/recetario/nueva/components/Form/Descripcion";

describe("Descripcion", () => {
    it("renderiza el label y el textarea", () => {
        render(<Descripcion value="" setValue={() => {}} />);

        expect(screen.getByLabelText("Descripción")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Breve descripción de la receta...")).toBeInTheDocument();
    });

    it("muestra el valor actual", () => {
        render(<Descripcion value="Rica milanesa" setValue={() => {}} />);

        expect(screen.getByDisplayValue("Rica milanesa")).toBeInTheDocument();
    });

    it("llama a setValue al cambiar el texto", () => {
        const mockSetValue = jest.fn();
        render(<Descripcion value="" setValue={mockSetValue} />);

        fireEvent.change(screen.getByRole("textbox"), { target: { value: "Nueva descripción" } });

        expect(mockSetValue).toHaveBeenCalledWith("Nueva descripción");
    });
});