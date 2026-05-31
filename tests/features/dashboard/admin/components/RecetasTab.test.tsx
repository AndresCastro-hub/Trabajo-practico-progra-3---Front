import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event"
import * as useRecetarioModule from "@/features/dashboard/recetario/hooks/useRecetario";
import { useRouter } from "next/navigation";
import { ActiveTab, IReceta } from "@/features/dashboard/recetario/types/recetario.types";
import RecetasTab from "@/features/dashboard/admin/components/recetas/RecetasTab"

jest.mock("next/navigation", () => ({
    useRouter: jest.fn(),
}));

const mockPush = jest.fn();
(useRouter as jest.Mock).mockReturnValue({ push: mockPush });

const mockUseRecetario = {
    recetas: [
        { nombre: "Bowl de salmón", calorias: 420, tiempoPreparacion: 25 },
        { nombre: "Milanesa", calorias: 500, tiempoPreparacion: 30 },
    ] as IReceta[],
    actualPage: 0,
    totalPages: 3,
    total: 30,
    activeTab: "recetas" as ActiveTab,
    loading: false,
    error: null,
    handleTabChange: jest.fn(),
    handlePageChange: jest.fn(),
    handleSearch: jest.fn(),
};

beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    jest.spyOn(useRecetarioModule, "default").mockReturnValue(mockUseRecetario);
});

afterEach(() => jest.clearAllMocks());

describe("RecetasTab - renderizado", () => {
    it("renderiza el buscador", () => {
        render(<RecetasTab />);
        expect(screen.getByPlaceholderText("Buscar por nombre...")).toBeInTheDocument();
    });

    it("renderiza el botón de nueva receta global", () => {
        render(<RecetasTab />);
        expect(screen.getByRole("button", { name: /nueva receta global/i })).toBeInTheDocument();
    });

    it("renderiza las recetas en la tabla", () => {
        render(<RecetasTab />);
        expect(screen.getByText("Bowl de salmón")).toBeInTheDocument();
        expect(screen.getByText("Milanesa")).toBeInTheDocument();
    });

    it("renderiza calorías y tiempo", () => {
        render(<RecetasTab />);
        expect(screen.getByText("420 kcal")).toBeInTheDocument();
        expect(screen.getByText("25 min")).toBeInTheDocument();
    });
});

describe("RecetasTab - paginación condicional", () => {
    it("muestra paginación si hay recetas", () => {
        render(<RecetasTab />);
        expect(screen.getByText("1")).toBeInTheDocument();
    });

    it("no muestra paginación si no hay recetas", () => {
        jest.spyOn(useRecetarioModule, "default")
            .mockReturnValue({ ...mockUseRecetario, recetas: [] });

        render(<RecetasTab />);
        expect(screen.queryByRole("button", { name: /anterior|prev/i })).not.toBeInTheDocument();
    });
});

describe("RecetasTab - interacciones", () => {
    it("navega a /recetario/nueva al hacer click en nueva receta", async () => {
        const user = userEvent.setup();

        render(<RecetasTab />);
        await user.click(screen.getByRole("button", { name: /nueva receta global/i }));

        expect(mockPush).toHaveBeenCalledWith("/recetario/nueva");
    });
});