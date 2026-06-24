import { render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"
import RecetaActions from "@/features/dashboard/recetario/detalle/components/RecetaActions"

describe("RecetaActions", () => {
    const onEditar = jest.fn()
    const onEliminar = jest.fn()

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it("renderiza ambos botones de acción", () => {
        render(<RecetaActions onEditar={onEditar} onEliminar={onEliminar} />)

        const buttons = screen.getAllByRole("button")
        expect(buttons).toHaveLength(2)
    })

    it("llama a onEditar al hacer click en el botón de editar", () => {
        render(<RecetaActions onEditar={onEditar} onEliminar={onEliminar} />)

        const buttons = screen.getAllByRole("button")
        fireEvent.click(buttons[0])

        expect(onEditar).toHaveBeenCalledTimes(1)
        expect(onEliminar).not.toHaveBeenCalled()
    })

    it("llama a onEliminar al hacer click en el botón de eliminar", () => {
        render(<RecetaActions onEditar={onEditar} onEliminar={onEliminar} />)

        const buttons = screen.getAllByRole("button")
        fireEvent.click(buttons[1])

        expect(onEliminar).toHaveBeenCalledTimes(1)
        expect(onEditar).not.toHaveBeenCalled()
    })

    it("cambia el color de fondo del botón de eliminar al pasar el mouse (hover)", () => {
        render(<RecetaActions onEditar={onEditar} onEliminar={onEliminar} />)

        const buttons = screen.getAllByRole("button")
        const deleteButton = buttons[1]

        expect(deleteButton).toHaveStyle({ backgroundColor: "#d51010" })

        fireEvent.mouseEnter(deleteButton)
        expect(deleteButton).toHaveStyle({ backgroundColor: "#b91c1c" })

        fireEvent.mouseLeave(deleteButton)
        expect(deleteButton).toHaveStyle({ backgroundColor: "#d51010" })
    })
})