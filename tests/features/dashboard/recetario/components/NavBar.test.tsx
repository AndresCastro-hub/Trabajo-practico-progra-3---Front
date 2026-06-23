import { render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"
import NavBar from "@/features/dashboard/recetario/components/NavBar"

const mockOnToggleModoControl = jest.fn()
const mockUseModoControl = jest.fn()
jest.mock("@/context/ModoControlContext", () => ({
    useModoControl: () => mockUseModoControl(),
}))

describe("NavBar", () => {
    const handleTabChange = jest.fn()
    const onSearch = jest.fn()

    beforeEach(() => {
        jest.clearAllMocks()
        mockUseModoControl.mockReturnValue({
            modoControl: false,
            onToggleModoControl: mockOnToggleModoControl,
        })
    })

    it("renderiza el input de búsqueda con el placeholder correcto", () => {
        render(
            <NavBar activeTab="plataforma" handleTabChange={handleTabChange} onSearch={onSearch} />
        )

        expect(screen.getByPlaceholderText("Buscar recetas...")).toBeInTheDocument()
    })

    it("llama a onSearch con el valor del input al presionar Enter", () => {
        render(
            <NavBar activeTab="plataforma" handleTabChange={handleTabChange} onSearch={onSearch} />
        )

        const input = screen.getByPlaceholderText("Buscar recetas...")
        fireEvent.change(input, { target: { value: "ensalada" } })
        fireEvent.keyDown(input, { key: "Enter", code: "Enter" })

        expect(onSearch).toHaveBeenCalledWith("ensalada")
        expect(onSearch).toHaveBeenCalledTimes(1)
    })

    it("no llama a onSearch al presionar una tecla distinta de Enter", () => {
        render(
            <NavBar activeTab="plataforma" handleTabChange={handleTabChange} onSearch={onSearch} />
        )

        const input = screen.getByPlaceholderText("Buscar recetas...")
        fireEvent.change(input, { target: { value: "pasta" } })
        fireEvent.keyDown(input, { key: "Escape", code: "Escape" })

        expect(onSearch).not.toHaveBeenCalled()
    })

    it("muestra 'Modo control OFF' y estilos correspondientes cuando modoControl es false", () => {
        render(
            <NavBar activeTab="plataforma" handleTabChange={handleTabChange} onSearch={onSearch} />
        )

        expect(screen.getByText(/Modo control OFF/i)).toBeInTheDocument()
    })

    it("muestra 'Modo control ON' cuando modoControl es true", () => {
        mockUseModoControl.mockReturnValue({
            modoControl: true,
            onToggleModoControl: mockOnToggleModoControl,
        })

        render(
            <NavBar activeTab="plataforma" handleTabChange={handleTabChange} onSearch={onSearch} />
        )

        expect(screen.getByText(/Modo control ON/i)).toBeInTheDocument()
    })

    it("llama a onToggleModoControl al hacer click en el botón de modo control", () => {
        render(
            <NavBar activeTab="plataforma" handleTabChange={handleTabChange} onSearch={onSearch} />
        )

        fireEvent.click(screen.getByText(/Modo control OFF/i))

        expect(mockOnToggleModoControl).toHaveBeenCalledTimes(1)
    })

    it("llama a handleTabChange con 'plataforma' al hacer click en el tab Plataforma", () => {
        render(
            <NavBar activeTab="mis-recetas" handleTabChange={handleTabChange} onSearch={onSearch} />
        )

        fireEvent.click(screen.getByText("Plataforma"))

        expect(handleTabChange).toHaveBeenCalledWith("plataforma")
    })

    it("llama a handleTabChange con 'mis-recetas' al hacer click en el tab Mis Recetas", () => {
        render(
            <NavBar activeTab="plataforma" handleTabChange={handleTabChange} onSearch={onSearch} />
        )

        fireEvent.click(screen.getByText("Mis Recetas"))

        expect(handleTabChange).toHaveBeenCalledWith("mis-recetas")
    })

    it("resalta el tab activo con la clase correspondiente", () => {
        render(
            <NavBar activeTab="plataforma" handleTabChange={handleTabChange} onSearch={onSearch} />
        )

        const tabPlataforma = screen.getByText("Plataforma")
        const tabMisRecetas = screen.getByText("Mis Recetas")

        expect(tabPlataforma.className).toContain("bg-white")
        expect(tabMisRecetas.className).not.toContain("bg-white")
    })
})