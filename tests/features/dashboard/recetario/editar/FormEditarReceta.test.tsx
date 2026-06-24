import { render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"
import FormEditarReceta from "@/features/dashboard/recetario/editar/FormEditarReceta"

const mockBack = jest.fn()
jest.mock("next/navigation", () => ({
    useRouter: () => ({
        back: mockBack,
    }),
    useParams: () => ({ id: "1" }),
}))

const mockUseFormEditarReceta = jest.fn()
jest.mock("@/features/dashboard/recetario/editar/hooks/useFormEditarReceta", () => ({
    __esModule: true,
    default: (id: string) => mockUseFormEditarReceta(id),
}))

jest.mock("@/components/LoadingSpinner", () => ({
    __esModule: true,
    default: () => <div data-testid="loading-spinner">Cargando...</div>,
}))

jest.mock("@/features/dashboard/recetario/nueva/components/Form/Nombre", () => ({
    __esModule: true,
    default: ({ value, isDisabled }: { value: string; isDisabled: boolean }) => (
        <input data-testid="nombre-input" value={value} disabled={isDisabled} readOnly />
    ),
}))

jest.mock("@/features/dashboard/recetario/nueva/components/Form/TiempoDePreparacion", () => ({
    __esModule: true,
    default: ({ value, setValue }: { value: number; setValue: (v: number) => void }) => (
        <input
            data-testid="tiempo-input"
            type="number"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
        />
    ),
}))

jest.mock("@/features/dashboard/recetario/nueva/components/Form/Descripcion", () => ({
    __esModule: true,
    default: ({ value, setValue }: { value: string; setValue: (v: string) => void }) => (
        <input
            data-testid="descripcion-input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    ),
}))

jest.mock("@/features/dashboard/recetario/nueva/components/Ingredientes/IngredientesForm", () => ({
    __esModule: true,
    default: ({
        agregarIngrediente,
        eliminarIngrediente,
    }: {
        agregarIngrediente: () => void
        eliminarIngrediente: (index: number) => void
    }) => (
        <div data-testid="ingredientes-form">
            <button onClick={agregarIngrediente}>Agregar ingrediente</button>
            <button onClick={() => eliminarIngrediente(0)}>Eliminar ingrediente</button>
        </div>
    ),
}))

jest.mock("@/features/dashboard/recetario/editar/components/form/Imagen", () => ({
    __esModule: true,
    default: ({ value }: { value: string }) => <div data-testid="imagen">{value}</div>,
}))

const defaultHookReturn = {
    nombre: "Ensalada César",
    tiempoPreparacion: 15,
    descripcion: "Una ensalada fresca",
    ingredientes: [],
    imagen_url: "/images/receta.jpg",
    loading: false,
    puedeEditarReceta: jest.fn(() => true),
    agregarIngrediente: jest.fn(),
    setDescripcion: jest.fn(),
    setTiempoDePreparacion: jest.fn(),
    eliminarIngrediente: jest.fn(),
    actualizarIngrediente: jest.fn(),
    handleSubmit: jest.fn(),
}

describe("FormEditarReceta", () => {
    beforeEach(() => {
        jest.clearAllMocks()
        mockUseFormEditarReceta.mockReturnValue({
            ...defaultHookReturn,
            puedeEditarReceta: jest.fn(() => true),
        })
    })

    it("renderiza el título y la descripción de la pantalla", () => {
        render(<FormEditarReceta />)

        expect(screen.getByText("Editar receta")).toBeInTheDocument()
        expect(screen.getByText("Modificá los detalles de tu receta.")).toBeInTheDocument()
    })

    it("renderiza el nombre deshabilitado y los valores del formulario", () => {
        render(<FormEditarReceta />)

        const nombreInput = screen.getByTestId("nombre-input")
        expect(nombreInput).toHaveValue("Ensalada César")
        expect(nombreInput).toBeDisabled()
        expect(screen.getByTestId("tiempo-input")).toHaveValue(15)
        expect(screen.getByTestId("descripcion-input")).toHaveValue("Una ensalada fresca")
    })

    it("renderiza el formulario de ingredientes", () => {
        render(<FormEditarReceta />)

        expect(screen.getByTestId("ingredientes-form")).toBeInTheDocument()
    })

    it("renderiza la imagen cuando imagen_url está presente", () => {
        render(<FormEditarReceta />)

        expect(screen.getByTestId("imagen")).toHaveTextContent("/images/receta.jpg")
    })

    it("no renderiza la imagen cuando imagen_url está vacía", () => {
        mockUseFormEditarReceta.mockReturnValue({
            ...defaultHookReturn,
            imagen_url: "",
            puedeEditarReceta: jest.fn(() => true),
        })

        render(<FormEditarReceta />)

        expect(screen.queryByTestId("imagen")).not.toBeInTheDocument()
    })

    it("muestra el LoadingSpinner cuando loading es true", () => {
        mockUseFormEditarReceta.mockReturnValue({
            ...defaultHookReturn,
            loading: true,
            puedeEditarReceta: jest.fn(() => true),
        })

        render(<FormEditarReceta />)

        expect(screen.getByTestId("loading-spinner")).toBeInTheDocument()
    })

    it("no muestra el LoadingSpinner cuando loading es false", () => {
        render(<FormEditarReceta />)

        expect(screen.queryByTestId("loading-spinner")).not.toBeInTheDocument()
    })

    it("deshabilita 'Guardar cambios' cuando puedeEditarReceta() devuelve false", () => {
        mockUseFormEditarReceta.mockReturnValue({
            ...defaultHookReturn,
            puedeEditarReceta: jest.fn(() => false),
        })

        render(<FormEditarReceta />)

        const submitButton = screen
            .getAllByRole("button")
            .find((b) => b.textContent === "Guardar cambios")
        expect(submitButton).toBeDisabled()
    })

    it("deshabilita 'Guardar cambios' cuando loading es true, incluso si puedeEditarReceta() es true", () => {
        mockUseFormEditarReceta.mockReturnValue({
            ...defaultHookReturn,
            loading: true,
            puedeEditarReceta: jest.fn(() => true),
        })

        render(<FormEditarReceta />)

        const submitButton = screen
            .getAllByRole("button")
            .find((b) => b.textContent === "Guardar cambios")
        expect(submitButton).toBeDisabled()
    })

    it("habilita 'Guardar cambios' cuando puedeEditarReceta() es true y loading es false", () => {
        render(<FormEditarReceta />)

        const submitButton = screen
            .getAllByRole("button")
            .find((b) => b.textContent === "Guardar cambios")
        expect(submitButton).not.toBeDisabled()
    })

    it("llama a handleSubmit al hacer click en 'Guardar cambios'", () => {
        render(<FormEditarReceta />)

        const submitButton = screen
            .getAllByRole("button")
            .find((b) => b.textContent === "Guardar cambios")
        fireEvent.click(submitButton as HTMLElement)

        expect(defaultHookReturn.handleSubmit).toHaveBeenCalledTimes(1)
    })

    it("llama a router.back al hacer click en 'Cancelar'", () => {
        render(<FormEditarReceta />)

        fireEvent.click(screen.getByText("Cancelar"))

        expect(mockBack).toHaveBeenCalledTimes(1)
    })

    it("llama a setDescripcion y setTiempoDePreparacion al editar los inputs", () => {
        render(<FormEditarReceta />)

        fireEvent.change(screen.getByTestId("descripcion-input"), {
            target: { value: "Nueva descripción" },
        })
        fireEvent.change(screen.getByTestId("tiempo-input"), { target: { value: "40" } })

        expect(defaultHookReturn.setDescripcion).toHaveBeenCalledWith("Nueva descripción")
        expect(defaultHookReturn.setTiempoDePreparacion).toHaveBeenCalledWith(40)
    })

    it("llama a agregarIngrediente y eliminarIngrediente desde el formulario de ingredientes", () => {
        render(<FormEditarReceta />)

        fireEvent.click(screen.getByText("Agregar ingrediente"))
        fireEvent.click(screen.getByText("Eliminar ingrediente"))

        expect(defaultHookReturn.agregarIngrediente).toHaveBeenCalledTimes(1)
        expect(defaultHookReturn.eliminarIngrediente).toHaveBeenCalledWith(0)
    })
})