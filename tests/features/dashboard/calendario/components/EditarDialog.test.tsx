import { render, screen } from "@testing-library/react";
import { EditarDialog } from "@/features/dashboard/calendario/components/EditarDialog";

jest.mock("@/features/dashboard/calendario/components/EditarRecetaForm", () => ({
    EditarRecetaForm: ({ fecha, tipoComida }: { fecha: string; tipoComida: string }) => (
        <div data-testid="editar-receta-form">{`${tipoComida}-${fecha}`}</div>
    ),
}));

describe("EditarDialog", () => {
    it("no renderiza el contenido si open es false", () => {
        render(<EditarDialog open={false} onOpenChange={jest.fn()} fecha="2026-01-01" tipoComida="Almuerzo" />);
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("renderiza el título y la info de tipo/fecha si open es true", () => {
        render(<EditarDialog open={true} onOpenChange={jest.fn()} fecha="2026-01-01" tipoComida="Almuerzo" />);
        expect(screen.getByRole("dialog")).toBeInTheDocument();
        expect(screen.getByText("Editar receta asignada")).toBeInTheDocument();
        expect(screen.getByText(/almuerzo · 2026-01-01/i)).toBeInTheDocument();
    });

    it("pasa fecha y tipoComida correctos al formulario", () => {
        render(<EditarDialog open={true} onOpenChange={jest.fn()} fecha="2026-01-01" tipoComida="Almuerzo" />);
        expect(screen.getByTestId("editar-receta-form")).toHaveTextContent("Almuerzo-2026-01-01");
    });
});