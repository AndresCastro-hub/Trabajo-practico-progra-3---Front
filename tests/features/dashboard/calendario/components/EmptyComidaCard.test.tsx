import { render, screen } from "@testing-library/react";
import { EmptyComidaCard } from "@/features/dashboard/calendario/components/EmptyComidaCard";
import userEvent from "@testing-library/user-event";

jest.mock("@/features/dashboard/calendario/components/AsignarRecetaForm", () => ({
    AsignarRecetaForm: ({ fecha, tipoComida }: { fecha: string; tipoComida: string }) => (
        <div data-testid="asignar-receta-form">{`${tipoComida}-${fecha}`}</div>
    ),
}));

describe("EmptyComidaCard", () => {
    it("renderiza el botón con el tipo de comida", () => {
        render(<EmptyComidaCard tipoComida="Almuerzo" fecha="2026-01-01" />);
        expect(screen.getByRole("button", { name: /almuerzo/i })).toBeInTheDocument();
    });

    it("no muestra el dialog ni el formulario por defecto", () => {
        render(<EmptyComidaCard tipoComida="Almuerzo" fecha="2026-01-01" />);
        expect(screen.queryByTestId("asignar-receta-form")).not.toBeInTheDocument();
    });

    it("abre el dialog, muestra el título y la info de tipo/fecha, y pasa los props correctos al form", async () => {
        const user = userEvent.setup();
        render(<EmptyComidaCard tipoComida="Almuerzo" fecha="2026-01-01" />);

        await user.click(screen.getByRole("button", { name: /almuerzo/i }));

        expect(screen.getByText("Asignar receta")).toBeInTheDocument();
        expect(screen.getByText(/almuerzo · 2026-01-01/i)).toBeInTheDocument();
        expect(screen.getByTestId("asignar-receta-form")).toHaveTextContent("Almuerzo-2026-01-01");
    });
});