import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SelectorReceta } from "@/features/dashboard/calendario/components/SelectorReceta";
import { IReceta } from "@/features/dashboard/recetario/types/recetario.types";

const mockRecetas: IReceta[] = [
    { id: 1, nombre: "Milanesa", calorias: 500, descripcion: "", idUsuario: 1, imagen_url: "", tiempoPreparacion: 30 },
    { id: 2, nombre: "Ensalada", calorias: 200, descripcion: "", idUsuario: 1, imagen_url: "", tiempoPreparacion: 10 },
];

function renderSelector(overrides = {}) {
    const props = {
        recetas: mockRecetas,
        seleccion: { actual: null, set: jest.fn() },
        busqueda: { texto: "", onSearch: jest.fn() },
        paginacion: { hayMas: false, loading: false, onCargarMas: jest.fn() },
        clearFeedback: jest.fn(),
        ...overrides,
    };
    return render(<SelectorReceta {...props} />);
}

describe("SelectorReceta: cerrado", () => {
    it("muestra el placeholder si no hay receta seleccionada", () => {
        renderSelector();
        expect(screen.getByText("Seleccionar receta")).toBeInTheDocument();
    });

    it("muestra el nombre de la receta seleccionada", () => {
        renderSelector({ seleccion: { actual: mockRecetas[0], set: jest.fn() } });
        expect(screen.getByText("Milanesa")).toBeInTheDocument();
    });

    it("no muestra la lista hasta abrir", () => {
        renderSelector();
        expect(screen.queryByText("Ensalada")).not.toBeInTheDocument();
    });
});

describe("SelectorReceta: abierto", () => {
    it("muestra la lista al hacer click", async () => {
        const user = userEvent.setup();
        renderSelector();
        await user.click(screen.getByText("Seleccionar receta"));
        expect(screen.getByText("Milanesa")).toBeInTheDocument();
        expect(screen.getByText("Ensalada")).toBeInTheDocument();
    });

    it("llama a clearFeedback al abrir", async () => {
        const user = userEvent.setup();
        const clearFeedback = jest.fn();
        renderSelector({ clearFeedback });
        await user.click(screen.getByText("Seleccionar receta"));
        expect(clearFeedback).toHaveBeenCalled();
    });

    it("muestra 'Cargando...' si loading es true y no hay recetas", async () => {
        const user = userEvent.setup();
        renderSelector({ recetas: [], paginacion: { hayMas: false, loading: true, onCargarMas: jest.fn() } });
        await user.click(screen.getByText("Seleccionar receta"));
        expect(screen.getByText("Cargando...")).toBeInTheDocument();
    });

    it("muestra 'Sin resultados' si no hay recetas y no está cargando", async () => {
        const user = userEvent.setup();
        renderSelector({ recetas: [] });
        await user.click(screen.getByText("Seleccionar receta"));
        expect(screen.getByText("Sin resultados")).toBeInTheDocument();
    });

    it("muestra 'Cargar mas...' solo si hayMas es true", async () => {
        const user = userEvent.setup();
        renderSelector({ paginacion: { hayMas: true, loading: false, onCargarMas: jest.fn() } });
        await user.click(screen.getByText("Seleccionar receta"));
        expect(screen.getByText("Cargar mas...")).toBeInTheDocument();
    });

    it("no muestra 'Cargar mas...' si hayMas es false", async () => {
        const user = userEvent.setup();
        renderSelector();
        await user.click(screen.getByText("Seleccionar receta"));
        expect(screen.queryByText("Cargar mas...")).not.toBeInTheDocument();
    });
});

describe("SelectorReceta: interacciones", () => {
    it("selecciona una receta y actualiza la búsqueda con su nombre", async () => {
        const user = userEvent.setup();
        const set = jest.fn();
        const onSearch = jest.fn();
        renderSelector({ seleccion: { actual: null, set }, busqueda: { texto: "", onSearch } });

        await user.click(screen.getByText("Seleccionar receta"));
        await user.click(screen.getByText("Milanesa"));

        expect(set).toHaveBeenCalledWith(mockRecetas[0]);
        expect(onSearch).toHaveBeenCalledWith("Milanesa");
    });

    it("cierra el dropdown al seleccionar", async () => {
        const user = userEvent.setup();
        renderSelector();
        await user.click(screen.getByText("Seleccionar receta"));
        await user.click(screen.getByText("Milanesa"));
        expect(screen.queryByText("Ensalada")).not.toBeInTheDocument();
    });

    it("llama a onSearch al presionar Enter", async () => {
        const user = userEvent.setup();
        const onSearch = jest.fn();
        renderSelector({ busqueda: { texto: "", onSearch } });
        await user.click(screen.getByText("Seleccionar receta"));
        await user.type(screen.getByPlaceholderText("Buscar receta..."), "Mila{enter}");
        expect(onSearch).toHaveBeenCalledWith("Mila");
    });

    it("llama a onCargarMas al hacer click en 'Cargar mas...'", async () => {
        const user = userEvent.setup();
        const onCargarMas = jest.fn();
        renderSelector({ paginacion: { hayMas: true, loading: false, onCargarMas } });
        await user.click(screen.getByText("Seleccionar receta"));
        await user.click(screen.getByText("Cargar mas..."));
        expect(onCargarMas).toHaveBeenCalled();
    });
});