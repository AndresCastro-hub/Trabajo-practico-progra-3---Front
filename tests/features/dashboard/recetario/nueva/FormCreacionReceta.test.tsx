import { render, screen, fireEvent } from "@testing-library/react";
import FormCreacionReceta from "@/features/dashboard/recetario/nueva/FormCreacionReceta";
import useFormCreacionReceta from "@/features/dashboard/recetario/nueva/hooks/useFormCreacionReceta";
jest.mock("@/features/dashboard/recetario/nueva/hooks/useFormCreacionReceta");
jest.mock("next/navigation", () => ({
    useRouter: jest.fn(() => ({ back: jest.fn(), push: jest.fn() })),
}));
jest.mock("next/navigation", () => ({ useRouter: () => ({ back: jest.fn(), push: jest.fn() }) }));
jest.mock("@/features/dashboard/recetario/nueva/components/Form/Nombre", () => ({
    __esModule: true,
    default: ({ value, setValue }: { value: string; setValue: (v: string) => void }) => (
        <input aria-label="Nombre" value={value} onChange={(e) => setValue(e.target.value)} />
    ),
}));
jest.mock("@/features/dashboard/recetario/nueva/components/Form/TiempoDePreparacion", () => ({
    __esModule: true,
    default: ({ value, setValue }: { value: number; setValue: (v: number) => void }) => (
        <input aria-label="Tiempo" type="number" value={value} onChange={(e) => setValue(Number(e.target.value))} />
    ),
}));
jest.mock("@/features/dashboard/recetario/nueva/components/Form/Descripcion", () => ({
    __esModule: true,
    default: ({ value, setValue }: { value: string; setValue: (v: string) => void }) => (
        <textarea aria-label="Descripcion" value={value} onChange={(e) => setValue(e.target.value)} />
    ),
}));
jest.mock("@/features/dashboard/recetario/nueva/components/Ingredientes/IngredientesForm", () => ({
    __esModule: true,
    default: () => <div data-testid="ingredientes-form" />,
}));
jest.mock("@/features/dashboard/recetario/nueva/components/Form/Imagen", () => ({
    __esModule: true,
    default: () => <div data-testid="imagen-form" />,
}));

const mockHandleSubmit = jest.fn();
const mockUseFormCreacionReceta = useFormCreacionReceta as jest.Mock;

const defaultHook = {
    nombre: "",
    tiempoDePreparacion: 0,
    descripcion: "",
    ingredientes: [],
    imagen: null,
    loading: false,
    puedeCrearReceta: jest.fn().mockReturnValue(false),
    setImagen: jest.fn(),
    agregarIngrediente: jest.fn(),
    setDescripcion: jest.fn(),
    setNombre: jest.fn(),
    setTiempoDePreparacion: jest.fn(),
    eliminarIngrediente: jest.fn(),
    actualizarIngrediente: jest.fn(),
    handleSubmit: mockHandleSubmit,
};

describe("FormCreacionReceta", () => {
    beforeEach(() => {
        mockUseFormCreacionReceta.mockReturnValue(defaultHook);
    });

    afterEach(() => jest.clearAllMocks());

    it("renderiza el título y subtítulo", () => {
        render(<FormCreacionReceta />);
        expect(screen.getByText("Nueva receta")).toBeInTheDocument();
        expect(screen.getByText(/Creá una nueva receta/)).toBeInTheDocument();
    });

    it("renderiza los componentes del formulario", () => {
        render(<FormCreacionReceta />);
        expect(screen.getByLabelText("Nombre")).toBeInTheDocument();
        expect(screen.getByLabelText("Tiempo")).toBeInTheDocument();
        expect(screen.getByLabelText("Descripcion")).toBeInTheDocument();
        expect(screen.getByTestId("ingredientes-form")).toBeInTheDocument();
        expect(screen.getByTestId("imagen-form")).toBeInTheDocument();
    });

    it("renderiza los botones de cancelar y crear", () => {
        render(<FormCreacionReceta />);
        expect(screen.getByText("Cancelar")).toBeInTheDocument();
        expect(screen.getByText("Crear receta")).toBeInTheDocument();
    });

    it("el botón crear está deshabilitado si puedeCrearReceta es false", () => {
        render(<FormCreacionReceta />);
        expect(screen.getByText("Crear receta")).toBeDisabled();
    });

    it("el botón crear está habilitado si puedeCrearReceta es true", () => {
        mockUseFormCreacionReceta.mockReturnValue({
            ...defaultHook,
            puedeCrearReceta: jest.fn().mockReturnValue(true),
        });

        render(<FormCreacionReceta />);
        expect(screen.getByText("Crear receta")).not.toBeDisabled();
    });

    it("el botón crear está deshabilitado si loading es true", () => {
        mockUseFormCreacionReceta.mockReturnValue({
            ...defaultHook,
            loading: true,
            puedeCrearReceta: jest.fn().mockReturnValue(true),
        });

        render(<FormCreacionReceta />);
        expect(screen.getByText("Crear receta")).toBeDisabled();
    });

    it("muestra el spinner de carga si loading es true", () => {
        mockUseFormCreacionReceta.mockReturnValue({
            ...defaultHook,
            loading: true,
        });

        render(<FormCreacionReceta />);
        expect(document.querySelector(".animate-spin")).toBeInTheDocument();
    });

    it("no muestra el spinner si loading es false", () => {
        render(<FormCreacionReceta />);
        expect(document.querySelector(".animate-spin")).not.toBeInTheDocument();
    });

    it("llama a handleSubmit al clickear Crear receta", () => {
        mockUseFormCreacionReceta.mockReturnValue({
            ...defaultHook,
            puedeCrearReceta: jest.fn().mockReturnValue(true),
        });

        render(<FormCreacionReceta />);
        fireEvent.click(screen.getByText("Crear receta"));

        expect(mockHandleSubmit).toHaveBeenCalled();
    });
});