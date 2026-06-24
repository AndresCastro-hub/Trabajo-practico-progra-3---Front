import { render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"
import RecipeCard from "@/features/dashboard/recetario/components/RecipeCard"
import { IReceta } from "@/features/dashboard/recetario/types/recetario.types" 

jest.mock("next/image", () => ({
    __esModule: true,
    default: (props: any) => {
        return <img {...props} alt={props.alt} />
    },
}))

const mockPush = jest.fn()
jest.mock("next/navigation", () => ({
    useRouter: () => ({
        push: mockPush,
    }),
}))

const mockUseModoControl = jest.fn()
jest.mock("@/context/ModoControlContext", () => ({
    useModoControl: () => mockUseModoControl(),
}))

const recetaMock: IReceta = {
    id: 1,
    idUsuario: 1,
    nombre: "Ensalada César",
    descripcion: "Una ensalada fresca y saludable",
    imagen_url: "/images/ensalada.jpg",
    calorias: 350,
    tiempoPreparacion: 15,
}

describe("RecipeCard", () => {
    beforeEach(() => {
        jest.clearAllMocks()
        mockUseModoControl.mockReturnValue({ modoControl: false })
    })

    it("renderiza el nombre, descripción y tiempo de preparación de la receta", () => {
        render(<RecipeCard recipe={recetaMock} />)

        expect(screen.getByText("Ensalada César")).toBeInTheDocument()
        expect(screen.getByText("Una ensalada fresca y saludable")).toBeInTheDocument()
        expect(screen.getByText("15 min")).toBeInTheDocument()
    })

    it("renderiza la imagen con el src y alt correctos", () => {
        render(<RecipeCard recipe={recetaMock} />)

        const img = screen.getByAltText("Ensalada César")
        expect(img).toBeInTheDocument()
        expect(img).toHaveAttribute("src", "/images/ensalada.jpg")
    })

    it("no muestra las calorías cuando modoControl está desactivado", () => {
        mockUseModoControl.mockReturnValue({ modoControl: false })
        render(<RecipeCard recipe={recetaMock} />)

        expect(screen.queryByText(/kcal/i)).not.toBeInTheDocument()
    })

    it("muestra las calorías cuando modoControl está activado", () => {
        mockUseModoControl.mockReturnValue({ modoControl: true })
        render(<RecipeCard recipe={recetaMock} />)

        expect(screen.getByText("350 kcal")).toBeInTheDocument()
    })

    it("redirige al detalle de la receta al hacer click en la card", () => {
        render(<RecipeCard recipe={recetaMock} />)

        const card = screen.getByText("Ensalada César").closest("article")
        fireEvent.click(card as HTMLElement)

        expect(mockPush).toHaveBeenCalledWith("/recetario/1")
        expect(mockPush).toHaveBeenCalledTimes(1)
    })
})