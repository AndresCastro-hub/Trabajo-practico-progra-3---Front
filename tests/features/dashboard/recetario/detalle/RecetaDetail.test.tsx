import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom"
import RecetaDetail from "@/features/dashboard/recetario/detalle/RecetaDetail"
import { eliminarReceta } from "@/features/dashboard/recetario/detalle/service/eliminarReceta"

const mockPush = jest.fn()
const mockBack = jest.fn()
jest.mock("next/navigation", () => ({
    useRouter: () => ({
        push: mockPush,
        back: mockBack,
    }),
    useParams: () => ({ id: "1" }),
}))

jest.mock("next/image", () => ({
    __esModule: true,
    default: (props: any) => {
        return <img {...props} alt={props.alt} />
    },
}))

const mockUseRecetaDetail = jest.fn()
jest.mock("@/features/dashboard/recetario/detalle/hooks/useRecetaDetail", () => ({
    __esModule: true,
    default: (id: string) => mockUseRecetaDetail(id),
}))

jest.mock("@/features/dashboard/recetario/detalle/components/RecetaActions", () => ({
    __esModule: true,
    default: ({ onEditar, onEliminar }: { onEditar: () => void; onEliminar: () => void }) => (
        <div data-testid="receta-actions">
            <button onClick={onEditar}>Editar</button>
            <button onClick={onEliminar}>Eliminar</button>
        </div>
    ),
}))

jest.mock("@/features/dashboard/recetario/detalle/components/RecetaIngredients", () => ({
    __esModule: true,
    default: ({ ingredientes }: { ingredientes: any }) => (
        <div data-testid="receta-ingredients">{JSON.stringify(ingredientes)}</div>
    ),
}))

jest.mock("@/components/ErrorState", () => ({
    __esModule: true,
    default: ({ message, onBack }: { message: string; onBack: () => void }) => (
        <div data-testid="error-state">
            <p>{message}</p>
            <button onClick={onBack}>Volver</button>
        </div>
    ),
}))

jest.mock("@/components/LoadingSpinner", () => ({
    __esModule: true,
    default: () => <div data-testid="loading-spinner">Cargando...</div>,
}))

jest.mock("@/features/dashboard/recetario/detalle/service/eliminarReceta", () => ({
    eliminarReceta: jest.fn(),
}))

const mockMostrarNotificacion = jest.fn()
jest.mock("@/context/NotificacionContext", () => ({
    useNotificacion: () => ({
        mostrarNotificacion: mockMostrarNotificacion,
    }),
    TipoNotificacion: {
        SUCCESS: "success",
        ERROR: "error",
    },
}))

jest.mock("@/components/ConfirmDialog", () => ({
    ConfirmDialog: ({
        open,
        titulo,
        descripcion,
        onConfirm,
    }: {
        open: boolean
        titulo: string
        descripcion: string
        onConfirm: () => void
    }) =>
        open ? (
            <div data-testid="confirm-dialog">
                <p>{titulo}</p>
                <p>{descripcion}</p>
                <button onClick={onConfirm}>Confirmar</button>
            </div>
        ) : null,
}))

const recetaMock = {
    id: 1,
    idUsuario: 2,
    nombre: "Ensalada César",
    descripcion: "Una ensalada fresca y saludable",
    imagen_url: "/images/ensalada.jpg",
    calorias: 350,
    tiempoPreparacion: 15,
    ingredientes: [
        { id: 1, cantidad: "1", ingrediente: { id: 10, nombre: "Lechuga", unidad: "unidad" } },
    ],
}

