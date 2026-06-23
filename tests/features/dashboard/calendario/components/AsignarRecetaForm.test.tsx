import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AsignarRecetaForm } from "@/features/dashboard/calendario/components/AsignarRecetaForm";
import { useAsignarReceta } from "@/features/dashboard/calendario/hooks/useAsignarReceta";
import { useCalendarioContext } from "@/features/dashboard/calendario/context/CalendarioContext";

jest.mock("@/features/dashboard/calendario/hooks/useAsignarReceta");
jest.mock("@/features/dashboard/calendario/context/CalendarioContext");

jest.mock("@/features/dashboard/calendario/components/SelectorReceta", () => ({
    SelectorReceta: () => <div data-testid="selector-receta" />,
}));
jest.mock("@/features/dashboard/calendario/components/AsignarRecetaTabs", () => ({
    AsignarRecetaTabs: () => <div data-testid="asignar-receta-tabs" />,
}));

const mockUseAsignarReceta = useAsignarReceta as jest.Mock;
const mockUseCalendarioContext = useCalendarioContext as jest.Mock;
const mockRefrescar = jest.fn();
const mockHandleAsignar = jest.fn();

const baseState = {
    recetas: [], hayMas: false, recetaSeleccionada: null,
    loading: false, error: null, activeTab: "plataforma", busqueda: "",
    handleTabChange: jest.fn(), handleBusqueda: jest.fn(), handleCargarMas: jest.fn(),
    handleAsignar: mockHandleAsignar, setRecetaSeleccionada: jest.fn(), clearFeedback: jest.fn(),
};

beforeEach(() => {
    mockUseCalendarioContext.mockReturnValue({ refrescar: mockRefrescar });
    mockUseAsignarReceta.mockReturnValue(baseState);
});
afterEach(() => jest.clearAllMocks());

describe("AsignarRecetaForm: renderizado", () => {
    it("renderiza pestañas, selector y botón de confirmar", () => {
        render(<AsignarRecetaForm fecha="2026-01-01" tipoComida="Almuerzo" />);
        expect(screen.getByTestId("asignar-receta-tabs")).toBeInTheDocument();
        expect(screen.getByTestId("selector-receta")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /confirmar asignación/i })).toBeInTheDocument();
    });
});

describe("AsignarRecetaForm: estado y texto del botón", () => {
    it("deshabilitado sin receta seleccionada", () => {
        render(<AsignarRecetaForm fecha="2026-01-01" tipoComida="Almuerzo" />);
        expect(screen.getByRole("button", { name: /confirmar asignación/i })).toBeDisabled();
    });

    it("habilitado con receta seleccionada y sin loading", () => {
        mockUseAsignarReceta.mockReturnValue({ ...baseState, recetaSeleccionada: { id: 1, nombre: "Milanesa" } });
        render(<AsignarRecetaForm fecha="2026-01-01" tipoComida="Almuerzo" />);
        expect(screen.getByRole("button", { name: /confirmar asignación/i })).toBeEnabled();
    });

    it("deshabilitado mientras loading es true, incluso con receta seleccionada", () => {
        mockUseAsignarReceta.mockReturnValue({
            ...baseState, recetaSeleccionada: { id: 1, nombre: "Milanesa" }, loading: true,
        });
        render(<AsignarRecetaForm fecha="2026-01-01" tipoComida="Almuerzo" />);
        expect(screen.getByRole("button", { name: /asignando/i })).toBeDisabled();
    });

    it("muestra 'Asignando...' cuando loading es true", () => {
        mockUseAsignarReceta.mockReturnValue({ ...baseState, loading: true });
        render(<AsignarRecetaForm fecha="2026-01-01" tipoComida="Almuerzo" />);
        expect(screen.getByText("Asignando...")).toBeInTheDocument();
    });

    it("muestra 'Confirmar asignación' cuando loading es false", () => {
        render(<AsignarRecetaForm fecha="2026-01-01" tipoComida="Almuerzo" />);
        expect(screen.getByText("Confirmar asignación")).toBeInTheDocument();
    });
});

describe("AsignarRecetaForm: interacciones", () => {
    it("llama a handleAsignar al hacer click", async () => {
        const user = userEvent.setup();
        mockUseAsignarReceta.mockReturnValue({ ...baseState, recetaSeleccionada: { id: 1, nombre: "Milanesa" } });
        render(<AsignarRecetaForm fecha="2026-01-01" tipoComida="Almuerzo" />);

        await user.click(screen.getByRole("button", { name: /confirmar asignación/i }));

        expect(mockHandleAsignar).toHaveBeenCalled();
    });

    it("pasa fecha, el id de tipo de comida y refrescar del contexto al hook", () => {
        render(<AsignarRecetaForm fecha="2026-01-01" tipoComida="Almuerzo" />);
        expect(mockUseAsignarReceta).toHaveBeenCalledWith("2026-01-01", 1, mockRefrescar);
    });
});