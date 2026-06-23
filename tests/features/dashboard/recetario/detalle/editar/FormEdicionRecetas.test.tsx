import { render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"
import FormEdicionReceta from "@/features/dashboard/recetario/detalle/editar/FormEdicionReceta"

const mockBack = jest.fn()
jest.mock("next/navigation", () => ({
    useRouter: () => ({
        back: mockBack,
    }),
    useParams: () => ({ id: "1" }),
}))

const mockUseFormEdicionReceta = jest.fn()
jest.mock("@/features/dashboard/recetario/detalle/editar/hooks/useFormEdicionReceta", () => ({
    __esModule: true,
    default: (id: string) => mockUseFormEdicionReceta(id),
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

const defaultHookReturn = {
    descripcion: "Una ensalada fresca",
    setDescripcion: jest.fn(),
    tiempoDePreparacion: 15,
    setTiempoDePreparacion: jest.fn(),
    agregarIngrediente: jest.fn(),
    eliminarIngrediente: jest.fn(),
    actualizarIngrediente: jest.fn(),
    ingredientes: [],
    handleEdicion: jest.fn(),
    puedeEditar: false,
    loading: false,
}

describe("FormEdicionReceta", () => {
    beforeEach(() => {
        jest.clearAllMocks()
        mockUseFormEdicionReceta.mockReturnValue({ ...defaultHookReturn })
    })

    it("renderiza el título y la descripción de la pantalla", () => {
        render(<FormEdicionReceta />)

        expect(screen.getByText("Editar receta")).toBeInTheDocument()
        expect(screen.getByText("Edita una de tus recetas")).toBeInTheDocument()
    })

    it("renderiza los inputs de descripción y tiempo con los valores del hook", () => {
        render(<FormEdicionReceta />)

        expect(screen.getByTestId("descripcion-input")).toHaveValue("Una ensalada fresca")
        expect(screen.getByTestId("tiempo-input")).toHaveValue(15)
    })

    it("renderiza el formulario de ingredientes", () => {
        render(<FormEdicionReceta />)

        expect(screen.getByTestId("ingredientes-form")).toBeInTheDocument()
    })

    it("muestra el spinner de carga cuando loading es true", () => {
        mockUseFormEdicionReceta.mockReturnValue({ ...defaultHookReturn, loading: true })

        render(<FormEdicionReceta />)

        expect(document.querySelector(".animate-spin")).toBeInTheDocument()
    })

    it("no muestra el spinner de carga cuando loading es false", () => {
        render(<FormEdicionReceta />)

        expect(document.querySelector(".animate-spin")).not.toBeInTheDocument()
    })

    it("el botón 'Editar receta' está deshabilitado cuando puedeEditar es false", () => {
        render(<FormEdicionReceta />)

        expect(screen.getByText("Editar receta")).not.toBeDisabled()
        const submitButton = screen.getAllByRole("button").find((b) => b.textContent === "Editar receta")
        expect(submitButton).toBeDisabled()
    })

    it("el botón 'Editar receta' está habilitado cuando puedeEditar es true", () => {
        mockUseFormEdicionReceta.mockReturnValue({ ...defaultHookReturn, puedeEditar: true })

        render(<FormEdicionReceta />)

        const submitButton = screen.getAllByRole("button").find((b) => b.textContent === "Editar receta")
        expect(submitButton).not.toBeDisabled()
    })

    it("llama a handleEdicion al hacer click en 'Editar receta'", () => {
        mockUseFormEdicionReceta.mockReturnValue({ ...defaultHookReturn, puedeEditar: true })

        render(<FormEdicionReceta />)

        const submitButton = screen.getAllByRole("button").find((b) => b.textContent === "Editar receta")
        fireEvent.click(submitButton as HTMLElement)

        expect(defaultHookReturn.handleEdicion).toHaveBeenCalledTimes(1)
    })

    it("llama a router.back al hacer click en 'Cancelar'", () => {
        render(<FormEdicionReceta />)

        fireEvent.click(screen.getByText("Cancelar"))

        expect(mockBack).toHaveBeenCalledTimes(1)
    })

    it("llama a setDescripcion al escribir en el input de descripción", () => {
        render(<FormEdicionReceta />)

        fireEvent.change(screen.getByTestId("descripcion-input"), {
            target: { value: "Nueva descripción" },
        })

        expect(defaultHookReturn.setDescripcion).toHaveBeenCalledWith("Nueva descripción")
    })

    it("llama a setTiempoDePreparacion al escribir en el input de tiempo", () => {
        render(<FormEdicionReceta />)

        fireEvent.change(screen.getByTestId("tiempo-input"), {
            target: { value: "45" },
        })

        expect(defaultHookReturn.setTiempoDePreparacion).toHaveBeenCalledWith(45)
    })

    it("llama a agregarIngrediente desde el formulario de ingredientes", () => {
        render(<FormEdicionReceta />)

        fireEvent.click(screen.getByText("Agregar ingrediente"))

        expect(defaultHookReturn.agregarIngrediente).toHaveBeenCalledTimes(1)
    })

    it("llama a eliminarIngrediente con el índice correcto", () => {
        render(<FormEdicionReceta />)

        fireEvent.click(screen.getByText("Eliminar ingrediente"))

        expect(defaultHookReturn.eliminarIngrediente).toHaveBeenCalledWith(0)
    })
})