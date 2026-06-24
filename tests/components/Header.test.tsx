import { render, screen } from "@testing-library/react";
import Header from "@/components/Header";

describe("Header", () => {
    it("renderiza el título", () => {
        render(<Header title="Recetario" />);
        expect(screen.getByText("Recetario")).toBeInTheDocument();
    });

    it("renderiza el subtítulo si se pasa", () => {
        render(<Header title="Recetario" subtitle="Tus recetas favoritas" />);
        expect(screen.getByText("Tus recetas favoritas")).toBeInTheDocument();
    });

    it("no renderiza el subtítulo si no se pasa", () => {
        render(<Header title="Recetario" />);
        expect(screen.queryByText("Tus recetas favoritas")).not.toBeInTheDocument();
    });

    it("no renderiza botones si no se pasan", () => {
        render(<Header title="Recetario" />);
        expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });

    it("renderiza los botones si se pasan", () => {
        const buttons = [
            { label: "Nuevo", onClick: jest.fn() },
            { label: "Exportar", onClick: jest.fn() },
        ];
        render(<Header title="Recetario" buttons={buttons} />);
        expect(screen.getByText("Nuevo")).toBeInTheDocument();
        expect(screen.getByText("Exportar")).toBeInTheDocument();
    });
});