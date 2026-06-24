import { render, screen} from "@testing-library/react"
import "@testing-library/jest-dom"
import { useRouter } from "next/navigation"
import Recetario from "@/features/dashboard/recetario/Recetario"
import useRecetario from "@/features/dashboard/recetario/hooks/useRecetario"

type Receta = { id: number; nombre: string }

type HeaderButton = { label: string; onClick: () => void }
type HeaderProps = { title: string; subtitle: string; buttons?: HeaderButton[] }

type NavBarProps = {
  activeTab: string
  onSearch: (value: string) => void
  handleTabChange: (tab: string) => void
}

type PaginationProps = {
  current: number
  lastPage: number
  onPageChange: (page: number) => void
}

type RecipeGridProps = {
  recetas: Receta[]
  loading: boolean
}

type UseRecetarioReturn = {
  recetas: Receta[]
  total: number
  actualPage: number
  loading: boolean
  totalPages: number
  activeTab: string
  handlePageChange: (page: number) => void
  handleTabChange: (tab: string) => void
  handleSearch: (value: string) => void
}

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}))

jest.mock("@/features/dashboard/recetario/hooks/useRecetario")

jest.mock("@/components/Header", () => {
  const MockHeader = ({ title, subtitle, buttons }: HeaderProps) => (
    <div data-testid="header">
      <h1>{title}</h1>
      <p>{subtitle}</p>
      {buttons?.map((b, i) => (
        <button key={i} onClick={b.onClick}>{b.label}</button>
      ))}
    </div>
  )
  MockHeader.displayName = "MockHeader"
  return MockHeader
})

jest.mock("@/features/dashboard/recetario/components/NavBar", () => {
  const MockNavBar = ({ activeTab, onSearch, handleTabChange }: NavBarProps) => (
    <div data-testid="navbar">
      <span>active-tab:{activeTab}</span>
      <button onClick={() => onSearch("pasta")}>buscar</button>
      <button onClick={() => handleTabChange("favoritas")}>cambiar-tab</button>
    </div>
  )
  MockNavBar.displayName = "MockNavBar"
  return MockNavBar
})

jest.mock("@/components/Pagination", () => {
  const MockPagination = ({ current, lastPage, onPageChange }: PaginationProps) => (
    <div data-testid="pagination">
      <span>page:{current}</span>
      <span>lastPage:{lastPage}</span>
      <button onClick={() => onPageChange(current + 1)}>siguiente</button>
    </div>
  )
  MockPagination.displayName = "MockPagination"
  return MockPagination
})

jest.mock("@/features/dashboard/recetario/components/RecipeGrid", () => {
  const MockRecipeGrid = ({ recetas, loading }: RecipeGridProps) => (
    <div data-testid="recipe-grid">
      {loading ? "cargando..." : `recetas:${recetas.length}`}
    </div>
  )
  MockRecipeGrid.displayName = "MockRecipeGrid"
  return MockRecipeGrid
})

const mockedUseRecetario = useRecetario as unknown as jest.MockedFunction<() => UseRecetarioReturn>
const mockedUseRouter = useRouter as jest.MockedFunction<typeof useRouter>
const mockPush = jest.fn()

const baseHookReturn: UseRecetarioReturn = {
  recetas: [
    { id: 1, nombre: "Tarta" },
    { id: 2, nombre: "Sopa" },
  ],
  total: 2,
  actualPage: 1,
  loading: false,
  totalPages: 1,
  activeTab: "todas",
  handlePageChange: jest.fn(),
  handleTabChange: jest.fn(),
  handleSearch: jest.fn(),
}

describe("Recetario page - renderizado", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockedUseRouter.mockReturnValue({
      push: mockPush,
    } as unknown as ReturnType<typeof useRouter>)
    mockedUseRecetario.mockReturnValue(baseHookReturn)
  })

  it("renderiza el header con el título y la cantidad de recetas", () => {
    render(<Recetario />)
    expect(screen.getByText("Recetario")).toBeInTheDocument()
    expect(screen.getByText("2 recetas disponibles")).toBeInTheDocument()
  })

  it("renderiza el botón de 'Nueva receta'", () => {
    render(<Recetario />)
    expect(screen.getByText("+ Nueva receta")).toBeInTheDocument()
  })

  it("renderiza el NavBar con el tab activo correcto", () => {
    render(<Recetario />)
    expect(screen.getByTestId("navbar")).toBeInTheDocument()
    expect(screen.getByText("active-tab:todas")).toBeInTheDocument()
  })

  it("renderiza el grid con la cantidad correcta de recetas cuando no está cargando", () => {
    render(<Recetario />)
    expect(screen.getByTestId("recipe-grid")).toHaveTextContent("recetas:2")
  })

  it("renderiza el estado de carga en el grid cuando loading es true", () => {
    mockedUseRecetario.mockReturnValue({ ...baseHookReturn, loading: true })
    render(<Recetario />)
    expect(screen.getByTestId("recipe-grid")).toHaveTextContent("cargando...")
  })

  it("renderiza la paginación cuando hay recetas y no está cargando", () => {
    render(<Recetario />)
    expect(screen.getByTestId("pagination")).toBeInTheDocument()
  })

  it("no renderiza la paginación cuando está cargando", () => {
    mockedUseRecetario.mockReturnValue({ ...baseHookReturn, loading: true })
    render(<Recetario />)
    expect(screen.queryByTestId("pagination")).not.toBeInTheDocument()
  })

  it("no renderiza la paginación cuando no hay recetas", () => {
    mockedUseRecetario.mockReturnValue({ ...baseHookReturn, recetas: [], total: 0 })
    render(<Recetario />)
    expect(screen.queryByTestId("pagination")).not.toBeInTheDocument()
  })

  it("renderiza la paginación con lastPage redondeado hacia arriba (Math.ceil)", () => {
    mockedUseRecetario.mockReturnValue({ ...baseHookReturn, totalPages: 2.4 })
    render(<Recetario />)
    expect(screen.getByTestId("pagination")).toHaveTextContent("lastPage:3")
  })

  it("renderiza el subtítulo con 0 recetas disponibles", () => {
    mockedUseRecetario.mockReturnValue({ ...baseHookReturn, total: 0, recetas: [] })
    render(<Recetario />)
    expect(screen.getByText("0 recetas disponibles")).toBeInTheDocument()
  })
})