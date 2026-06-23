import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { EditarRecetaForm } from "@/features/dashboard/calendario/components/EditarRecetaForm";
import { useEditarReceta } from "@/features/dashboard/calendario/hooks/useEditarReceta";
import { useCalendarioContext } from "@/features/dashboard/calendario/context/CalendarioContext";

jest.mock("@/features/dashboard/calendario/hooks/useEditarReceta");
jest.mock("@/features/dashboard/calendario/context/CalendarioContext");

jest.mock("@/features/dashboard/calendario/components/SelectorReceta", () => ({
    SelectorReceta: () => <div data-testid="selector-receta" />,
}));

jest.mock("@/features/dashboard/calendario/components/AsignarRecetaTabs", () => ({
    AsignarRecetaTabs: () => <div data-testid="asignar-receta-tabs" />,
}));

const mockUseEditarReceta = useEditarReceta as jest.Mock;
const mockUseCalendarioContext = useCalendarioContext as jest.Mock;
const mockRefrescar = jest.fn();
const mockHandleEditar = jest.fn();

const baseState = {
    recetas: [], hayMas: false, recetaSeleccionada: null,
    loading: false, error: null, activeTab: "plataforma", busqueda: "", clearFeedback: jest.fn(),
    handleTabChange: jest.fn(), handleBusqueda: jest.fn(), handleCargarMas: jest.fn(),
    handleEditar: mockHandleEditar, setRecetaSeleccionada: jest.fn(),
};

beforeEach(() => {
    mockUseCalendarioContext.mockReturnValue({ refrescar: mockRefrescar });
    mockUseEditarReceta.mockReturnValue(baseState);
});
afterEach(() => jest.clearAllMocks());

describe("EditarRecetaForm: renderizado", () => {
    it("renderiza pestañas, selector y botón de confirmar", () => {
        render(<EditarRecetaForm fecha="2026-01-01" tipoComida="Almuerzo" />);
        expect(screen.getByTestId("asignar-receta-tabs")).toBeInTheDocument();
        expect(screen.getByTestId("selector-receta")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /confirmar cambio/i })).toBeInTheDocument();
    });
});

describe("EditarRecetaForm: estado y texto del botón", () => {
    it("deshabilitado sin receta seleccionada", () => {
        render(<EditarRecetaForm fecha="2026-01-01" tipoComida="Almuerzo" />);
        expect(screen.getByRole("button", { name: /confirmar cambio/i })).toBeDisabled();
    });

    it("habilitado con receta seleccionada y sin loading", () => {
        mockUseEditarReceta.mockReturnValue({ ...baseState, recetaSeleccionada: { id: 1, nombre: "Milanesa" } });
        render(<EditarRecetaForm fecha="2026-01-01" tipoComida="Almuerzo" />);
        expect(screen.getByRole("button", { name: /confirmar cambio/i })).toBeEnabled();
    });

    it("muestra 'Guardando...' cuando loading es true", () => {
        mockUseEditarReceta.mockReturnValue({ ...baseState, loading: true });
        render(<EditarRecetaForm fecha="2026-01-01" tipoComida="Almuerzo" />);
        expect(screen.getByText("Guardando...")).toBeInTheDocument();
    });

    it("muestra 'Confirmar cambio' cuando loading es false", () => {
        render(<EditarRecetaForm fecha="2026-01-01" tipoComida="Almuerzo" />);
        expect(screen.getByText("Confirmar cambio")).toBeInTheDocument();
    });
});

describe("EditarRecetaForm: interacciones", () => {
    it("llama a handleEditar al hacer click", async () => {
        const user = userEvent.setup();
        mockUseEditarReceta.mockReturnValue({ ...baseState, recetaSeleccionada: { id: 1, nombre: "Milanesa" } });
        render(<EditarRecetaForm fecha="2026-01-01" tipoComida="Almuerzo" />);

        await user.click(screen.getByRole("button", { name: /confirmar cambio/i }));

        expect(mockHandleEditar).toHaveBeenCalled();
    });

    it("pasa fecha, el id de tipo de comida y refrescar del contexto al hook", () => {
        render(<EditarRecetaForm fecha="2026-01-01" tipoComida="Almuerzo" />);
        expect(mockUseEditarReceta).toHaveBeenCalledWith("2026-01-01", 1, mockRefrescar);
    });
});