import { render, screen, fireEvent } from "@testing-library/react";
import { SelectorIngrediente } from "@/features/dashboard/recetario/nueva/components/Ingredientes/SelectorIngrediente";
import { useIngredientes } from "@/features/dashboard/recetario/nueva/hooks/useIngredientes";

jest.mock("@/features/dashboard/recetario/nueva/hooks/useIngredientes");
const mockUseIngredientes = useIngredientes as jest.Mock;

const ingredientesMock = [
    { id: 1, nombre: "Carne", unidad: "g" },
    { id: 2, nombre: "Sal", unidad: "g" },
    { id: 3, nombre: "Aceite", unidad: "ml" },
];

describe("SelectorIngrediente", () => {
    beforeEach(() => {
        mockUseIngredientes.mockReturnValue({ ingredientes: ingredientesMock, loading: false });
    });

    afterEach(() => jest.clearAllMocks());

    it("muestra 'Seleccionar ingrediente' si no hay valor", () => {
        render(<SelectorIngrediente value={null} onChange={() => {}} ingredientesUsados={[]} />);

        expect(screen.getByText("Seleccionar ingrediente")).toBeInTheDocument();
    });

    it("muestra el nombre del ingrediente seleccionado", () => {
        render(<SelectorIngrediente value={ingredientesMock[0]} onChange={() => {}} ingredientesUsados={[]} />);

        expect(screen.getByText("Carne")).toBeInTheDocument();
    });

    it("abre el dropdown al clickear el botón", () => {
        render(<SelectorIngrediente value={null} onChange={() => {}} ingredientesUsados={[]} />);

        fireEvent.click(screen.getByRole("button"));

        expect(screen.getByPlaceholderText("Buscar ingrediente...")).toBeInTheDocument();
    });

    it("muestra los ingredientes disponibles al abrir", () => {
        render(<SelectorIngrediente value={null} onChange={() => {}} ingredientesUsados={[]} />);

        fireEvent.click(screen.getByRole("button"));

        expect(screen.getByText("Sal")).toBeInTheDocument();
        expect(screen.getByText("Aceite")).toBeInTheDocument();
    });

    it("no muestra los ingredientes ya usados", () => {
        render(<SelectorIngrediente value={null} onChange={() => {}} ingredientesUsados={[1]} />);

        fireEvent.click(screen.getByRole("button"));

        expect(screen.queryByText("Carne")).not.toBeInTheDocument();
        expect(screen.getByText("Sal")).toBeInTheDocument();
    });

    it("filtra ingredientes por búsqueda", () => {
        render(<SelectorIngrediente value={null} onChange={() => {}} ingredientesUsados={[]} />);

        fireEvent.click(screen.getByRole("button"));
        fireEvent.change(screen.getByPlaceholderText("Buscar ingrediente..."), { target: { value: "sal" } });

        expect(screen.getByText("Sal")).toBeInTheDocument();
        expect(screen.queryByText("Carne")).not.toBeInTheDocument();
    });

    it("llama a onChange al seleccionar un ingrediente", () => {
        const mockOnChange = jest.fn();
        render(<SelectorIngrediente value={null} onChange={mockOnChange} ingredientesUsados={[]} />);

        fireEvent.click(screen.getByRole("button"));
        fireEvent.click(screen.getByText("Sal"));

        expect(mockOnChange).toHaveBeenCalledWith({ id: 2, nombre: "Sal", unidad: "g" });
    });

    it("cierra el dropdown al seleccionar un ingrediente", () => {
        render(<SelectorIngrediente value={null} onChange={() => {}} ingredientesUsados={[]} />);

        fireEvent.click(screen.getByRole("button"));
        fireEvent.click(screen.getByText("Sal"));

        expect(screen.queryByPlaceholderText("Buscar ingrediente...")).not.toBeInTheDocument();
    });

    it("muestra 'Cargando...' si loading es true", () => {
        mockUseIngredientes.mockReturnValue({ ingredientes: [], loading: true });

        render(<SelectorIngrediente value={null} onChange={() => {}} ingredientesUsados={[]} />);

        fireEvent.click(screen.getByRole("button"));

        expect(screen.getByText("Cargando...")).toBeInTheDocument();
    });

    it("muestra 'Sin resultados' si no hay ingredientes filtrados", () => {
        render(<SelectorIngrediente value={null} onChange={() => {}} ingredientesUsados={[]} />);

        fireEvent.click(screen.getByRole("button"));
        fireEvent.change(screen.getByPlaceholderText("Buscar ingrediente..."), { target: { value: "xyz" } });

        expect(screen.getByText("Sin resultados")).toBeInTheDocument();
    });
});