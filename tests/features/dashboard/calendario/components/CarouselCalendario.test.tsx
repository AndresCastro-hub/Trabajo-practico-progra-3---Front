import { render, screen } from "@testing-library/react";
import { CarouselCalendario } from "@/features/dashboard/calendario/components/CarouselCalendario";
import { useCalendarioContext } from "@/features/dashboard/calendario/context/CalendarioContext";
import { useRouter } from "next/navigation";
import moment from "moment";
moment.locale("es");

jest.mock("@/components/ui/carousel", () => {
    function CarouselMock({ children }: { children: React.ReactNode }) {
        return <div>{children}</div>;
    }
    function CarouselContentMock({ children }: { children: React.ReactNode }) {
        return <div>{children}</div>;
    }
    function CarouselItemMock({ children }: { children: React.ReactNode }) {
        return <div>{children}</div>;
    }
    function CarouselPreviousMock() { return <button aria-label="anterior" />; }
    function CarouselNextMock() { return <button aria-label="siguiente" />; }

    return {
        Carousel: CarouselMock,
        CarouselContent: CarouselContentMock,
        CarouselItem: CarouselItemMock,
        CarouselPrevious: CarouselPreviousMock,
        CarouselNext: CarouselNextMock,
    };
});

jest.mock("@/features/dashboard/calendario/context/CalendarioContext", () => ({
    useCalendarioContext: jest.fn(),
}));
jest.mock("next/navigation", () => ({ useRouter: jest.fn() }));

jest.mock("@/components/LoadingSpinner", () => {
    function MockLoadingSpinner() { return <div data-testid="loading-spinner" />; }
    return MockLoadingSpinner;
});

jest.mock("@/components/ErrorState", () => {
    function MockErrorState({ message, onBack }: { message: string; onBack: () => void }) {
        return <div data-testid="error-state"><p>{message}</p><button onClick={onBack}>Volver</button></div>;
    }
    return MockErrorState;
});

jest.mock("@/features/dashboard/calendario/components/ComidasDelDia", () => ({
    ComidasDelDia: ({ comidasDelDia }: { comidasDelDia: { fecha: string } }) => (
        <div data-testid="comidas-del-dia">{comidasDelDia.fecha}</div>
    ),
}));

const mockUseCalendarioContext = useCalendarioContext as jest.Mock;
const mockBack = jest.fn();

const diaConContenido = {
    fecha: "2026-01-01",
    comidas: [{ tipoComida: "Almuerzo", titulo: "Milanesa", descripcion: "", imagen: "", calorias: 0, tiempoPreparacion: 0 }],
};

const semanaVaciaMock = Array.from({ length: 7 }, (_, i) => ({
    fecha: moment("2026-01-01").add(i, "days").format("YYYY-MM-DD"),
    comidas: [
        { tipoComida: "Almuerzo", titulo: "", descripcion: "", imagen: "", calorias: 0, tiempoPreparacion: 0 },
        { tipoComida: "Cena", titulo: "", descripcion: "", imagen: "", calorias: 0, tiempoPreparacion: 0 },
    ],
}));

beforeEach(() => { (useRouter as jest.Mock).mockReturnValue({ back: mockBack }); });
afterEach(() => jest.clearAllMocks());

describe("CarouselCalendario", () => {
    it("muestra el spinner si loading es true y la semana está vacía (todas las comidas sin título)", () => {
        mockUseCalendarioContext.mockReturnValue({ semana: semanaVaciaMock, loading: true, error: null });
        render(<CarouselCalendario />);
        expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
    });

    it("no muestra el spinner si loading es true pero ya hay datos cargados", () => {
        mockUseCalendarioContext.mockReturnValue({ semana: [diaConContenido], loading: true, error: null });
        render(<CarouselCalendario />);
        expect(screen.queryByTestId("loading-spinner")).not.toBeInTheDocument();
    });

    it("muestra el ErrorState si error tiene valor", () => {
        mockUseCalendarioContext.mockReturnValue({ semana: [], loading: false, error: "Error de red" });
        render(<CarouselCalendario />);
        expect(screen.getByTestId("error-state")).toHaveTextContent("Error de red");
    });

    it("llama a router.back al volver desde el ErrorState", async () => {
        mockUseCalendarioContext.mockReturnValue({ semana: [], loading: false, error: "Error de red" });
        render(<CarouselCalendario />);
        screen.getByRole("button", { name: "Volver" }).click();
        expect(mockBack).toHaveBeenCalled();
    });

    it("renderiza un ComidasDelDia por cada día de la semana", () => {
        mockUseCalendarioContext.mockReturnValue({ semana: [diaConContenido], loading: false, error: null });
        render(<CarouselCalendario />);
        expect(screen.getByTestId("comidas-del-dia")).toHaveTextContent("2026-01-01");
    });

    it("renderiza el día abreviado y el número de día en el encabezado", () => {
        mockUseCalendarioContext.mockReturnValue({ semana: [diaConContenido], loading: false, error: null });
        render(<CarouselCalendario />);

        const diaAbreviado = moment(diaConContenido.fecha).format("ddd");
        const numeroDia = moment(diaConContenido.fecha).format("DD");

        expect(screen.getByText(diaAbreviado)).toBeInTheDocument();
        expect(screen.getByText(numeroDia)).toBeInTheDocument();
    });
});