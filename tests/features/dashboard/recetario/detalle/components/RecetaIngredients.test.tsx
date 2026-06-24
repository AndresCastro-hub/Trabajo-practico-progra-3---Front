import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import RecetaIngredients from "@/features/dashboard/recetario/detalle/components/RecetaIngredients"
import { IIngredienteDetalle } from "@/features/dashboard/recetario/types/recetario.types"

const ingredientesMock: IIngredienteDetalle[] = [
    {
        id: 1,
        cantidad: "200",
        ingrediente: { id: 10, nombre: "harina", unidad: "g" },
    },
    {
        id: 2,
        cantidad: "2",
        ingrediente: { id: 11, nombre: "huevos", unidad: "unidades" },
    },
]

describe("RecetaIngredients", () => {
    it("renderiza el título 'Ingredientes'", () => {
        render(<RecetaIngredients ingredientes={ingredientesMock} />)

        expect(screen.getByText("Ingredientes")).toBeInTheDocument()
    })

    it("renderiza un item de lista por cada ingrediente", () => {
        render(<RecetaIngredients ingredientes={ingredientesMock} />)

        const items = screen.getAllByRole("listitem")
        expect(items).toHaveLength(2)
    })

    it("muestra el nombre de cada ingrediente", () => {
        render(<RecetaIngredients ingredientes={ingredientesMock} />)

        expect(screen.getByText("harina")).toBeInTheDocument()
        expect(screen.getByText("huevos")).toBeInTheDocument()
    })

    it("muestra la cantidad junto a la unidad de cada ingrediente", () => {
        render(<RecetaIngredients ingredientes={ingredientesMock} />)

        expect(screen.getByText("200 g")).toBeInTheDocument()
        expect(screen.getByText("2 unidades")).toBeInTheDocument()
    })

    it("renderiza una lista vacía sin items cuando no hay ingredientes", () => {
        render(<RecetaIngredients ingredientes={[]} />)

        expect(screen.getByText("Ingredientes")).toBeInTheDocument()
        expect(screen.queryAllByRole("listitem")).toHaveLength(0)
    })
})