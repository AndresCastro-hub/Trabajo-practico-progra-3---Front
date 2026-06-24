import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import Imagen from "@/features/dashboard/recetario/editar/components/form/Imagen"

jest.mock("next/image", () => ({
    __esModule: true,
    default: (props: any) => {
        return <img {...props} alt={props.alt} />
    },
}))

describe("Imagen", () => {
    it("renderiza el título y la descripción", () => {
        render(<Imagen value="/images/receta.jpg" />)

        expect(screen.getByText("Imagen")).toBeInTheDocument()
        expect(screen.getByText("Imagen de la receta.")).toBeInTheDocument()
    })

    it("renderiza la imagen con el src recibido y el alt correcto", () => {
        render(<Imagen value="/images/receta.jpg" />)

        const img = screen.getByAltText("Imagen de la receta")
        expect(img).toBeInTheDocument()
        expect(img).toHaveAttribute("src", "/images/receta.jpg")
    })

    it("renderiza correctamente con una URL distinta", () => {
        render(<Imagen value="https://cdn.example.com/foto.png" />)

        expect(screen.getByAltText("Imagen de la receta")).toHaveAttribute(
            "src",
            "https://cdn.example.com/foto.png"
        )
    })
})
