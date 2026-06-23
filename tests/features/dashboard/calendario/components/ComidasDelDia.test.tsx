import { render, screen } from "@testing-library/react";
import { ComidasDelDia } from "@/features/dashboard/calendario/components/ComidasDelDia";

jest.mock("@/features/dashboard/calendario/components/ComidaCard", () => ({
    ComidaCard: ({ receta, fecha }: { receta: { tipoComida: string }; fecha: string }) => (
        <div data-testid="comida-card">{`${receta.tipoComida}-${fecha}`}</div>
    ),
}));

jest.mock("@/features/dashboard/calendario/components/EmptyComidaCard", () => ({
    EmptyComidaCard: ({ tipoComida, fecha }: { tipoComida: string; fecha: string }) => (
        <div data-testid="empty-comida-card">{`${tipoComida}-${fecha}`}</div>
    ),
}));

const diaMixto = {
    fecha: "2026-01-01",
    comidas: [
        { tipoComida: "Almuerzo", titulo: "Milanesa", descripcion: "", imagen: "", calorias: 0, tiempoPreparacion: 0 },
        { tipoComida: "Cena", titulo: "", descripcion: "", imagen: "", calorias: 0, tiempoPreparacion: 0 },
    ],
};

describe("ComidasDelDia", () => {
    it("renderiza ComidaCard para la comida con título", () => {
        render(<ComidasDelDia comidasDelDia={diaMixto} />);
        expect(screen.getByTestId("comida-card")).toHaveTextContent("Almuerzo-2026-01-01");
    });

    it("renderiza EmptyComidaCard para la comida sin título", () => {
        render(<ComidasDelDia comidasDelDia={diaMixto} />);
        expect(screen.getByTestId("empty-comida-card")).toHaveTextContent("Cena-2026-01-01");
    });

    it("renderiza un EmptyComidaCard por cada comida si ninguna tiene título", () => {
        const diaVacio = {
            fecha: "2026-01-02",
            comidas: [
                { tipoComida: "Almuerzo", titulo: "", descripcion: "", imagen: "", calorias: 0, tiempoPreparacion: 0 },
                { tipoComida: "Cena", titulo: "", descripcion: "", imagen: "", calorias: 0, tiempoPreparacion: 0 },
            ],
        };
        render(<ComidasDelDia comidasDelDia={diaVacio} />);
        expect(screen.getAllByTestId("empty-comida-card")).toHaveLength(2);
    });
});