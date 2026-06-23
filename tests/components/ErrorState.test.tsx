import { render, screen, fireEvent } from "@testing-library/react";
import ErrorState from "@/components/ErrorState";

describe("ErrorState", () => {
    it("renderiza el título y el mensaje", () => {
        render(<ErrorState message="No se encontró la receta" />);
        expect(screen.getByText("Algo salió mal")).toBeInTheDocument();
        expect(screen.getByText("No se encontró la receta")).toBeInTheDocument();
    });

    it("no muestra el botón volver si no se pasa onBack", () => {
        render(<ErrorState message="Error" />);
        expect(screen.queryByText("Volver")).not.toBeInTheDocument();
    });

    it("muestra el botón volver si se pasa onBack", () => {
        render(<ErrorState message="Error" onBack={() => {}} />);
        expect(screen.getByText("Volver")).toBeInTheDocument();
    });

    it("llama a onBack al clickear el botón volver", () => {
        const mockOnBack = jest.fn();
        render(<ErrorState message="Error" onBack={mockOnBack} />);

        fireEvent.click(screen.getByText("Volver"));

        expect(mockOnBack).toHaveBeenCalled();
    });
});