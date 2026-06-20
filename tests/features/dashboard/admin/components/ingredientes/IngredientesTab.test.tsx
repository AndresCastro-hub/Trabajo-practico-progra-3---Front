import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as useIngredientsSearchModule from "@/features/dashboard/admin/hooks/useIngredientsSearch";
import IngredientesTab from "@/features/dashboard/admin/components/ingredientes/IngredientesTab";

jest.mock("@/features/dashboard/admin/components/ingredientes/IngredienteActionButton", () => {
    function MockIngredienteActionButton() { return <button>+ Nuevo Ingrediente</button>; }
    return MockIngredienteActionButton;
});

jest.mock("@/components/Pagination", () => {
    function MockPagination({ current, onPageChange }: { current: number; onPageChange: (p: number) => void }) {
        return (
            <div data-testid="pagination">
                <span>Página {current}</span>
                <button onClick={() => onPageChange(current + 1)}>Siguiente</button>
            </div>
        );
    }
    return MockPagination;
});

const mockUseIngredientsSearch = {
    ingredientes: [
        { id: 1, nombre: "Tomate", unidad: "u" },
        { id: 2, nombre: "Leche", unidad: "ml" },
    ],
    totalPages: 1,
    actualPage: 1,
    loading: false,
    error: null,
    total: 2,
    handleSearch: jest.fn(),
    handlePageChange: jest.fn(),
};

beforeEach(() => {
    jest.spyOn(useIngredientsSearchModule, "useIngredientsSearch")
        .mockReturnValue(mockUseIngredientsSearch);
});

afterEach(() => jest.clearAllMocks());

describe("IngredientesTab: renderizado", () => {
    it("renderiza el buscador", () => {
        render(<IngredientesTab />);
        expect(screen.getByPlaceholderText("Buscar por nombre...")).toBeInTheDocument();
    });

    it("renderiza el botón de nuevo ingrediente", () => {
        render(<IngredientesTab />);
        expect(screen.getByRole("button", { name: /nuevo ingrediente/i })).toBeInTheDocument();
    });

    it("renderiza los ingredientes y sus unidades", () => {
        render(<IngredientesTab />);
        expect(screen.getByText("Tomate")).toBeInTheDocument();
        expect(screen.getByText("u")).toBeInTheDocument();
        expect(screen.getByText("Leche")).toBeInTheDocument();
        expect(screen.getByText("ml")).toBeInTheDocument();
    });
});

describe("IngredientesTab: estados condicionales", () => {
    it("muestra paginación si hay ingredientes y no está cargando", () => {
        render(<IngredientesTab />);
        expect(screen.getByTestId("pagination")).toBeInTheDocument();
    });

    it("no muestra paginación si está cargando", () => {
        jest.spyOn(useIngredientsSearchModule, "useIngredientsSearch")
            .mockReturnValue({ ...mockUseIngredientsSearch, loading: true });

        render(<IngredientesTab />);
        expect(screen.queryByTestId("pagination")).not.toBeInTheDocument();
    });

    it("no muestra paginación si no hay ingredientes", () => {
        jest.spyOn(useIngredientsSearchModule, "useIngredientsSearch")
            .mockReturnValue({ ...mockUseIngredientsSearch, ingredientes: [] });

        render(<IngredientesTab />);
        expect(screen.queryByTestId("pagination")).not.toBeInTheDocument();
    });
});

describe("IngredientesTab: interacciones", () => {
    it("llama a handleSearch al buscar", async () => {
        const user = userEvent.setup();
        render(<IngredientesTab />);

        await user.type(screen.getByPlaceholderText("Buscar por nombre..."), "Tomate{enter}");

        expect(mockUseIngredientsSearch.handleSearch).toHaveBeenCalledWith("Tomate");
    });

    it("llama a handlePageChange al cambiar de página", async () => {
        const user = userEvent.setup();
        render(<IngredientesTab />);

        await user.click(screen.getByRole("button", { name: "Siguiente" }));

        expect(mockUseIngredientsSearch.handlePageChange).toHaveBeenCalledWith(2);
    });
});