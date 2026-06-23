import { render, screen } from "@testing-library/react";
import { CalendarioProvider, useCalendarioContext } from "@/features/dashboard/calendario/context/CalendarioContext";
import useCalendario from "@/features/dashboard/calendario/hooks/useCalendario";

jest.mock("@/features/dashboard/calendario/hooks/useCalendario");
const mockUseCalendario = useCalendario as jest.Mock;

const mockCalendarioState = {
    fechaActual: "2026-01-01",
    setFechaActual: jest.fn(),
    refrescar: jest.fn(),
    semana: [],
    loading: false,
    error: null,
};

beforeEach(() => mockUseCalendario.mockReturnValue(mockCalendarioState));
afterEach(() => jest.clearAllMocks());

function Children() {
    const context = useCalendarioContext();
    return <span>{context.fechaActual}</span>;
}

describe("CalendarioProvider", () => {
    it("provee el estado de useCalendario a sus hijos", () => {
        render(<CalendarioProvider><Children /></CalendarioProvider>);
        expect(screen.getByText("2026-01-01")).toBeInTheDocument();
    });
});

describe("useCalendarioContext", () => {
    it("lanza un error si se usa fuera del provider", () => {
        const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

        expect(() => render(<Children />)).toThrow(
            "useCalendarioContext debe usarse dentro de un CalendarioProvider"
        );

        consoleSpy.mockRestore();
    });
});