describe("RecetaDetail", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it("muestra el LoadingSpinner mientras está cargando", () => {
        mockUseRecetaDetail.mockReturnValue({ receta: null, loading: true, error: null })

        render(<RecetaDetail />)

        expect(screen.getByTestId("loading-spinner")).toBeInTheDocument()
    })

    it("muestra el ErrorState cuando hay un error", () => {
        mockUseRecetaDetail.mockReturnValue({
            receta: null,
            loading: false,
            error: "No se pudo cargar la receta",
        })

        render(<RecetaDetail />)

        expect(screen.getByTestId("error-state")).toBeInTheDocument()
        expect(screen.getByText("No se pudo cargar la receta")).toBeInTheDocument()
    })

    it("llama a router.back al hacer click en 'Volver' del ErrorState", () => {
        mockUseRecetaDetail.mockReturnValue({
            receta: null,
            loading: false,
            error: "Error",
        })

        render(<RecetaDetail />)

        fireEvent.click(screen.getByText("Volver"))
        expect(mockBack).toHaveBeenCalledTimes(1)
    })

    it("no renderiza nada si no hay receta, no está cargando y no hay error", () => {
        mockUseRecetaDetail.mockReturnValue({ receta: null, loading: false, error: null })

        const { container } = render(<RecetaDetail />)
        expect(container).toBeEmptyDOMElement()
    })

    it("renderiza la información de la receta correctamente", () => {
        mockUseRecetaDetail.mockReturnValue({ receta: recetaMock, loading: false, error: null })

        render(<RecetaDetail />)

        expect(screen.getByText("Ensalada César")).toBeInTheDocument()
        expect(screen.getByText("Una ensalada fresca y saludable")).toBeInTheDocument()
        expect(screen.getByText("350 kcal")).toBeInTheDocument()
        expect(screen.getByText("15 min")).toBeInTheDocument()
        expect(screen.getByAltText("Ensalada César")).toHaveAttribute(
            "src",
            "/images/ensalada.jpg"
        )
    })

    it("renderiza RecetaIngredients con los ingredientes de la receta", () => {
        mockUseRecetaDetail.mockReturnValue({ receta: recetaMock, loading: false, error: null })

        render(<RecetaDetail />)

        expect(screen.getByTestId("receta-ingredients")).toHaveTextContent("Lechuga")
    })

    it("muestra RecetaActions cuando la receta NO es de la plataforma (idUsuario !== 1)", () => {
        mockUseRecetaDetail.mockReturnValue({ receta: recetaMock, loading: false, error: null })

        render(<RecetaDetail />)

        expect(screen.getByTestId("receta-actions")).toBeInTheDocument()
    })

    it("oculta RecetaActions cuando la receta es de la plataforma (idUsuario === 1)", () => {
        mockUseRecetaDetail.mockReturnValue({
            receta: { ...recetaMock, idUsuario: 1 },
            loading: false,
            error: null,
        })

        render(<RecetaDetail />)

        expect(screen.queryByTestId("receta-actions")).not.toBeInTheDocument()
    })

    it("navega a la pantalla de edición al hacer click en 'Editar'", () => {
        mockUseRecetaDetail.mockReturnValue({ receta: recetaMock, loading: false, error: null })

        render(<RecetaDetail />)

        fireEvent.click(screen.getByText("Editar"))
        expect(mockPush).toHaveBeenCalledWith("/recetario/1/editar")
    })

    it("abre el ConfirmDialog al hacer click en 'Eliminar'", () => {
        mockUseRecetaDetail.mockReturnValue({ receta: recetaMock, loading: false, error: null })

        render(<RecetaDetail />)

        expect(screen.queryByTestId("confirm-dialog")).not.toBeInTheDocument()

        fireEvent.click(screen.getByText("Eliminar"))

        expect(screen.getByTestId("confirm-dialog")).toBeInTheDocument()
        expect(screen.getByText("¿Eliminar receta?")).toBeInTheDocument()
        expect(
            screen.getByText(/Estás seguro que querés eliminar la receta "Ensalada César"/)
        ).toBeInTheDocument()
    })

    it("elimina la receta, muestra notificación de éxito y redirige al confirmar", async () => {
        mockUseRecetaDetail.mockReturnValue({ receta: recetaMock, loading: false, error: null })
        ;(eliminarReceta as jest.Mock).mockResolvedValueOnce(undefined)

        render(<RecetaDetail />)

        fireEvent.click(screen.getByText("Eliminar"))
        fireEvent.click(screen.getByText("Confirmar"))

        await waitFor(() => {
            expect(eliminarReceta).toHaveBeenCalledWith("1")
            expect(mockMostrarNotificacion).toHaveBeenCalledWith(
                "Receta eliminada correctamente.",
                "success"
            )
            expect(mockPush).toHaveBeenCalledWith("/recetario")
        })
    })

    it("muestra notificación de error si falla la eliminación", async () => {
        mockUseRecetaDetail.mockReturnValue({ receta: recetaMock, loading: false, error: null })
        ;(eliminarReceta as jest.Mock).mockRejectedValueOnce(new Error("fallo"))

        render(<RecetaDetail />)

        fireEvent.click(screen.getByText("Eliminar"))
        fireEvent.click(screen.getByText("Confirmar"))

        await waitFor(() => {
            expect(mockMostrarNotificacion).toHaveBeenCalledWith(
                "Error al eliminar la receta.",
                "error"
            )
        })
        expect(mockPush).not.toHaveBeenCalledWith("/recetario")
    })
})
