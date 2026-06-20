import { render, screen } from "@testing-library/react";
import UsuariosTab from "@/features/dashboard/admin/components/usuarios/UsuariosTab";
import * as useUsersSearchModule from "@/features/dashboard/admin/hooks/useUsersSearch";

const mockUseUsersSearch = {
    usuarios: [
        { id: 4, name: "Nombre1", email: "nombre1@test.com", rolName: "administrador" },
        { id: 5, name: "Nombre2", email: "nombre2@test.com", rolName: "usuario" },
    ],
    totalUsers: 20,
    totalPages: 2,
    actualPage: 0,
    loading: false,
    error: null,
    handleSearch: jest.fn(),
    handlePageChange: jest.fn(),
};

beforeEach(() => {
    jest.spyOn(useUsersSearchModule, "useUsersSearch")
        .mockReturnValue(mockUseUsersSearch);
});

afterEach(() => jest.clearAllMocks());

describe("UsuariosTab: renderizado", () => {
    it("renderiza el buscador", () => {
        render(<UsuariosTab />);
        expect(screen.getByPlaceholderText("Buscar por nombre...")).toBeInTheDocument();
    });

    it("renderiza los usuarios en la tabla", () => {
        render(<UsuariosTab />);
        expect(screen.getByText("Nombre1")).toBeInTheDocument();
        expect(screen.getByText("Nombre2")).toBeInTheDocument();
    });

    it("renderiza los emails", () => {
        render(<UsuariosTab />);
        expect(screen.getByText("nombre1@test.com")).toBeInTheDocument();
        expect(screen.getByText("nombre2@test.com")).toBeInTheDocument();
    });

    it("renderiza los roles", () => {
        render(<UsuariosTab />);
        expect(screen.getByText("administrador")).toBeInTheDocument();
        expect(screen.getByText("usuario")).toBeInTheDocument();
    });
});

describe("UsuariosTab: paginación condicional", () => {
    it("muestra paginación si hay usuarios", () => {
        render(<UsuariosTab />);
        expect(screen.getByText("1")).toBeInTheDocument();
    });

    it("no muestra la paginación si está cargando", () => {
        jest.spyOn(useUsersSearchModule, "useUsersSearch")
            .mockReturnValue({ ...mockUseUsersSearch, loading: true });

        render(<UsuariosTab />);
        expect(screen.queryByRole("button", { name: /anterior|prev/i })).not.toBeInTheDocument();
    });

    it("no muestra la paginación si no hay usuarios", () => {
        jest.spyOn(useUsersSearchModule, "useUsersSearch")
            .mockReturnValue({ ...mockUseUsersSearch, usuarios: [], loading: false });

        render(<UsuariosTab />);
        expect(screen.queryByRole("button", { name: /anterior|prev/i })).not.toBeInTheDocument();
    });
});