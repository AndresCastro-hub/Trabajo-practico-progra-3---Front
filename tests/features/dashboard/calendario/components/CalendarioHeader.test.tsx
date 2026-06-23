import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CalendarioHeader } from "@/features/dashboard/calendario/components/CalendarioHeader";
import { useModoControl } from "@/context/ModoControlContext";
import { useCalendarioContext } from "@/features/dashboard/calendario/context/CalendarioContext";
import moment from "moment";

jest.mock("@/context/ModoControlContext");
jest.mock("@/features/dashboard/calendario/context/CalendarioContext");

const mockUseModoControl = useModoControl as jest.Mock;
const mockUseCalendarioContext = useCalendarioContext as jest.Mock;
const mockSetFechaActual = jest.fn();
const mockToggle = jest.fn();
const mockRangoSemanal = jest.fn().mockReturnValue("01 al 7 de enero");

jest.mock("@/features/dashboard/calendario/utils/calendario.utils", () => ({
    rangoSemana: () => mockRangoSemanal(),
}));

beforeEach(() => {
    mockUseModoControl.mockReturnValue({ modoControl: false, onToggleModoControl: mockToggle });
    mockUseCalendarioContext.mockReturnValue({ fechaActual: "2026-01-01", setFechaActual: mockSetFechaActual });
});
afterEach(() => jest.clearAllMocks());

describe("CalendarioHeader: renderizado", () => {
    it("renderiza el titulo de la pantalla con rango semanal", () => {
        render(<CalendarioHeader />);
        expect(screen.getByText("Vista semanal")).toBeInTheDocument();
        expect(screen.getByText(/Semana del/i)).toBeInTheDocument();
    });

    it("renderiza el rango semanal", () => {
        render(<CalendarioHeader />);
        expect(screen.getByText(/01 al 7 de enero/i)).toBeInTheDocument();
    });

    it("muestra OFF cuando modoControl es false", () => {
        render(<CalendarioHeader />);
        expect(screen.getByText(/modo control off/i)).toBeInTheDocument();
    });

    it("muestra ON cuando modoControl es true", () => {
        mockUseModoControl.mockReturnValue({ modoControl: true, onToggleModoControl: mockToggle });
        render(<CalendarioHeader />);
        expect(screen.getByText(/modo control on/i)).toBeInTheDocument();
    });
});

describe("CalendarioHeader: interacciones", () => {
    it("llama a onToggleModoControl al hacer click", async () => {
        const user = userEvent.setup();
        render(<CalendarioHeader />);
        await user.click(screen.getByText(/modo control off/i));
        expect(mockToggle).toHaveBeenCalled();
    });

    it("retrocede 7 días al hacer click en el botón anterior", async () => {
        const user = userEvent.setup();
        render(<CalendarioHeader />);
        // orden: [0] modo control, [1] chevron-left, [2] semana actual, [3] chevron-right
        await user.click(screen.getAllByRole("button")[1]);
        expect(mockSetFechaActual).toHaveBeenCalledWith("2025-12-25");
    });

    it("vuelve a la semana actual", async () => {
        const user = userEvent.setup();
        render(<CalendarioHeader />);
        await user.click(screen.getByRole("button", { name: "Semana Actual" }));
        expect(mockSetFechaActual).toHaveBeenCalledWith(moment().format("YYYY-MM-DD"));
    });

    it("avanza 7 días al hacer click en el botón siguiente", async () => {
        const user = userEvent.setup();
        render(<CalendarioHeader />);
        await user.click(screen.getAllByRole("button")[3]);
        expect(mockSetFechaActual).toHaveBeenCalledWith("2026-01-08");
    });
});