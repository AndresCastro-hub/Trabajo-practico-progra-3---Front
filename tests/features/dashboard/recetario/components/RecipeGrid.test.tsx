import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import RecipeGrid from "@/features/dashboard/recetario/components/RecipeGrid"
import { IReceta } from "@/features/dashboard/recetario/types/recetario.types" 

jest.mock("@/features/dashboard/recetario/components/RecipeCard", () => ({
    __esModule: true,
    default: ({ recipe }: { recipe: IReceta }) => (
        <div data-testid="recipe-card">{recipe.nombre}</div>
    ),
}))

const recetasMock: IReceta[] = [
    {
        id: 1,
        idUsuario: 1,
        nombre: "Ensalada César",
        descripcion: "Una ensalada fresca",
        imagen_url: "/img1.jpg",
        calorias: 350,
        tiempoPreparacion: 15,
    },
    {
        id: 2,
        idUsuario: 1,
        nombre: "Pasta Alfredo",
        descripcion: "Pasta cremosa",
        imagen_url: "/img2.jpg",
        calorias: 600,
        tiempoPreparacion: 30,
    },
]

describe("RecipeGrid", () => {
    it("muestra el spinner de carga cuando loading es true", () => {
        render(<RecipeGrid recetas={[]} loading={true} />)

        expect(document.querySelector(".animate-spin")).toBeInTheDocument()
        expect(screen.queryByTestId("recipe-card")).not.toBeInTheDocument()
    })

    it("muestra el mensaje de 'No hay recetas' cuando la lista está vacía y no está cargando", () => {
        render(<RecipeGrid recetas={[]} loading={false} />)

        expect(screen.getByText("No hay recetas")).toBeInTheDocument()
        expect(
            screen.getByText("No se encontraron resultados para esta página.")
        ).toBeInTheDocument()
    })

    it("renderiza una RecipeCard por cada receta recibida", () => {
        render(<RecipeGrid recetas={recetasMock} loading={false} />)

        const cards = screen.getAllByTestId("recipe-card")
        expect(cards).toHaveLength(2)
        expect(screen.getByText("Ensalada César")).toBeInTheDocument()
        expect(screen.getByText("Pasta Alfredo")).toBeInTheDocument()
    })

    it("no muestra el spinner ni el mensaje vacío cuando hay recetas", () => {
        render(<RecipeGrid recetas={recetasMock} loading={false} />)

        expect(document.querySelector(".animate-spin")).not.toBeInTheDocument()
        expect(screen.queryByText("No hay recetas")).not.toBeInTheDocument()
    })
})