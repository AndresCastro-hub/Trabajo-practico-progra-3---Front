import { render, screen, fireEvent } from "@testing-library/react";
import { ConfirmDialog } from "@/components/ConfirmDialog";

const defaultProps = {
    open: true,
    onOpenChange: jest.fn(),
    titulo: "¿Eliminar receta?",
    descripcion: "Esta acción no se puede deshacer.",
    onConfirm: jest.fn(),
};

describe("ConfirmDialog", () => {
    afterEach(() => jest.clearAllMocks());

    it("renderiza el título", () => {
        render(<ConfirmDialog {...defaultProps} />);
        expect(screen.getByText("¿Eliminar receta?")).toBeInTheDocument();
    });

    it("renderiza la descripción", () => {
        render(<ConfirmDialog {...defaultProps} />);
        expect(screen.getByText("Esta acción no se puede deshacer.")).toBeInTheDocument();
    });

    it("renderiza los botones de cancelar y eliminar", () => {
        render(<ConfirmDialog {...defaultProps} />);
        expect(screen.getByText("Cancelar")).toBeInTheDocument();
        expect(screen.getByText("Eliminar")).toBeInTheDocument();
    });

    it("llama a onConfirm al clickear Eliminar", () => {
        const mockOnConfirm = jest.fn();
        render(<ConfirmDialog {...defaultProps} onConfirm={mockOnConfirm} />);

        fireEvent.click(screen.getByText("Eliminar"));

        expect(mockOnConfirm).toHaveBeenCalled();
    });

    it("no renderiza el contenido si open es false", () => {
        render(<ConfirmDialog {...defaultProps} open={false} />);
        expect(screen.queryByText("¿Eliminar receta?")).not.toBeInTheDocument();
    });
});